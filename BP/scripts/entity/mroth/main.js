import { system, world } from "@minecraft/server";



system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const mroths = world.getDimension("overworld").getEntities({ type: "hsmp:mroth_pos" });
        if (mroths.length === 0) continue;

        // znajdź najbliższego Mrotha
        let nearest = null;
        let nearestDist = Infinity;
        for (const mroth of mroths) {
            const dx = player.location.x - mroth.location.x;
            const dy = player.location.y - mroth.location.y;
            const dz = player.location.z - mroth.location.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearest = mroth;
            }
        }

        // teraz sprawdzamy tylko względem najbliższego
        const { x, y, z } = player.location;
        const mrothLoc = nearest.location;

        const inInstaSeekArea =
            x >= mrothLoc.x - 5 && x <= mrothLoc.x + 5 &&
            y >= mrothLoc.y - 5 && y <= mrothLoc.y + 5 &&
            z >= mrothLoc.z - 5 && z <= mrothLoc.z + 5;

        const inDangerArea =
            x >= mrothLoc.x - 20 && x <= mrothLoc.x + 20 &&
            y >= mrothLoc.y - 20 && y <= mrothLoc.y + 20 &&
            z >= mrothLoc.z - 20 && z <= mrothLoc.z + 20;

        const inSneakArea =
            x >= mrothLoc.x - 30 && x <= mrothLoc.x + 30 &&
            y >= mrothLoc.y - 30 && y <= mrothLoc.y + 30 &&
            z >= mrothLoc.z - 30 && z <= mrothLoc.z + 30;

        // wyczyść stare tagi
        player.removeTag("inSneakArea");
        player.removeTag("inDangerArea");
        player.removeTag("inInstaSeekArea");

        // nadaj tylko jeden tag wg hierarchii
        const obj = world.scoreboard.getObjective('mrothDangerLevel');
        const score = obj.getScore(player);

        if (!obj.getScore(player)) { obj.addScore(player, 0) }

        const isSneaking = player.isSneaking;
        if (inInstaSeekArea) {
            if (!obj.hasParticipant(player)) obj.setScore(player, 0);
            player.addTag(`inInstaSeekArea`)

            if (isSneaking && score < 100) {
                obj.addScore(player, 1)
            } else if (!isSneaking && score < 100) {
                obj.addScore(player, 10)
            }
        } else if (inDangerArea) {
            if (!obj.hasParticipant(player)) obj.setScore(player, 0);
            player.addTag(`inDangerArea`)
            if (isSneaking && score > 0) {
                obj.addScore(player, -1)
            } else if (!isSneaking && score < 100) {
                obj.addScore(player, 5)
            }
        } else if (inSneakArea) {
            if (!obj.hasParticipant(player)) obj.setScore(player, 0);
            player.addTag(`inSneakArea`)
            if (isSneaking && score > 0) {
                obj.addScore(player, -5)
            } else if (!isSneaking && score < 100) {
                obj.addScore(player, 1)
            }

        }
    }
}, 5);


system.runInterval(() => {
    for (const entity of world.getDimension(`overworld`).getEntities()) {
        if (entity.typeId == "hsmp:mroth_pos") {
            world.getDimension(`overworld`).playSound('hsmp_mob.mroth.growl', entity.location, { pitch: Math.random(0.9, 1), volume: 1 })
            world.getDimension(`overworld`).spawnParticle("hsmp:mroth", entity.location)
        }
    }
}, 500)

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (player.hasTag(`inSneakArea`)) {
            player.playSound(`hsmp_warn.mroth`)
        }
    }
}, 100)

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (player.hasTag(`inDangerArea`)) {
            player.playSound(`hsmp_warn.mroth`)
        }
    }
}, 40)

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (player.hasTag(`inInstaSeekArea`)) {
            player.playSound(`hsmp_warn.mroth`)
        }
    }
}, 15)