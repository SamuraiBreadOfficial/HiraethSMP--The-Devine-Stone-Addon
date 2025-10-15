import { world, system, CommandPermissionLevel, CustomCommandParamType, CustomCommandError } from "@minecraft/server";
import { hasScore, getScore } from "../../modules/economy/economy-scoreboards.js";
import { formatCurrency } from "../../formats.js"

system.beforeEvents.startup.subscribe(e => {
    const registry = e.customCommandRegistry;

    registry.registerCommand(
        {
            name: "hsmp:donate",
            description: "Transfers given amount of money to selected player.",
            permissionLevel: CommandPermissionLevel.Any,

            mandatoryParameters: [
                {
                    name: "hsmp:target",
                    type: CustomCommandParamType.PlayerSelector
                },
                {
                    name: "hsmp:amount",
                    type: CustomCommandParamType.Integer
                }
            ]
        },
        (origin, target, amount) => {
            const player = origin.sourceEntity
            const targetPlayer = Array.isArray(target) ? target[0] : target
            const cash = getScore(player, 'balance')
            const cashObj = world.scoreboard.getObjective('balance')
            system.run(() => {
                if (!hasScore(player, "balance") || !hasScore(player, "bank")) {
                    player.sendMessage("§c[ TRANSFER ] Economy Err.: You must set up your economy first. Type /bal or /balmenu or /hsmp then click ECONOMY button to set it up.");
                    return;
                }
                if (!hasScore(targetPlayer, "balance") || !hasScore(targetPlayer, "bank")) {
                    player.sendMessage("§c[ TRANSFER ] Economy Err.: Target must register itself in the economy in order for you to send it money!");
                    return;
                }
                if (amount < 0) {
                    player.sendMessage(`[ TRANSFER ] AMOUNT ERR.: Amount must be greater than zero.`)
                    return;
                }
                if (!targetPlayer) {
                    player.sendMessage('[ TRANSFER ] Target Err.: Targetted player is offline or invalid.')
                    return;
                }
                if (targetPlayer == player) {
                    player.sendMessage(`[ TRANSFER ] Target Err.: You can't send money to yourself.`)
                    return;
                }
                if (amount > cash) {
                    player.sendMessage(`[ TRANSFER ] Amount Err.: Insufficient cash balance. Withdraw your amount from bank then try it again.`)
                    return;
                }
                if (amount < cash) {
                    player.sendMessage(`[ TRANSFER ] You've sent ${formatCurrency(amount)}\$ to ${targetPlayer.name}!`)
                    targetPlayer.sendMessage(`[ TRANSFER ] You've received ${formatCurrency(amount)} from ${player.name}`)
                    cashObj.addScore(targetPlayer, amount)
                    cashObj.addScore(player, -amount)
                }

            })
        }
    )
})