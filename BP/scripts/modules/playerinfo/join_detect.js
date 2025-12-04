import { system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import { hiraethLOGO } from './utils.js';

world.afterEvents.playerSpawn.subscribe(e => {
    const p = e.player

    if (!p.hasTag('joined')) {
        world.sendMessage(`§a${p.name}§e joined §dHiraeth§e for the first time!`)
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
        .label(`§l§eWelcome to Hiraeth!§r§f
        
To play on our realm you will need to setup your character.

This means you will need to:
▪ Choose your Race;
▪ Choose your Gender;
▪ Choose your Skill type;
▪ Accept our Content Warning (C.W for short) info;
▪ Verify and accept our Realm & Addon rules.

Please be adviced, if you do not accept rules and CW your access will be blocked.`)
        .divider()
        .label(`▪ To begin, click on §lStart§r button.`)
        .button(`§lSTART`)
        .show(player)
    if (welcome.selection == 0) {
        player.runCommand(`/start`) // Custom Addon command
    }

    if (welcome.canceled) welcomeMessage(player);
}