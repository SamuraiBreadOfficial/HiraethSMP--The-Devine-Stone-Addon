import { world, system, CommandPermissionLevel } from "@minecraft/server"
import { addon } from "../../addon-info.js"

system.beforeEvents.startup.subscribe(e => {
    e.customCommandRegistry.registerCommand(
        {
            name: "hsmp:ver",
            description: 'Shows current addon version, title, and short update summary.',
            permissionLevel: CommandPermissionLevel.Any
        },
        (origin) => {
            const player = origin.sourceEntity;

            system.run(() => {
                player.sendMessage(`
[ §l§dHiraethSMP ADDON §e${addon.version.no}§r ]
§l§e${addon.version.title}§r
${addon.version.desc}

Short Changelog Summary:
${addon.clog.short}

Released on: ${addon.version.released}

Next: ${addon.version.nextver}
                `)
            })
        }
    )
})