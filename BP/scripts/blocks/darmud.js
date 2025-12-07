import { world, system, Player, EntityApplyDamageOptions } from "@minecraft/server"
import { typeTitleTitle, typeTitleSubtitle, waitTicks } from "../formats.js"

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent(`hsmp:darmud`, {
        async onStepOn(e) {
            const entity = e.entity;
            if (entity instanceof Player) {
                entity.addEffect(`slowness`, 100, {
                    amplifier: 1,
                    showParticles: false
                })
                if (!entity.hasTag(`on_darmud`)) {
                    entity.runCommand(`fog @s push hsmp:mroth_ambient mroth`)
                    entity.runCommand(`playsound hsmp_ambient.mroth @s`)
                    entity.addTag(`on_darmud`)
                    typeTitleTitle(entity, `Entering`)
                    typeTitleSubtitle(entity, `§cMroth Territory`)

                }
                if (!entity.hasTag(`mroth_tip`)) {
                    entity.addTag(`mroth_tip`)
                    await waitTicks(60)

                    entity.sendMessage(`Tip: Mroths

Mroths, although invisible their energy manifests with black particles.
If you hear:
a) Heartbeat
b) Sound
c) Crying Child
Sneak instantly to avoid getting killed by those creatures.

You can't defeat them, as energy that they exist from cannot be destroyed physically or magically.`)
                }
            }
        },
        async onStepOff(e) {
            const entity = e.entity;
            if (entity instanceof Player) {

                const px = entity.location.x;
                const py = entity.location.y;
                const pz = entity.location.z;

                const block = world.getDimension('overworld').getBlock({ x: px, y: py, z: pz });

                if (block.typeId != "hsmp:darmud") {
                    entity.removeTag(`on_darmud`)
                    entity.runCommand(`fog @s pop mroth`)
                    entity.runCommand(`stopsound @s hsmp_ambient.mroth`)
                } else return;
            }
        }
    })
})

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        player.runCommand(`stopsound @s hsmp_ambient.mroth`)
        player.runCommand(`playsound hsmp_ambient.mroth @s[tag=on_darmud]`)
    }
}, 2556)