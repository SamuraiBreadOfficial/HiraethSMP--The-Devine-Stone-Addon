import { world, system, CommandPermissionLevel, CustomCommandParamType } from "@minecraft/server";

system.beforeEvents.startup.subscribe(e => {
    e.customCommandRegistry.registerCommand(
        {
            name: "hsmp:hhelp",
            description: "Shows what each HSMP command does.",
            permissionLevel: CommandPermissionLevel.Any,
        },
        (origin) => {
            const player = origin.sourceEntity
            system.run(() => {
                player.sendMessage(`
All HSMP Commands:

[ System ]
- /start: Shows Setup Menu.
- /hhelp: Shows the list of all HSMP commands.
- /ahelp - Shows all Admin Commands. (ADDON REGISTERED ADMINS ONLY)

[ Economy ]
- /balmenu: Shows balance info inside a menu.
- /bal: Prints your Balance to chat.
- /dep [AMOUNT]: Deposits given amount of cash into your bank.
- /depall: Deposits all of your cash to your bank.
- /with [AMOUNT]: Withdraws given amout of cash from your bank.
- /withall: Withdraws all of your cash from your bank.
- /transfer [ Player ex.: SamuraiBreadI ] [ AMOUNT ex.: 100 ] - Transfers your cash to another player.  

[ INFO ]
- /hmenu: Shows HiraethSMP's main menu.
- /fasttravel: Shows all locations of fast travel builds.
- /ver: Shows current pack version.
                `)

            })

        }
    )
})

