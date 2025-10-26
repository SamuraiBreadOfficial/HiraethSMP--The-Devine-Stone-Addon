import { system, world, CustomCommandParamType, CommandPermissionLevel } from "@minecraft/server";
import { cwAgreedment, unlockAfterTutorial, tutorial_main, startCutscene, joinMenu_START } from '../../menu/page1-joinmenu.js'


system.beforeEvents.startup.subscribe(e => {
    e.customCommandRegistry.registerEnum('hsmp:forced_action', ['agreedments', 'tutorial', 'unlockAfterTutorial', 'start', `startCutscene`])
    e.customCommandRegistry.registerCommand(
        {
            name: "hsmp:forceaction",
            description: 'Forces actions to selected player',
            permissionLevel: CommandPermissionLevel.Host,
            mandatoryParameters: [
                {
                    name: 'hsmp:target',
                    type: CustomCommandParamType.PlayerSelector
                },
                {
                    name: 'hsmp:forced_action',
                    type: CustomCommandParamType.Enum
                }
            ]
        },
        (origin, target, forced_action) => {
            const trigerer = origin.sourceEntity;
            const targetPlayer = Array.isArray(target) ? target[0] : target;
            const action = forced_action;
            world.sendMessage(`Triggered ${action} for ${targetPlayer.nameTag} by ${trigerer.nameTag}`)

            if (forced_action == 'agreedments') {
                cwAgreedment(targetPlayer)
            }

            if (forced_action == 'tutorial') {
                tutorial_main(targetPlayer)
            }

            if (forced_action == 'unlockAfterTutorial') {
                unlockAfterTutorial(targetPlayer)
            }

            if (forced_action == `start`) {
                joinMenu_START(targetPlayer)
            }

            if (forced_action == `startCutscene`) {
                startCutscene(targetPlayer)
            }
        }
    )
})