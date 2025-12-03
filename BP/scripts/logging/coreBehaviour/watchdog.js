import { system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import { addLogEntry } from "./main.js"

world.afterEvents.itemUse.subscribe(e => {
    const item = e.itemStack;
    const player = e.source;

    const pName = player.name;

    const x = player.location.x;
    const y = player.location.y;
    const z = player.location.z;


    const day = new Date().getDate()
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hour = String(new Date().getHours()).padStart(2, "0");
    const minutes = String(new Date().getMinutes()).padStart(2, "0");
    const time = `${hour + ":" + minutes + " | " + day + " / " + month + " / " + year}`;


    if (item.typeId == "minecraft:flint_and_steel") {
        const logEntry = `[ §l§cWATCHDOG§r | ${time} ] §e${pName}§r used ${item.typeId} at localization of: x: ${x + " y: " + y + " z: " + z}.`

        addLogEntry("watchdog", logEntry);
        console.warn(logEntry);
    }
})

world.afterEvents.playerPlaceBlock.subscribe(e => {
    const player = e.player;
    const pName = e.player.name;
    const block = e.block;
    const blockID = block.typeId;

    const x = block.location.x;
    const y = block.location.y;
    const z = block.location.z;

    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const hour = new Date().getHours()
    const minutes = new Date().getMinutes()
    const time = `${hour + ":" + minutes + " | " + day + " / " + month + " / " + year}`

    if (blockID == "minecraft:tnt") {
        const logEntry = `¤ [ §l§cWATCHDOG§r | ${time} ] §e${pName}§r placed a block ${blockID} at localization of: x: ${x + " y: " + y + " z: " + z}.`

        addLogEntry("watchdog", logEntry)
        console.warn(logEntry)
    }
})

world.afterEvents.blockExplode.subscribe(e => {
    const x = e.source.location.x;
    const y = e.source.block.location.y;
    const z = e.source.block.location.z;


    world.sendMessage(`${e.source}  x: ${x + " y: " + y + " z: " + z}.`)
})