import { system, world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
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
        .button(`Donate`)
        .label(`-> /donate [target] [amount] - Transfers money to someone else.`)


        .show(player)

    if (r.canceled) {
        player.sendMessage(`Quick Action Menu Canceled. No Command triggered.`)
        return;
    }

    if (r.selection == 0) {
        player.runCommand(`hhelp`)
        await waitTicks(60)
        quickAction_main(player)
    }
    if (r.selection == 1) {
        player.runCommand(`hmenu`)
        await waitTicks(60)
        quickAction_main(player)

    }
    if (r.selection == 2) {
        player.runCommand(`fasttravel`)
        await waitTicks(60)
        quickAction_main(player)

    }

    if (r.selection == 3) {
        player.runCommand(`ver`)
        await waitTicks(60)
        quickAction_main(player)
    }

    if (r.selection == 4) {
        player.runCommand(`bal`)
        await waitTicks(60)
        quickAction_main(player)
    }

    if (r.selection == 5) {
        player.runCommand(`balmenu`)
    }

    if (r.selection == 6) {
        runDepCommand(player)
    }

    if (r.selection == 7) {
        player.runCommand(`depall`)
        await waitTicks(60)
        quickAction_main(player)
    }

    if (r.selection == 8) {
        runWithCommand(player)
    }

    if (r.selection == 9) {
        player.runCommand(`withall`)
        await waitTicks(60)
        quickAction_main(player)
    }

    if (r.selection == 10) {
        runTransferCommand(player)
    }
}

async function runDepCommand(player) {
    const r = await new ModalFormData()
        .title('§lQUICK ACTION | DEPOSIT')
        .divider()
        .textField(`Type the amount of cash to deposit.

Remember: 111111 = 1,111.11`, `111111`)
        .show(player)

    if (r.canceled) {
        quickAction_main(player)
        return;
    }

    const value = r.formValues[1];

    if (!/^\d+$/.test(value)) {
        player.sendMessage("§cInvalid input. Please enter digits only.");
        runDepCommand(player)
        return;
    }


    player.runCommand(`dep ${value}`)
    await waitTicks(60)
    quickAction_main(player)
}
async function runWithCommand(player) {
    const r = await new ModalFormData()
        .title('§lQUICK ACTION | WITHDRAW')
        .divider()
        .textField(`Type the amount of cash to withdraw.

Remember: 111111 = 1,111.11`, `111111`)
        .show(player)

    if (r.canceled) {
        quickAction_main(player)
        return;
    }

    const value = r.formValues[1];

    if (!/^\d+$/.test(value)) {
        player.sendMessage("§cInvalid input. Please enter digits only.");
        runDepCommand(player)
        return;
    }


    player.runCommand(`with ${value}`)
    await waitTicks(60)
    quickAction_main(player)
}

async function runTransferCommand(player) {
    const playerTable = world.getAllPlayers().map(p => p.name);

    const r = await new ModalFormData()
        .title('§lQUICK ACTION | WITHDRAW')
        .dropdown(`Target`, playerTable)
        .textField(`Amount of cash to transfer`, '111100')
        .show(player)

    if (r.canceled) {
        quickAction_main(player)
        return;
    }

    const targetIndex = r.formValues[0];
    const target = playerTable[targetIndex]
    const amount = r.formValues[1];

    const targetPlayer = world.getAllPlayers().find(p => p.name == target);

    if (!/^\d+$/.test(amount)) {
        player.sendMessage("§cInvalid input. Please enter digits only.");
        runDepCommand(player)
        return;
    }

    player.sendMessage(`donate ${targetPlayer.name} ${amount}`)
    player.runCommand(`donate ${targetPlayer.name} ${amount}`)

}