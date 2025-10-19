import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import {
    getTotalPrice,
    transactionFinal,
    getPrice,
    buy,
    buyMenu
} from "./core.js"

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
        .title(`Restaurant`)
        .header(`Restaurant`)
        .label(`Buy all cooked food here.

Be aware that price and total price are diffrent!

Price = Normal Price without modifier.
Total Price = Price + Modifier

Total Final Price = (Price + Modifier) * Amount!

Before buying you need to withdraw yout money too!`)
        .dropdown(`Items | Total Price`, options)
        .show(player)
        .then(r => {

            if (r.canceled) return;

            const selectedIndex = r.formValues[2]
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
            restaurantMarket(e.player)
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