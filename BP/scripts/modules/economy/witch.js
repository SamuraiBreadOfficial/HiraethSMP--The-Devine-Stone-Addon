console.warn("§d[HIRAETH]§r Loading scripts/modules/economy/tavern.js");


import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { formatCurrency, waitTicks, typeActionbar } from "../../formats.js"
import { witchTalks, quest_proposition_1, dialogue_quest1 } from "../../system/quests/chapters/prologue/potionless_witch.js"

world.afterEvents.playerInteractWithEntity.subscribe(e => {
    const player = e.player;
    const witch = 'hsmp:hsmp_witch';
    const target = e.target;

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
                    player.sendMessage(`Witch unlocked, but is not yet functional. Please come back the next update <3`)
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

