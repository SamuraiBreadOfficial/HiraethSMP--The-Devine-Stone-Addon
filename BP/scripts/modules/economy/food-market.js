import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import {
    getTotalPrice,
    transactionFinal,
    getPrice,
    buy,
    buyMenu
} from "./core.js"

export const foodPrices = {
    modifier: 0,
    items: {
        cooked: {
            chicken: 1299,
            porkchop: 1399,
            beef: 1499,
            mutton: 1232,
            rabbit: 1029,
            cod: 744,
            salmon: 599
        },
        raw: {
            chicken: 322,
            porkchop: 142,
            beef: 143,
            mutton: 250,
            rabbit: 55,
            cod: 30,
            salmon: 33,
            tropical: 140
        },
        misc: {
            bread: 200,
            mstew: 111,
            bsoup: 100,
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
        "Cooked Salmon": "salmon"

    }

    const options = [
        "Cooked Chicken",
        "Cooked Porkchop",
        "Cooked Beef",
        "Cooked Mutton",
        "Cooked Rabbit",
        "Cooked Cod",
        "Cooked Salmon"

    ]


    return new ModalFormData()
        .title(`Restaurant`)
        .dropdown(`Items`, options)
        .show(player)
        .then(r => {
            const selectedIndex = r.formValues[0]
            const selectedOption = options[selectedIndex]

            player.sendMessage(`${selectedOption} ${translatedOptions[selectedOption]}`)
            buyMenu(selectedOption, foodPrices, "cooked", translatedOptions[selectedOption], player)
        })
}

world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    if (e.block.typeId == "minecraft:spruce_button") {
        system.run(() => {
            restaurantMarket(e.player)
        })
    }
})