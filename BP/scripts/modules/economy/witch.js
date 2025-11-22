console.warn("§d[HIRAETH]§r Loading scripts/modules/economy/tavern.js");


import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { formatCurrency, waitTicks, typeActionbar, textFormats } from "../../formats.js";
import { witchTalks, quest_proposition_1, dialogue_quest1 } from "../../system/quests/chapters/prologue/potionless_witch.js"
import {

    buyMenu,
    getTotalPrice

} from "./core.js"


export const witchPrices = {
    modifier: 0,
    items: {
        potions: {
            nightVision: 1500099,
            invisibility: 2060099,
            leaping: 1600599,
            fireResistance: 2599099,
            swiftness: 1990099,
            slowness: 1099099,
            healing: 2699099,
            harming: 1499099,
            poison: 1922099,
            regerenation: 2099999,
            strength: 3599099,
            weakness: 1599099,
        },
        spells: {
        },
        mobLoots: {},
        special: {}
    },
    id: {
        potions: {
            nightVision: "hsmp:nightvision_witch_potion",
            invisibility: "hsmp:invisibity_witch_potion",
            leaping: "hsmp:leaping_witch_potion",
            fireResistance: "hsmp:fire_resistance_witch_potion",
            swiftness: "hsmp:swiftness_witch_potion",
            slowness: "hsmp:slowness_witch_potion",
            healing: "hsmp:healing_witch_potion",
            harming: "hsmp:harming_witch_potion",
            poison: "hsmp:poison_witch_potion",
            regerenation: "hsmp:regen_witch_potion",
            strength: "hsmp:strength_witch_potion",
            weakness: "hsmp:weakness_witch_potion"
        }
    }
}

world.afterEvents.playerInteractWithEntity.subscribe(e => {
    const player = e.player;
    const witch = 'hsmp:hsmp_witch';
    const target = e.target;
    const time = world.getTimeOfDay();
    const openingTime = 17000
    const closingTime = 22000

    if (e.target.typeId == witch) {
        system.run(() => {
            (async () => {

                if (!player.hasTag(`hsmp_whitch_quest_accepted`) && !player.hasTag(`hsmp_witch_quests_lock`) && !player.hasTag(`witch_unlocked`) && !player.hasTag(`quest_witch_later`)) {
                    await witchTalks(player);
                } else if (player.hasTag(`quest_witch_later`) && !player.hasTag(`witch_unlocked`)) {
                    await typeActionbar(player, `Evangeline`, `Came back to do my quest?`)
                    await waitTicks(50)
                    quest_proposition_1(player);
                } else if (player.hasTag(`hsmp_whitch_quest_accepted`)) {
                    await typeActionbar(player, `Evangeline`, `Need something else?`)
                    await waitTicks(60)
                    dialogue_quest1(player)
                } else if (player.hasTag(`witch_unlocked`)) {

                    if (time >= openingTime && time <= closingTime) {
                        if (player.hasTag(`reward_not_collected`)) {
                            player.sendMessage(`Reward Not Collected`)
                        } else if (!player.hasTag(`reward_not_collected`)) {
                            await typeActionbar(player, `Evangeline`, `Oh hi again!`)
                            await waitTicks(40)
                            await typeActionbar(player, player.name, `I came here to see your goods.`)
                            await witch_main(player)
                            await typeActionbar(player, `Evangeline`, `Come back again!`)
                        }
                    } else {
                        await typeActionbar(player, `Evangeline`, `Hi there!`)
                        await waitTicks(40)
                        await typeActionbar(player, `Evangeline`, `I hope you know that i brew and sell stuff only at night.. Right?`)
                        await waitTicks(40)
                        await typeActionbar(player, player.name, `Yeah, i just came here to talk.`)
                    }
                }

                if (player.hasTag(`hsmp_witch_quests_lock`)) {
                    const heldItem = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
                    const stackSize = heldItem ? heldItem.amount : 0;


                    if (heldItem && heldItem.typeId !== "minecraft:torchflower") {
                        await typeActionbar(player, `Evangeline`, `Go away.`)
                    } else if (heldItem && heldItem.typeId === "minecraft:torchflower") {
                        await typeActionbar(player, `Evangeline`, `Wait... THOSE ARE MY FAVOURITES!`)
                        await waitTicks(20)
                        await typeActionbar(player, `Evangeline`, `How did you know?`)
                        await waitTicks(20)
                        await typeActionbar(player, `Evangeline`, `They are SOOO rare!`)
                        await waitTicks(20)
                        await typeActionbar(player, `Evangeline`, `Thank you so much!`)
                        player.runCommand(`clear @s torchflower 0 1`)
                        player.sendMessage(`Witch quests unlocked. Complete the one you declined to fully unlock witch hut.`)
                        player.removeTag(`hsmp_witch_quests_lock`)
                        player.addTag(`quest_witch_later`)

                    } else await typeActionbar(player, `Evangeline`, `Go away.`)
                }

            })();
        })

    }
})

const witchMenuBuild = `v0.1 Stable`

async function witch_main(player) {
    const r = await new ActionFormData()
        .title(`${textFormats.colors.amethyst}${textFormats.deco.bold}EVANGELINE'S POTIONS`)
        .body("Menu Version: " + witchMenuBuild)
        .divider()
        .header(`${textFormats.colors.amethyst}${textFormats.deco.bold}EVANGELINE'S POTIONS`)
        .label('< Evangeline > Hi, what can i brew for you?')
        .divider()
        .button(`${textFormats.deco.bold} POTIONS`)
        .button(`${textFormats.deco.bold} SPELLS`)
        .button(`${textFormats.deco.bold} MOB LOOT`)
        .button(`${textFormats.deco.bold} SPECIAL`)
        .show(player)

    const selection = r.selection;
    if (r.canceled) return;

    if (selection == 0) {
        witchBuyMenu_potions(player);
    }
}

async function witchBuyMenu_potions(player) {

    const translatedOptions = {
        "NightVision Potion": "nightVision",
        "Invisibility Potion": "invisibility",
        "Leaping Potion": "leaping",
        "FireResistance Potion": "fireResistance",
        "Swiftness Potion": "swiftness",
        "Slowness Potion": "slowness",
        "Healing Potion": "healing",
        "Harming Potion": "harming",
        "Poison Potion": "poison",
        "Regerenation Potion": "regerenation",
        "Strength Potion": "strength",
        "Weakness Potion": "weakness"

    }

    let options = [
        "NightVision Potion",
        "Invisibility Potion",
        "Leaping Potion",
        "FireResistance Potion",
        "Swiftness Potion",
        "Slowness Potion",
        "Healing Potion",
        "Harming Potion",
        "Poison Potion",
        "Regerenation Potion",
        "Strength Potion",
        "Weakness Potion"

    ]

    const r = await new ModalFormData()
        .title(`${textFormats.deco.bold}WITCH EVANGELINE`)
        .divider() //0
        .label(`< Evangeline > Potions are like spells, but in bottles.`) //1
        .divider() //2
        .dropdown(`Buy a Potion by choosing an Item from Dropdown Menu.`, options)
        .show(player)
    if (r.canceled) return;

    const selectedIndex = r.formValues[3]
    const selectedLabel = options[selectedIndex]

    const baseName = selectedLabel.split(" ")[0] + " " + selectedLabel.split(" ")[1]
    const potion = translatedOptions[baseName]

    await player.sendMessage(`${selectedLabel} -> ${potion}`)
    await buyMenu(baseName, witchPrices, "potions", potion, player)

}