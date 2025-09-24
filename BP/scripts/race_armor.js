import { system } from "@minecraft/server";

system.beforeEvents.startup.subscribe((e) => {
    e.itemComponentRegistry.registerCustomComponent('hsmp:helmet_use', {
        onUse(e) {
            const p = e.source
            const elf = p.hasTag("elf")
            const halforc = p.hasTag('halforc')
            if (elf) {

                p.runCommand('clear @s hsmp:elf_ears')
                p.runCommand('clear @s hsmp:dark_elf_ears')
            }
        }
    })
});