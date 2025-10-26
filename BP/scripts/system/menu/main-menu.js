console.warn("§d[HIRAETH]§r Loading scripts/system/menu/main-menu.js");

import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { getRaceTags, getMagicTags } from "../../modules/playerinfo/registered-tags.js";
import { hiraethLOGO } from "../../modules/playerinfo/utils.js";
import { getScore, hasScore, isScoreRegistered } from "../../modules/economy/economy-scoreboards.js"
import { formatCurrency } from "../../formats.js"
import { registeredQuestNames, questTags } from "./../quests/main/core.js"
import { getAchievements } from "./../achievements/core.js"

const mainmenuBuild = `Main Menu v2 || Build v0.1`

export function hsmpMenu_MAIN(player) {
    if (!player.hasTag(`revokedAccess`)) {
        return new ActionFormData()
            .title(hiraethLOGO)
            .body(mainmenuBuild)
            .divider()
            .header(`Main Menu`)
            .label(`Hello ${player.name}!
This is your own Main Menu! YAAAY!`)
            .divider()
            .label(`Your Information:

Race: ${getRaceTags(player)}
Magic Type: ${getMagicTags(player)}
Level: WIP.`)
            .button(`§lECONOMY`)
            .button(`§lQUESTS`)
            .button(`§lACHIEVEMENTS`)
            .button(`§lCREDITS`)
            .button('Close')
            .show(player)
            .then(r => {
                const selection = r.selection

                if (r.canceled) return;

                if (selection == 0) {
                    if (!isScoreRegistered(player, "balance")) {
                        hsmpMenu_BALnotSettedUp(player)

                    } else {
                        hsmpMenu_BAL(player)
                    }
                }
                if (selection == 1) {
                    questMenu(player)
                }
                if (selection == 2) {
                    achievementMenu(player)
                }
                if (selection == 3) {
                    credits(player)
                }
            })
    } else {
        player.sendMessage(`You don't have an Access to this command. Your Access to the server is Revoked!`)
    }
}

export function hsmpMenu_BALnotSettedUp(player) {
    return new ActionFormData()
        .title(hiraethLOGO)
        .body(mainmenuBuild)
        .divider()
        .label('Your economy was not setted up. You need to set it up before using your money :p')
        .button('§lSET UP')
        .button(`§lCANCEL`)
        .show(player)
        .then(r => {
            const selection = r.selection;

            if (r.canceled) hsmpMenu_MAIN(player);

            if (selection == 0) {
                player.sendMessage(`§a§l[SETUP INIT ]§r§a Setting up your Economy Wallet..`)
                if (!world.scoreboard.getObjective('balance')) {
                    system.runTimeout(() => {
                        world.scoreboard.addObjective('balance')
                        player.sendMessage('§a§l[ SETUP 1/4 ]§r§a Creating balance scoreboard')
                        console.warn(` [ SETUP LOG 1/4 ] Balance Score Created.`)
                    }, 20)
                } else {
                    player.sendMessage(`§c[ SETUP 1/4 ] Scoreboard ''balance'' detected, skipping this step.`)
                    console.warn('§c[ SETUP LOG 1/4 ] Skipped setup step nr.: 1, due to: "balance" scoreboard already exists')
                }

                system.runTimeout(() => {
                    world.scoreboard.getObjective('balance').addScore(player, 0)
                    player.sendMessage(`§a§l[ SETUP 2/4 ]§r§a Registering ${player.name} in balance.`)
                    console.warn(`[ SETUP LOG 2/4 ] Registered ${player.name} in balance scoreboard, and setted it's score to = 0`)
                }, 40)

                system.runTimeout(() => {
                    if (!world.scoreboard.getObjective('bank')) {
                        world.scoreboard.addObjective('bank')
                        player.sendMessage('§a§l[ SETUP 3/4 ]§r§a Creating bank scoreboard')
                    } else {
                        player.sendMessage(`§c[ SETUP 3/4 ] Bank scoreboard detected, skipping this step.`)
                        console.warn('[ SETUP LOG 3/4 ] Skipped setup step nr.: 3, due to: "balance" scoreboard already exists')
                    }
                }, 60)

                system.runTimeout(() => {
                    world.scoreboard.getObjective('bank').addScore(player, 0)
                    player.sendMessage(`§a§l[ SETUP 4/4 ]§r§a Registering ${player.name} in bank`)
                    console.warn(`[ SETUP LOG 4/4 ] Registered ${player.name} in bank scoreboard, and setted it's score to = 0`)

                    player.sendMessage(`§a§l[ SETUP DONE ]§r§a Setup Completed.`)
                }, 100)
            }

        })
}

export function hsmpMenu_BAL(player) {
    const bank = getScore(player, 'bank')
    const balance = getScore(player, 'balance')
    const all = bank + balance
    return new ActionFormData()
        .title(hiraethLOGO)
        .body(mainmenuBuild)
        .divider()
        .header('Economy')
        .divider()
        .label(`
This is information about your bank balance. All actions have been transfered to those commands:
/balmenu = shows this menu.
/bal = prints balance information to chat.
/depall = deposits all money to bank.
/dep {AMOUNT} = deposits the amount of money to your bank.
/withall = withdraws all your money from bank.
/with {AMOUNT} = withdraws the amount of money from your bank.
/transfer {PlAYER} {AMOUNT} - Transfers the amount of money to selected player.

Cash: ${formatCurrency(balance)}
Bank: ${formatCurrency(bank)}
Whole Balance: ${formatCurrency(all)}
`)
        .button('§lBACK')
        .show(player)
        .then(r => {
            const selection = r.selection

            if (r.canceled) hsmpMenu_MAIN;

            if (selection == 0) {
                hsmpMenu_MAIN(player)
            }
        })
}

async function credits(player) {

    const r = await new ActionFormData()
        .title(`§lCREDITS`)
        .body(mainmenuBuild)
        .divider()
        .header(`Server`)
        .label(`Created by: SamuraiBread
Help with ideas:
- Fafik
- AkuCrestfallen`)
        .divider()
        .header(`§lADDON`)
        .label(`Made & Designed by SamuraiBread`)
        .divider()
        .header(`Voice Actors`)
        .label(`
Evan - SamuraiBread (@samuraibread)

Special Thanks to all of those members who voiced special characters:

Alex:
Luka §o§c(@lukasrbalj)§r

Witch:
MINI §o§d(@_gloopy_soupy)§r

Lumberjack:
CyoVolt_ §o§9(@cryo_volt)§r

Restaurant Worker:
r1tual §o§u(@sacrificial_vessel)§r
    [F: Wemmbu/August]
`)
        .divider()
        .header(`§lTESTERS`)
        .label(`
- Shadow §o§2(@shadowthebloodywolf)§r
- Crestfallen Aku §o§p(@rebirthaku)§r
- Luka §o§c(@lukasrbalj)§r`)
        .show(player)

    if (r.canceled) hsmpMenu_MAIN(player);

}

export async function questMenu(player) {
    const quest = await registeredQuestNames(player);

    const r = await new ActionFormData()
        .title(`§lQUEST INFO`)
        .body(`Quest Build v1`)
        .divider()
        .header(`${quest.name}`)
        .label(`Tutorial Story Progress: ${quest.startProgression}`)
        .divider()
        .label(`Description:
${quest.description}

Rewards:
${quest.allRewards()}`)
        .show(player)
}

async function achievementMenu(player) {
    const achievements = getAchievements(player);

    const menu = new ActionFormData()
        .title(`§lACHIEVEMENTS`)
        .body('')
        .divider()
        .label(`§lCompleted Achievements:`)

    if (achievements.length == 0) {
        menu.label(`No achievements yet...`)
    } else {
        for (const { name, date } of achievements) {
            const line = date
                ? `§a* ${name}, §rCompleted: §e${date}`
                : `§a* ${name}`
            menu.label(line)
        }
    }
    await menu.show(player).then(r => { if (r.canceled) { hsmpMenu_MAIN(player) } });
} 