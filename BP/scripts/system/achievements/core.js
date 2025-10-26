console.warn("§d[HIRAETH]§r Loading scripts/system/achievements/core.js");

import { system, world } from "@minecraft/server";

export const achievemntTags = {
    "quest_complete_fawoken": "And thus it begins...",
    "quest_complete_prep": "Great Preparations.",
    "quest_complete_royalty": "Wow.. Royality.",
    "quest_complete_magic": "Oooh.. Shiny book!",
    "quest_complete_fasttravel": "ON THE BOAT YA RATS ARGHH!"
}

export function getAchievements(player) {
    const list = []

    for (const [tag, name] of Object.entries(achievemntTags)) {

        if (player.hasTag(tag)) {
            const timestamp = player.getDynamicProperty(`${tag}_date`)
            const date = timestamp ? new Date(timestamp).toLocaleDateString() : null;
            list.push({ name, date });
        }
    }
    return list;

}