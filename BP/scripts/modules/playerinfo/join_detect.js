import { system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import { hiraethLOGO } from './utils.js';

world.afterEvents.playerSpawn.subscribe(e => {
    const p = e.player

    if (!p.hasTag('joined')) {
        world.sendMessage(`[ First Join ] ${p.name} joined for the first time!
        
Welcome to ${hiraethLOGO}!`)
        p.addTag('joined')
        welcomeMessage(p)
    }
    if (!p.hasTag(`autoupdater_v1_0_0`)) {
        p.sendMessage(`[ §cAUTOUPDATER§r ] If you're on our official Realm, ignore this message.
        
 To experience new structures and NPCs, please download and activate Hiraeth Auto-Updater.

This addon automatically places structures, spawns entities, and works seamlessly alongside the main addon.

Visit our Discord or website to get it for free.`)
    }

})


async function welcomeMessage(player) {
    const welcome = await new ActionFormData()
        .title(`Join`)
        .body(`v1.0 || ID: welcomeMessage`)
        .divider()
        .header(`HiraethSMP`)
        .divider()
        .label(`§l§eWelcome to HiraethSMP!§r§f
        
If you are not on our §l§9discord§r§f, leave the Realm and join the Discord first, otherwise you will be §4banned without an appeal§r§f!

You can read §dHiraethSMP§r§f Wiki here:
§o§bhttps://hiraethsmp.github.io/wiki.html§r

You can check §elatest changes and plans§r§f here:
§o§bhttps://hiraethsmp.github.io/server&addon.html§r§f

You can §eread our guides§r§f here:
§o§bhttps://hiraethsmp.github.io/how-to.html§r`)
        .button(`START`)
        .show(player)
    if (welcome.selection == 0) {
        player.runCommand(`/start`) // Custom Addon command
    }

    if (welcome.canceled) welcomeMessage(player);
}