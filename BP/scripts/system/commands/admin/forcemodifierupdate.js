import { world, system, CustomCommandParamType, CommandPermissionLevel } from "@minecraft/server";

import { forceModifier, forceCatModifier } from "../../../modules/economy/core.js";

system.beforeEvents.startup.subscribe(e => {
    e.customCommandRegistry.registerEnum('hsmp:category', ['food', 'lumberjack', 'earthwright'])
    e.customCommandRegistry.registerCommand(
        {
            name: "hsmp:forcemodifierupdate",
            description: 'Forces the market modifiers to reset.',
            permissionLevel: CommandPermissionLevel.Admin,
            mandatoryParameters: [
                {
                    name: "hsmp:value",
                    type: CustomCommandParamType.Integer
                }
            ],
            optionalParameters: [
                {
                    name: 'hsmp:category',
                    type: CustomCommandParamType.Enum,
                }
            ]
        },
        (origin, value, category) => {
            const player = origin.sourceEntity;

            try {
                if (!category) {
                    forceModifier(value);
                    player.sendMessage(`Successfuly Set Modifiers to ${value}%% by §c${player.nameTag}`)
                } else if (category == 'food') {
                    forceCatModifier(value, category)
                    player.sendMessage(`Successfuly Set Modifiers to ${value}%% by §c${player.nameTag}`)
                } else if (category == `lumberjack`) {
                    forceCatModifier(value, category)
                    player.sendMessage(`Successfuly Set Modifiers to ${value}%% by §c${player.nameTag}`)
                } else if (category == `earthwright`) {
                    forceCatModifier(value, category)
                    player.sendMessage(`Successfuly Set Modifiers to ${value}%% by §c${player.nameTag}`)
                }
            } catch (e) {
                console.warn(`§cError while triggering command "forcemodifierupdate" by ${player.nameTag}:

 ${e}`)
            }

        }
    )
})

