import { world, system } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"

import { logBuffer, loadLogs, saveLogs, antiGriefBuffer } from "../index.js"

const isOwner = [
    "SamuraiBreadI"
]
// --| Admins |--

const adminList = [
    "Shadowthew0lf5", "FatalCurse3858"
]

// --| Mods |--

const modList = [
    "tammyterrence1"
]

// --| Perms |--

const adminMenuPerm = [
    "Shadowthew0lf5", "FatalCurse3858", "tammyterrence1", "SamuraiBreadI"
]



// Admin Menu
system.beforeEvents.startup.subscribe(ev => {
    ev.itemComponentRegistry.registerCustomComponent('hsmp:admin_menu', {
        onUse: ev => {

            // Register source and source name. Note: source = Player who used the item. 

            const source = ev.source
            const sourceName = ev.source.name

            // Register Item
            const itemId = ev.itemStack.typeId

            // Register Permission to use the item
            const owner = isOwner.includes(sourceName)

            const admin = adminList.includes(sourceName)

            const mod = modList.includes(sourceName)

            const menuperm = adminMenuPerm.includes(sourceName)

            // Use without permission

            if (!menuperm) {
                // Register Logs
                const time = new Date().toLocaleTimeString();
                const date = new Date().toDateString();
                const logEntry = `§c[ No Permission ${time} | ${date} ]§r §e${sourceName}§r used §e${itemId}§c but doesn't have permission!`

                // Send Feedback Message
                source.sendMessage(`You don't have a permission to use this item. This has been saved to logs.`)

                // Push Logs
                console.warn(logEntry);
            }
            if (menuperm && owner) {
                return new ActionFormData()
                    .title('')
                    .header('Staff Menu')
                    .label("Type: Owner Menu")
                    .label(`Hello ${sourceName}!`)
                    .label('Choose an Action')
                    .button('Show Logs')
                    .button('Show AntiGrief\nLogs')
                    .show(source).then(r => {
                        switch (r.selection) {
                            case 0:
                                logs(source)
                        }
                    })

            }

        }
    })
})

//Menu Functions

function logs(source) {
    loadLogs()

    const logs = logBuffer.slice(-5).reverse().join('\n\n')

    return new ActionFormData()
        .title('test')
        .body(logs)
        .button('')
        .show(source)
}