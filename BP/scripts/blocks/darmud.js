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
                if (!entity.isSneaking) {
                    entity.applyDamage(1, {
                        cause: "none"
                    })
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
        }
    })
})

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        player.runCommand(`stopsound @s hsmp_ambient.mroth`)
        player.runCommand(`playsound hsmp_ambient.mroth @s[tag=on_darmud]`)
    }
}, 2556)
