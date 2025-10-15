import { system, world, CommandPermissionLevel, CustomCommandParamType } from "@minecraft/server"

system.beforeEvents.startup.subscribe(e => {
    e.customCommandRegistry.registerEnum("hsmp:category", ["food", "blocks"]);
    e.customCommandRegistry.registerCommand(
        {
            name: "hsmp:forcemarket",
            description: "None",

            permissionLevel: CommandPermissionLevel.Admin,

            mandatoryParameters: [
                {
                    name: "hsmp:category",
                    type: CustomCommandParamType.Enum,
                }
            ]
        },
        (origin, category) => {
            const player = origin.sourceEntity

            system.run(() => {
                if (category == "food") {
                    player.sendMessage(`food`)
                    return;
                }
                if (category == "blocks") {
                    player.sendMessage(`blocks`)
                }

            })
        }
    )
})