console.warn("§d[HIRAETH]§r Loading Command: /hmenu");

import { system, world, CommandPermissionLevel } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui"

import { hsmpMenu_MAIN } from "../menu/main-menu.js"

system.beforeEvents.startup.subscribe(e => {
    const registry = e.customCommandRegistry;

    registry.registerCommand({
        name: "hsmp:hmenu",
        description: "Opens HiraethSMP menu.",
        permissionLevel: CommandPermissionLevel.Any,
        optionalParameters: []
    },
        (origin, args) => {
            const player = origin.sourceEntity;
            system.run(() => {
                hsmpMenu_MAIN(player)
            })
        }
    )
})