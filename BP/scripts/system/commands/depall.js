console.warn("§d[HIRAETH]§r Loading Command: /depall");

import { world, system, CommandPermissionLevel, CustomCommandParamType } from "@minecraft/server";
import { hasScore, getScore } from "../../modules/economy/economy-scoreboards.js";
import { formatCurrency } from "../../formats.js"

system.beforeEvents.startup.subscribe(e => {
    const registry = e.customCommandRegistry;

    registry.registerCommand(
        {
            name: "hsmp:depall",
            description: "Depots all your money to bank.",
            permissionLevel: CommandPermissionLevel.Any
        },
        (origin) => {
            const player = origin.sourceEntity;

            const bank = getScore(player, "bank")
            const cash = getScore(player, "balance")
            const objBank = world.scoreboard.getObjective("bank")
            const objBal = world.scoreboard.getObjective('balance')

            system.run(() => {
                if (!hasScore(player, "balance") || !hasScore(player, "bank")) {
                    player.sendMessage("§c[ Not Registered ] You must set up your economy first. Type /bal or /balmenu or /hsmp then click ECONOMY button to set it up.");
                    return;
                }

                if (cash <= 0) {
                    player.sendMessage('[ DEPALL ] Unable to deposit all, as your balance is 0 or negative.')
                    return;
                } else {
                    objBank.addScore(player, cash)
                    player.sendMessage(`[ DEPALL ] Deposited ${formatCurrency(cash)}\$ to your bank.`)
                    objBal.addScore(player, -cash)
                }


            })
        }
    )
})