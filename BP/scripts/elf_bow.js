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