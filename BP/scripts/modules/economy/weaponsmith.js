import { world, system, ItemTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { formatCurrency, waitTicks, typeActionbar, typeTitleTitle, typeTitleSubtitle, textFormats } from "../../formats.js"
import { questTags, questRegistry, questUpdatedGoals } from "./../../system/quests/main/core.js"

import { addLogEntry } from "../../logging/coreBehaviour/main.js"

import { ayourself_start, wsmith_final } from "../../system/quests/chapters/prologue/ayourself.js"


world.afterEvents.playerInteractWithEntity.subscribe(e => {
    const entity = e.target;
    const player = e.player;

    if (entity.typeId == "hsmp:weaponsmith") {
        if (!player.hasTag('fquest_ayourself') && !player.hasTag(`isTalking`) && !player.hasTag(`wsmith_medicinelookout`) && !player.hasTag(`wsmith_headache`) && !player.hasTag(`wsmith_fingeringproblem`)) {
            ayourself_start(player)
            player.addTag(`isTalking`)
        }
        if (player.hasTag(`wsmith_fingeringproblem`) && player.hasTag(`quest_ayourself`) && !player.hasTag('isTalking')) {
            const inv = player.getComponent(`inventory`).container;

            for (let i = 0; i < inv.size; i++) {
                const item = inv.getItem(i);
                if (item && item.typeId === "hsmp:healing_witch_potion") {
                    player.sendMessage(`test`)
                    player.addTag(`isTalking`)
                    wsmith_final(player)
                }
            }
        }
    }
})



system.runInterval(async () => {
    for (const player of world.getPlayers()) {

        const inv = player.getComponent("inventory").container;

        for (let i = 0; i < inv.size; i++) {
            const item = inv.getItem(i);
            if (item && item.typeId === "hsmp:healing_witch_potion" && player.hasTag(`wsmith_medicinelookout`) && item.amount >= 2) {
                player.removeTag(`wsmith_medicinelookout`)
                await typeActionbar(player, player.name, `This should be enough...`)
                player.addTag(`wsmith_fingeringproblem`)
                player.sendMessage(`[ §a§lQUEST UPDATED§r ] ${questUpdatedGoals(player)}`)
                await typeTitleTitle(player, questRegistry.questInfo.arm_yourself.name)
                await typeTitleSubtitle(`Updated`)
            }
        }
        if (player.hasTag(`weaponsmithNotInitialized`) && player.hasTag(`quest_ayourself`)) {
            const weaponsmithLoc = { x: 64, y: 67, z: 1921 }

            const logEntry = `[ Quest Progress ] Cutscene triggered by: ${player.name} in ${player.location}. Quest id: "quest_ayourself"`

            const radius = 5;

            const { x, y, z } = player.location;

            const inBox =
                x >= weaponsmithLoc.x - radius && x <= weaponsmithLoc.x + radius &&
                y >= weaponsmithLoc.y - radius && y <= weaponsmithLoc.y + radius &&
                z >= weaponsmithLoc.z - radius && z <= weaponsmithLoc.z + radius;

            const x1 = weaponsmithLoc.x - radius;
            const y1 = weaponsmithLoc.y - radius;
            const z1 = weaponsmithLoc.z - radius;
            const x2 = weaponsmithLoc.x + radius;
            const y2 = weaponsmithLoc.y + radius;
            const z2 = weaponsmithLoc.z + radius;



            if (inBox) {
                try {
                    addLogEntry('questProgress', logEntry)
                } catch (error) { console.warn(`Couldnt add log entry: ${error}`) }
                player.runCommand(`fill ${x1} ${y1} ${z2} ${x2} ${y2} ${z2} hsmp:lock_block replace air`);

                player.runCommand(
                    `fill ${x1} ${y1} ${z1} ${x1} ${y2} ${z2} hsmp:lock_block replace air`
                );
                player.runCommand(
                    `fill ${x2} ${y1} ${z1} ${x2} ${y2} ${z2} hsmp:lock_block replace air`
                );
                player.removeTag(`weaponsmithNotInitialized`)
                const me = player.name;
                const weaponsmith0 = "§a???§r"
                const weaponsmith = "§aOscar§r"

                player.runCommand(`playanimation @e[type=hsmp:weaponsmith] animation.weaponsmith.in_pain wnuidabfiu 9999999`)
                player.runCommand(`playsound random.anvil_land @s ~ ~ ~ 1 0.8 1`)
                await waitTicks(20)
                player.runCommand(`playsound hsmp_cutscene.weaponsmith_ouchie @s`)
                player.runCommand(`camerashake add @a 0.2 2.5`)
                await waitTicks(40)
                await typeActionbar(player, weaponsmith0, `AGHRR!!! FUCK! MY FINGER!`)
                player.runCommand(`playsound hsmp_music.prologue_weaponsmith_ouchie @s`)
                player.addTag(`temmie_loop`)
                await waitTicks(40)
                await typeActionbar(player, me, `...`)
                await waitTicks(20)
                await typeActionbar(player, me, `What the heck?`);
            }

        }
        if (player.hasTag(`wsmith_fingeringproblem`)) {
            const weaponsmithLoc = { x: 68, y: 66, z: 2003, }
            const logEntry = `[ Quest Progress ] Cutscene triggered by: ${player.name} in ${player.location}. Quest id: "quest_ayourself.wsmith_fingeringproblem"`


            const radius = 2

            const { x, y, z } = player.location;

            const inBox =
                x >= weaponsmithLoc.x - radius && x <= weaponsmithLoc.x + radius &&
                y >= weaponsmithLoc.y - radius && y <= weaponsmithLoc.y + radius &&
                z >= weaponsmithLoc.z - radius && z <= weaponsmithLoc.z + radius;

            const x1 = weaponsmithLoc.x - radius;
            const y1 = weaponsmithLoc.y - radius;
            const z1 = weaponsmithLoc.z - radius;
            const x2 = weaponsmithLoc.x + radius;
            const y2 = weaponsmithLoc.y + radius;
            const z2 = weaponsmithLoc.z + radius;



            if (inBox && player.hasTag(`wsmith_home`)) {
                addLogEntry("questProgress", logEntry)
                player.sendMessage(`test`)
                player.removeTag(`wsmith_home`)

                player.runCommand(`fill ${x1} ${y1} ${z1} ${x2} ${y2} ${z1} air replace hsmp:lock_block`);

                player.runCommand(
                    `fill ${x1} ${y1} ${z1} ${x1} ${y2} ${z2} air replace hsmp:lock_block`
                );
                player.runCommand(
                    `fill ${x2} ${y1} ${z1} ${x2} ${y2} ${z2} air replace hsmp:lock_block`
                );
                player.runCommand(`fill 68 66 2006 68 67 2006 black_concrete`)
                player.runCommand(`structure load wardrobe_wsmith 61 67 2009`)

            }

        }
        if (player.hasTag(`wsmith_medicinelookout`)) {
            const weaponsmithLoc = { x: 68, y: 66, z: 2003, }
            const logEntry = `[ Quest Progress ] Cutscene triggered by: ${player.name} in ${player.location}. Quest id: "quest_ayourself.wsmith_medicinelookout"`


            const radius = 2

            const { x, y, z } = player.location;

            const inBox =
                x >= weaponsmithLoc.x - radius && x <= weaponsmithLoc.x + radius &&
                y >= weaponsmithLoc.y - radius && y <= weaponsmithLoc.y + radius &&
                z >= weaponsmithLoc.z - radius && z <= weaponsmithLoc.z + radius;

            const x1 = weaponsmithLoc.x - radius;
            const y1 = weaponsmithLoc.y - radius;
            const z1 = weaponsmithLoc.z - radius;
            const x2 = weaponsmithLoc.x + radius;
            const y2 = weaponsmithLoc.y + radius;
            const z2 = weaponsmithLoc.z + radius;



            if (inBox && !player.hasTag(`wsmith_home`)) {
                addLogEntry("questProgress", logEntry)

                player.sendMessage(`test`)
                player.addTag(`wsmith_home`)

                player.runCommand(`fill ${x1} ${y1} ${z1} ${x2} ${y2} ${z1} hsmp:lock_block replace air`);

                player.runCommand(
                    `fill ${x1} ${y1} ${z1} ${x1} ${y2} ${z2} hsmp:lock_block replace air`
                );
                player.runCommand(
                    `fill ${x2} ${y1} ${z1} ${x2} ${y2} ${z2} hsmp:lock_block replace air`
                );
                player.runCommand(`fill 68 66 2006 68 67 2006 air`)
                player.runCommand(`structure load wardrobe_wsmith 61 67 2009`)

                await typeActionbar(player, player.name, `So this is where he lives...`)
            }

        }

    }

}, 20)


system.runInterval(() => {
    for (const player of world.getPlayers()) {

        if (player.hasTag(`temmie_loop`)) {
            player.runCommand(`stopsound @s hsmp_music.prologue_weaponsmith_ouchie`)
            player.runCommand(`playsound hsmp_music.prologue_weaponsmith_ouchie @s`)

        }

    }
}, 1157)
