import { world, system } from "@minecraft/server";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui"
import { foodPrices, foodSell } from "./food-market.js"
import { formatCurrency } from "../../formats.js"

system.runInterval(() => {
    const dayTick = world.getTimeOfDay();
    const currentDay = Math.floor(dayTick / 24000);

    // Wywołaj update tylko raz, gdy dayTick osiągnie 1000
    if (dayTick == 0) {
        updateModifiers();
        world.sendMessage(`§6[Market Update]§r §aPrices has changed and new §l§emodifiers§r§a are now avaible!`);
    }
}, 1); // co tick

export function updateModifiers() {
    const newBuyModifier = Math.floor(Math.random() * 401) - 200

    foodPrices.modifier = Math.max(-200, Math.min(200, newBuyModifier));

    let newSellModifier = Math.floor(Math.random() * 401) - 200

    if (newSellModifier > foodPrices.modifier) {
        newSellModifier = foodPrices.modifier - Math.floor(Math.random() * 5);;
    }

    foodSell.modifier = Math.max(-200, Math.min(200, newSellModifier));

    world.sendMessage(`[ Food Price Change ] New Buy Modifiers: ${foodPrices.modifier}, New Sell Modifiers: ${foodSell.modifier}`)
}

export function forceModifier(value) {

    const clamped = Math.max(-200, Math.min(200, value));


    foodPrices.modifier = clamped;


    foodSell.modifier = Math.min(clamped, foodSell.modifier);
    foodSell.modifier = Math.max(-200, Math.min(200, foodSell.modifier));

    world.sendMessage(`§6[Market Override]§r Food modifier forcibly set to §b${clamped}`);
}

export function getPrice(globalCategory, localCategory, item) {
    if (!globalCategory || !globalCategory.items || !globalCategory.items[localCategory]) {
        return 0;
    }

    const basePrice = globalCategory.items[localCategory][item] ?? 0;
    const modifier = globalCategory.modifier ?? 0;

    return basePrice + modifier;
}

export function buy(globalCat, localCat, item, player, amount) {
    const price = globalCat.items[localCat]?.[item] ?? 0;
    const finalPrice = Math.max(0, price + globalCat.modifier) * amount;
    const itemId = globalCat.id[localCat]?.[item] ?? "minecraft:air";

    const bank = world.scoreboard.getObjective('bank').getScore(player);
    const cash = world.scoreboard.getObjective("balance").getScore(player);

    if (bank >= finalPrice && cash < finalPrice) {
        player.sendMessage(`§c§l[ ECONOMY ]§r§c Your cash balance is not enough, but you can withdraw enough from your bank to afford this item!`)
        return;
    }
    if (cash < finalPrice) {
        player.sendMessage(`§c§l[ ECONOMY ]§r§c You don't have enough money to buy this item!`)
        return;
    }
    if (cash >= finalPrice) {
        player.sendMessage(`§l§e[ ECONOMY ]§r§a Successfully bought §e${itemId}§a for §e${formatCurrency(finalPrice)}\$`)
        world.scoreboard.getObjective('balance').addScore(player, -finalPrice)
        player.runCommand(`give @s ${itemId} ${amount}`)
        player.runCommand(`bal`)
    }
}

export function getTotalPrice(globalCat, localCat, item) {
    const price = globalCat.items[localCat]?.[item];
    const totalPrice = Math.max(0, price + globalCat.modifier)
    return totalPrice ?? 0;
}

export function buyMenu(title, globalCat, localCat, item, player) {
    const itemId = globalCat.id[localCat]?.[item];
    const price = globalCat.items[localCat]?.[item];
    const totalPrice = getTotalPrice(globalCat, localCat, item);
    const modifier = globalCat.modifier;
    return new ModalFormData()
        .title(title)
        .divider()
        .header(`Buy:
 ${title}`)
        .divider()
        .label(`
Buy ${title} for ${formatCurrency(totalPrice)}\$. 
Item Id: ${itemId}

Normal Price: ${formatCurrency(price)}\$
Total Price: ${formatCurrency(totalPrice)}\$
Total Price = Price With Current Modifier ( ${modifier}%% ).

The amount of item's you will choose return totalPrice * amount.`)
        .slider(`The Amount of Items you will buy:`, 1, 64)
        .show(player)
        .then(r => {
            const canceled = r.canceled

            if (canceled) return;

            const amount = r.formValues[4];
            transactionFinal(globalCat, localCat, item, amount, player);
        })
}


export async function transactionFinal(global, local, item, amount, player) {
    const itemId = global.id[local]?.[item];
    let totalPrice = getTotalPrice(global, local, item) * amount;
    const price = getPrice(global, local, item);

    if (totalPrice == 0) {
        totalPrice = price;
    }

    return new ActionFormData()
        .title("Test Buy")
        .body(`Item: §f${itemId}\nAmount: §f${amount}\nPrice: §7${formatCurrency(totalPrice)}`)
        .button('BUY')
        .show(player)
        .then(r => {
            if (r.canceled) return;

            if (r.selection == 0) {
                buy(global, local, item, player, amount)
            }
        })
}