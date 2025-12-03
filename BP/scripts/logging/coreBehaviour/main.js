import { system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

export function addLogEntry(id = "watchdog", entry) {
    let currentLog = world.getDynamicProperty(id);
    let logArray = [];

    if (currentLog) {
        try { logArray = JSON.parse(currentLog) } catch { logArray = []; }
    }

    logArray.push(entry)

    world.setDynamicProperty(id, JSON.stringify(logArray));
}

export function getFullLog(id = "watchdog") {
    const currentLog = world.getDynamicProperty(id);
    if (!currentLog) return [];
    try { return JSON.parse(currentLog); } catch { return []; }
}

export function showLastNumLogs(player, num = 5, id = "watchdog") {
    const logArray = getFullLog(id);
    const lastLogs = logArray.slice(-num).reverse();

    const form = new ActionFormData()
        .title("Watchdog Log")
        .body(`Last ${num} watchdog entries:`);

    lastLogs.forEach(entry => form.label(entry));

    form.show(player);
}
