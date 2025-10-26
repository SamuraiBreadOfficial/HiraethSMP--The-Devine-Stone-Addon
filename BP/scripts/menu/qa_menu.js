import { system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { waitTicks } from "../formats.js"

export async function quickAction_main(player) {
    const r = await new ActionFormData()
        .title(`§lQUICK ACTION | MAIN`)
        .body(`Up to date with: v1.0`)
        .divider()
        .label(`Quick Action allows Console and Mobile players to trigger commands easier and faster.
    
Categories:
1) Info
2) Economy
3) Other`)
        .divider()
        .label(`§lINFO`)
        .button(`HSMP Help`)
        .label(`-> /hhelp - Prints all Commands.`)
        .button(`HSMP Menu`)
        .label(`-> /hmenu - Opens HiraethSMP Menu.`)
        .button(`Fast Travel`)
        .label(`-> /fasttravel - Shows localization of all fast travel builds`)
        .button(`Version`)
        .label(`-> /ver - Shows Addon Version`)
        .divider()
        .label(`§lECONOMY`)
        .button(`Balance`)
        .label(`-> /bal - Prints your balance to chat.`)
        .button(`Balance Menu`)
        .label(`-> /balmenu - Shows Balance Menu`)
        .button(`Deposit`)
        .label(`-> /dep [amount] - Depots given amount of cash to your bank.`)
        .button(`Deposit All`)
        .label(`-> /depall - Deposits all of your money.`)
        .button(`Withdraw`)
        .label(`-> /with [amount] - Withdraws all of your money`)
        .button(`Withdraw All`)
        .label(`-> /withall - Withdraws all of your money`)
        .button(`Transfer`)
        .label(`-> /transfer [target] [amount] - Transfers money to someone else.`)


        .show(player)

    if (r.canceled) {
        player.sendMessage(`Quick Action Menu Canceled. No Command triggered.`)
        return;
    }

    if (r.selection == 0) {
        player.runCommand(`hhelp`)
        await waitTicks(100)
        quickAction_main(player)
    }
    if (r.selection == 1) {
        player.runCommand(`hmenu`)
        await waitTicks(100)
        quickAction_main(player)

    }
    if (r.selection == 2) {
        player.runCommand(`fasttravel`)
        await waitTicks(100)
        quickAction_main(player)

    }

    if (r.selection == 3) {
        player.runCommand(`ver`)
        await waitTicks(100)
        quickAction_main(player)

    }
}