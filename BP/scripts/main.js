import { world, system } from "@minecraft/server";

system.beforeEvents.startup.subscribe((e) => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:play_button', {
        onPlayerInteract(e)
    })
})

