import { world } from "@minecraft/server";

world.afterEvents.entityDie.subscribe((event) => {
    const entity = event.deadEntity;


    if (!entity || entity.typeId !== "minecraft:player") return;

    const balanceObjective = world.scoreboard.getObjective("balance");
    if (!balanceObjective) return;

    balanceObjective.setScore(entity, 0);
    entity.sendMessage("§m/!\\ Your balance has been cleared due to death.\n\nTo avoid this kind of situation, make sure to deposit your balance to bank in Main Menu!");
    console.warn('[ DEATH ]' + entity.nameTag + 'Lost his Balance!')
});