import {
    world,
    system,
    CommandPermissionLevel,
    CustomCommandParamType
} from "@minecraft/server";

import { addLogEntry, getFullLog, showLastNumLogs } from "./coreBehaviour/main.js"

system.beforeEvents.startup.subscribe(e => {
    const registry = e.customCommandRegistry;

    registry.registerEnum(`hsmp:destination`, ['to_console', 'to_menu', 'to_menu_max5', 'to_menu_max10', 'to_menu_max20', `clear`]);
    registry.registerEnum(`hsmp:id`, [`watchdog`, `questProgress`, `modActions`])
    registry.registerCommand({
        name: "hsmp:printlogs",
        description: "Prints logs to the described area",
        permissionLevel: CommandPermissionLevel.Admin,
        mandatoryParameters: [
            {
                name: "hsmp:destination",
                type: CustomCommandParamType.Enum
            },
            {
                name: "hsmp:id",
                type: CustomCommandParamType.Enum
            }
        ]

    },
        (origin, destination, id) => {
            const player = origin.sourceEntity;

            const logEntry = `[ Mod Action ] ${player.nameTag} opened a Log menu with ${id} id.`


            if (destination == "to_console") {
                system.run(() => {
                    getFullLog(id)
                })
            } else if (destination == "to_menu") {
                system.run(() => { showLastNumLogs(player, 50, id) })
            } else if (destination == 'to_menu_max5') {
                system.run(() => { showLastNumLogs(player, 5, id) })
            } else if (destination == 'to_menu_max10') {
                system.run(() => { showLastNumLogs(player, 10, id) })
            } else if (destination == 'to_menu_max20') {
                system.run(() => { showLastNumLogs(player, 20, id) })
            }
            if (destination == `clear`) {
                world.setDynamicProperty(id, undefined)
            }

            addLogEntry(`modActions`, logEntry)
        }
    )

})