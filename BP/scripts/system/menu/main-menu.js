import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { getRaceTags, getMagicTags } from "../../modules/playerinfo/registered-tags.js";
import { hiraethLOGO } from "../../modules/playerinfo/utils.js";
import { tutorial_1 } from "./page1-joinmenu.js";
import { getScore, hasScore, isScoreRegistered } from "../../modules/economy/economy-scoreboards.js"
import { formatCurrency } from "../../formats.js"

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
            .button(`§lTUTORIEL`)
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
                    tutorial_1(player)
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