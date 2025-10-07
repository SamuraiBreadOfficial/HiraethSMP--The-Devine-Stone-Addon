import { world, system } from "@minecraft/server"


// Main buffers
export const logBuffer = []

export const antiGriefBuffer = []

// Saving Logs to World File

export function saveLogs() {
    world.setDynamicProperty('logBuffer', JSON.stringify(logBuffer));
    world.setDynamicProperty('antiGriefBuffer', JSON.stringify(antiGriefBuffer));
}

// Load Logs
export function loadLogs() {
    const savedLogBuffer = world.getDynamicProperty('logBuffer');
    const savedAntiGriefBuffer = world.getDynamicProperty('antiGriefBuffer');

    // Before Loading Clear Ram Memory
    logBuffer.length = 0;
    antiGriefBuffer.length = 0;

    //Load Full Logs into the Ram Memory
    if (typeof savedLogBuffer == "string") {
        logBuffer.push(...JSON.parse(savedLogBuffer));
    }
    if (typeof savedAntiGriefBuffer == "string") {
        antiGriefBuffer.push(...JSON.parse(savedAntiGriefBuffer));
    }
}

// Explosion Logs
world.afterEvents.blockExplode.subscribe(ev => {
    // Register Exploded Block
    const blocksource = ev.source.typeId;
    const explodedblocks = ev.block.typeId;

    //register localisation
    const x = ev.block.location.x;
    const y = ev.block.location.y;
    const z = ev.block.location.z;

    //Register Time
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();

    // Logging Explosion
    const logEntry = `§m[ AntiGrief | WARN | ${time} | ${date} ]§c Explosion of ${explodedblocks} at §2X: ${x} §eY: ${y} §1Z: ${z}`

    // Push Logs into World Memo
    antiGriefBuffer.push(logEntry);
    console.warn(logEntry);
    saveLogs();
})

//Placement of TNT
world.afterEvents.itemUse.subscribe(ev => {
    // Register Player Name and localization.
    const source = ev.source;
    const sourceName = source.name;

    const x = source.location.x;
    const y = source.location.y;
    const z = source.location.z;

    // Register all items that will trigger the antigrief.
    const trigger = ev.itemStack
    const triggerID = trigger.typeId

    // Registrej Date and Timee = world
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();

    if (triggerID == "minecraft:tnt") {
        // Register Logging
        const logEntry = `§m[ AntiGrief | WARN | ${time} | ${date} ]§c ${sourceName} placed ${triggerID} at §2X: ${x} §eY: ${y} §1Z: ${z}`

        console.warn(logEntry);
        antiGriefBuffer.push(logEntry);
        logBuffer.push(logEntry);
        saveLogs();

    }
    if (triggerID == "minecraft:tnt_minecart") {
        // Register Logging
        const logEntry = `§m[ AntiGrief | WARN | ${time} | ${date} ]§c ${sourceName} placed ${triggerID} at §2X: ${x} §eY: ${y} §1Z: ${z}`

        console.warn(logEntry);
        antiGriefBuffer.push(logEntry);
        logBuffer.push(logEntry);
        saveLogs();

    }
    if (triggerID == "minecraft:lava_bucket") {
        // Register Logging
        const logEntry = `§m[ AntiGrief | WARN | ${time} | ${date} ]§c ${sourceName} placed ${triggerID} at §2X: ${x} §eY: ${y} §1Z: ${z}`

        console.warn(logEntry);
        antiGriefBuffer.push(logEntry);
        logBuffer.push(logEntry);
        saveLogs();

    }
    if (triggerID == "minecraft:flint_and_steel") {
        // Register Logging
        const logEntry = `§m[ AntiGrief | WARN | ${time} | ${date} ]§c ${sourceName} placed ${triggerID} at §2X: ${x} §eY: ${y} §1Z: ${z}`

        console.warn(logEntry);
        antiGriefBuffer.push(logEntry);
        logBuffer.push(logEntry);
        saveLogs();

    }
    if (triggerID == "minecraft:end_crystal") {
        // Register Logging
        const logEntry = `§m[ AntiGrief | WARN | ${time} | ${date} ]§c ${sourceName} placed ${triggerID} at §2X: ${x} §eY: ${y} §1Z: ${z}`

        console.warn(logEntry);
        antiGriefBuffer.push(logEntry);
        logBuffer.push(logEntry);
        saveLogs();

    }
    if (triggerID == "minecraft:fire_charge") {
        // Register Logging
        const logEntry = `§m[ AntiGrief | WARN | ${time} | ${date} ]§c ${sourceName} placed ${triggerID} at §2X: ${x} §eY: ${y} §1Z: ${z}`

        console.warn(logEntry);
        antiGriefBuffer.push(logEntry);
        logBuffer.push(logEntry);
        saveLogs();
    }
}) 
