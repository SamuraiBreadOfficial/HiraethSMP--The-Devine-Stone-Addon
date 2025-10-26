console.warn("§d[HIRAETH]§r Loading Command: /bal");

import { world, system, CommandPermissionLevel } from "@minecraft/server";
import { hsmpMenu_BAL, hsmpMenu_BALnotSettedUp } from "../menu/main-menu.js";
import { hasScore, getScore } from "../../modules/economy/economy-scoreboards.js"
import { formatCurrency } from "../../formats.js"


system.beforeEvents.startup.subscribe(e => {
    const registry = e.customCommandRegistry;

    registry.registerCommand(
        {
            name: "hsmp:bal",
            description: "Shows your Balance",
            permissionLevel: CommandPermissionLevel.Any
        },
        (origin, args) => {
            const player = origin.sourceEntity;

            system.run(() => {
                if (!hasScore(player, 'balance')) {
                    hsmpMenu_BALnotSettedUp(player);
                } else {
                    printBAL(player)
                }
            })

        }
    )
})

function printBAL(player) {
    const bank = getScore(player, "bank");
    const cash = getScore(player, "balance");
    const all = bank + cash;

    player.sendMessage(`§a[ ECONOMY ]§r
Cash: §e${formatCurrency(cash)}\$§r
Bank: §e${formatCurrency(bank)}\$§r
Whole Balance: §e${formatCurrency(all)}\$§r

Type /balmenu to get all economy commands.`)
}