console.warn("§d[HIRAETH]§r Loading scripts/modules/economy/food-market.js");

import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import {
    getTotalPrice,
    transactionFinal,
    getPrice,
    buy,
    buyMenu
} from "./core.js"

const resMessages = [
    "< Hiyah > Welcome to \"Under The Copper Bolt\"!",
    "< Hiyah > Welcome! What can i get for you?",
    "< Hiyah > Hello again! What can i get for you?",
    "< Hiyah > Welcome to 'Under The Copper Bolt'! What brings you in today?",
    "< Hiyah > Good day, traveler! Care for a meal or a drink?",
    "< Hiyah > Hungry? We've got the finest stew in town!",
    "< Hiyah > Welcome! Sit wherever you like!",
    "< Hiyah > Oh! A new face! What can I get for you?",
    "< Hiyah > Back again, eh? The usual?",
    "< Hiyah > Hello again! Hungry already?",
    "< Hiyah > Welcome, friend. Warm food, cold ale, take your pick!",
    "< Hiyah > Step right in! You look like you could use a hot meal.",
    "< Hiyah > Evening! We've just finished roasting the boar!",
    "< Hiyah > Welcome to 'Under The Copper Bolt', where hunger meets its match!",
    "< Hiyah > Hello there! The chef just made something special today.",
    "< Hiyah > Hey, traveler! Fancy something to drink?",
    "< Hiyah > Hah! You again! I saved your favorite spot.",
    "< Hiyah > Oh, it's you! Care for the same as last time?",
    "< Hiyah > Welcome, wanderer! We've got stew, bread, and a story or two.",
    "< Hiyah > Step closer! You won't find better food in this whole district.",
    "< Hiyah > What'll it be? Ale? Stew? Or both?",
    "< Hiyah > Hey there! You smell like adventure, and you look hungry.",
    "< Hiyah > Glad to see you made it through the storm. Warm yourself up with some soup!",
    "< Hiyah > Ah, welcome! The fire's warm, and so's the mead!",
    "< Hiyah > Haven't seen you in a while! Still chasing monsters or just meals?",
    "< Hiyah > Hey! I just baked fresh bread, want some?",
    "< Hiyah > Welcome back! The Copper Bolt always has a place for you.",
    "< Hiyah > Sit down, traveler. The night's young, and the ale's flowing!"

];

function randomRestaurantMessage() {
    const index = Math.floor(Math.random() * resMessages.length);
    const time = world.getTimeOfDay()

    if (time >= 3000 && time <= 16000) {
        return resMessages[index];
    } else {
        return "We are closing soon, please leave."
    }
}

import { formatCurrency } from "../../formats.js"

export const foodPrices = {
    modifier: 0,
    items: {
        cooked: {
            chicken: 1999,
            porkchop: 2750,
            beef: 2500,
            mutton: 2049,
            rabbit: 2399,
            cod: 899,
            salmon: 999
        },
        raw: {
            chicken: 1799,
            porkchop: 1599,
            beef: 1599,
            mutton: 1955,
            rabbit: 1500,
            cod: 599,
            salmon: 530,
            tropical: 99
        },
        misc: {
            bread: 700,
            mstew: 1011,
            bsoup: 1000,
            rsoup: 1000,
            jpotato: 599,
            cookie: 399,
            ppie: 1500,
            cake: 2000,
            dkelp: 99
        }
    },
    id: {
        cooked: {
            chicken: "minecraft:cooked_chicken",
            porkchop: "minecraft:cooked_porkchop",
            beef: "minecraft:cooked_beef",
            mutton: "minecraft:cooked_mutton",
            rabbit: "minecraft:cooked_rabbit",
            cod: "minecraft:cooked_cod",
            salmon: "minecraft:cooked_salmon"
        },
        raw: {
            chicken: "minecraft:chicken",
            porkchop: "minecraft:porkchop",
            beef: "minecraft:beef",
            mutton: "minecraft:mutton",
            rabbit: "minecraft:rabbit",
            cod: "minecraft:cod",
            salmon: "minecraft:salmon",
            tropical: "minecraft:tropical_fish"
        },
        misc: {
            bread: "minecraft:bread",
            mstew: "minecraft:mushroom_stew",
            bsoup: "minecraft:beetroot_soup",
            rsoup: "minecraft:rabbit_soup",
            jpotato: "minecraft:jacked_potato",
            cookie: "minecraft:cookie",
            ppie: "minecraft:pumpkin_pie",
            cake: "minecraft:cake",
            dkelp: "minecraft:dried_kelp"
        }

    }
}
export const foodSell = {
    modifier: 0,
    items: {
        cooked: {
            cooked_chicken: 0,
            porkchop: 0,
            steak: 0,
            mutton: 0,
            rabbit: 0,
            cod: 0,
            salmon: 0
        },
        raw: {
            chicken: 0,
            porkchop: 0,
            steak: 0,
            mutton: 0,
            rabbit: 0,
            cod: 0,
            salmon: 0,
            tropical: 0
        },
        misc: {
            bread: 0,
            mstew: 0,
            bsoup: 0,
            rsoup: 0,
            jpotato: 0,
            cookie: 0,
            ppie: 0,
            cake: 0,
            dkelp: 0
        }
    },
    id: {
        cooked: {
            chicken: "minecraft:cooked_chicken",
            porkchop: "minecraft:cooked_porkchop",
            beef: "minecraft:cooked_beef",
            mutton: "minecraft:cooked_mutton",
            rabbit: "minecraft:cooked_rabbit",
            cod: "minecraft:cooked_cod",
            salmon: "minecraft:cooked_salmon"
        },
        raw: {
            chicken: "minecraft:chicken",
            porkchop: "minecraft:beef",
            beef: "minecraft:beef",
            mutton: "minecraft:mutton",
            rabbit: "minecraft:rabbit",
            cod: "minecraft:cod",
            salmon: "minecraft:salmon",
            tropical: "minecraft:tropical_fish"
        },
        misc: {
            bread: "minecraft:bread",
            mstew: "minecraft:mushroom_stew",
            bsoup: "minecraft:beetroot_soup",
            rsoup: "minecraft:rabbit_soup",
            jpotato: "minecraft:jacked_potato",
            cookie: "minecraft:cookie",
            ppie: "minecraft:pumpkin_pie",
            cake: "minecraft:cake",
            dkelp: "minecraft:dried_kelp"
        }

    }

}

export async function restaurantWindow(player) {
    const menu = await new ActionFormData()
        .title(`§lRESTAUTANT | MAIN MENU`)
        .divider()
        .header(`Select a Category`)
        .divider()
        .label(`( Cooked Food )`)
        .button(`§lCOOKED FOOD`)
        .label(`( Bread, stews, etc. )`)
        .button(`§lMISC`)
        .show(player)

    const selection = menu.selection;

    if (menu.canceled) return;

    if (selection == 0) restaurantMarket(player);
    if (selection == 1) restaurantMisc(player);
}

async function restaurantMisc(player) {

    const translatedOptions = {
        "Fresh Bread": `bread`,
        "Mushroom Stew": `mstew`,
        "Beetroot Soup": `bsoup`,
        "Rabbit Soup": `rsoup`,
        "Jacked Potato": `jpotato`,
        "Chocolate Cookie": "cookie",
        "Pumkin Pie": `ppie`,
        "Birthday Cake": "cake",
        "Dried Kelp": "dkelp"
    }
    let options = [

        `Fresh Bread ${formatCurrency(getTotalPrice(foodPrices, "misc", "bread"))}`,
        `Mushroom Stew ${formatCurrency(getTotalPrice(foodPrices, "misc", "mstew"))}`,
        `Beetroot Soup ${formatCurrency(getTotalPrice(foodPrices, "misc", "bsoup"))}`,
        `Rabbit Soup ${formatCurrency(getTotalPrice(foodPrices, "misc", "rsoup"))}`,
        `Jacked Potato ${formatCurrency(getTotalPrice(foodPrices, "misc", "jpotato"))}`,
        `Chocolate Cookie ${formatCurrency(getTotalPrice(foodPrices, "misc", "cookie"))}`,
        `Pumkin Pie ${formatCurrency(getTotalPrice(foodPrices, "misc", "ppie"))}`,
        `Birthday Cake ${formatCurrency(getTotalPrice(foodPrices, "misc", "cake"))}`,
        `Dried Kelp ${formatCurrency(getTotalPrice(foodPrices, "misc", "dkelp"))}`
    ]

    const miscMenu = await new ModalFormData()
        .title(`§lRESTAURANT`)
        .header(`§l§eRestaurant`)
        .label(`${randomRestaurantMessage()}`)
        .divider()
        .label(`
§a[ i ]§r Restaurant sells only cooked food. It has special items too.

§c[ ! ]§r Before buying, you need to withdraw money from your bank.

§c[ ! ]§r Price is not the same 24/7. Modifiers for the price updates each day at 6:00 (Day tick 0)

§a[ i ]§r Current Modifiers: §e${foodPrices.modifier}%%`)
        .dropdown(`Items | Total Price`, options)
        .show(player)

    if (miscMenu.canceled) return;

    const selectedIndex = miscMenu.formValues[4]
    const selectedLabel = options[selectedIndex];

    const baseName = selectedLabel.split(" ")[0] + " " + selectedLabel.split(" ")[1]
    const foodType = translatedOptions[baseName]

    player.sendMessage(`${selectedLabel} -> ${foodType}`)
    buyMenu(baseName, foodPrices, "misc", foodType, player)


}

export function restaurantMarket(player) {

    const translatedOptions = {
        "Cooked Chicken": "chicken",
        "Cooked Porkchop": "porkchop",
        "Cooked Beef": "beef",
        "Cooked Mutton": "mutton",
        "Cooked Rabbit": "rabbit",
        "Cooked Cod": "cod",
        "Cooked Salmon": "salmon",

    }

    let options = [
        `Cooked Chicken ${formatCurrency(getTotalPrice(foodPrices, "cooked", "chicken"))}\$`,
        `Cooked Porkchop ${formatCurrency(getTotalPrice(foodPrices, "cooked", "porkchop"))}\$`,
        `Cooked  Beef ${formatCurrency(getTotalPrice(foodPrices, "cooked", "beef"))}\$`,
        `Cooked Mutton ${formatCurrency(getTotalPrice(foodPrices, "cooked", "mutton"))}\$`,
        `Cooked Rabbit ${formatCurrency(getTotalPrice(foodPrices, "cooked", "rabbit"))}\$`,
        `Cooked Cod ${formatCurrency(getTotalPrice(foodPrices, "cooked", "cod"))}\$`,
        `Cooked Salmon ${formatCurrency(getTotalPrice(foodPrices, "cooked", "salmon"))}\$`

    ]


    return new ModalFormData()
        .title(`§lRESTAURANT`)
        .header(`§l§eRestaurant`)
        .label(`${randomRestaurantMessage()}`)
        .divider()
        .label(`
§a[ i ]§r Restaurant sells only cooked food. It has special items too.

§c[ ! ]§r Before buying, you need to withdraw money from your bank.

§c[ ! ]§r Price is not the same 24/7. Modifiers for the price updates each day at 6:00 (Day tick 0)

§a[ i ]§r Current Modifiers: §e${foodPrices.modifier}%%`)
        .dropdown(`Items | Total Price`, options)
        .show(player)
        .then(r => {

            if (r.canceled) return;

            const selectedIndex = r.formValues[4]
            const selectedLabel = options[selectedIndex];

            const baseName = selectedLabel.split(" ")[0] + " " + selectedLabel.split(" ")[1]
            const foodType = translatedOptions[baseName]

            player.sendMessage(`${selectedLabel} -> ${foodType}`)
            buyMenu(baseName, foodPrices, "cooked", foodType, player)

        })
}

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:restaurant', {
        onPlayerInteract(e) {
            restaurantWindow(e.player)
        }
    })
})

export function butcherMarket(player) {
    const translatedOptions = {
        "Raw Chicken": "chicken",
        "Raw Porkchop": "porkchop",
        "Raw Beef": "beef",
        "Raw Mutton": "mutton",
        "Raw Rabbit": "rabbit",
        "Raw Cod": "cod",
        "Raw Salmon": "salmon",
        "Tropical Fish": "tropical"

    }

    let options = [
        `Raw Chicken ${formatCurrency(getTotalPrice(foodPrices, "raw", "chicken"))}\$`,
        `Raw Porkchop ${formatCurrency(getTotalPrice(foodPrices, "raw", "porkchop"))}\$`,
        `Raw  Beef ${formatCurrency(getTotalPrice(foodPrices, "raw", "beef"))}\$`,
        `Raw Mutton ${formatCurrency(getTotalPrice(foodPrices, "raw", "mutton"))}\$`,
        `Raw Rabbit ${formatCurrency(getTotalPrice(foodPrices, "raw", "rabbit"))}\$`,
        `Raw Cod ${formatCurrency(getTotalPrice(foodPrices, "raw", "cod"))}\$`,
        `Raw Salmon ${formatCurrency(getTotalPrice(foodPrices, "raw", "salmon"))}\$`,
        `Tropical Fish ${formatCurrency(getTotalPrice(foodPrices, "raw", "tropical"))}\$`

    ]


    return new ModalFormData()
        .title(`Butcher`)
        .header(`Butcher`)
        .label(`Buy all raw food here.

Be aware that price and total price are diffrent!

Price = Normal Price without modifier.
Total Price = Price + Modifier

Total Final Price = (Price + Modifier) * Amount!

Before buying you need to withdraw yout money too!`)
        .dropdown(`Items`, options)
        .show(player)
        .then(r => {

            if (r.canceled) return;

            const selectedIndex = r.formValues[2]
            const selectedLabel = options[selectedIndex];

            const baseName = selectedLabel.split(" ")[0] + " " + selectedLabel.split(" ")[1]
            const foodType = translatedOptions[baseName]

            player.sendMessage(`${selectedLabel} -> ${translatedOptions[foodType]}`)
            buyMenu(baseName, foodPrices, "raw", foodType, player)
            player.runCommand(`bal`)

        })
}


system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:butcher', {
        onPlayerInteract(e) {
            butcherMarket(e.player)
        }
    })
})