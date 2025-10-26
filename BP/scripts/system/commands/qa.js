import { system, world, CommandPermissionLevel, CustomCommandParamType } from "@minecraft/server";
import { quickAction_main } from "../../menu/qa_menu"
system.beforeEvents.startup.subscribe(e => {
    const register = e.customCommandRegistry;

    register.registerCommand(
        {
            name: 'hsmp:qa',
            description: 'Opens quick action menu.',
            permissionLevel: CommandPermissionLevel.Any
        },
        (origin) => {
            const player = origin.sourceEntity;
            system.run(() => {
                quickAction_main(player);
            })
        }
    )
})