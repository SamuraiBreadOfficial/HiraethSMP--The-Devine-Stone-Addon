console.warn("§d[HIRAETH]§r Loading scripts/modules/economy/economy-scoreboards.js");


import { world } from "@minecraft/server"

export function getScore(player, objectiveName) {
    const objective = world.scoreboard.getObjective(objectiveName);

    const score = objective.getScore(player);

    return score ?? 0;
}

export function hasScore(player, objectiveName) {
    const objective = world.scoreboard.getObjective(objectiveName);
    if (!objective) return false;

    const score = objective.getScore(player);
    return score !== undefined;
}

export function isScoreRegistered(player, objectiveName) {
    const objective = world.scoreboard.getObjective(objectiveName);
    if (!objective) return false;

    return objective.hasParticipant(player);
}