import { system, world, ItemStack } from "@minecraft/server";

system.beforeEvents.startup.subscribe((e) => {
    e.itemComponentRegistry.registerCustomComponent('hsmp:helmet_use', {
        onUse(e) {
            const p = e.source
            const elf = p.hasTag("elf")
            const halforc = p.hasTag('halforc')
            const human = p.hasTag('human')

            if (elf) {
                p.runCommand('clear @s hsmp:elf_ears')
                p.runCommand('clear @s hsmp:dark_elf_ears')
            }
            if (halforc) {
                p.runCommand('clear @s hsmp:half_orc_fne')
            }
        }
    })
});

world.afterEvents.itemUse.subscribe(e => {
    const p = e.source;
    const i = e.itemStack.typeId;
    const inv = p.getComponent("minecraft:inventory")?.container;
    const slot = p.selectedSlotIndex;
    const raceHelmetMap = {
        elf: {
            "minecraft:leather_helmet": "hsmp:elf_leather_armor_helmet"
        },
        halforc: {
            "minecraft:leather_helmet": "hsmp:half_orc_leather_helmet",
            "minecraft:iron_helmet": "hsmp:half_orc_iron_helmet"
        }
    };

    for (const race in raceHelmetMap) {
        if (p.hasTag(race) && raceHelmetMap[race][i]) {
            system.run(() => {
                const originalItem = inv.getItem(slot);
                if (!originalItem) return;

                const enchComp = originalItem.getComponent("minecraft:enchantments");
                const enchantments = enchComp?.enchantments;

                const newHelmetID = raceHelmetMap[race][i];
                const newHelmet = new ItemStack(newHelmetID, 1);

                if (enchantments && enchantments.length > 0) {
                    newHelmet.setComponent("minecraft:enchantments", {
                        enchantments: enchantments.map(e => ({ id: e.id, level: e.level }))
                    });
                }

                inv.setItem(slot, newHelmet);
                console.warn(`Set Helmet to ${race} Defined`);
            });
            return; // zakończ po pierwszym dopasowaniu
        }
    }

    // fallback dla nieobsługiwanych przypadków
    if (p.hasTag("halforc") && i === "minecraft:leather_armor") {
        system.run(() => {
            p.sendMessage("§cThis Function is Not Yet Supported in Your Case. Please come back later!");
        });
    }
});