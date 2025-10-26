console.warn("§d[HIRAETH]§r Loading scripts/system/menu/clock.js");

import { world, system } from "@minecraft/server";

function getClockTime(dayTick) {
    const hour = Math.floor((dayTick % 24000) / 1000);
    const minute = Math.floor(((dayTick % 1000) / 1000) * 60);
    return `${String((6 + hour) % 24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const inventory = player.getComponent("inventory").container;
        const heldItem = inventory.getItem(player.selectedSlotIndex);

        if (heldItem && heldItem.typeId === "minecraft:clock") {
            const tick = world.getTimeOfDay();
            const hour = Math.floor((tick % 24000) / 1000);
            const minute = Math.floor(((tick % 1000) / 1000) * 60);
            const timeLabel = getClockTime(tick);

            player.runCommand(`title ${player.name} actionbar "[ Clock ] §7${timeLabel}"`);
        }
    }
}, 1); // co sekundę
