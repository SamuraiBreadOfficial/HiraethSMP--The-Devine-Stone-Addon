console.warn("§d[HIRAETH]§r Loading Command: /balmenu");

import { world, system, CommandPermissionLevel } from "@minecraft/server";
import { hsmpMenu_BAL, hsmpMenu_BALnotSettedUp } from "../menu/main-menu.js";
import { hasScore, getScore } from "../../modules/economy/economy-scoreboards.js"

system.beforeEvents.startup.subscribe(e => {
    const registry = e.customCommandRegistry;

    registry.registerCommand(
        {
            name: "hsmp:balmenu",
            description: "Shows Balance Menu (OLD)",
            permissionLevel: CommandPermissionLevel.Any
        },
        (origin, args) => {
            const player = origin.sourceEntity;

            system.run(() => {
                if (!hasScore(player, 'balance')) {
                    hsmpMenu_BALnotSettedUp(player);
                } else {
                    hsmpMenu_BAL(player)
                }
            })

        }
    )
})