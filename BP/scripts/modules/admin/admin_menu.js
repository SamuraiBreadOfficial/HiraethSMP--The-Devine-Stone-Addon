import { world, system } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"

import { logBuffer, loadLogs, saveLogs, antiGriefBuffer, isOwner, adminList, adminMenuPerm, modList } from "../index.js"

// Admin Menu
system.beforeEvents.startup.subscribe(ev => {
    ev.itemComponentRegistry.registerCustomComponent('hsmp:admin_menu', {
        onUse: ev => {
            const source = ev.source
            const sourceName = ev.source.name

            // Register Item
            const itemId = ev.itemStack.typeId

            // Register Permission to use the item
            const owner = isOwner.includes(sourceName)

            const admin = adminList.includes(sourceName)

            const mod = modList.includes(sourceName)

            const menuperm = adminMenuPerm.includes(sourceName)

            //Menu Functions
            function admin_menu(source) {
                // Register source and source name. Note: source = Player who used the item. 

                if (!menuperm) {
                    // Register Logs
                    const time = new Date().toLocaleTimeString();
                    const date = new Date().toDateString();
                    const logEntry = `§c[ No Permission ${time} | ${date} ]§r §e${sourceName}§r used §e${itemId}§c but doesn't have permission!`

                    // Send Feedback Message
                    source.sendMessage(`You don't have a permission to use this item. This has been saved to logs.`)

                    // Push Logs
                    console.warn(logEntry);
                    logBuffer.push(logEntry);
                    saveLogs();
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
                                    logs(source);
                                    break;

                                case 1:
                                    antigrief(source)
                                    break;

                                default:
                                    break;
                            }
                        })

                }
            }


            function logs(source) {
                loadLogs()

                const logs = logBuffer.slice(-50).reverse().join('\n\n')

                return new ActionFormData()
                    .title('')
                    .body('')
                    .button('Back')
                    .header('Last 50 logs.')
                    .label(logs)
                    .show(source).then(r => {
                        switch (r.selection) {
                            case 0:
                                admin_menu(source)

                            default:
                        }
                    })
            }

            function antigrief(source) {
                loadLogs()

                const logs = antiGriefBuffer.slice(-100).reverse().join('\n\n');

                return new ActionFormData()
                    .title('')
                    .body("")
                    .button('Back')
                    .header('Antigrief last 100 warns.')
                    .label(logs)
                    .show(source)
            }

            // Use without permission
            admin_menu(source)
        }
    })
})

