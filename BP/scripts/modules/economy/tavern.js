console.warn("§d[HIRAETH]§r Loading scripts/modules/economy/tavern.js");


import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { formatCurrency, waitTicks, typeActionbar, textFormats } from "../../formats.js"
import { questTags } from "./../../system/quests/main/core.js"

import { tavern_firstEncounter } from "../../system/quests/chapters/prologue/fawoken.js"

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:tavern', {
        onPlayerInteract(e) {
            const player = e.player
            if (player.hasTag(`quest_fawoken`)) {
                tavern_firstEncounter(player)
            }
        }
    })
})

