import { system } from "@minecraft/server";
import { formatCurrency, textFormats, waitTicks, typeActionbar, typeTitleTitle, specialLang, translate } from "./../formats.js"

system.beforeEvents.startup.subscribe(e => {
    e.itemComponentRegistry.registerCustomComponent('hsmp:witch_potions', {
        onCompleteUse(e) {

            const fireResistance = "hsmp:fire_resistance_witch_potion"
            const harming = "hsmp:harming_witch_potion"
            const healing = "hsmp:healing_witch_potion"
            const invisibility = "hsmp:invisibity_witch_potion"
            const leaping = "hsmp:leaping_witch_potion"
            const nightVision = "hsmp:nightvision_witch_potion"
            const poison = "hsmp:poison_witch_potion"
            const regen = "hsmp:regen_witch_potion"
            const slowness = "hsmp:slowness_witch_potion"
            const strength = "hsmp:strength_witch_potion"
            const swiftness = "hsmp:swiftness_witch_potion"
            const weakness = "hsmp:weakness_witch_potion"
            const item = e.itemStack
            const player = e.source
            player.runCommand(`title @s times 0 20 10`)
            player.startItemCooldown("hsmp:store_exclusive", 200)

            if (item.typeId == fireResistance) {
                player.sendMessage(`FireRes`)
                player.addEffect("fire_resistance", 9600, {
                    amplifier: 3,
                    showParticles: true
                })
            }
            if (item.typeId == harming) {
                player.sendMessage(`harming`)
                player.applyDamage(10, {
                    cause: "magic"
                })
            }
            if (item.typeId == healing) {
                player.sendMessage(`heal`)
                player.addEffect("instant_health", 9600, {
                    amplifier: 3,
                    showParticles: true
                })
            }
            if (item.typeId == invisibility) {
                player.sendMessage(`invis`)
                player.addEffect("invisibility", 9600, {
                    amplifier: 1,
                    showParticles: false
                })
            }
            if (item.typeId == leaping) {
                player.addEffect(`jump_boost`, 9600, {
                    amplifier: 3,
                    showParticles: true
                })

            }
            if (item.typeId == nightVision) {
                player.sendMessage(`nightvis`)
                player.addEffect("night_vision", 9600, {
                    amplifier: 1,
                    showParticles: false
                })
            }
            if (item.typeId == poison) {
                player.sendMessage(`poison`)
                player.addEffect("fatal_poison", 9600, {
                    amplifier: 3,
                    showParticles: true
                })

            }
            if (item.typeId == regen) {
                player.sendMessage(`regen`)
                player.addEffect('regeneration', 9600, {
                    amplifier: 3,
                    showParticles: true
                })

            }
            if (item.typeId == slowness) {
                player.sendMessage(`slowness`)
                player.addEffect('slowness', 9600, {
                    amplifier: 3,
                    showParticles: true
                })

            }
            if (item.typeId == strength) {
                player.sendMessage(`strength`)
                player.addEffect('strength', 9600, {
                    amplifier: 3,
                    showParticles: true
                })

            }
            if (item.typeId == swiftness) {
                player.sendMessage(`swift`)
                player.addEffect('speed_boost', 9600, {
                    amplifier: 3,
                    showParticles: false
                })

            }
            if (item.typeId == weakness) {
                player.sendMessage(`weakness`)
                player.addEffect('weakness', 9600, {
                    amplifier: 3,
                    showParticles: true
                })

            }
        }
    })
})