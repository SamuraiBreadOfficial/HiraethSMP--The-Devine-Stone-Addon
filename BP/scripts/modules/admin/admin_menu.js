import { world, system } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"

import { logBuffer, loadLogs, saveLogs, antiGriefBuffer, isOwner, adminList, adminMenuPerm, modList, clearLogs } from "../index.js"

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

            //Menu Functions
            function admin_menu(source) {

                // If without permission, will log the try to use the item
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
                        .label('Logging')
                        .button('Show Logs')
                        .button('Show AntiGrief\nLogs')
                        .button('Clear All Logs')
                        .label('Admin Tools')
                        .button('Vanish')
                        .show(source).then(r => {
                            switch (r.selection) {
                                case 0:
                                    logs(source);
                                    break;

                                case 1:
                                    antigrief(source)
                                    break;

                                case 2:
                                    clearLogs()
                                    source.sendMessage('All Logs Cleared')

                                    const time = new Date().toLocaleTimeString();
                                    const date = new Date().toLocaleDateString();
                                    const logEntry = `[ INFO ] All logs cleared by ${sourceName} at ${time} | ${date}`

                                    console.info(logEntry);
                                    logBuffer.push(logEntry)
                                    saveLogs()
                                    break;

                                case 3:
                                    vanish(source);
                                    admin_menu(source)
                                    break;

                                default:
                                    break;
                            }
                        })

                }
                if (menuperm && admin) {
                    return new ActionFormData()
                        .title('')
                        .header('Staff Menu')
                        .label("Type: Admin Menu")
                        .label(`Hello ${sourceName}!`)
                        .label('Logging')
                        .button('Show Logs')
                        .button('Show AntiGrief\nLogs')
                        .label('Admin Tools')
                        .button('Vanish')
                        .show(source).then(r => {
                            switch (r.selection) {
                                case 0:
                                    logs(source);
                                    break;

                                case 1:
                                    antigrief(source)
                                    break;

                                case 2:
                                    vanish(source);
                                    break;

                                default:
                                    break;
                            }
                        })

                }
                if (menuperm && mod) {
                    return new ActionFormData()
                        .title('')
                        .header('Staff Menu')
                        .label("Type: Mod Menu")
                        .label(`Hello ${sourceName}!`)
                        .label('Logging')
                        .button('Show Logs')
                        .button('Show AntiGrief\nLogs')
                        .label('Admin Tools')
                        .button('Vanish')
                        .show(source).then(r => {
                            switch (r.selection) {
                                case 0:
                                    logs(source);
                                    break;

                                case 1:
                                    antigrief(source)
                                    break;

                                case 2:
                                    vanish(source);
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

            function vanish(source) {
                if (source.hasTag('vanish')) {
                    source.runCommand('tag @s remove vanish')
                    source.runCommand('effect @s clear')
                }
                else {
                    source.runCommand(`tellraw @a {"rawtext":[{"text":"§e${sourceName} left the server."}]}`)
                    source.runCommand('effect @s invisibility infinite 0 true')
                    source.runCommand('tag @s add vanish')
                }

            }


            // Use without permission
            admin_menu(source)
        }
    })
})

