import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const logBuffer = []
const antiGrief = []

world.afterEvents.blockExplode.subscribe(e => {
    const block = e.block;

    const x = block.location.x;
    const y = block.location.y;
    const z = block.location.z;

    const timestampt = new Date().toLocaleTimeString();
    const logEntry = `§4[ ANTIGRIEF ] §c< ${timestampt} > Explosion §e${block.typeId} §mat §2${x} §e${y} §m${z}.`

    antiGrief.push(logEntry)

    console.warn(logEntry)
})

world.afterEvents.playerPlaceBlock.subscribe(e => {
    const block = e.block
    const player = e.player
    const pName = player.nameTag
    const x = block.location.x
    const y = block.location.y
    const z = block.location.z


    if (block.typeId == "minecraft:tnt") {
        const timestampt = new Date().toLocaleTimeString();
        const logEntry = `§4[ ANTIGRIEF ] §c< ${timestampt} > ${pName}§r placed an TNT on  §2X: ${x} §eY: ${y} §mZ: ${z}`

        logBuffer.push(logEntry)

        console.warn(logEntry)

        player.runCommand(`tellraw @a {"rawtext":[{"text":"§4[ ANTIGRIEF ] §c< ${timestampt} > ${pName}§r placed an TNT on  §2X: ${x} §eY: ${y} §mZ: ${z}"}]}`)

    }
})

system.beforeEvents.startup.subscribe(e => {
    e.itemComponentRegistry.registerCustomComponent('hsmp:testing_menu', {

        onUse: e => {
            const source = e.source
            const i = e.itemStack.typeId
            const pName = e.source.nameTag
            const adminList = [
                "Shadowthew0lf5"
            ]
            const modList = [

            ]
            const menuPermList = [
                "Shadowthew0lf5", "SamuraiBreadI"
            ]
            const ifAdmin = adminList.includes(pName)
            const ifMod = modList.includes(pName)
            const menuPerm = menuPermList.includes(pName)
            const ifOwner = source.nameTag == 'SamuraiBreadI'

            function getPermission() {
                if (ifOwner) return "Owner";
                if (ifAdmin) return "Admininistrator";
                if (ifMod) return "Moderator";
            }

            if (!menuPerm) {
                const timestampt = new Date().toLocaleTimeString();
                const logEntry = `§4[ UNATHORISED ITEM USE ] ${timestampt} §c${pName}§r used §c${i}§r but doesn't have a permission!
Indentify from where did he got the item, and clear his inventory to avoid the use of the item again!`;

                logBuffer.push(logEntry)

                source.sendMessage(`You don't have a permission to use this item!
Online Admins have been notified. To avoid getting banned, please stay on the server.`)
                console.warn(logEntry)
                source.runCommand(`tellraw @a {"rawtext":[{"text":"< SYSTEM > §4[ UNATHORISED ITEM USE ] §c${pName}§r used §c${i}§r but doesn't have a permission!\nIndentify from where did he got the item, and clear his inventory to avoid the use of the item again!"}]}`)
            }
            if (ifOwner && menuPerm) {
                function owner_menu(source) {
                    const perm = getPermission(source);
                    return new ActionFormData()
                        .title(`${perm} Menu`)
                        .body(`WIP You sucko!`)
                        .header(`${perm} Menu`)
                        .label(`Welcome ${pName}!
Your permission level: ${perm}`)
                        .button(`Logs`)
                        .button('Actions')
                        .button(`Silent TP`)
                        .button(`Vanish`)
                        .button(`Fake Leave`)
                        .button(`Owner Actions`)

                        .show(source).then(r => {
                            switch (r.selection) {
                                case 0:
                                    log_menu(source).show(source)
                                    break;
                            }
                        })

                }
                owner_menu(source)
            }

            if (ifAdmin && menuPerm) {
                function admin_menu(source) {
                    const perm = getPermission(source);
                    return new ActionFormData()
                        .title(`${perm} Menu`)
                        .body(`WIP You sucko!`)
                        .header(`${perm} Menu`)
                        .label(`Welcome ${pName}!
Your permission level: ${perm}`)
                        .button(`Logs`)
                        .button('Actions')
                        .button(`Silent TP`)
                        .button(`Vanish`)
                        .button(`Fake Leave`)
                        .button(`Owner Actions`)

                        .show(source).then(r => {
                            switch (r.selection) {
                                case 0:
                                    log_menu(source).show(source)
                                    break;
                            }
                        })
                }
                admin_menu(source)
            }


            function log_menu(source) {
                return new ActionFormData()
                    .title('Logs')
                    .body(`WIP`)
                    .button('Clear logs')
                    .button('Back')
                    .header('Logs')
                    .label(
                        `Last 5 Logs:\n\n${logBuffer.slice(-5).reverse().join('\n\n')}`
                    )
                    .label(`Antigrief last 20 Logs:\n${antiGrief.slice(-20).reverse().join('\n')}`)
            }


        }


    })

})