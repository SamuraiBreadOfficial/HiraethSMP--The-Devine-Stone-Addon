import { world, system } from "@minecraft/server";


system.runInterval(() => {

    for (const player of world.getAllPlayers()) {
        const time = world.getTimeOfDay();
        const strike6 = `hsmp.church.6`
        const strike12 = `hsmp.church.12`
        const bellLoc = '207 87 1929'

        if (!player.hasTag(`townBell_muted`)) {
            if (time == 0) {
                player.runCommand(`playsound ${strike6} @a ${bellLoc} 1 1 1`)
            } else if (time == 6000) {
                player.runCommand(`playsound ${strike12} @a ${bellLoc} 1 1 1`)
            } else if (time == 12000) {
                player.runCommand(`playsound ${strike6} @a ${bellLoc} 1 1 1`)
            } else if (time == 18000) {
                player.runCommand(`playsound ${strike12} @a ${bellLoc} 1 1 1`)
            }
        }
    }
}, 1);