import { world, system } from "@minecraft/server";


system.runInterval(() => {
    const time = world.getTimeOfDay();
    const strike6 = `hsmp.church.6`
    const strike12 = `hsmp.church.12`
    const overworld = world.getDimension('overworld')
    const bellLoc = '207 87 1929'

    if (time == 0) {
        overworld.runCommand(`playsound ${strike6} @a ${bellLoc} 1 1 1`)
    } else if (time == 6000) {
        overworld.runCommand(`playsound ${strike12} @a ${bellLoc} 1 1 1`)
    } else if (time == 12000) {
        overworld.runCommand(`playsound ${strike6} @a ${bellLoc} 1 1 1`)
    } else if (time == 18000) {
        overworld.runCommand(`playsound ${strike12} @a ${bellLoc} 1 1 1`)
    }
}, 1)