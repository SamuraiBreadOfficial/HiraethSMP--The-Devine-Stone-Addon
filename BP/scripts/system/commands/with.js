import { world, system, CommandPermissionLevel, CustomCommandParamType } from "@minecraft/server";
import { hasScore, getScore } from "../../modules/economy/economy-scoreboards.js";
import { formatCurrency } from "../../formats.js"

system.beforeEvents.startup.subscribe(e => {
    const registry = e.customCommandRegistry;

    registry.registerCommand(
        {
            name: "hsmp:with",
            description: "Withdraw the given amount into your bank.",
            permissionLevel: CommandPermissionLevel.Any,

            mandatoryParameters: [
                {
                    name: "hsmp:amount",
                    type: CustomCommandParamType.Integer
                }
            ]
        },
        (origin, amount) => {
            const player = origin.sourceEntity;

            system.run(() => {
                if (!hasScore(player, "balance") || !hasScore(player, "bank")) {
                    player.sendMessage("§c[ Not Registered ] You must set up your economy first. Type /bal or /balmenu or /hsmp then click ECONOMY button to set it up.");
                    return;
                }

                const balance = getScore(player, "bank");

                if (amount <= 0) {
                    player.sendMessage("§c§l[ WITHDRAW | Amount ERR ]§r§c Amount must be greater than zero.");
                    return;
                }

                if (balance < amount) {
                    player.sendMessage(`§c§l[ WITHDRAW | Insufficient Balance ]§r§c You don't have enough money to withdraw. Try amount smaller than ${amount}`);
                    return;
                }

                const balanceObj = world.scoreboard.getObjective("balance");
                const bankObj = world.scoreboard.getObjective("bank");

                balanceObj.addScore(player, amount);
                bankObj.addScore(player, -amount);

                player.sendMessage(`§a§l[ WITHDRAW ]§r§a Withdrawed §e${formatCurrency(amount)}\$§a from your bank.`);
                player.runCommand('playsound minecraft:entity.experience_orb.pickup @s');
            });
        }
    );
});