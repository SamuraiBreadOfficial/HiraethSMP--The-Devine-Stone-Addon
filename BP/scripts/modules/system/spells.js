import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";

system.beforeEvents.startup.subscribe(e => {
    e.itemComponentRegistry.registerCustomComponent('hsmp:spell_book', {
        onUse(e) {
            const source = e.source
            const pName = source.name

            function getCurrentSpell(source) {
                if (source.hasTag('fireSpell1')) return '§cFire Ball';
                if (source.hasTag('fireSpell2')) return 'FireSpell2';
                if (source.hasTag('fireSpell3')) return 'FireSpell3';
                if (source.hasTag('fireSpell4')) return 'FireSpell4';
                if (source.hasTag('fireSpell5')) return 'FireSpell5';
                return 'No Spells Selected'
            }

            function getUserSpellType(source) {
                if (source.hasTag('fire')) {
                    return new ActionFormData()
                        .title('')
                        .body('Work In Progress')
                        .divider()
                        .header(`§cFire Spells`)
                        .label(`${pName}, you are an §cDance of Flames§r mage!

Current Spell: ${getCurrentSpell(source)}`)
                        .button('Back')
                        .show(source).then(r => {
                            switch (r.selection) {
                                case 0:
                                    source.sendMessage('Case 0')
                                    console.warn(`${pName} triggered case 0`)
                                    break;

                                default:
                                    break;
                            }
                        })
                };

                if (source.hasTag('air')) {
                    return new ActionFormData()
                        .title('Air')
                        .body('Work In Progress')
                        .button('Back')
                        .show(source).then(r => {
                            switch (r.selection) {
                                case 0:
                            }
                        })
                };

                if (source.hasTag('soil')) {
                    return new ActionFormData()
                        .title('Soil')
                        .body('Work in progress')
                        .button('back')
                }
                else e.source.sendMessage('No spell type.')
            }


            if (source.isSneaking) {
                getUserSpellType(source)

            }
            if (!source.isSneaking) {
                if (source.hasTag('fire')) {
                    if (source.hasTag('fireSpell1')) {
                        const pos = source.location;
                        const dir = source.getViewDirection();

                        const spawnX = pos.x + dir.x * 2;
                        const spawnY = pos.y + dir.y * 2;
                        const spawnZ = pos.z + dir.z * 2;

                        const summonCmd = `summon hsmp:fire_ball ${spawnX} ${spawnY} ${spawnZ} ~ ~ ~ {Motion:[${dir.x},${dir.y},${dir.z}]}`;

                        source.runCommand(summonCmd);
                    }
                    if (source.hasTag('fireSpell2')) {

                    }
                    if (source.hasTag('fireSpell3')) {

                    }
                    if (source.hasTag('fireSpell4')) {

                    }
                    if (source.hasTag('fireSpell5')) {

                    }
                    else {
                        source.sendMessage('[ FIRE ] No spells selected!')
                    }
                }
            }
        }
    })
})