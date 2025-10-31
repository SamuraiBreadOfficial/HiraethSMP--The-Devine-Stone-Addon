console.warn("§d[HIRAETH]§r Loading Command: /ver");

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
                player.sendMessage(`    [ §dHIRAETHSMP §aADDON§r ]

< §lVERSION§r >
- Addon: ${addon.version.no}
- Dev Tool (Bridge. v2): ${addon.version.bridge_no}

< §lADDON INFO§r >
- Version Title:
[ ${addon.version.title} ]

- Released on: ${addon.version.released}

${addon.version.desc}

< §lCHANGELOG§r >
${addon.clog.full}

< CREDITS >

[ SCRIPTING ]
${addon.credits.devs.scripting}

[ TESTERS ]
${addon.credits.devs.testers}

[ VOICE ACTORS ]
To be added...
                `)
            })
        }
    )
})