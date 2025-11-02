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
                typeTitleTitle(player, textFormats.deco.bold + textFormats.deco.italic + textFormats.colors.redstone + translate(`our fire is your shield`), 3, "mob.blaze.breathe", 0.5)
            }
            if (item.typeId == harming) {
                player.sendMessage(`harming`)
                typeTitleTitle(player, textFormats.colors.dark_red + translate(`your pain will \n not fix your flame`), 3, "mob.blaze.breathe", 0.5)
            }
            if (item.typeId == healing) {
                player.sendMessage(`heal`)
                typeTitleTitle(player, textFormats.deco.bold + textFormats.colors.redstone + translate(`may gods heal your heart`))
            }
            if (item.typeId == invisibility) {
                player.sendMessage(`invis`)
                typeTitleTitle(player, translate(`shall they never \n see the truth`))
            }
            if (item.typeId == leaping) {
                player.sendMessage(`leaping`)
                typeTitleTitle(player, translate(`the higher the soul \n the more they will see`))

            }
            if (item.typeId == nightVision) {
                player.sendMessage(`nightvis`)
                typeTitleTitle(player, translate(`upon darkness , you must see \n what is hidden , \n underneath`))
            }
            if (item.typeId == poison) {
                player.sendMessage(`poison`)
                typeTitleTitle(player, translate(`and shall they die in pain \n so we can live \n another day`))

            }
            if (item.typeId == regen) {
                player.sendMessage(`regen`)

            }
            if (item.typeId == slowness) {
                player.sendMessage(`slowness`)

            }
            if (item.typeId == strength) {
                player.sendMessage(`strength`)

            }
            if (item.typeId == swiftness) {
                player.sendMessage(`swift`)

            }
            if (item.typeId == weakness) {
                player.sendMessage(`weakness`)

            }
        }
    })
})