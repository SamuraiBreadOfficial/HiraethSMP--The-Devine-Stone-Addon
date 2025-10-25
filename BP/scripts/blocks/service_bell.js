import { world, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:service_bell', {
        onPlayerInteract(e) {
            const block = e.block;
            const bx = block.location.x;
            const by = block.location.y;
            const bz = block.location.z;

            const localization = { x: bx + 0.5, y: by, z: bz + 0.5 }
            block.setType(`minecraft:air`)

            const overworld = world.getDimension('overworld')
            const bell = overworld.spawnEntity('hsmp:service_bell_entity', localization)
            overworld.runCommand(`playsound hsmp.service_bell @a ${bx} ${by} ${bz} 1 1 1`)

            system.runTimeout(() => {
                e.dimension.runCommand(`playanimation @e[type=hsmp:service_bell_entity, x=${bx}, y=${by}, z=${bz}, r=1, c=1] animation.service_bell_entity.ring`)
            }, 2)

            system.runTimeout(() => {
                overworld.runCommand(`setblock ${bx} ${by} ${bz} hsmp:service_bell`)
            }, 15) // 1 sec


            system.runTimeout(() => {
                bell.remove();
                overworld.runCommand(`setblock ${bx} ${by} ${bz} hsmp:service_bell`)
            }, 20) // 1 sec
        }
    })
})