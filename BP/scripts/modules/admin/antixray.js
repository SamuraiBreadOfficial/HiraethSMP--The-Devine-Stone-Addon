import { world, system } from "@minecraft/server";
import { saveLogs, logBuffer, antiGriefBuffer, adminMenuPerm } from "../index.js";

const miningStats = {};

const miningLimits = {
    diamond: 30,
    gold: 50,
    debris: 10
};

world.afterEvents.playerBreakBlock.subscribe(e => {
    const player = e.player;
    const name = player.name;
    const blockID = e.block.typeId;

    const now = Date.now();

    if (!miningStats[name]) {
        miningStats[name] = {
            diamond: 0,
            gold: 0,
            debris: 0,
            startTime: now
        };
    }

    const stats = miningStats[name];

    // Reset po 1h
    if (now - stats.startTime >= 3600000) {
        stats.diamond = 0;
        stats.gold = 0;
        stats.debris = 0;
        stats.startTime = now;
    }

    // Zliczanie
    if (blockID.includes("diamond")) stats.diamond++;
    if (blockID.includes("gold")) stats.gold++;
    if (blockID.includes("ancient_debris")) stats.debris++;

    // Sprawdzenie limitów
    checkMiningLimits(name, player, stats);
});

function checkMiningLimits(name, player, stats) {
    const alerts = [];

    if (stats.diamond > miningLimits.diamond) {
        alerts.push(`§c${name} mined ${stats.diamond} diamonds in 1h`);
    }
    if (stats.gold > miningLimits.gold) {
        alerts.push(`§e${name} mined ${stats.gold} gold in 1h`);
    }
    if (stats.debris > miningLimits.debris) {
        alerts.push(`§6${name} mined ${stats.debris} ancient debris in 1h`);
    }

    if (alerts.length > 0) {
        const time = new Date().toLocaleTimeString();
        const date = new Date().toLocaleDateString();

        alerts.forEach(msg => {
            const log = `§b[AntiXray | ${time} | ${date}] §r${msg}`;
            console.warn(log);
            antiGriefBuffer.push(log);
        });

        saveLogs();

        // Powiadom adminów
        for (const p of world.getPlayers()) {
            if (adminMenuPerm.includes(p.name)) {
                alerts.forEach(msg => p.sendMessage(`§c[AntiXray Alert] §r${msg}`));
            }
        }
    }
}