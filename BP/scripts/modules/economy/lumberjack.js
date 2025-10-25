//Import Main API
import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"

//Import Main Modules
import {
    getTotalPrice,
    buyMenu
} from "./core.js"

// Import Currency Format ( 000,000.00$ )
import { formatCurrency } from "../../formats.js"

// Registered Prices Of Each Lumberjack Items
export const woodPrices = {
    modifier: 0,
    items: {
        wooden_planks: {
            oak: 22099,
            spruce: 25050,
            birch: 9999,
            jungle: 13099,
            acacia: 9099,
            dark: 28099,
            mangrove: 35099,
            cherry: 45000,
            pale: 55099,
            bamboo: 15050,
            bmosaic: 15550
        },
        logs: {
            oak: 34099,
            spruce: 45599,
            birch: 15099,
            jungle: 44499,
            acacia: 14099,
            dark: 66099,
            mangrove: 59999,
            cherry: 75099,
            pale: 87099,
            woak: 34099,
            wspruce: 45599,
            wbirch: 15099,
            wjungle: 44499,
            wacacia: 14099,
            wdark: 66099,
            wmangrove: 59999,
            wcherry: 75099,
            wpale: 87099

        },
        wooden_slabs: {
            oak: 5099,
            spruce: 6099,
            birch: 3599,
            jungle: 4600,
            acacia: 2590,
            dark: 7699,
            mangrove: 8999,
            cherry: 7099,
            pale: 9999,
            bamboo: 2099,
            bmosaic: 2050
        },

        wooden_stairs: {
            oak: 5599,
            spruce: 6599,
            birch: 4800,
            jungle: 4800,
            acacia: 3500,
            dark: 6099,
            mangrove: 7599,
            cherry: 6799,
            pale: 9099,
            bamboo: 5099,
            bmosaic: 5089
        },


        wooden_fences: {
            oak: 2599,
            ogate: 2099,
            spruce: 2099,
            sgate: 1799,
            birch: 1299,
            bgate: 1499,
            jungle: 1599,
            jgate: 1699,
            acacia: 599,
            agate: 699,
            dark: 3799,
            dgate: 3899,
            mangrove: 5899,
            mgate: 5999,
            cherry: 7099,
            cgate: 7199,
            pale: 8099,
            pgate: 8599,
            bamboo: 4599,
            bamgate: 4699
        }
    },
    id: {
        wooden_planks: {
            oak: "minecraft:oak_planks",
            spruce: "minecraft:spruce_planks",
            birch: "minecraft:birch_planks",
            jungle: "minecraft:jungle_planks",
            acacia: "minecraft:acacia_planks",
            dark: "minecraft:dark_planks",
            mangrove: "minecraft:mangrove_planks",
            cherry: "minecraft:cherry_planks",
            pale: "minecraft:pale_planks",
            bamboo: "minecraft:bamboo_planks",
            bmosaic: "minecraft:bamboo_mosaic"
        },
        logs: {
            oak: "minecraft:oak_log",
            spruce: "minecraft:spruce_log",
            birch: "minecraft:birch_log",
            jungle: "minecraft:jungle_log",
            acacia: "minecraft:acacia_log",
            dark: "minecraft:dark_oak_log",
            mangrove: "minecraft:mangrove_log",
            cherry: "minecraft:cherry_log",
            pale: "minecraft:pale_oak_log",
            woak: "minecraft:oak_wood",
            wspruce: "minecraft:spruce_wood",
            wbirch: "minecraft:birch_wood",
            wjungle: "minecraft:jungle_wood",
            wacacia: "minecraft:acacia_wood",
            wdark: "minecraft:dark_oak_wood",
            wmangrove: "minecraft:mangrove_wood",
            wcherry: "minecraft:cherry_wood",
            wpale: "minecraft:pale_oak_wood"

        },


        wooden_slabs: {
            oak: "minecraft:oak_slab",
            spruce: "minecraft:spruce_slab",
            birch: "minecraft:birch_slab",
            jungle: "minecraft:jungle_slab",
            acacia: "minecraft:acacia_slab",
            dark: "minecraft:dark_oak_slab",
            mangrove: "minecraft:mangrove_slab",
            cherry: "minecraft:cherry_slab",
            pale: "minecraft:pale_oak_slab",
            bamboo: "minecraft:bamboo_slab",
            bmosaic: "minecraft:bamboo_mosaic_slab"
        },

        wooden_stairs: {
            oak: "minecraft:oak_stairs",
            spruce: "minecraft:spruce_stairs",
            birch: "minecraft:birch_stairs",
            jungle: "minecraft:jungle_stairs",
            acacia: "minecraft:acacia_stairs",
            dark: "minecraft:dark_oak_stairs",
            mangrove: "minecraft:mangove_stairs",
            cherry: "minecraft:cherry_stairs",
            pale: "minecraft:pale_oak_stairs",
            bamboo: "minecraft:bamboo_stairs",
            bmosaic: "minecraft:bamboo_mosaic_stairs"
        },


        wooden_fences: {
            oak: "minecraft:oak_fence",
            ogate: "minecraft:fence_gate",
            spruce: "minecraft:spruce_fence",
            sgate: "minecraft:spruce_fence_gate",
            birch: "minecraft:birch_fence",
            bgate: "minecraft:birch_fence_gate",
            jungle: "minecraft:jungle_fence",
            jgate: "minecraft:jungle_fence_gate",
            acacia: "minecraft:acacia_fence",
            agate: "minecraft:acacia_fence_gate",
            dark: "minecraft:dark_oak_fence",
            dgate: "minecraft:dark_oak_fence_gate",
            mangrove: "minecraft:mangrove_fence",
            mgate: "minecraft:mangrove_fence_gate",
            cherry: "minecraft:cherry_fence",
            cgate: "minecraft:cherry_fence_gate",
            pale: "minecraft:pale_oak_fence",
            pgate: "minecraft:pale_oak_fence_gate",
            bamboo: "minecraft:bamboo_fence",
            bamgate: "minecraft:bamboo_fence_gate"
        }
    }
}

// CComp of the lumberjack coin box.
system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:lumberjack', {
        onPlayerInteract(e) {
            const player = e.player

            // Open Main Lumberjack Menu
            ljaxMenu(player)
        }
    })
})

// Main LumberJack Menu
async function ljaxMenu(player) {
    const r = await new ActionFormData()
        .title(`§lLUMBERJACK | MENU`)
        .body(`< Gregory > Howdy! My worker just came back with fresh wood for sale! Want some?`)
        .divider()
        .label(`§a[ i ]§r This store contains categories to avoid a long dropdown list.

§a[ i ]§r Choose your category by clicking the correct button`)
        .divider()
        .button(`§l§a[ C ]§r LOGS/WOOD`)    // Case 0
        .button(`§l§a[ C ]§r PLANKS`)       // Case 1
        .button(`§l§a[ C ]§r SLABS`)        // Case 2
        .button(`§l§a[ C ]§r STAIRS`)       // Case 3
        .button(`§l§a[ C ]§r FENCES/GATES`) // Case 4
        .button(`§lCLOSE`)                  // Case 5
        .show(player)                       // Show UI for defined entity ( PLAYER ) = const player = e.player

    // If player didn't chose it doesn't proceed further. Provides protection against throwing error in console.
    if (r.canceled || r.selection == 5) return;

    // Action when choosing Logs/Wood
    if (r.selection == 0) {
        await lumberjackMarket_logs(player)
    }
    // Action when choosing Planks
    if (r.selection == 1) {
        await lumberjackMarket_planks(player)
    }
    // Action when choosing Slabs
    if (r.selection == 2) {
        await lumberjackMarket_slabs(player)
    }
    // Action when choosing Stairs
    if (r.selection == 3) {
        await lumberjackMarket_stairs(player)
    }
    // Action when choosing Fences/Gates
    if (r.selection == 4) {
        lumberjackMarket_fence(player)
    }
}

// Menu for Logs
async function lumberjackMarket_logs(player) {
    // Translates option to object id from woodPrices.items
    const translatedOptions = {
        "Oak Logs": "oak",
        "Spruce Logs": "spruce",
        "Birch Logs": "birch",
        "Jungle Logs": "jungle",
        "Acacia Logs": "acacia",
        "Dark Oak Logs": "dark",
        "Mangrove Logs": "mangrove",
        "Cherry Logs": "cherry",
        "Pale Oak Logs": "pale",
        "Oak Wood": "woak",
        "Spruce Wood": "wspruce",
        "Birch Wood": "wbirch",
        "Jungle Wood": "wjungle",
        "Acacia Wood": "wacacia",
        "Dark Oak Wood": "wdark",
        "Mangrove Wood": "wmangrove",
        "Cherry Wood": "wcherry",
        "Pale Oak Wood": "wpale",

    };

    // Options for dropdown menu. Format Currency formats the price setted up in woodPrice.items.logs.[item]
    let options = [
        `Oak Logs ${formatCurrency(getTotalPrice(woodPrices, "logs", "oak"))}`,
        `Spruce Logs ${formatCurrency(getTotalPrice(woodPrices, "logs", "spruce"))}`,
        `Birch Logs ${formatCurrency(getTotalPrice(woodPrices, "logs", "birch"))}`,
        `Jungle Logs ${formatCurrency(getTotalPrice(woodPrices, "logs", "jungle"))}`,
        `Acacia Logs ${formatCurrency(getTotalPrice(woodPrices, "logs", "acacia"))}`,
        `Dark Oak Logs ${formatCurrency(getTotalPrice(woodPrices, "logs", "dark"))}`,
        `Mangrove Logs ${formatCurrency(getTotalPrice(woodPrices, "logs", "mangrove"))}`,
        `Cherry Logs ${formatCurrency(getTotalPrice(woodPrices, "logs", "cherry"))}`,
        `Pale Oak Logs ${formatCurrency(getTotalPrice(woodPrices, "logs", "pale"))}`,
        `Oak Wood ${formatCurrency(getTotalPrice(woodPrices, "logs", "woak"))}`,
        `Spruce Wood ${formatCurrency(getTotalPrice(woodPrices, "logs", "wspruce"))}`,
        `Birch Wood ${formatCurrency(getTotalPrice(woodPrices, "logs", "wbirch"))}`,
        `Jungle Wood ${formatCurrency(getTotalPrice(woodPrices, "logs", "wjungle"))}`,
        `Acacia Wood ${formatCurrency(getTotalPrice(woodPrices, "logs", "wacacia"))}`,
        `Dark Oak Wood ${formatCurrency(getTotalPrice(woodPrices, "logs", "wdark"))}`,
        `Mangrove Wood ${formatCurrency(getTotalPrice(woodPrices, "logs", "wmangrove"))}`,
        `Cherry Wood ${formatCurrency(getTotalPrice(woodPrices, "logs", "wcherry"))}`,
        `Pale Oak Wood ${formatCurrency(getTotalPrice(woodPrices, "logs", "wpale"))}`

    ];

    // Ui opens when the operation is finished.
    const r = await new ModalFormData()
        .title(`Lumberjack || Wood`)
        .header(`Lumberjack || Wood`)
        .label(`< Gregory > Freshest logs from the town! Pick one ;D.`)
        .divider()
        .label(`§a[ i ]§r Prices works within core logic:

- Price: Normal fixed price hardcoded in foodPrice.items.[item]
- Modifier: Modifier makes price higher or lower, based on the amount of it.
Current modifier: ${woodPrices.modifier}%%

- Total Price: Price + Modifier
- Total Final Price: ( Price + Modifer ) * amount

§a[ i ]§r Select an item from the dropdown menu.

§a[ i ]§rYou need to withdraw your money to buy it. You can do it by /with [amount] / /withall or by selecting withdraw option in /qa`)
        .dropdown(`Items | Total Price`, options)
        .show(player)

    // Protection against throwing error when not selecting any options.
    if (r.canceled) return;

    const selectedIndex = r.formValues[4]
    const selectedLabel = options[selectedIndex];

    const baseName = selectedLabel.split(" ")[0] + " " + selectedLabel.split(" ")[1]
    const woodType = translatedOptions[baseName]

    await player.sendMessage(`${selectedLabel} -> ${woodType}`)
    await buyMenu(baseName, woodPrices, "logs", woodType, player)

}


// Planks
export async function lumberjackMarket_planks(player) {

    const translatedOptions = {
        "Oak Planks": "oak",
        "Spruce Planks": "spruce",
        "Birch Planks": "birch",
        "Jungle Planks": "jungle",
        "Acacia Planks": "acacia",
        "Dark Oak Planks": "dark",
        "Mangrove Planks": "mangrove",
        "Cherry Planks": "cherry",
        "Pale Oak Planks": "pale",
        "Bamboo Planks": "bamboo",
        "Bamboo Mosaic": "bmosaic"
    }

    let options = [
        `Oak Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "oak"))}`,
        `Spruce Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "spruce"))}`,
        `Birch Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "birch"))}`,
        `Jungle Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "jungle"))}`,
        `Acacia Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "acacia"))}`,
        `Dark Oak Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "dark"))}`,
        `Mangrove Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "mangrove"))}`,
        `Cherry Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "cherry"))}`,
        `Pale Oak Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "pale"))}`,
        `Bamboo Planks ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "bamboo"))}`,
        `Bamboo Mosaic ${formatCurrency(getTotalPrice(woodPrices, "wooden_planks", "bmosaic"))}`
    ]

    const r = await new ModalFormData()
        .title(`Lumberjack || Planks`)
        .header(`Lumberjack || Planks`)
        .label(`< Gregory > Great planks made by profesionals! They're great for roofs, floors and walls! Psst, a small tip from me. While making a roof, make sure to decorate it with placing downwards stairs below upwards stairs, it'll make your roof smoother. ;)`)
        .divider()
        .label(`§a[ i ]§r Prices works within core logic:

- Price: Normal fixed price hardcoded in foodPrice.items.[item]
- Modifier: Modifier makes price higher or lower, based on the amount of it.
Current modifier: ${woodPrices.modifier}%%

- Total Price: Price + Modifier
- Total Final Price: ( Price + Modifer ) * amount

§a[ i ]§r Select an item from the dropdown menu.

§a[ i ]§rYou need to withdraw your money to buy it. You can do it by /with [amount] / /withall or by selecting withdraw option in /qa`)
        .dropdown(`Items | Total Price`, options)
        .show(player)


    if (r.canceled) return;

    const selectedIndex = r.formValues[4]
    const selectedLabel = options[selectedIndex];

    const baseName = selectedLabel.split(" ")[0] + " " + selectedLabel.split(" ")[1]
    const woodType = translatedOptions[baseName]

    await player.sendMessage(`${selectedLabel} -> ${woodType}`)
    await buyMenu(baseName, woodPrices, "wooden_planks", woodType, player)

}

// Slabs
export async function lumberjackMarket_slabs(player) {

    const translatedOptions = {
        "Oak Slabs": "oak",
        "Spruce Slabs": "spruce",
        "Birch Slabs": "birch",
        "Jungle Slabs": "jungle",
        "Acacia Slabs": "acacia",
        "Dark Oak Slabs": "dark",
        "Mangrove Slabs": "mangrove",
        "Cherry Slabs": "cherry",
        "Pale Oak Slabs": "pale",
        "Bamboo Slabs": "bamboo",
        "Bamboo Mosaic": "bmosaic"
    }

    let options = [
        `Oak Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "oak"))}`,
        `Spruce Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "spruce"))}`,
        `Birch Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "birch"))}`,
        `Jungle Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "jungle"))}`,
        `Acacia Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "acacia"))}`,
        `Dark Oak Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "dark"))}`,
        `Mangrove Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "mangrove"))}`,
        `Cherry Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "cherry"))}`,
        `Pale Oak Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "pale"))}`,
        `Bamboo Slabs ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "bamboo"))}`,
        `Bamboo Mosaic ${formatCurrency(getTotalPrice(woodPrices, "wooden_slabs", "bmosaic"))}`
    ]

    const r = await new ModalFormData()
        .title(`Lumberjack || Slabs`)
        .header(`Lumberjack || Slabs`)
        .label(`< Gregory > Slabs? You know what's good brother! I have the best ones! HAH!`)
        .divider()
        .label(`§a[ i ]§r Prices works within core logic:

- Price: Normal fixed price hardcoded in foodPrice.items.[item]
- Modifier: Modifier makes price higher or lower, based on the amount of it.
Current modifier: ${woodPrices.modifier}%%

- Total Price: Price + Modifier
- Total Final Price: ( Price + Modifer ) * amount

§a[ i ]§r Select an item from the dropdown menu.

§a[ i ]§rYou need to withdraw your money to buy it. You can do it by /with [amount] / /withall or by selecting withdraw option in /qa`)
        .dropdown(`Items | Total Price`, options)
        .show(player)


    if (r.canceled) return;

    const selectedIndex = r.formValues[4]
    const selectedLabel = options[selectedIndex];

    const baseName = selectedLabel.split(" ")[0] + " " + selectedLabel.split(" ")[1]
    const woodType = translatedOptions[baseName]

    await player.sendMessage(`${selectedLabel} -> ${woodType}`)
    await buyMenu(baseName, woodPrices, "wooden_slabs", woodType, player)

}

// Stairs
export async function lumberjackMarket_stairs(player) {

    const translatedOptions = {
        "Oak Stairs": "oak",
        "Spruce Stairs": "spruce",
        "Birch Stairs": "birch",
        "Jungle Stairs": "jungle",
        "Acacia Stairs": "acacia",
        "Dark Oak Stairs": "dark",
        "Mangrove Stairs": "mangrove",
        "Cherry Stairs": "cherry",
        "Pale Oak Stairs": "pale",
        "Bamboo Stairs": "bamboo",
        "Bamboo Mosaic Stairs": "bmosaic"
    }

    let options = [
        `Oak Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "oak"))}`,
        `Spruce Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "spruce"))}`,
        `Birch Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "birch"))}`,
        `Jungle Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "jungle"))}`,
        `Acacia Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "acacia"))}`,
        `Dark Oak Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "dark"))}`,
        `Mangrove Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "mangrove"))}`,
        `Cherry Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "cherry"))}`,
        `Pale Oak Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "pale"))}`,
        `Bamboo Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "bamboo"))}`,
        `Bamboo Mosaic Stairs ${formatCurrency(getTotalPrice(woodPrices, "wooden_stairs", "bmosaic"))}`
    ]

    const r = await new ModalFormData()
        .title(`Lumberjack || Stairs`)
        .header(`Lumberjack || Stairs`)
        .label(`< Gregory > Stairs? Good choice! Especially for wooden roofs!`)
        .divider()
        .label(`§a[ i ]§r Prices works within core logic:

- Price: Normal fixed price hardcoded in foodPrice.items.[item]
- Modifier: Modifier makes price higher or lower, based on the amount of it.
Current modifier: ${woodPrices.modifier}%%

- Total Price: Price + Modifier
- Total Final Price: ( Price + Modifer ) * amount

§a[ i ]§r Select an item from the dropdown menu.

§a[ i ]§rYou need to withdraw your money to buy it. You can do it by /with [amount] / /withall or by selecting withdraw option in /qa`)
        .dropdown(`Items | Total Price`, options)
        .show(player)


    if (r.canceled) return;

    const selectedIndex = r.formValues[4]
    const selectedLabel = options[selectedIndex];

    const baseName = selectedLabel.split(" ")[0] + " " + selectedLabel.split(" ")[1]
    const woodType = translatedOptions[baseName]

    await player.sendMessage(`${selectedLabel} -> ${woodType}`)
    await buyMenu(baseName, woodPrices, "wooden_stairs", woodType, player)

}

// Fences/Gates
export async function lumberjackMarket_fence(player) {

    const translatedOptions = {
        "Oak Fence": "oak",
        "Oak Gate": "ogate",
        "Spruce Fence": "spruce",
        "Spruce Gate": "sgate",
        "Birch Fence": "birch",
        "Birch Gate": "bgate",
        "Jungle Fence": "jungle",
        "Jungle Gate": "jgate",
        "Acacia Fence": "acacia",
        "Acacia Gate": "agate",
        "Dark Oak Fence": "dark",
        "Dark Oak Gate": "dgate",
        "Mangrove Fence": "mangrove",
        "Mangrove Gate": "mgate",
        "Cherry Fence": "cherry",
        "Cherry Gate": "cgate",
        "Pale Oak Fence": "pale",
        "Pale Oak Gate": "pgate",
        "Bamboo Fence": "bamboo",
        "Bamboo Gate": "bamgate",
    }

    let options = [
        `Oak Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "oak"))}`,
        `Oak Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "ogate"))}`,
        `Spruce Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "spruce"))}`,
        `Spruce Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "sgate"))}`,
        `Birch Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "birch"))}`,
        `Birch Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "bgate"))}`,
        `Jungle Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "jungle"))}`,
        `Jungle Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "jgate"))}`,
        `Acacia Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "acacia"))}`,
        `Acacia Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "agate"))}`,
        `Dark Oak Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "dark"))}`,
        `Dark Oak Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "dgate"))}`,
        `Mangrove Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "mangrove"))}`,
        `Mangrove Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "mgate"))}`,
        `Cherry Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "cherry"))}`,
        `Cherry Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "cgate"))}`,
        `Pale Oak Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "pale"))}`,
        `Pale Oak Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "pgate"))}`,
        `Bamboo Fence ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "bamboo"))}`,
        `Bamboo Gate ${formatCurrency(getTotalPrice(woodPrices, "wooden_fences", "bamgate"))}`,
    ]

    const r = await new ModalFormData()
        .title(`Lumberjack || Fences / Gates`)
        .header(`Lumberjack || Fences / Gates`)
        .label(`< Gregory > Best way to keep pesky mobs away from your base!`)
        .divider()
        .label(`§a[ i ]§r Prices works within core logic:

- Price: Normal fixed price hardcoded in foodPrice.items.[item]
- Modifier: Modifier makes price higher or lower, based on the amount of it.
Current modifier: ${woodPrices.modifier}%%

- Total Price: Price + Modifier
- Total Final Price: ( Price + Modifer ) * amount

§a[ i ]§r Select an item from the dropdown menu.

§a[ i ]§rYou need to withdraw your money to buy it. You can do it by /with [amount] / /withall or by selecting withdraw option in /qa`)
        .dropdown(`Items | Total Price`, options)
        .show(player)


    if (r.canceled) return;

    const selectedIndex = r.formValues[4]
    const selectedLabel = options[selectedIndex];

    const baseName = selectedLabel.split(" ")[0] + " " + selectedLabel.split(" ")[1]
    const woodType = translatedOptions[baseName]

    await player.sendMessage(`${selectedLabel} -> ${woodType}`)
    await buyMenu(baseName, woodPrices, "wooden_fences", woodType, player)

}