import { system } from "@minecraft/server";

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

            if (item.typeId == fireResistance) {
                player.sendMessage(`FireRes`)
            }
            if (item.typeId == harming) {
                player.sendMessage(`harming`)
            }
            if (item.typeId == healing) {
                player.sendMessage(`heal`)
            }
            if (item.typeId == invisibility) {
                player.sendMessage(`invis`)
            }
            if (item.typeId == leaping) {
                player.sendMessage(`leaping`)

            }
            if (item.typeId == nightVision) {
                player.sendMessage(`nightvis`)

            }
            if (item.typeId == poison) {
                player.sendMessage(`poison`)

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