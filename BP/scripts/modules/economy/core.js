import { world, system } from "@minecraft/server";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui"
import { foodPrices, foodSell } from "./food-market.js"
import { woodPrices } from "./lumberjack.js"
import { hardBlocksPrices } from "./earthwright.js"
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
    const newFoodBuyModifier = Math.floor(Math.random() * 401) - 200
    const newWoodBuyModifier = Math.floor(Math.random() * 401) - 200
    const newEarthBuyModifier = Math.floor(Math.random() * 401) - 200

    foodPrices.modifier = Math.max(-90, Math.min(200, newFoodBuyModifier));
    woodPrices.modifier = Math.max(-90, Math.min(200, newWoodBuyModifier));
    hardBlocksPrices.modifier = Math.max(-90, Math.min(200, newEarthBuyModifier));

    let newSellModifier = Math.floor(Math.random() * 401) - 200

    if (newSellModifier > foodPrices.modifier) {
        newSellModifier = foodPrices.modifier - Math.floor(Math.random() * 5);;
    }

    foodSell.modifier = Math.max(-90, Math.min(200, newSellModifier));

    world.sendMessage(`[ Price Change ]
    New modifiers:

    Restaurant/Butcher: ${foodPrices.modifier}
    Lumberjack: ${woodPrices.modifier}
    Earthwright: ${hardBlocksPrices.modifier}`)
}

export function forceModifier(value) {

    const clamped = Math.max(-90, Math.min(200, value));


    foodPrices.modifier = clamped;
    woodPrices.modifier = clamped;
    hardBlocksPrices.modifier = clamped;

    foodSell.modifier = Math.min(clamped, foodSell.modifier);
    foodSell.modifier = Math.max(-90, Math.min(200, foodSell.modifier));

    world.sendMessage(`§6[Market Override]§r All modifiers forcibly set to §b${clamped}`);
}

export function forceCatModifier(value, category) {


    if (category == "food") {
        const clamped = Math.max(-90, Math.min(200, value));


        foodPrices.modifier = clamped;


        foodSell.modifier = Math.min(clamped, foodSell.modifier);
        foodSell.modifier = Math.max(-90, Math.min(200, foodSell.modifier));

        world.sendMessage(`§6[Market Override]§r Restaurant/Butcher & Store (Raw & Ready Food) modifier forcibly set to §b${clamped}`)
    } else if (category == "lumberjack") {
        const clamped = Math.max(-90, Math.min(200, value));


        woodPrices.modifier = clamped;

        world.sendMessage(`§6[Market Override]§r Lumberjack modifier forcibly set to §b${clamped}`)

    } else if (category == "earthwright") {
        const clamped = Math.max(-90, Math.min(200, value));


        hardBlocksPrices.modifier = clamped;

        world.sendMessage(`§6[Market Override]§r Earthwright modifier forcibly set to §b${clamped}`)

    }
}


export function getPrice(globalCategory, localCategory, item) {
    if (!globalCategory || !globalCategory.items || !globalCategory.items[localCategory]) {
        return 0;
    }

    const basePrice = globalCategory.items[localCategory][item] ?? 0;
    const modifier = globalCategory.modifier ?? 0;

    return Math.max(0, Math.floor(basePrice * (1 + modifier / 100)));
}

export function buy(globalCat, localCat, item, player, amount) {
    const price = globalCat.items[localCat]?.[item] ?? 0;
    const finalPrice = getTotalPrice(globalCat, localCat, item) * amount;
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
    const price = globalCat.items[localCat]?.[item] ?? 0;
    const modifier = globalCat.modifier ?? 0;

    // zamiast price + modifier:
    const totalPrice = Math.max(0, Math.floor(price * (1 + modifier / 100)));

    return totalPrice;
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
§a[ i ]§r Buy §e${title}§r for §a${formatCurrency(totalPrice)}\$§r. 
§a[ i ]§r Item Id: ${itemId}

§a[ i ]§r §aNormal Price:§r §e${formatCurrency(price)}\$§r
§a[ i ]§r §cTotal Price:§r §e${formatCurrency(totalPrice)}\$§r
§a[ i ]§r Total Price = Price With Current Modifier ( ${modifier}%% ).

§c[ ! ]§r The amount of item's you will choose return totalPrice * amount.`)
        .slider(`The Amount of Items you will buy:`, 1, 640)
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
        .title("§lCONFIRMATION")
        .body(`§eItem:§a §f${itemId}\n§eAmount: §f${amount}\n§cPrice: §7${formatCurrency(totalPrice)}\$`)
        .button('§lBUY')
        .show(player)
        .then(r => {
            if (r.canceled) return;

            if (r.selection == 0) {
                buy(global, local, item, player, amount)
            }
        })
}