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

// Register StoneMason Prices

export const hardBlocksPrices = {
    modifier: 0,
    items: {
        earth: {
            dirt: 1199,
            coarse_dirt: 1599,
            rooted_dirt: 1399,
            mud: 199,
            clay: 1599,
            gravel: 1499,
            sand: 1099,
            red_sand: 1599
        },
        stones: {
            cobblestone: 1599,
            mossy_cobblestone: 11599,
            stone: 11699,
            granite: 11499,
            diorite: 11299,
            andesite: 11567,
            cobbled_deepslate: 11899,
            deepslate: 12099,
            tuff: 12599,
            blackstone: 139999,
            basalt: 110599,
            netherrack: 156799,
            soul_sand: 123499,
            magma_block: 132499
        },
        decoratives: {
            stone_bricks: 21650,
            mossy_stone_bricks: 21750,
            cracked_stone_bricks: 15099,
            chiselled_stone_bricks: 22099,
            smooth_stone: 13099,
            end_stone_bricks: 395899,
            polished_blackstone_bricks: 259950,
            cracked_blackstone_bricks: 220099,
            gilded_blackstone: 299950,
            chiselled_polished_blackstone: 298000,
            deepslate_tiles: 12599,
            cracked_deepslate_tiles: 11099,
            deepslate_bricks: 12999,
            tuff_bricks: 13099,
            cracked_deepslate_bricks: 10599,
            chiselled_deepslate: 13299,
            chiselled_tuff: 13499,
            chiselled_tuff_bricks: 13599
        }
    },
    id: {
        earth: {
            dirt: "minecraft:dirt",
            coarse_dirt: "minecraft:coarse_dirt",
            rooted_dirt: "minecraft:rooted_dirt",
            mud: "minecraft:mud",
            clay: "minecraft:clay",
            gravel: "minecraft:gravel",
            sand: "minecraft:sand",
            red_sand: "minecraft:red_sand"
        },
        stones: {
            cobblestone: "minecraft:cobblestone",
            mossy_cobblestone: "minecraft:mossy_cobblestone",
            stone: "minecraft:stone",
            granite: "minecraft:granite",
            diorite: "minecraft:diorite",
            andesite: "minecraft:andesite",
            cobbled_deepslate: "minecraft:cobbled_deepslate",
            deepslate: "minecraft:deepslate",
            tuff: "minecraft:tuff",
            blackstone: "minecraft:blackstone",
            basalt: "minecraft:basalt",
            netherrack: "minecraft:netherrack",
            soul_sand: "minecraft:soul_sand",
            magma_block: "minecraft:"
        },
        decoratives: {
            stone_bricks: "minecraft:stone_bricks",
            mossy_stone_bricks: "minecraft:mossy_stone_bricks",
            cracked_stone_bricks: "minecraft:cracked_stone_bricks",
            chiselled_stone_bricks: "minecraft:chiselled_stone_bricks",
            smooth_stone: "minecraft:smooth_stone",
            end_stone_bricks: "minecraft:end_stone_bricks",
            polished_blackstone_bricks: "minecraft:polished_blackstone_bricks",
            cracked_blackstone_bricks: "minecraft:cracked_blackstone_bricks",
            gilded_blackstone: "minecraft:gilded_blackstone",
            chiselled_polished_blackstone: "minecraft:chiselled_polished_blackstone",
            deepslate_tiles: "minecraft:deepslate_tiles",
            cracked_deepslate_tiles: "minecraft:cracked_deepslate_tiles",
            deepslate_bricks: "minecraft:deepslate_bricks",
            tuff_bricks: "minecraft:tuff_bricks",
            cracked_deepslate_bricks: "minecraft:cracked_deepslate_bricks",
            chiselled_deepslate: "minecraft:chiselled_deepslate",
            chiselled_tuff: "minecraft:chiselled_tuff",
            chiselled_tuff_bricks: "minecraft:chiselled_tuff_bricks"
        }

    }
}

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:ew', {
        onPlayerInteract(e) {
            const player = e.player;
            earthwrightMenu(player)
        }
    })
})

// Main Earthwright Menu
async function earthwrightMenu(player) {
    const r = await new ActionFormData()
        .title(`§lEARTHWRIGHT | MENU`)
        .body(`< Trevor > Welcome! We have many building blocks! From common to luxurious! Take a peek.`)
        .divider()
        .label(`§a[ i ]§r This store contains categories to avoid a long dropdown list.

§a[ i ]§r Choose your category by clicking the correct button`)
        .divider()
        .button(`§l§a[ C ]§r EARTH BLOCKS`)     // Case 0
        .button(`§l§a[ C ]§r STONE BLOCKS`)     // Case 1
        .button(`§l§a[ C ]§r DECORATIVE BLOCKS`)// Case 2
        .button(`§lCLOSE`)                      // Case 3
        .show(player)                           // Show UI for defined entity ( PLAYER ) = const player = e.player

    // If player didn't chose it doesn't proceed further. Provides protection against throwing error in console.
    if (r.canceled || r.selection == 3) return;

    // Action when choosing Logs/Wood
    if (r.selection == 0) {
        await earthwright_earth(player)
    }
    // Action when choosing Planks
    if (r.selection == 1) {
        await earthwright_stones(player)
    }
    // Action when choosing Slabs
    if (r.selection == 2) {
        await earthwright_decoratives(player)
    }
}
// Menu for Earth Blocks
async function earthwright_earth(player) {
    // Translates option to object id from woodPrices.items
    const translatedOptions = {
        "Dirt -": "dirt",
        'Coarse Dirt': "coarse_dirt",
        "Rooted Dirt": "rooted_dirt",
        "Mud -": "mud",
        "Clay -": "clay",
        "Gravel -": "gravel",
        "Sand -": "sand",
        "Red Sand": "red_sand"
    };

    // Options for dropdown menu. Format Currency formats the price setted up in woodPrice.items.logs.[item]
    let options = [
        `Dirt - ${formatCurrency(getTotalPrice(hardBlocksPrices, "earth", "dirt"))}`,
        `Coarse Dirt ${formatCurrency(getTotalPrice(hardBlocksPrices, "earth", "coarse_dirt"))}`,
        `Rooted Dirt ${formatCurrency(getTotalPrice(hardBlocksPrices, "earth", "rooted_dirt"))}`,
        `Mud - ${formatCurrency(getTotalPrice(hardBlocksPrices, "earth", "mud"))}`,
        `Clay - ${formatCurrency(getTotalPrice(hardBlocksPrices, "earth", "clay"))}`,
        `Gravel - ${formatCurrency(getTotalPrice(hardBlocksPrices, "earth", "gravel"))}`,
        `Sand - ${formatCurrency(getTotalPrice(hardBlocksPrices, "earth", "sand"))}`,
        `Red Sand ${formatCurrency(getTotalPrice(hardBlocksPrices, "earth", "red_sand"))}`

    ];

    // Ui opens when the operation is finished.
    const r = await new ModalFormData()
        .title(`Earthwright || Soft Blocks`)
        .header(`Earthwright || Soft Blocks`)
        .label(`< Trevor > Great for terraforming!.`)
        .divider()
        .label(`§a[ i ]§r Prices works within core logic:

- Price: Normal fixed price hardcoded in foodPrice.items.[item]
- Modifier: Modifier makes price higher or lower, based on the amount of it.
Current modifier: ${hardBlocksPrices.modifier}%%

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
    const blockType = translatedOptions[baseName]

    await player.sendMessage(`${selectedLabel} -> ${blockType}`)
    await buyMenu(baseName, hardBlocksPrices, "earth", blockType, player)

}
// Menu for Stones
async function earthwright_stones(player) {
    // Translates option to object id from woodPrices.items
    const translatedOptions = {
        "Cobblestone -": "cobblestone",
        "Mossy Cobblestone": "mossy_cobblestone",
        "Stone -": "stone",
        "Granite -": "granite",
        "Diorite -": "diorite",
        "Andesite -": "andesite",
        "Cobbled Deepslate": "cobbled_deepslate",
        "Deepslate -": "deepslate",
        "Tuff -": "tuff",
        "Blackstone -": "blackstone",
        "Basalt -": "basalt",
        "Netherrack -": "netherrack",
        "Soul Sand": "soul_sand",
        "Magma Block": "magma_block"

    };

    // Options for dropdown menu. Format Currency formats the price setted up in woodPrice.items.logs.[item]
    let options = [
        "Cobblestone - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "cobblestone")) + "\$",
        "Mossy Cobblestone " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "mossy_cobblestone")) + "\$",
        "Stone - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "stone")) + "\$",
        "Granite - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "granite")) + "\$",
        "Diorite - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "diorite")) + "\$",
        "Andesite - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "andesite")) + "\$",
        "Cobbled Deepslate " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "cobbled_deepslate")) + "\$",
        "Deepslate - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "deepslate")) + "\$",
        "Tuff - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "tuff")) + "\$",
        "Blackstone - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "blackstone")) + "\$",
        "Basalt - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "basalt")) + "\$",
        "Netherrack - " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "netherrack")) + "\$",
        "Soul Sand " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "soul_sand")) + "\$",
        "Magma Block " + formatCurrency(getTotalPrice(hardBlocksPrices, "stones", "magma_block")) + "\$"
    ];

    // Ui opens when the operation is finished.
    const r = await new ModalFormData()
        .title(`Earthwright || Hard Blocks`)
        .header(`Earthwright || Hard Blocks`)
        .label(`< Trevor > Great for Building!.`)
        .divider()
        .label(`§a[ i ]§r Prices works within core logic:

- Price: Normal fixed price hardcoded in foodPrice.items.[item]
- Modifier: Modifier makes price higher or lower, based on the amount of it.
Current modifier: ${hardBlocksPrices.modifier}%%

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
    const blockType = translatedOptions[baseName]

    await player.sendMessage(`${selectedLabel} -> ${blockType}`)
    await buyMenu(baseName, hardBlocksPrices, "stones", blockType, player)

}

// Menu for Decoratives
async function earthwright_decoratives(player) {
    // Translates option to object id from woodPrices.items
    const translatedOptions = {
        "Stone Bricks": "stone_bricks",
        "Mossy Stone Bricks": "mossy_stone_bricks",
        "Cracked Stone Bricks": "cracked_stone_bricks",
        "Chiselled Stone Bricks": "chiselled_stone_bricks",
        "Smooth Stone": "smooth_stone",
        "End Stone Bricks": "end_stone_bricks",
        "Polished Blackstone Bricks": "polished_blackstone_bricks",
        "Cracked Blackstone Bricks": "cracked_blackstone_bricks",
        "Gilded Blackstone": "gilded_blackstone",
        "Chiselled Polished Blackstone": "chiselled_polished_blackstone",
        "Deepslate Tiles": "deepslate_tiles",
        "Cracked Deepslate Tiles": "cracked_deepslate_tiles",
        "Deepslate Bricks": "deepslate_bricks",
        "Tuff Bricks": "tuff_bricks",
        "Cracked Deepslate Bricks": "cracked_deepslate_bricks",
        "Chiselled Deepslate": "chiselled_deepslate",
        "Chiselled Tuff": "chiselled_tuff",
        "Chiselled Tuff Bricks": "chiselled_tuff_bricks",
    };

    // Options for dropdown menu. Format Currency formats the price setted up in woodPrice.items.logs.[item]
    let options = [
        "Stone Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "stone_bricks")) + "\$",
        "Mossy Stone Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "mossy_stone_bricks")) + "\$",
        "Cracked Stone Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "cracked_stone_bricks")) + "\$",
        "Chiselled Stone Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "chiselled_stone_bricks")) + "\$",
        "Smooth Stone " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "smooth_stone")) + "\$",
        "End Stone Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "end_stone_bricks")) + "\$",
        "Polished Blackstone Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "polished_blackstone_bricks")) + "\$",
        "Cracked Blackstone Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "cracked_blackstone_bricks")) + "\$",
        "Gilded Blackstone " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "gilded_blackstone")) + "\$",
        "Chiselled Polished Blackstone " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "chiselled_polished_blackstone")) + "\$",
        "Deepslate Tiles " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "deepslate_tiles")) + "\$",
        "Cracked Deepslate Tiles " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "cracked_deepslate_tiles")) + "\$",
        "Deepslate Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "deepslate_bricks")) + "\$",
        "Tuff Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "tuff_bricks")) + "\$",
        "Cracked Deepslate Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "cracked_deepslate_bricks")) + "\$",
        "Chiselled Deepslate " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "chiselled_deepslate")) + "\$",
        "Chiselled Tuff " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "chiselled_tuff")) + "\$",
        "Chiselled Tuff Bricks " + formatCurrency(getTotalPrice(hardBlocksPrices, "decoratives", "chiselled_tuff_bricks")) + "\$",
    ];

    // Ui opens when the operation is finished.
    const r = await new ModalFormData()
        .title(`Earthwright || Decorative Blocks`)
        .header(`Earthwright || Decorative Blocks`)
        .label(`< Trevor > Great for Building and Decorations!.`)
        .divider()
        .label(`§a[ i ]§r Prices works within core logic:

- Price: Normal fixed price hardcoded in foodPrice.items.[item]
- Modifier: Modifier makes price higher or lower, based on the amount of it.
Current modifier: ${hardBlocksPrices.modifier}%%

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
    const blockType = translatedOptions[baseName]

    await player.sendMessage(`${selectedLabel} -> ${blockType}`)
    await buyMenu(baseName, hardBlocksPrices, "decoratives", blockType, player)

}

