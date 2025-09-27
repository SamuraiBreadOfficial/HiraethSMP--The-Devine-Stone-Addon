import { system, world, ItemStack } from "@minecraft/server";

const p = e.source
const elf = p.hasTag("elf")
const halforc = p.hasTag('halforc')
const human = p.hasTag('human')

system.beforeEvents.startup.subscribe((e) => {
    e.itemComponentRegistry.registerCustomComponent('hsmp:helmet_use', {
        onUse(e) {
            if (elf) {

                p.runCommand('clear @s hsmp:elf_ears')
                p.runCommand('clear @s hsmp:dark_elf_ears')
            }
        }
    })
});

world.afterEvents.itemUse.subscribe(e => {
    const p = e.source;
    const i = e.itemStack.typeId;
    const inv = p.getComponent("minecraft:inventory")?.container;
    const slot = p.selectedSlotIndex;
    const elfLHelmID = "hsmp:elf_leather_armor_helmet";

    if (p.hasTag("elf") && i === "minecraft:leather_helmet") {
        system.run(() => {
            const originalItem = inv.getItem(slot);
            if (!originalItem) return;

            const enchComp = originalItem.getComponent("minecraft:enchantments");
            const enchantments = enchComp?.enchantments;

            const elfHelmet = new ItemStack(elfLHelmID, 1);

            if (enchantments && enchantments.length > 0) {
                elfHelmet.setComponent("minecraft:enchantments", {
                    enchantments: enchantments.map(e => ({ id: e.id, level: e.level }))
                });
            }

            inv.setItem(slot, elfHelmet);
            console.warn("Set Helmet to Race Defined")
        });
    };
    if (p.hasTag('halforc') && i == "minecraft:leather_armor") {
        system.run(() => {
            p.sendMessage("§cThis Function is Not Yet Supported in Your Case. Please come back later!")
        })
    }
});