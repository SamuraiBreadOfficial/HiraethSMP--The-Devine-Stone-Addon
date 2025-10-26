console.warn("§d[HIRAETH]§r Loading scripts/system/quests/main/core.js");
import { world, system } from "@minecraft/server";
import { formatCurrency } from "../../../formats.js"

export const questTags = {
    freshly_awoken: {
        tag: "hsmp_quest_freshly_awoken",
        name: '§eFreshly Awoken.§r',
        startProgression: `§410%%§r`,
        description: 'Go to the local §etavern§r and ask a worker there about this place.',
        cashReward: 500000,
        achievementReward: `§aAnd thus, it begins.§r`,
        achievementID: "quest_complete_fawoken",
        allRewards() {
            return `§e${formatCurrency(this.cashReward)}\$§r + Achievement: §a${this.achievementReward}§r`
        }
    }
}

export async function registeredQuestNames(player) {
    for (const quest of Object.values(questTags)) {
        if (player.hasTag(quest.tag)) return quest;
    }
    return {
        name: '§oNo quests Activated.',
        description: `It's so quiet here...`,
        allRewards() {
            return "May your wallet rest in peace..."
        }
    }
}