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
                        .button('Vanish\nCLEARS RACE EARS')
                        .divider()
                        .button('Addon WIKI\n(Help)')
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

                                case 4:
                                    addon_wiki_main(source)

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

                                case 3:
                                    addon_wiki_main(source).show(source)
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

            function addon_wiki_main(source) {
                return new ActionFormData()
                    .title(`Addon Wiki`)
                    .body(`Documentation is not showing every single information.`)
                    .header('Page 0\nIntroduction')
                    .label(`Hello, ${sourceName}!
This in-game Addon Documentation will show you how the staff menu works, what you can do with it, and what to do if you lose it. 
It will also explain all important technical details about tags, scoreboards, and systems.

First of all, all technical information about how it works and what each element does is strictly for you. 
Other players MUST NOT be informed about the functions you have access to or how the addon's world protection operates.
This information exists solely to make your moderation duties easier and more efficient.
Be aware that any information leaks may result in permanent demotion and a lifetime ban.

While people familiar with add-ons may look into the code, the information regarding world protection must NEVER come from you. 
Thank you, and enjoy.`)
                    .button('I understand')
                    .show(source)
                    .then(r => {
                        switch (r.selection) {
                            case 0:
                                addon_wiki_logs(source);
                        }
                    })

            }
            function addon_wiki_logs(source) {
                return new ActionFormData()
                    .title(`Addon Wiki`)
                    .body(`Oh wait... IT SAVED THOSE LOGS, WHAT? - My friend.`)
                    .header('Logging\nPage 1/4')
                    .label(`Logging is an essential tool for all of us. It provides every piece of important information that may occur.

Currently, the logging system notifies us about:
- Explosive or destructive materials being placed,
- Blocks exploding,
- Players using admin items without permission,
- Players possessing illegal items (such as bedrock) in their inventory.

For clarity and organization, our logging system is divided into two parts:
Normal Logging (the “Show Logs” button) and AntiGrief Logging (also known as the AntiGrief Watchdog).

Normal Logging saves points 1, 2, and 3, while AntiGrief Logging saves logs related to explosions and destructive block activity.

Use these systems to track down griefers, thieves, and players who break server rules — it makes moderation significantly easier.

Log structure example:
[ <System (Antigrief, warn, err, or no-permission)> <time> <date> ] <player> <message> <location (x, y, z)>

Do NOT use logs to track players for your personal advantage. Doing so violates the staff regulations.

Logs are protected under Staff Regulations and sharing them with a member will break some points, it is important to give a screenshot of the logs when taking an action but with hidden XYZ as bans, kicks, mutes and warns are public on our discord server.`)
                    .button('Next Page')
                    .button('Back')
                    .show(source).then(r => {
                        switch (r.selection) {
                            case 0:
                                addon_wiki_admintools(source)
                                break;

                            case 1:
                                addon_wiki_main(source)
                                break;
                        }
                    })
            }
            function addon_wiki_admintools(source) {
                return new ActionFormData()
                    .title('Addon WIKI')
                    .body('Oh he left? HOLY SHI- - My friend')
                    .header('Admin Tools\nPage 2/4')
                    .label(`Admin tools are making our lives easier.
                
To use them, you need to find a section title "Admin Tools" in your staff menu.
Depending on your permission your Admin Tools will have those Buttons:

- Vanish (Makes you invisible)
- Fake Leave (Triggers Fake Leave Message)
- Silent TP (Silently Tps you to chosen player)
- Launch Closest Player (Launches closest player to you)
- Imprison Closest Player (Imprisones closest player to you within 5x5 bedrock cube)

It is important to use them with a reason. 

What is acceptable and what is not:
Alex is peacefully mining in the caves, no watchdog trigger and no info about her braking the rules.
An then, a staff member silently tps to her, and imprisons her in the bedrock cube talking about mass checking players.

It is not acceptable, as we have very detailed logs which will say everything. If this situation happened, you alone will get imprisoned by me... SO DON'T YOU DARE Lol.

To use those tools, we need to have:
a) Warn or suspision
b) Firstly watch them then do, if your suspicion was valid, take actions. 

Of course, we are all humans, and problems happens, this is why imprisoning the person by accident, is completely okay.`)
                    .button('Next Page')
                    .button('Back')
            }
            function addon_wiki_permissions(source) {
                return new ActionFormData()
                    .title('Addon Wiki')
                    .body('It is completely safe when permissions are hard coded into the server :3')
                    .header('Permissions\nPage 3/4')
                    .label(`The addon has its own permission system.

The permission level assigned to your gamertag determines your access to the admin tools and the scope of your moderation capabilities.
Currently, these are the permission levels:

- Owner — Full access to the addon and admin menu. Can perform all actions, including system resets, log clearance, configuration changes, and access to all admin tools without restriction.
- Admin — Almost the same as Owner, but lacks access to certain critical admin tools such as script resets. They can clear logs, although those logs can be restored if necessary. Admins have full access to moderation tools to manage players effectively.
- Mods — Limited access. Cannot use most admin tools, but have access to the most essential moderation tools (Vanish, Silent TP, basic player monitoring). This allows them to act swiftly in enforcement while avoiding access to critical system functions.

Permissions are assigned based on your role and trust level within the server community.  
Your permission level can be upgraded when you are promoted on our Discord server, based on your activity, reliability, and adherence to staff guidelines.

💡 **Tips for using the admin tools:**  
- If you lose your admin menu, go into Creative mode, open the Equipment tab, find System Items, and collect your admin menu item.  
- If you don’t know how to use an admin tool, scroll down a little in the documentation — there are instructions explaining how to use it.  
- If you can’t find a player, go into Silent TP and click “TP to Nearest”.`)
            }
            function addon_wiki_tags(source) { }


            // Use without permission
            admin_menu(source)
        }
    })
})

