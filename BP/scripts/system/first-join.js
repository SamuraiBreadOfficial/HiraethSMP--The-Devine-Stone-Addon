import {
    system, world,
    CommandPermissionLevel,
    CustomCommandParamType
} from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { joinMenu_START, joinMenu_RACE } from "./system-index.js";


system.beforeEvents.startup.subscribe(e => {
    const registry = e.customCommandRegistry;

    registry.registerCommand(
        {
            name: "hsmp:start",
            description: "Sets up your character.",
            permissionLevel: CommandPermissionLevel.Any,
            optionalParameters: []
        },
        (origin, args) => {
            const player = origin.sourceEntity;

            if (!player.hasTag("menujoined")) {
                system.run(() => {
                    player.addTag('menujoined')
                    joinMenu_START(player)
                })
            } else {
                player.sendMessage("§c§oPermission Err: You can't use this command as this command is locked after you use it when you first join.");
            }
        }
    );
});

world.afterEvents.playerJoin.subscribe(e => {
    const playerName = e.playerName

    console.info(playerName + 'joined')
})

world.beforeEvents.playerLeave.subscribe(e => {
    const player = e.player.name
    const p = e.player

    if (!p.hasTag('joined')) {
        console.info(player + 'left')
    }
})