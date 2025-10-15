import { world, system, CommandPermissionLevel } from "@minecraft/server";

system.beforeEvents.startup.subscribe(e => {
    e.customCommandRegistry.registerCommand(
        {
            name: "hsmp:fasttravel",
            description: "Shows all fast travel coords.",
            permissionLevel: CommandPermissionLevel.Any
        },
        (origin) => {
            const player = origin.sourceEntity

            system.run(() => {
                player.sendMessage(`[Fast Travel]

Solvaran Continent (City, Desert, Savanna, Jungle):
1) 205 66 1871 (City)
2) -2733 69 1982 (Jungle)
3) -4429 62 3277 (Savanna)
4) -3279 59 3943 (Desert)
5) 1997 63 4920 (Plains)

Sakuver Continent (Cherry, Oak Forest, Birch Forest):
1)
2)
3)

Erinveil Continent (Cliffs, Spruce):
1) 2795 61 -4265 (Snowy)
2) 2045 60 -1316 (Flatlands)
3) `)
            })
        }
    )
})