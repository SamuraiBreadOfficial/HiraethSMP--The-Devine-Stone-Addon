console.warn("§d[HIRAETH]§r Loading scripts/blocks/store_doors.js");

import { world, system } from "@minecraft/server"

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:butcher_door', {
        onPlayerInteract(e) {
            const time = world.getTimeOfDay();
            const player = e.player;
            const inLocation = { x: 167, y: 66, z: 1983 }
            const outLocation = { x: 164, y: 66, z: 1983 }
            const locTag = `inButcherLocation`

            if (!player.hasTag(locTag)) {
                if (time >= 1000 && time <= 13000) {
                    player.runCommand(`hud @s hide all`)
                    player.runCommand('camera @s fade time 1 1 1')
                    player.addTag(locTag)
                    player.runCommand(`playsound random.door_open @s ~ ~ ~ 1 0.5 1`)
                    system.runTimeout(() => {
                        player.teleport(inLocation, world.getDimension('overworld'))
                    }, 20)
                    system.runTimeout(() => {
                        player.runCommand(`playsound random.door_close @s ~ ~ ~ 1 0.5 1`)
                        player.runCommand(`hud @s reset`)
                    }, 40)
                } else {
                    player.sendMessage('The butcher is currently closed.\n\nOn the door there is a paper with:\n\nOpen 7:00 - 19:00 Every Day.')

                }
            }
            else if (player.hasTag(locTag)) {
                player.runCommand(`hud @s hide all`)

                player.runCommand('camera @s fade time 1 1 1')
                player.removeTag(locTag)
                player.runCommand(`playsound random.door_open @s ~ ~ ~ 1 0.5 1`)
                system.runTimeout(() => {
                    player.teleport(outLocation, world.getDimension('overworld'))
                }, 20)
                system.runTimeout(() => {
                    player.runCommand(`playsound random.door_close @s ~ ~ ~ 1 0.5 1`)
                    player.runCommand(`hud @s reset`)

                }, 40)

            }
        }
    })
})

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:restaurant_door', {
        onPlayerInteract(e) {
            const inLocation = { x: 189, y: 28, z: 1974 };
            const inRotation = { x: 90, y: 0 };
            const outLocation = { x: 195, y: 71, z: 1972 };
            const outRotatiom = { x: 180, y: 0 };
            const player = e.player;


            const dimension = world.getDimension('overworld');
            const locationTag = 'inRestaurantLocation';
            const time = world.getTimeOfDay();

            if (!player.hasTag(locationTag)) {
                if (time >= 3000 && time <= 16000) {
                    player.addTag(locationTag);
                    player.runCommand('hud @s hide all');
                    player.playSound("random.door_open", {
                        pitch: 0.5,
                        volume: 1
                    })
                    player.camera.fade({
                        fadeTime: {
                            fadeInTime: 1,
                            holdTime: 1,
                            fadeOutTime: 1
                        }
                    })

                    system.runTimeout(() => {
                        player.teleport(inLocation, dimension)
                    }, 20)

                    system.runTimeout(() => {
                        player.playSound("random.door_close", {
                            pitch: 0.5,
                            volume: 1
                        })
                        player.runCommand('hud @s reset')
                    }, 40)
                } else {
                    player.sendMessage(`Restaurant currently Closed. Come back at 9:00`)
                }
            } else if (player.hasTag(locationTag)) {
                player.removeTag(locationTag);
                player.runCommand('hud @s hide all');
                player.playSound("random.door_open", {
                    pitch: 0.5,
                    volume: 1
                })
                player.camera.fade({
                    fadeTime: {
                        fadeInTime: 1,
                        holdTime: 1,
                        fadeOutTime: 1
                    }
                })

                system.runTimeout(() => {
                    player.teleport(outLocation, dimension)
                }, 20)

                system.runTimeout(() => {
                    player.playSound("random.door_close", {
                        pitch: 0.5,
                        volume: 1
                    })
                    player.runCommand('hud @s reset');
                    player.setRotation(outRotatiom)

                }, 40)

            }
        }
    })
})

system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:lumber_jack_door', {
        onPlayerInteract(e) {
            const inLocation = { x: 76, y: 66, z: 1882 };
            const inRotation = { x: 90, y: 0 };
            const outLocation = { x: 76, y: 66, z: 1886 };
            const outRotatiom = { x: 180, y: 0 };
            const player = e.player;

            const dimension = world.getDimension('overworld');
            const locationTag = 'inLumberLocation';
            const time = world.getTimeOfDay();

            if (!player.hasTag(locationTag)) {
                if (time >= 3000 && time <= 16000) {
                    player.addTag(locationTag);
                    player.runCommand('hud @s hide all');
                    player.playSound("random.door_open", {
                        pitch: 0.5,
                        volume: 1
                    })
                    player.camera.fade({
                        fadeTime: {
                            fadeInTime: 1,
                            holdTime: 1,
                            fadeOutTime: 1
                        }
                    })

                    system.runTimeout(() => {
                        player.teleport(inLocation, dimension)
                    }, 20)

                    system.runTimeout(() => {
                        player.playSound("random.door_close", {
                            pitch: 0.5,
                            volume: 1
                        })
                        player.runCommand('hud @s reset')
                    }, 40)
                } else {
                    player.sendMessage(`Restaurant currently Closed. Come back at 9:00`)
                }
            } else if (player.hasTag(locationTag)) {
                player.removeTag(locationTag);
                player.runCommand('hud @s hide all');
                player.playSound("random.door_open", {
                    pitch: 0.5,
                    volume: 1
                })
                player.camera.fade({
                    fadeTime: {
                        fadeInTime: 1,
                        holdTime: 1,
                        fadeOutTime: 1
                    }
                })

                system.runTimeout(() => {
                    player.teleport(outLocation, dimension)
                }, 20)

                system.runTimeout(() => {
                    player.playSound("random.door_close", {
                        pitch: 0.5,
                        volume: 1
                    })
                    player.runCommand('hud @s reset');
                    player.setRotation(outRotatiom)

                }, 40)

            }
        }
    })
})