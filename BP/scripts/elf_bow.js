import { world, system } from "@minecraft/server";

world.beforeEvents.itemUse.subscribe(e => {
    const p = e.source;
    if (e.itemStack.typeId == "minecraft:bow" && p.hasTag('elf')) {
        system.run(() => {
            p.runCommand('camera @s fov_set 0 5')
        })
    }
});

world.afterEvents.itemStopUse.subscribe(e => {
    const p = e.source;
    if (e.itemStack.typeId == "minecraft:bow" && p.hasTag('elf')) {
        system.run(() => {
            p.runCommand('camera @s fov_clear 0.1')
        })
    }
});

world.afterEvents.entityHitBlock.subscribe(e => {
    const p = e.damagingEntity;
    if (p.isSneaking && p.hasTag('elf')) {
        system.run(() => {
            if (p.hasTag('focus')) {
                p.runCommand('camera @s fov_clear 0.1')
                p.removeTag('focus')
            }
            else {
                p.runCommand('camera @s fov_set 0 0.5')
                p.addTag('focus')
            }
        })
    }
});