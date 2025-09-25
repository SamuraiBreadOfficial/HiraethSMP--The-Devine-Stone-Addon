import { system, world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

system.beforeEvents.startup.subscribe((e) => {
    e.itemComponentRegistry.registerCustomComponent('hsmp:ig_menu', {
        onUse(e) {
            const source = e.source
            const playerName = e.source.name



            const ig_menu = new ActionFormData()
                .title('HiraethSMP Menu')
                .body('Hello §l§e' + playerName + '§r!')
                .label(
                    'What you want to check today? :D')
                .divider()
                .label('Player Information')
                .button('Faction')
                .button('Race')
                .divider()
                .label('System')
                .button('Settings')
                .divider()
                .label('Economy')
                .button('Your Balance')
                .button('Server Market')
                .button('Player Market')

            function getFactionName(source) {
                if (source.hasTag('moonset_faction')) return '§b§lMoonset§r';
                if (source.hasTag('stargaze_faction')) return '§l§9Stargaze§r';
                if (source.hasTag('sunrest_faction')) return '§p§lSunrest§r';
                if (source.hasTag('anemoiagaze_faction')) return '§t§lAnemoiagaze§r';
                return '§7§oNo Faction Selected§r';
            }

            function getFactionInfo(source) {
                if (source.hasTag('moonset_faction')) return '';
                if (source.hasTag('stargaze_faction')) return '';
                if (source.hasTag('sunrest_faction')) return '';
                if (source.hasTag('anemoiagaze_faction')) return '';
                return '§7§oNo Faction Found. Contact SamuraiBread or Any Staff Member with rank above Moderator§r';

            }

            function getSettingsEventSFXVolume(source) {
                if (source.hasTag('full_sfxvol')) return '§q100\%§r';
                if (source.hasTag('half_sfxvol')) return '§e50\%§r';
                if (source.hasTag('no_sfxvol')) return '§4Event SFX Muted§r';
            }

            function getSettingsEventMusicVolume(source) {
                if (source.hasTag('full_audiovol')) return '§q100\%§r';
                if (source.hasTag('half_audiovol')) return '§e50\%§r';
                if (source.hasTag('no_audiovol')) return '§4Event Music Muted§r';
            }

            function getSettingsEventVoiceVolume(source) {
                if (source.hasTag('full_voicevol')) return '§q100\%§r';
                if (source.hasTag('half_voicevol')) return '§e50\%§r';
                if (source.hasTag('no_voicevol')) return '§4Event Dialogue Muted§r';
            }

            function getSettingsJumpscareToogle(source) {
                if (source.hasTag('scare_full')) return '§qFull Jumpscares§r';
                if (source.hasTag('scare_minimum')) return '§eMinimum Jumpscares§r';
                if (source.hasTag('scare_disable')) return '§4Jumpscares Disabled§r';
            }

            function createSettingsMenu(source) {
                const esfx = getSettingsEventSFXVolume(source)
                const emusic = getSettingsEventMusicVolume(source)
                const edial = getSettingsEventVoiceVolume(source)
                const scare = getSettingsJumpscareToogle(source)

                return new ActionFormData()
                    .title(playerName + '\'s Settings')
                    .body('§e§lYour Settings§r:')
                    .divider()
                    .label('Event SFX: ' + esfx)
                    .button('Change')
                    .divider()
                    .label('Event Music: ' + emusic)
                    .button('Change')
                    .divider()
                    .label('Even Dialogues: ' + edial)
                    .button('Change')
                    .divider()
                    .label('Jumpscares: ' + scare)
                    .button('Change')
                    .divider()
                    .button('Back')
            }

            function settingsmenu_main(source) {
                createSettingsMenu(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            settingsmenu_esfx(source)
                            break;

                        case 1:
                            settingsmenu_emusic(source)
                            break;

                        case 2:
                            settingsmenu_edial(source)
                            break;

                        case 3:
                            settingsmenu_scare(source)
                            break;

                        case 4:
                            open_igmenu(source)
                            break;

                        default:
                            open_igmenu(source)
                            break;
                    }
                })
            }

            function changesettings_esfx(source) {
                const esfx = getSettingsEventSFXVolume(source)

                return new ActionFormData()
                    .title('Change SFX Volume')
                    .body('Your current volume:' + esfx)
                    .divider()
                    .label('§qFull Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('§eHalf Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('§mMute')
                    .button('Choose')
                    .divider()
                    .button('Cancel')
            }

            function settingsmenu_esfx(source) {
                changesettings_esfx(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 1 1 1");
                            settingsmenu_esfx(source);
                            break;

                        case 1:
                            source.addTag('full_sfxvol')
                            source.removeTag('half_sfxvol')
                            source.removeTag('no_sfxvol')
                            settingsmenu_main(source)
                            break;

                        case 2:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 0.3 1 0.3");
                            settingsmenu_esfx(source);
                            break;

                        case 3:
                            source.addTag('half_sfxvol')
                            source.removeTag('full_sfxvol')
                            source.removeTag('no_sfxvol')
                            settingsmenu_main(source)
                            break;

                        case 4:
                            source.addTag('no_sfxvol')
                            source.removeTag('full_sfxvol')
                            source.removeTag('half_sfxvol')
                            settingsmenu_main(source)
                            break;

                        default:
                            settingsmenu_esfx(source)
                            break;

                    }
                })
            }

            function changesettings_emusic(source) {
                const emusic = getSettingsEventMusicVolume(source)

                return new ActionFormData()
                    .title('Change Music Volume')
                    .body('Your current volume:' + emusic)
                    .divider()
                    .label('§qFull Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('§eHalf Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('§mMute')
                    .button('Choose')
                    .divider()
                    .button('Cancel')
            }

            function settingsmenu_emusic(source) {
                changesettings_emusic(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 1 1 1");
                            settingsmenu_emusic(source);
                            break;

                        case 1:
                            source.addTag('full_audiovol')
                            source.removeTag('half_audiovol')
                            source.removeTag('no_audiovol')
                            settingsmenu_main(source)
                            break;

                        case 2:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 0.3 1 0.3");
                            settingsmenu_emusic(source);
                            break;

                        case 3:
                            source.addTag('half_audiovol')
                            source.removeTag('full_audiovol')
                            source.removeTag('no_audiovol')
                            settingsmenu_main(source)
                            break;

                        case 4:
                            source.addTag('no_audiovol')
                            source.removeTag('full_audiovol')
                            source.removeTag('half_audiovol')
                            settingsmenu_main(source)
                            break;

                        case 5:
                            settingsmenu_main(source)
                            break;

                        default:
                            settingsmenu_emusic(source)
                            break;

                    }
                })
            }

            function changesettings_edial(source) {
                const edial = getSettingsEventVoiceVolume(source)

                return new ActionFormData()
                    .title('Change Dialogue Volume')
                    .body('Your current volume:' + edial)
                    .divider()
                    .label('§qFull Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('§eHalf Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('§mMute')
                    .button('Choose')
                    .divider()
                    .button('Cancel')
            }

            function settingsmenu_edial(source) {
                changesettings_edial(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 1 1 1");
                            settingsmenu_edial(source);
                            break;

                        case 1:
                            source.addTag('full_voicevol')
                            source.removeTag('half_voicevol')
                            source.removeTag('no_voicevol')
                            settingsmenu_main(source)
                            break;

                        case 2:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 0.3 1 0.3");
                            settingsmenu_edial(source);
                            break;

                        case 3:
                            source.addTag('half_voicevol')
                            source.removeTag('full_voicevol')
                            source.removeTag('no_voicevol')
                            settingsmenu_main(source)
                            break;

                        case 4:
                            source.addTag('no_voicevol')
                            source.removeTag('full_voicevol')
                            source.removeTag('half_voicevol')
                            settingsmenu_main(source)
                            break;

                        case 5:
                            settingsmenu_main(source)
                            break;

                        default:
                            settingsmenu_edial(source)
                            break;

                    }
                })
            }

            function changesettings_scare(source) {
                const scare = getSettingsJumpscareToogle

                return new ActionFormData()
                    .title('Change Music Volume')
                    .body('Your current volume:' + scare)
                    .divider()
                    .label('§qMaximum')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('§eMinimum')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('§mDisable')
                    .button('Choose')
                    .divider()
                    .button('Cancel')
            }

            function settingsmenu_scare(source) {
                changesettings_scare(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 1 1 1");
                            settingsmenu_scare(source);
                            break;

                        case 1:
                            source.addTag('scare_full')
                            source.removeTag('scare_minimum')
                            source.removeTag('scare_disable')
                            settingsmenu_main(source)
                            break;

                        case 2:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 0.3 1 0.3");
                            settingsmenu_scare(source);
                            break;

                        case 3:
                            source.addTag('scare_minimum')
                            source.removeTag('scare_full')
                            source.removeTag('scare_disable')
                            settingsmenu_main(source)
                            break;

                        case 4:
                            source.addTag('scare_disable')
                            source.removeTag('scare_full')
                            source.removeTag('scare_minimum')
                            settingsmenu_main(source)
                            break;

                        case 5:
                            settingsmenu_main(source)
                            break;

                        default:
                            settingsmenu_emusic(source)
                            break;

                    }
                })
            }


            function createPlayerFactionMenu(source) {
                const faction = getFactionName(source);
                const info = getFactionInfo(source);

                return new ActionFormData()
                    .title(playerName + '\'s Faction Menu')
                    .body(
                        'Your faction: ' + faction
                    )
                    .divider()
                    .label('Story')
                    .divider()
                    .label('' + info + '')
                    .divider()
                    .button('Back')
            }

            function getRace(source) {
                if (source.hasTag('human')) return '§eHuman';
                if (source.hasTag('elf')) return '§aElf';
                if (source.hasTag('halforc')) return '§mHalf Orc';
                return 'Error Found: No race detected. Contact SamuraiBread.';
            }


            function getCashScore(source, objectiveName) {
                const objective = world.scoreboard.getObjective(objectiveName);
                if (!objective) return 0;

                const cash = objective.getScore(source);
                return cash ?? 0;
            }

            function getBankScore(source, objectiveName) {
                const objective = world.scoreboard.getObjective(objectiveName);
                if (!objective) return 0;

                const bank = objective.getScore(source);
                return bank ?? 0;
            }


            function showPlayerInfo(source) {
                const race = getRace(source)
                const cash = getCashScore(source, "balance")

                return new ActionFormData()
                    .title(playerName + '\'s Info')
                    .body('Gamertag: §e' + playerName +
                        "§r\n\nBalance: §e" + cash + "$§r" + '\n\nRace: ' + race)
                    .button("Change Race Appearance")
                    .button('Back')

            }

            const elfCustomizationMenu = new ActionFormData()
                .title("Elf Customization")
                .body("Change your Ear Colour!")
                .button("Pale Ears")
                .button("Dark Ears")
                .divider()
                .button("Back");

            const halforcCustomizationMenu = new ActionFormData()
                .title('WIP')
                .body('Come back later. Currently Half Orc does not supports customalization')
                .button('Ok')

            function playerinfo(source) {
                showPlayerInfo(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            if (source.hasTag("elf")) {
                                elfCustomizationMenu.show(source).then((r) => {
                                    switch (r.selection) {
                                        case 0:
                                            source.addTag('elf_pale_ears');
                                            source.removeTag('elf_dark_ears');
                                            break;

                                        case 1:
                                            source.addTag('elf_dark_ears');
                                            source.removeTag('elf_pale_ears')
                                            break;

                                        case 2:
                                            open_igmenu(source);
                                            break;

                                        default:
                                            open_igmenu(source);
                                            break;
                                    }
                                })
                            }
                            if (source.hasTag('halforc')) {
                                halforcCustomizationMenu.show(source)
                            }
                            if (source.hasTag('human')) {
                                source.sendMessage('You don\'t have any Ears or Tails.')
                            }
                            break;

                        case 1:
                            open_igmenu(source);
                            break;

                        default:
                            open_igmenu(source);
                            break;

                    }
                })

            }

            function open_igmenu(source) {
                const factionmenu = createPlayerFactionMenu(source)
                ig_menu.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            factionmenu.show(source);
                            break;

                        case 1:
                            playerinfo(source);
                            break;

                        case 2:
                            settingsmenu_main(source);
                            break;

                        case 3:
                            balance_window(source);
                            break;

                        case 4:
                            servermarket_menu(source);
                            break;


                        default:
                            break;
                    }
                })
            }

            //Economy Part

            function cashFunction(source, amount) {
                const cashObjective = world.scoreboard.getObjective("balance");
                const bankObjective = world.scoreboard.getObjective("bank");

                if (!cashObjective || !bankObjective) {
                    source.sendMessage("§cBank Error Detected. Couldn't proceed.");
                    return;
                }

                const currentCash = cashObjective.getScore(source) ?? 0;

                if (currentCash < amount) {
                    source.sendMessage("§eYou don't have enough Credits to deposit.");
                    return;
                }

                const currentBank = bankObjective.getScore(source) ?? 0;

                // Aktualizacja wyników
                cashObjective.setScore(source, currentCash - amount);
                bankObjective.setScore(source, currentBank + amount);

                // Komunikat zwrotny
                source.sendMessage("§aDeposited §e" + amount + "§a Credits.");
            }

            function withdrawFunction(source, amount) {
                const cashObjective = world.scoreboard.getObjective("balance");
                const bankObjective = world.scoreboard.getObjective("bank");

                if (!cashObjective || !bankObjective) {
                    source.sendMessage("§cBank Error Detected. Couldn't proceed.");
                    return;
                }

                const currentBank = bankObjective.getScore(source) ?? 0;

                if (currentBank < amount) {
                    source.sendMessage("§eYou don't have enough credits at Bank.");
                    return;
                }

                const currentCash = cashObjective.getScore(source) ?? 0;

                bankObjective.setScore(source, currentBank - amount);
                cashObjective.setScore(source, currentCash + amount);

                source.sendMessage("§aWithdrawed §e" + amount + "§a Credits.");
            }


            function depAmount(source) {
                new ModalFormData()
                    .title('Deposit To Bank')
                    .textField('How much you wish to deposit?', 'Example: 50')
                    .show(source)
                    .then(response => {
                        if (response.canceled) return;

                        const input = response.formValues[0];
                        const amount = parseInt(input);
                        if (isNaN(amount) || amount < 0) {
                            source.sendMessage('Error');
                            return;
                        }

                        cashFunction(source, amount);

                    })
            }

            function depAll(source) {
                const cashObjective = world.scoreboard.getObjective("balance");
                const cash = cashObjective?.getScore(source) ?? 0;
                cashFunction(source, cash);
            }

            function withAmount(source) {
                new ModalFormData()
                    .title('Withdraw From Bank')
                    .textField('How much you wish to withdraw?', 'Example: 50')
                    .show(source)
                    .then(response => {
                        if (response.canceled) return;

                        const input = response.formValues[0];
                        const amount = parseInt(input);

                        if (isNaN(amount) || amount < 0) {
                            source.sendMessage('§cInvalid amount. Withdrawal failed.');
                            return;
                        }

                        withdrawFunction(source, amount);
                    });
            }

            function withAll(source) {
                const bankObjective = world.scoreboard.getObjective("bank");
                const bank = bankObjective?.getScore(source) ?? 0;
                withdrawFunction(source, bank);
            }

            function showTransferForm(source) {
                const senderName = source.name;
                const onlinePlayers = world.getPlayers();
                const playerNames = [];

                for (const p of onlinePlayers) {
                    try {
                        const name = p.name;
                        if (typeof name === "string" && name !== senderName) {
                            playerNames.push(name.trim());
                        }
                    } catch (err) {
                        console.warn("Could not find any players:", err);
                    }
                }

                if (playerNames.length === 0) {
                    source.sendMessage("§cNo one else is Online.");
                    return;
                }

                new ModalFormData()
                    .title("Credits Transfer")
                    .dropdown("Choose a player you want to Transfer your Credits to", playerNames)
                    .textField("Credits amount", "Example. 100")
                    .show(source)
                    .then(response => {
                        if (response.canceled) return;

                        const selectedIndex = response.formValues[0];
                        const recipientName = playerNames[selectedIndex];
                        const amount = parseInt(response.formValues[1]);

                        if (isNaN(amount) || amount < 0) {
                            source.sendMessage("§cIncorrect Amount. Minium amount is 1.");
                            return;
                        }
                        console.warn(source.name + ' Tried to send' + amount)

                        // Komendy do aktualizacji scoreboardu
                        source.runCommand(`scoreboard players remove @s balance ${amount}`);
                        source.runCommand(`scoreboard players add "${recipientName}" balance ${amount}`);

                        source.sendMessage(`§aTransfered §e${amount}§a Credits to §b${recipientName}§a.`);
                        source.runCommand(`tellraw ${recipientName} {"rawtext":[{"text":"§aReceived §e${amount}§a Credits from §b${source.name}§a."}]}`)
                    });
            }


            function economy_BalanceInfo(source) {
                const cash = getCashScore(source, "balance")
                const bank = getBankScore(source, "bank")

                return new ActionFormData()
                    .title('§l§e' + playerName + '\'s§r Balance')
                    .body('Control your Credits However you want! Deposit, withdraw or even transfer them to another player!')
                    .divider()
                    .header('Balance')
                    .label('Cash: ' + cash)
                    .label('Bank: ' + bank)
                    .divider()
                    .header('Bank Control')
                    .button('Deposit Amount')
                    .button('Deposit All')
                    .divider()
                    .button('Withdraw Amount')
                    .button('Withdraw All')
                    .divider()
                    .button('Transfer Credits')
                    .divider()
                    .button('Back')
            }

            function balance_window(source) {
                economy_BalanceInfo(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            depAmount(source);
                            break;

                        case 1:
                            depAll(source);
                            break;

                        case 2:
                            withAmount(source);
                            break;

                        case 3:
                            withAll(source);
                            break;

                        case 4:
                            showTransferForm(source);
                            break;

                        case 5:
                            open_igmenu(source);
                            break;
                    }
                })
            }

            function servermarket(source) {
                const balance = getCashScore(source, "balance")
                const bank = getBankScore(source, "bank")

                return new ActionFormData()
                    .title('Server Market')
                    .body(
                        'Economy Build v16\n\n' +
                        '§c/!\\ Remember! You need to have your cash withdrawed to be able to buy something!§r' +
                        '\n\nYour Cash Balance: §e' + balance +
                        '\n§rBank Balance: §e' + bank
                    )
                    .divider()
                    .label('Categories')
                    .button('Food')
                    .button('Crops')
                    .button('Mobs')
                    .button('Forestry')
                    .button('Nature')
                    .button('Building Blocks')
                    .divider()
                    .button('Back')
            }

            function servermarket_menu(source) {
                servermarket(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            foodmarket(source);
                            break;

                        case 1:
                            cropsmarket(source);
                            break;

                        case 2:
                            mobmarket(source);
                            break;
                        case 3:
                            woodmarket(source);
                            break;

                        case 4:
                            naturemarket(source);
                            break;

                        case 4:
                            bbmarket(source)
                            break;

                        default:
                            open_igmenu(source)
                            break;
                    }
                })

            }

            const buy_food_price = {
                cooked: {
                    modifier: 0,
                    items: {
                        cooked_chicken: 700,
                        cooked_porkchop: 450,
                        cooked_beef: 600,
                        cooked_mutton: 605,
                        cooked_rabbit: 610,
                        cooked_cod: 500,
                        cooked_salmon: 505
                    }
                },
                miscellaneous: {
                    modifier: 0,
                    items: {
                        bread: 200,
                        mushroom_stew: 30,
                        beetroot_soup: 10,
                        rabbit_stew: 20,
                        jacked_potato: 150,
                        cookie: 100,
                        pumpkin_pie: 300,
                        cake: 1050,
                        dried_kelp: 25
                    }
                },
                extra: {
                    modifier: 0,
                    items: {
                        golden_carrot: 5500,
                        golden_apple: 11190,
                        notch_apple: 250800
                    }
                },
                crops: {
                    modifier: 0,
                    items: {
                        wheat_seeds: 20,
                        pumpkin_seeds: 25,
                        melon_seeds: 30,
                        beetroot_seeds: 10,
                        torchflower_seeds: 100,
                        pitcher_pod: 105
                    }
                },

                crops_grown: {
                    modifier: 0,
                    items: {
                        wheat: 400,
                        pumpkin: 200,
                        melon: 205,
                        melon_slice: 55,
                        beetroot: 50,
                        torchflower: 500,
                        pitcher_plant: 505
                    }
                },
                mobs: {
                    modifier: 0,
                    items: {
                        bone: 1500,
                        dried_ghast: 19999990,
                        sadle: 100000,
                        golden_horse_armor: 9990,
                        iron_horse_armor: 19990,
                        diamond_horse_armor: 39990,
                        white_harness: 15000
                    }
                },

                mobs_limited: {
                    modifier: 0,
                    items: {
                        dried_ghast: 19999990,
                        white_harness: 15000
                    }
                },

                wood: {
                    modifier: 0,
                    items: {
                        oak_log: 400,
                        spruce_log: 405,
                        birch_log: 300,
                        jungle_log: 305,
                        acacia_log: 250,
                        dark_oak_log: 450,
                        mangrove_log: 455,
                        cherry_log: 500,
                        pale_oak_log: 600,
                        crimson_stem: 5500,
                        warped_stem: 4500
                    }
                },

                leaves: {
                    modifier: 0,
                    items: {
                        oak_leaves: 150,
                        spruce_leaves: 160,
                        birch_leaves: 130,
                        jungle_leaves: 170,
                        acacia_leaves: 120,
                        dark_oak_leaves: 155,
                        mangrove_leaves: 180,
                        cherry_leaves: 200,
                        pale_oak_leaves: 300,
                        nether_wart_block: 4600,
                        warped_wart_block: 3900

                    }
                },

                nature: {
                    modifier: 0,
                    items: {

                        dirt: 50,
                        coarse_dirt: 80,
                        rooted_dirt: 100,
                        grass_block: 105,
                        podzol: 150,
                        mycelium: 200,
                        sand: 30,
                        red_sand: 35,
                        mud: 55,
                        packed_mud: 110,
                        clay: 60,
                        magma_block: 6600,
                        soul_sand: 150000

                    }
                },

                stone_blocks: {
                    modifier: 0,
                    items: {
                        cobblestone: 350,
                        stone: 500,
                        granite: 300,
                        diorite: 305,
                        andesite: 310,
                        cobbled_deepslate: 400,
                        deepslate: 505,
                        basalt: 5500,
                        blackstone: 7500,
                        obsidian: 115590,
                        crying_obsidian: 305590
                    }
                }
            }

            const sell_food_price = {
                cooked: {
                    modifier: -60,
                    items: {
                        cooked_chicken: 700,
                        cooked_porkchop: 450,
                        cooked_beef: 600,
                        cooked_mutton: 605,
                        cooked_rabbit: 610,
                        cooked_cod: 500,
                        cooked_salmon: 505
                    }
                },
                miscellaneous: {
                    modifier: -60,
                    items: {
                        bread: 200,
                        mushroom_stew: 30,
                        beetroot_soup: 10,
                        rabbit_stew: 20,
                        jacked_potato: 150,
                        cookie: 100,
                        pumpkin_pie: 300,
                        cake: 1050,
                        dried_kelp: 25
                    }
                },
                extra: {
                    modifier: -60,
                    items: {
                        golden_carrot: 5500,
                        golden_apple: 11190,
                        notch_apple: 250800
                    }
                },
                crops: {
                    modifier: -60,
                    items: {
                        wheat_seeds: 20,
                        pumpkin_seeds: 25,
                        melon_seeds: 30,
                        beetroot_seeds: 10,
                        torchflower_seeds: 100,
                        pitcher_pod: 105
                    }
                },

                crops_grown: {
                    modifier: -60,
                    items: {
                        wheat: 400,
                        pumpkin: 200,
                        melon: 205,
                        melon_slice: 55,
                        beetroot: 50,
                        torchflower: 500,
                        pitcher_plant: 505
                    }
                },
                mobs: {
                    modifier: -60,
                    items: {
                        bone: 1500,
                        dried_ghast: 19999990,
                        sadle: 100000,
                        golden_horse_armor: 9990,
                        iron_horse_armor: 19990,
                        diamond_horse_armor: 39990,
                        white_harness: 15000
                    }
                },

                mobs_limited: {
                    modifier: -60,
                    items: {
                        dried_ghast: 19999990,
                        white_harness: 15000
                    }
                },

                wood: {
                    modifier: -60,
                    items: {
                        oak_log: 400,
                        spruce_log: 405,
                        birch_log: 300,
                        jungle_log: 305,
                        acacia_log: 250,
                        dark_oak_log: 450,
                        mangrove_log: 455,
                        cherry_log: 500,
                        pale_oak_log: 600,
                        crimson_stem: 5500,
                        warped_stem: 4500
                    }
                },

                leaves: {
                    modifier: -60,
                    items: {
                        oak_leaves: 150,
                        spruce_leaves: 160,
                        birch_leaves: 130,
                        jungle_leaves: 170,
                        acacia_leaves: 120,
                        dark_oak_leaves: 155,
                        mangrove_leaves: 180,
                        cherry_leaves: 200,
                        pale_oak_leaves: 300,
                        nether_wart_block: 4600,
                        warped_wart_block: 3900

                    }
                },

                nature: {
                    modifier: -60,
                    items: {

                        dirt: 50,
                        coarse_dirt: 80,
                        rooted_dirt: 100,
                        grass_block: 105,
                        podzol: 150,
                        mycelium: 200,
                        sand: 30,
                        red_sand: 35,
                        mud: 55,
                        packed_mud: 110,
                        clay: 60,
                        magma_block: 6600,
                        soul_sand: 150000

                    }
                },

                stone_blocks: {
                    modifier: -60,
                    items: {
                        cobblestone: 350,
                        stone: 500,
                        granite: 300,
                        diorite: 305,
                        andesite: 310,
                        cobbled_deepslate: 400,
                        deepslate: 505,
                        basalt: 5500,
                        blackstone: 7500,
                        obsidian: 115590,
                        crying_obsidian: 305590
                    }
                }

            }


            function getBuyPrice(category, itemName) {
                if (buy_food_price[category]?.items?.[itemName] !== undefined) {
                    const base = buy_food_price[category].items[itemName];
                    const mod = buy_food_price[category].modifier ?? 0;
                    return Math.floor(base * (1 + mod / 100));
                }
                return null;
            }

            function getSellPrice(category, itemName) {
                if (sell_food_price[category]?.items?.[itemName] !== undefined) {
                    const base = sell_food_price[category].items[itemName];
                    const mod = sell_food_price[category].modifier ?? 0;
                    return Math.floor(base * (1 + mod / 100));
                }
                return null;
            }

            function servermarketcat_food(source) {
                const bank = getBankScore(source, "bank")
                const cash = getBankScore(source, "balance")

                const cooked_chicken_buy = getBuyPrice("cooked", "cooked_chicken")
                const cooked_chicken_sell = getSellPrice("cooked", "cooked_chicken")

                const cooked_porkchop_buy = getBuyPrice("cooked", "cooked_porkchop")
                const cooked_porkchop_sell = getSellPrice('cooked', 'cooked_porkchop')

                const cooked_beef_buy = getBuyPrice('cooked', 'cooked_beef')
                const cooked_beef_sell = getSellPrice('cooked', 'cooked_beef')

                const cooked_mutton_buy = getBuyPrice('cooked', 'cooked_mutton')
                const cooked_mutton_sell = getSellPrice('cooked', 'cooked_mutton')

                const cooked_rabbit_buy = getBuyPrice('cooked', 'cooked_rabbit')
                const cooked_rabbit_sell = getSellPrice('cooked', 'cooked_rabbit')

                const cooked_cod_buy = getBuyPrice('cooked', "cooked_cod")
                const cooked_cod_sell = getSellPrice('cooked', "cooked_cod")

                const cooked_salmon_buy = getBuyPrice('cooked', "cooked_salmon")
                const cooked_salmon_sell = getSellPrice('cooked', "cooked_salmon")

                const bread_buy = getBuyPrice('miscellaneous', "bread")
                const bread_sell = getSellPrice('miscellaneous', "bread")

                const mushroom_stew_buy = getBuyPrice('miscellaneous', "mushroom_stew")
                const mushroom_stew_sell = getSellPrice('miscellaneous', "mushroom_stew")

                const beetroot_soup_buy = getBuyPrice('miscellaneous', "beetroot_soup")
                const beetroot_soup_sell = getSellPrice('miscellaneous', "beetroot_soup")

                const rabbit_stew_buy = getBuyPrice('miscellaneous', "rabbit_stew")
                const rabbit_stew_sell = getSellPrice('miscellaneous', "rabbit_stew")

                const jacked_potato_buy = getBuyPrice('miscellaneous', "jacked_potato")
                const jacked_potato_sell = getSellPrice('miscellaneous', "jacked_potato")

                const cookie_buy = getBuyPrice('miscellaneous', "cookie")
                const cookie_sell = getSellPrice('miscellaneous', "cookie")

                const pumpkin_pie_buy = getBuyPrice('miscellaneous', "pumpkin_pie")
                const pumpkin_pie_sell = getSellPrice('miscellaneous', "pumpkin_pie")

                const cake_buy = getBuyPrice('miscellaneous', "cake")
                const cake_sell = getSellPrice('miscellaneous', "cake")

                const dried_kelp_buy = getBuyPrice('miscellaneous', "dried_kelp")
                const dried_kelp_sell = getSellPrice('miscellaneous', "dried_kelp")

                const golden_carrot_buy = getBuyPrice('extra', "golden_carrot")
                const golden_carrot_sell = getSellPrice('extra', "golden_carrot")

                const golden_apple_buy = getBuyPrice('extra', "golden_apple")

                const notch_apple_buy = getBuyPrice('extra', "notch_apple")
                const notch_apple_sell = getSellPrice('extra', "notch_apple")




                return new ActionFormData()
                    .title('Server Market / Food')
                    .body('§l§eFood Category§r' + "\n\n§c/!\\ Every button will give or take a full stack from your inventory. To Sell any item, you need to have a full stack of it!")
                    .divider()
                    .label(
                        '§aYour Balance§r' +
                        '\n\nCash: §e' + cash +
                        '\n\n§rBank: §e' + bank
                    )
                    .divider()
                    .header('§nCooked Food.')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.cooked.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.cooked.modifier + '%%'

                    )
                    .divider()
                    .label(
                        'Cooked Chicken' +
                        '\n\n§aBuy Price: §e§l' + cooked_chicken_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + cooked_chicken_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cooked Porkchop' +
                        '\n\n§aBuy Price: §e§l' + cooked_porkchop_buy + '§r Credits per 64' +
                        '\nSell Price §e' + cooked_porkchop_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cooked Beef' +
                        '\n\n§aBuy Price: §e§l' + cooked_beef_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + cooked_beef_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cooked Mutton' +
                        '\n\n§aBuy Price: §e§l' + cooked_mutton_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + cooked_mutton_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cooked Rabbit' +
                        '\n\n§aBuy Price: §e§l' + cooked_rabbit_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + cooked_rabbit_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cooked Cod' +
                        '\n\n§aBuy Price: §e§l' + cooked_cod_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + cooked_cod_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cooked Salmon' +
                        '\n\n§aBuy Price: §e§l' + cooked_salmon_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + cooked_salmon_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .header('§aMiscellaneous')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.miscellaneous.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.miscellaneous.modifier + '%%'

                    )
                    .divider()
                    .label(
                        'Bread' +
                        '\n\n§aBuy Price: §e§l' + bread_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + bread_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Mushroom Stew' +
                        '\n\n§aBuy Price: §e§l' + mushroom_stew_buy + '§r Credits per 1' +
                        '\n§r§cSell Price: §e§l' + mushroom_stew_sell + '§r Credits per 1'
                    )
                    .button('Buy x1')
                    .button('Sell x1')
                    .divider()
                    .label(
                        'Beetroot Soup' +
                        '\n\n§aBuy Price: §e§l' + beetroot_soup_buy + '§r Credits per 1' +
                        '\n§r§cSell Price: §e§l' + beetroot_soup_sell + '§r Credits per 1'
                    )
                    .button('Buy x1')
                    .button('Sell x1')
                    .divider()
                    .label(
                        'Rabbit Stew' +
                        '\n\n§aBuy Price: §e§l' + rabbit_stew_buy + '§r Credits per 1' +
                        '\n§r§cSell Price: §e§l' + rabbit_stew_sell + '§r Credits per 1'
                    )
                    .button('Buy x1')
                    .button('Sell x1')
                    .divider()
                    .label(
                        'Jacked Potato' +
                        '\n\n§aBuy Price: §e§l' + jacked_potato_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + jacked_potato_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cookie' +
                        '\n\n§aBuy Price: §e§l' + cookie_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + cookie_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Pumpkin Pie' +
                        '\n\n§aBuy Price: §e§l' + pumpkin_pie_buy + '§r Credits per 64' +
                        '\n§r§cSell Price: §e§l' + pumpkin_pie_sell + '§r Credits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cake' +
                        '\n\n§aBuy Price: §e§l' + cake_buy + ' §rCredits per 1' +
                        '\n§r§cSell Price: §e§l' + cake_sell + ' §rCredits per 1'
                    )
                    .button('Buy x1')
                    .button('Sell x1')
                    .divider()
                    .label(
                        'Dried Kelp' +
                        '\n\n§aBuy Price: §e§l' + dried_kelp_buy + ' §rCredits per 64' +
                        '\n§r§cSell Price: §e§l' + dried_kelp_sell + ' §rCredits per 64'
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .header('§uExtra')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.extra.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.extra.modifier + '%%'
                    )
                    .divider()
                    .label(
                        'Golden Carrots' +
                        '\n\n§aBuy Price: §e§l' + golden_carrot_buy + '§r Credits per 32' +
                        '\n§r§cSell Price: §e§l' + golden_carrot_sell + '§r Credits per 32'
                    )
                    .button('Buy x32')
                    .button('Sell x32')
                    .divider()
                    .label(
                        'Golden Apple' +
                        '\n\n§aBuy Price: §e§l' + golden_apple_buy + '§r Credits per 12'
                    )
                    .button('Buy x12')
                    .divider()
                    .label(
                        'Enchanted Golden Apple' +
                        '\n\n§aBuy Price: §e§l' + notch_apple_buy + '§r Credits per 1'
                    )
                    .button('Buy x1')
                    .divider()
                    .button('Back')



            }

            function foodmarket(source) {
                const bank = getBankScore(source, "bank");
                const cash = getBankScore(source, "balance");

                const cooked_chicken_buy = getBuyPrice("cooked", "cooked_chicken");
                const cooked_chicken_sell = getSellPrice("cooked", "cooked_chicken");

                const cooked_porkchop_buy = getBuyPrice("cooked", "cooked_porkchop");
                const cooked_porkchop_sell = getSellPrice('cooked', 'cooked_porkchop');

                const cooked_beef_buy = getBuyPrice('cooked', 'cooked_beef');
                const cooked_beef_sell = getSellPrice('cooked', 'cooked_beef');

                const cooked_mutton_buy = getBuyPrice('cooked', 'cooked_mutton');
                const cooked_mutton_sell = getSellPrice('cooked', 'cooked_mutton');

                const cooked_rabbit_buy = getBuyPrice('cooked', 'cooked_rabbit');
                const cooked_rabbit_sell = getSellPrice('cooked', 'cooked_rabbit');

                const cooked_cod_buy = getBuyPrice('cooked', "cooked_cod");
                const cooked_cod_sell = getSellPrice('cooked', "cooked_cod");

                const cooked_salmon_buy = getBuyPrice('cooked', "cooked_salmon");
                const cooked_salmon_sell = getSellPrice('cooked', "cooked_salmon");

                const bread_buy = getBuyPrice('miscellaneous', "bread");
                const bread_sell = getSellPrice('miscellaneous', "bread");

                const mushroom_stew_buy = getBuyPrice('miscellaneous', "mushroom_stew");
                const mushroom_stew_sell = getSellPrice('miscellaneous', "mushroom_stew");

                const beetroot_soup_buy = getBuyPrice('miscellaneous', "beetroot_soup");
                const beetroot_soup_sell = getSellPrice('miscellaneous', "beetroot_soup");

                const rabbit_stew_buy = getBuyPrice('miscellaneous', "rabbit_stew");
                const rabbit_stew_sell = getSellPrice('miscellaneous', "rabbit_stew");

                const jacked_potato_buy = getBuyPrice('miscellaneous', "jacked_potato");
                const jacked_potato_sell = getSellPrice('miscellaneous', "jacked_potato");

                const cookie_buy = getBuyPrice('miscellaneous', "cookie");
                const cookie_sell = getSellPrice('miscellaneous', "cookie");

                const pumpkin_pie_buy = getBuyPrice('miscellaneous', "pumpkin_pie");
                const pumpkin_pie_sell = getSellPrice('miscellaneous', "pumpkin_pie");

                const cake_buy = getBuyPrice('miscellaneous', "cake");
                const cake_sell = getSellPrice('miscellaneous', "cake");

                const dried_kelp_buy = getBuyPrice('miscellaneous', "dried_kelp");
                const dried_kelp_sell = getSellPrice('miscellaneous', "dried_kelp");

                const golden_carrot_buy = getBuyPrice('extra', "golden_carrot");
                const golden_carrot_sell = getSellPrice('extra', "golden_carrot");

                const golden_apple_buy = getBuyPrice('extra', "golden_apple");

                const notch_apple_buy = getBuyPrice('extra', "notch_apple");

                servermarketcat_food(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            if (cash < cooked_chicken_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cooked_chicken_buy}`)
                                source.runCommand(`give @s cooked_chicken 64`)
                                source.sendMessage(`§aBought §e§lCooked Chicked x64 §r§afor ${cooked_chicken_buy}`)
                            }
                            break;

                        case 1:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cooked_chicken, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_chicken, quantity=64..}] run scoreboard players add @s balance ${cooked_chicken_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_chicken, quantity=64..}] run say §aSold §a§lCooked Chicken x64§r §aFor §e§l${cooked_chicken_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_chicken, quantity=64..}] run clear @s cooked_chicken 0 64`), 1)
                            break;

                        case 2:
                            if (cash < cooked_porkchop_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cooked_porkchop_buy}`)
                                source.runCommand(`give @s cooked_porkchop 64`)
                                source.sendMessage(`§aBought §e§lCooked Porkchop x64 §r§afor ${cooked_porkchop_buy}`)

                            }
                            break;

                        case 3:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cooked_porkchop, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_porkchop, quantity=64..}] run scoreboard players add @s balance ${cooked_porkchop_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_porkchop, quantity=64..}] run say §aSold §a§lCooked Porkchop x64§r §aFor §e§l${cooked_porkchop_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_porkchop, quantity=64..}] run clear @s cooked_porkchop 0 64`), 1)
                            break;

                        case 4:
                            if (cash < cooked_beef_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cooked_beef_buy}`)
                                source.runCommand(`give @s cooked_beef 64`)
                                source.sendMessage(`§aBought §e§lCooked Beef x64 §r§afor ${cooked_beef_buy}`)

                            }
                            break;

                        case 5:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cooked_beef, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_beef, quantity=64..}] run scoreboard players add @s balance ${cooked_beef_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_beef, quantity=64..}] run say §aSold §a§lCooked Beef x64§r §aFor §e§l${cooked_beef_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_beef, quantity=64..}] run clear @s cooked_beef 0 64`), 1)
                            break;

                        case 6:
                            if (cash < cooked_mutton_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cooked_mutton_buy}`)
                                source.runCommand(`give @s cooked_mutton 64`)
                                source.sendMessage(`§aBought §e§lCooked Mutton x64 §r§afor ${cooked_mutton_buy}`)

                            }
                            break;

                        case 7:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cooked_mutton, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_mutton, quantity=64..}] run scoreboard players add @s balance ${cooked_mutton_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_mutton, quantity=64..}] run say §aSold §a§lCooked Mutton x64§r §aFor §e§l${cooked_mutton_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_mutton, quantity=64..}] run clear @s cooked_mutton 0 64`), 1)
                            break;

                        case 8:
                            if (cash < cooked_rabbit_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cooked_rabbit_buy}`)
                                source.runCommand(`give @s cooked_rabbit 64`)
                                source.sendMessage(`§aBought §e§lCooked Rabbit x64 §r§afor ${cooked_rabbit_buy}`)

                            }
                            break;

                        case 9:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cooked_rabbit, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_rabbit, quantity=64..}] run scoreboard players add @s balance ${cooked_rabbit_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_rabbit, quantity=64..}] run say §aSold §a§lCooked Rabbit x64§r §aFor §e§l${cooked_rabbit_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_rabbit, quantity=64..}] run clear @s cooked_rabbit 0 64`), 1)
                            break;

                        case 10:
                            if (cash < cooked_cod_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cooked_cod_buy}`)
                                source.runCommand(`give @s cooked_cod 64`)
                                source.sendMessage(`§aBought §e§lCooked Cod x64 §r§afor ${cooked_cod_buy}`)

                            }
                            break;

                        case 11:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cooked_cod, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_cod, quantity=64..}] run scoreboard players add @s balance ${cooked_cod_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_cod, quantity=64..}] run say §aSold §a§lCooked Cod x64§r §aFor §e§l${cooked_cod_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_cod, quantity=64..}] run clear @s cooked_cod 0 64`), 1)
                            break;

                        case 12:
                            if (cash < cooked_salmon_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cooked_salmon_buy}`)
                                source.runCommand(`give @s cooked_salmon 64`)
                                source.sendMessage(`§aBought §e§lCooked Salmon x64 §r§afor ${cooked_salmon_buy}`)

                            }
                            break;

                        case 13:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cooked_salmon, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_salmon, quantity=64..}] run scoreboard players add @s balance ${cooked_salmon_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_salmon, quantity=64..}] run say §aSold §a§lCooked Cod x64§r §aFor §e§l${cooked_salmon_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cooked_salmon, quantity=64..}] run clear @s cooked_salmon 0 64`), 1)
                            break;

                        case 14:
                            if (cash < bread_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${bread_buy}`)
                                source.runCommand(`give @s bread 64`)
                                source.sendMessage(`§aBought §e§lBread x64 §r§afor ${bread_buy}`)

                            }
                            break;

                        case 15:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:bread, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:bread, quantity=64..}] run scoreboard players add @s balance ${bread_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:bread, quantity=64..}] run say §aSold §a§lBread x64§r §aFor §e§l${bread_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:bread, quantity=64..}] run clear @s bread 0 64`), 1)
                            break;

                        case 16:
                            if (cash < mushroom_stew_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${mushroom_stew_buy}`)
                                source.runCommand(`give @s mushroom_stew 1`)
                                source.sendMessage(`§aBought §e§lMushroom Stew x1 §r§afor ${mushroom_stew_buy}`)

                            }
                            break;

                        case 17:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:mushroom_stew, quantity=1..}] run say §cYou need to have 1 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mushroom_stew, quantity=1..}] run scoreboard players add @s balance ${mushroom_stew_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mushroom_stew, quantity=1..}] run say §aSold §a§lMushroom Stew x1§r §aFor §e§l${mushroom_stew_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mushroom_stew, quantity=1..}] run clear @s mushroom_stew 0 1`), 1)
                            break;

                        case 18:
                            if (cash < beetroot_soup_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${beetroot_soup_buy}`)
                                source.runCommand(`give @s beetroot_soup 1`)
                                source.sendMessage(`§aBought §e§lBeetroot Soup x1 §r§afor ${beetroot_soup_buy}`)

                            }
                            break;

                        case 19:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:beetroot_soup, quantity=1..}] run say §cYou need to have 1 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:beetroot_soup, quantity=1..}] run scoreboard players add @s balance ${beetroot_soup_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:beetroot_soup, quantity=1..}] run say §aSold §a§lBeetroot Soup x1§r §aFor §e§l${beetroot_soup_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:beetroot_soup, quantity=1..}] run clear @s beetroot_soup 0 1`), 1)
                            break;

                        case 20:
                            if (cash < rabbit_stew_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${rabbit_stew_buy}`)
                                source.runCommand(`give @s rabbit_stew 1`)
                                source.sendMessage(`§aBought §e§lRabbit Stew x1 §r§afor ${rabbit_stew_buy}`)

                            }
                            break;

                        case 21:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:rabbit_stew, quantity=1..}] run say §cYou need to have 1 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:rabbit_stew, quantity=1..}] run scoreboard players add @s balance ${rabbit_stew_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:rabbit_stew, quantity=1..}] run say §aSold §a§lBeetroot Soup x1§r §aFor §e§l${rabbit_stew_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:rabbit_stew, quantity=1..}] run clear @s rabbit_stew 0 1`), 1)
                            break;

                        case 22:
                            if (cash < jacked_potato_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${jacked_potato_buy}`)
                                source.runCommand(`give @s jacked_potato 64`)
                                source.sendMessage(`§aBought §e§lJacked Potato x64 §r§afor ${jacked_potato_buy}`)

                            }
                            break;

                        case 23:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:jacked_potato, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:jacked_potato, quantity=64..}] run scoreboard players add @s balance ${jacked_potato_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:jacked_potato, quantity=64..}] run say §aSold §a§lJacked Potato x64§r §aFor §e§l${jacked_potato_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:jacked_potato, quantity=64..}] run clear @s jacked_potato 0 64`), 1)
                            break;

                        case 24:
                            if (cash < cookie_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cookie_buy}`)
                                source.runCommand(`give @s cookie 64`)
                                source.sendMessage(`§aBought §e§lCookie x64 §r§afor ${cookie_buy}`)

                            }
                            break;

                        case 25:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cookie, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cookie, quantity=64..}] run scoreboard players add @s balance ${cookie_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cookie, quantity=64..}] run say §aSold §a§lCookie x64§r §aFor §e§l${cookie_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cookie, quantity=64..}] run clear @s cookie 0 64`), 1)
                            break;

                        case 26:
                            if (cash < pumpkin_pie_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${pumpkin_pie_buy}`)
                                source.runCommand(`give @s pumpkin_pie 64`)
                                source.sendMessage(`§aBought §e§lPumpkin Pie x64 §r§afor ${pumpkin_pie_buy}`)
                            }
                            break;

                        case 27:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:pumpkin_pie, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pumpkin_pie, quantity=64..}] run scoreboard players add @s balance ${pumpkin_pie_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pumpkin_pie, quantity=64..}] run say §aSold §a§lPumpkin Pie x64§r §aFor §e§l${pumpkin_pie_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pumpkin_pie, quantity=64..}] run clear @s pumpkin_pie 0 64`), 1)
                            break;

                        case 28:
                            if (cash < cake_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cake_buy}`)
                                source.runCommand(`give @s cake 1`)
                                source.sendMessage(`§aBought §e§lCake x1 §r§afor ${cake_buy}`)
                            }
                            break;

                        case 29:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cake, quantity=1..}] run say §cYou need to have 1 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cake, quantity=1..}] run scoreboard players add @s balance ${cake_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cake, quantity=1..}] run say §aSold §a§lCake x64§r §aFor §e§l${cake_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cake, quantity=1..}] run clear @s cake 0 1`), 1)
                            break;

                        case 30:
                            if (cash < dried_kelp_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${dried_kelp_buy}`)
                                source.runCommand(`give @s dried_kelp 64`)
                                source.sendMessage(`§aBought §e§lDried Kelp x64 §r§afor ${dried_kelp_buy}`)
                            }
                            break;

                        case 31:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:dried_kelp, quantity=64..}] run say §cYou need to have 1 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dried_kelp, quantity=64..}] run scoreboard players add @s balance ${dried_kelp_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dried_kelp, quantity=64..}] run say §aSold §a§lDried Kelp x64§r §aFor §e§l${dried_kelp_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dried_kelp, quantity=64..}] run clear @s dried_kelp 0 64`), 1)
                            break;

                        case 32:
                            if (cash < golden_carrot_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${golden_carrot_buy}`)
                                source.runCommand(`give @s golden_carrot 32`)
                                source.sendMessage(`§aBought §e§lDried Kelp x32 §r§afor ${golden_carrot_buy}`)
                            }
                            break;

                        case 33:

                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:golden_carrot, quantity=32..}] run say §cYou need to have 32 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:golden_carrot, quantity=32..}] run scoreboard players add @s balance ${golden_carrot_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:golden_carrot, quantity=32..}] run say §aSold §a§lGolden Carrot x32§r §aFor §e§l${golden_carrot_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:golden_carrot, quantity=32..}] run clear @s golden_carrot 0 32`), 1)
                            break;

                        case 34:
                            if (cash < golden_apple_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${golden_apple_buy}`)
                                source.runCommand(`give @s golden_apple 12`)
                                source.sendMessage(`§aBought §e§lDried Kelp x12 §r§afor ${golden_apple_buy}`)
                            }
                            break;

                        case 35:
                            if (cash < notch_apple_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${notch_apple_buy}`)
                                source.runCommand(`give @s enchanted_golden_apple 1`)
                                source.sendMessage(`§aBought §u§lEnchanted Golden Apple §ex1 §r§afor ${notch_apple_buy}`)
                            }
                            break;

                        default:
                            servermarket_menu(source);
                            break;
                    }
                })

            }

            function servermarketcat_crops(source) {
                const cash = getCashScore(source, "balance")
                const bank = getBankScore(source, "bank")

                const wheat_seeds_buy = getBuyPrice('crops', 'wheat_seeds')
                const wheat_seeds_sell = getSellPrice('crops', 'wheat_seeds')

                const pumpkin_seeds_buy = getBuyPrice('crops', 'pumpkin_seeds')
                const pumpkin_seeds_sell = getSellPrice('crops', 'pumpkin_seeds')

                const melon_seeds_buy = getBuyPrice('crops', 'melon_seeds')
                const melon_seeds_sell = getSellPrice('crops', 'melon_seeds')

                const beetroot_seeds_buy = getBuyPrice('crops', 'beetroot_seeds')
                const beetroot_seeds_sell = getSellPrice('crops', 'beetroot_seeds')

                const torchflower_seeds_buy = getBuyPrice('crops', 'torchflower_seeds')
                const torchflower_seeds_sell = getSellPrice('crops', 'torchflower_seeds')

                const pitcher_pod_buy = getBuyPrice('crops', 'pitcher_pod')
                const pitcher_pod_sell = getSellPrice('crops', 'pitcher_pod')

                const wheat_buy = getBuyPrice('crops_grown', "wheat")
                const wheat_sell = getSellPrice('crops_grown', "wheat")

                const pumpkin_buy = getBuyPrice('crops_grown', 'pumpkin')
                const pumpkin_sell = getSellPrice('crops_grown', 'pumpkin')

                const melon_buy = getBuyPrice('crops_grown', 'melon')
                const melon_sell = getSellPrice('crops_grown', 'melon')

                const melon_slice_buy = getBuyPrice('crops_grown', 'melon_slice')
                const melon_slice_sell = getSellPrice('crops_grown', 'melon_slice')

                const beetroot_buy = getBuyPrice('crops_grown', "beetroot")
                const beetroot_sell = getSellPrice('crops_grown', 'beetroot')

                const torchflower_buy = getBuyPrice('crops_grown', "torchflower")
                const torchflower_sell = getSellPrice('crops_grown', "torchflower")

                const pitcher_plant_buy = getBuyPrice('crops_grown', "pitcher_plant")
                const pitcher_plant_sell = getSellPrice('crops_grown', "pitcher_plant")




                return new ActionFormData()
                    .title('Server Market / Crops')
                    .body('§l§eCrops Category§r' + "\n\n§c/!\\ Every button will give or take a full stack from your inventory. To Sell any item, you need to have a full stack of it!")
                    .divider()
                    .label(
                        '§aYour Balance§r' +
                        '\n\nCash: §e' + cash +
                        '\n\n§rBank: §e' + bank
                    )
                    .divider()
                    .header('§gCrops.')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.crops.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.crops.modifier + '%%'

                    )
                    .divider()
                    .label(
                        'Wheat Seeds' +
                        '\n\n§aBuy Price: §e§l' + wheat_seeds_buy +
                        '\n§r§cSell Price: §e§l' + wheat_seeds_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Pumpkin Seeds' +
                        '\n\n§aBuy Price: §e§l' + pumpkin_seeds_buy +
                        '\n§r§cSell Price: §e§l' + pumpkin_seeds_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Melon Seeds' +
                        '\n\n§aBuy Price: §e§l' + melon_seeds_buy +
                        '\n§r§cSell Price: §e§l' + melon_seeds_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Beetroot Seeds' +
                        '\n\n§aBuy Price: §e§l' + beetroot_seeds_buy +
                        '\n§r§cSell Price: §e§l' + beetroot_seeds_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Torchflower Seeds' +
                        '\n\n§aBuy Price: §e§l' + torchflower_seeds_buy +
                        '\n§r§cSell Price: §e§l' + torchflower_seeds_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Pitcher Pod' +
                        '\n\n§aBuy Price: §e§l' + pitcher_pod_buy +
                        '\n§r§cSell Price: §e§l' + pitcher_pod_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .header('§6Harvest Goods.')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.crops_grown.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.crops_grown.modifier + '%%'

                    )
                    .divider()
                    .label(
                        'Wheat' +
                        '\n\n§aBuy Price: §e§l' + wheat_buy +
                        '\n§r§cSell Price: §e§l' + wheat_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Pumpkin' +
                        '\n\n§aBuy Price: §e§l' + pumpkin_buy +
                        '\n§r§cSell Price: §e§l' + pumpkin_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Melon' +
                        '\n\n§aBuy Price: §e§l' + melon_buy +
                        '\n§r§cSell Price: §e§l' + melon_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Melon Slice' +
                        '\n\n§aBuy Price: §e§l' + melon_slice_buy +
                        '\n§r§cSell Price: §e§l' + melon_slice_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Beetroot' +
                        '\n\n§aBuy Price: §e§l' + beetroot_buy +
                        '\n§r§cSell Price: §e§l' + beetroot_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Torchflower' +
                        '\n\n§aBuy Price: §e§l' + torchflower_buy +
                        '\n§r§cSell Price: §e§l' + torchflower_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Pitcher Plant' +
                        '\n\n§aBuy Price: §e§l' + pitcher_plant_buy +
                        '\n§r§cSell Price: §e§l' + pitcher_plant_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .button('Back')



            }

            function cropsmarket(source) {
                const cash = getCashScore(source, "balance")


                const wheat_seeds_buy = getBuyPrice('crops', 'wheat_seeds')
                const wheat_seeds_sell = getSellPrice('crops', 'wheat_seeds')

                const pumpkin_seeds_buy = getBuyPrice('crops', 'pumpkin_seeds')
                const pumpkin_seeds_sell = getSellPrice('crops', 'pumpkin_seeds')

                const melon_seeds_buy = getBuyPrice('crops', 'melon_seeds')
                const melon_seeds_sell = getSellPrice('crops', 'melon_seeds')

                const beetroot_seeds_buy = getBuyPrice('crops', 'beetroot_seeds')
                const beetroot_seeds_sell = getSellPrice('crops', 'beetroot_seeds')

                const torchflower_seeds_buy = getBuyPrice('crops', 'torchflower_seeds')
                const torchflower_seeds_sell = getSellPrice('crops', 'torchflower_seeds')

                const pitcher_pod_buy = getBuyPrice('crops', 'pitcher_pod')
                const pitcher_pod_sell = getSellPrice('crops', 'pitcher_pod')

                const wheat_buy = getBuyPrice('crops_grown', "wheat")
                const wheat_sell = getSellPrice('crops_grown', "wheat")

                const pumpkin_buy = getBuyPrice('crops_grown', 'pumpkin')
                const pumpkin_sell = getSellPrice('crops_grown', 'pumpkin')

                const melon_buy = getBuyPrice('crops_grown', 'melon')
                const melon_sell = getSellPrice('crops_grown', 'melon')

                const melon_slice_buy = getBuyPrice('crops_grown', 'melon_slice')
                const melon_slice_sell = getSellPrice('crops_grown', 'melon_slice')

                const beetroot_buy = getBuyPrice('crops_grown', "beetroot")
                const beetroot_sell = getSellPrice('crops_grown', 'beetroot')

                const torchflower_buy = getBuyPrice('crops_grown', "torchflower")
                const torchflower_sell = getSellPrice('crops_grown', "torchflower")

                const pitcher_plant_buy = getBuyPrice('crops_grown', "pitcher_plant")
                const pitcher_plant_sell = getSellPrice('crops_grown', "pitcher_plant")

                servermarketcat_crops(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            if (cash < wheat_seeds_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${wheat_seeds_buy}`)
                                source.runCommand(`give @s wheat_seeds 64`)
                                source.sendMessage(`§aBought §e§lWheat Seeds x64 §r§afor ${wheat_seeds_buy}`)
                            }
                            break;

                        case 1:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:wheat_seeds, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:wheat_seeds, quantity=64..}] run scoreboard players add @s balance ${wheat_seeds_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:wheat_seeds, quantity=64..}] run say §aSold §a§lWheat Seeds x64§r §aFor §e§l${wheat_seeds_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:wheat_seeds, quantity=64..}] run clear @s wheat_seeds 0 64`), 1)
                            break;

                        case 2:
                            if (cash < pumpkin_seeds_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${pumpkin_seeds_buy}`)
                                source.runCommand(`give @s pumpkin_seeds 64`)
                                source.sendMessage(`§aBought §e§lPumpkin Seeds x64 §r§afor ${pumpkin_seeds_buy}`)
                            }
                            break;

                        case 3:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:pumpkin_seeds, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pumpkin_seeds, quantity=64..}] run scoreboard players add @s balance ${pumpkin_seeds_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pumpkin_seeds, quantity=64..}] run say §aSold §a§lPumpkin Seeds x64§r §aFor §e§l${pumpkin_seeds_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pumpkin_seeds, quantity=64..}] run clear @s pumpkin_seeds 0 64`), 1)
                            break;

                        case 4:
                            if (cash < melon_seeds_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${melon_seeds_buy}`)
                                source.runCommand(`give @s melon_seeds 64`)
                                source.sendMessage(`§aBought §e§lMelon Seeds x64 §r§afor ${melon_seeds_buy}`)
                            }
                            break;

                        case 5:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:melon_seeds, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:melon_seeds, quantity=64..}] run scoreboard players add @s balance ${melon_seeds_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:melon_seeds, quantity=64..}] run say §aSold §a§lMelon Seeds x64§r §aFor §e§l${melon_seeds_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:melon_seeds, quantity=64..}] run clear @s melon_seeds 0 64`), 1)
                            break;

                        // case 6: beetroot_seeds
                        case 6:
                            if (cash < beetroot_seeds_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${beetroot_seeds_buy}`)
                                source.runCommand(`give @s beetroot_seeds 64`)
                                source.sendMessage(`§aBought §e§lBeetroot Seeds x64 §r§afor ${beetroot_seeds_buy}`)
                            }
                            break;

                        case 7:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:beetroot_seeds, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:beetroot_seeds, quantity=64..}] run scoreboard players add @s balance ${beetroot_seeds_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:beetroot_seeds, quantity=64..}] run say §aSold §a§lBeetroot Seeds x64§r §aFor §e§l${beetroot_seeds_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:beetroot_seeds, quantity=64..}] run clear @s beetroot_seeds 0 64`), 1)
                            break;

                        // case 8: torchflower_seeds
                        case 8:
                            if (cash < torchflower_seeds_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${torchflower_seeds_buy}`)
                                source.runCommand(`give @s torchflower_seeds 64`)
                                source.sendMessage(`§aBought §e§lTorchflower Seeds x64 §r§afor ${torchflower_seeds_buy}`)
                            }
                            break;

                        case 9:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:torchflower_seeds, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:torchflower_seeds, quantity=64..}] run scoreboard players add @s balance ${torchflower_seeds_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:torchflower_seeds, quantity=64..}] run say §aSold §a§lTorchflower Seeds x64§r §aFor §e§l${torchflower_seeds_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:torchflower_seeds, quantity=64..}] run clear @s torchflower_seeds 0 64`), 1)
                            break;

                        // case 10: pitcher_pod
                        case 10:
                            if (cash < pitcher_pod_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${pitcher_pod_buy}`)
                                source.runCommand(`give @s pitcher_pod 64`)
                                source.sendMessage(`§aBought §e§lPitcher Pod x64 §r§afor ${pitcher_pod_buy}`)
                            }
                            break;

                        case 11:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:pitcher_pod, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pitcher_pod, quantity=64..}] run scoreboard players add @s balance ${pitcher_pod_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pitcher_pod, quantity=64..}] run say §aSold §a§lPitcher Pod x64§r §aFor §e§l${pitcher_pod_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pitcher_pod, quantity=64..}] run clear @s pitcher_pod 0 64`), 1)
                            break;

                        // case 12: wheat
                        case 12:
                            if (cash < wheat_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${wheat_buy}`)
                                source.runCommand(`give @s wheat 64`)
                                source.sendMessage(`§aBought §e§lWheat x64 §r§afor ${wheat_buy}`)
                            }
                            break;

                        case 13:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:wheat, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:wheat, quantity=64..}] run scoreboard players add @s balance ${wheat_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:wheat, quantity=64..}] run say §aSold §a§lWheat x64§r §aFor §e§l${wheat_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:wheat, quantity=64..}] run clear @s wheat 0 64`), 1)
                            break;

                        // case 14: pumpkin
                        case 14:
                            if (cash < pumpkin_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${pumpkin_buy}`)
                                source.runCommand(`give @s pumpkin 64`)
                                source.sendMessage(`§aBought §e§lPumpkin x64 §r§afor ${pumpkin_buy}`)
                            }
                            break;

                        case 15:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:pumpkin, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pumpkin, quantity=64..}] run scoreboard players add @s balance ${pumpkin_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pumpkin, quantity=64..}] run say §aSold §a§lPumpkin x64§r §aFor §e§l${pumpkin_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pumpkin, quantity=64..}] run clear @s pumpkin 0 64`), 1)
                            break;

                        // case 16: melon
                        case 16:
                            if (cash < melon_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${melon_buy}`)
                                source.runCommand(`give @s melon 64`)
                                source.sendMessage(`§aBought §e§lMelon x64 §r§afor ${melon_buy}`)
                            }
                            break;

                        case 17:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:melon, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:melon, quantity=64..}] run scoreboard players add @s balance ${melon_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:melon, quantity=64..}] run say §aSold §a§lMelon x64§r §aFor §e§l${melon_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:melon, quantity=64..}] run clear @s melon 0 64`), 1)
                            break;


                        // case 17: melon_slice
                        case 18:
                            if (cash < melon_slice_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${melon_slice_buy}`)
                                source.runCommand(`give @s melon_slice 64`)
                                source.sendMessage(`§aBought §e§lMelon Slice x64 §r§afor ${melon_slice_buy}`)
                            }
                            break;

                        case 19:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:melon_slice, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:melon_slice, quantity=64..}] run scoreboard players add @s balance ${melon_slice_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:melon_slice, quantity=64..}] run say §aSold §a§lMelon Slice x64§r §aFor §e§l${melon_slice_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:melon_slice, quantity=64..}] run clear @s melon_slice 0 64`), 1)
                            break;

                        // case 19: beetroot
                        case 20:
                            if (cash < beetroot_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${beetroot_buy}`)
                                source.runCommand(`give @s beetroot 64`)
                                source.sendMessage(`§aBought §e§lBeetroot x64 §r§afor ${beetroot_buy}`)
                            }
                            break;

                        case 21:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:beetroot, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:beetroot, quantity=64..}] run scoreboard players add @s balance ${beetroot_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:beetroot, quantity=64..}] run say §aSold §a§lBeetroot x64§r §aFor §e§l${beetroot_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:beetroot, quantity=64..}] run clear @s beetroot 0 64`), 1)
                            break;

                        // case 21: torchflower
                        case 22:
                            if (cash < torchflower_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${torchflower_buy}`)
                                source.runCommand(`give @s torchflower 64`)
                                source.sendMessage(`§aBought §e§lTorchflower x64 §r§afor ${torchflower_buy}`)
                            }
                            break;

                        case 23:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:torchflower, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:torchflower, quantity=64..}] run scoreboard players add @s balance ${torchflower_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:torchflower, quantity=64..}] run say §aSold §a§lTorchflower x64§r §aFor §e§l${torchflower_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:torchflower, quantity=64..}] run clear @s torchflower 0 64`), 1)
                            break;

                        // case 23: pitcher_plant
                        case 24:
                            if (cash < pitcher_plant_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${pitcher_plant_buy}`)
                                source.runCommand(`give @s pitcher_plant 64`)
                                source.sendMessage(`§aBought §e§lPitcher Plant x64 §r§afor ${pitcher_plant_buy}`)
                            }
                            break;

                        case 25:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:pitcher_plant, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pitcher_plant, quantity=64..}] run scoreboard players add @s balance ${pitcher_plant_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pitcher_plant, quantity=64..}] run say §aSold §a§lPitcher Plant x64§r §aFor §e§l${pitcher_plant_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pitcher_plant, quantity=64..}] run clear @s pitcher_plant 0 64`), 1)
                            break;

                        default:
                            servermarket_menu(source);
                            break;

                    }
                })

            }

            function servermarketcat_mobs(source) {
                const cash = getCashScore(source, 'balance')
                const bank = getBankScore(source, 'bank')

                const dried_ghast_buy = getBuyPrice('mobs_limited', 'dried_ghast')

                const white_harness_buy = getBuyPrice('mobs_limited', 'white_harness')
                const white_harness_sell = getSellPrice('mobs', 'white_harness')

                const bone_buy = getBuyPrice('mobs', 'bone')
                const bone_sell = getSellPrice('mobs', 'bone')

                const sadle_buy = getBuyPrice('mobs', 'sadle')
                const sadle_sell = getSellPrice('mobs', 'sadle')

                const golden_horse_armor_buy = getBuyPrice('mobs', 'golden_horse_armor')
                const golden_horse_armor_sell = getSellPrice('mobs', 'golden_horse_armor')

                const iron_horse_armor_buy = getBuyPrice('mobs', 'iron_horse_armor')
                const iron_horse_armor_sell = getSellPrice('mobs', 'iron_horse_armor')

                const diamond_horse_armor_buy = getBuyPrice('mobs', 'diamond_horse_armor')
                const diamond_horse_armor_sell = getSellPrice('mobs', 'diamond_horse_armor')

                return new ActionFormData()
                    .title('Server Market / Mobs')
                    .body('§l§eMobs Category§r' + "\n\n§c/!\\ Every button will give or take a full stack from your inventory. To Sell any item, you need to have a full stack of it!")
                    .divider()
                    .label(
                        '§aYour Balance§r' +
                        '\n\nCash: §e' + cash +
                        '\n\n§rBank: §e' + bank
                    )
                    .divider()
                    .header('§gLIMITED TIME.')
                    .label(
                        `§cEnds with 30.09.2025` +
                        `\n§aPurchase Price Adjustment: §e§l` + buy_food_price.mobs_limited.modifier + '%%'
                    )
                    .divider()
                    .label(
                        'Dried Up Ghast' +
                        '\n\n§aBuy Price: §e§l' + dried_ghast_buy +
                        '\n\n§aNormal Price: ' + buy_food_price.mobs.items.dried_ghast
                    )
                    .button('Buy x1')
                    .divider()
                    .label(
                        'Happy Ghast Harness' +
                        '\n\n§aBuy Price: §e§l' + white_harness_buy +
                        '\n§aNormal Price: ' + buy_food_price.mobs.items.white_harness +
                        '\n§r§cSell Price: §e§l' + white_harness_sell

                    )
                    .button('Buy x1')
                    .button('Sell x1')
                    .divider()
                    .header('§gMobs.')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.mobs.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.mobs.modifier + '%%'
                    )
                    .divider()
                    .label(
                        'Bone' +
                        '\n\n§aBuy Price: §e§l' + bone_buy +
                        '\n§r§cSell Price: §e§l' + bone_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Sadle' +
                        '\n\n§aBuy Price: §e§l' + sadle_buy +
                        '\n§r§cSell Price: §e§l' + sadle_sell
                    )
                    .button('Buy x1')
                    .button('Sell x1')
                    .divider()
                    .label(
                        'Golden Horse Armor' +
                        '\n\n§aBuy Price: §e§l' + golden_horse_armor_buy +
                        '\n§r§cSell Price: §e§l' + golden_horse_armor_sell
                    )
                    .button('Buy x1')
                    .button('Sell x1')
                    .divider()
                    .label(
                        'Iron Horse Armor' +
                        '\n\n§aBuy Price: §e§l' + iron_horse_armor_buy +
                        '\n§r§cSell Price: §e§l' + iron_horse_armor_sell
                    )
                    .button('Buy x1')
                    .button('Sell x1')
                    .divider()
                    .label(
                        'Diamond Horse Armor' +
                        '\n\n§aBuy Price: §e§l' + diamond_horse_armor_buy +
                        '\n§r§cSell Price: §e§l' + diamond_horse_armor_sell
                    )
                    .button('Buy x1')
                    .button('Sell x1')
                    .divider()
                    .button('Back')
            }

            function mobmarket(source) {
                const cash = getCashScore(source, 'balance')
                const bank = getBankScore(source, 'bank')

                const dried_ghast_buy = getBuyPrice('mobs_limited', 'dried_ghast')

                const white_harness_buy = getBuyPrice('mobs_limited', 'white_harness')
                const white_harness_sell = getSellPrice('mobs', 'white_harness')

                const bone_buy = getBuyPrice('mobs', 'bone')
                const bone_sell = getSellPrice('mobs', 'bone')

                const sadle_buy = getBuyPrice('mobs', 'sadle')
                const sadle_sell = getSellPrice('mobs', 'sadle')

                const golden_horse_armor_buy = getBuyPrice('mobs', 'golden_horse_armor')
                const golden_horse_armor_sell = getSellPrice('mobs', 'golden_horse_armor')

                const iron_horse_armor_buy = getBuyPrice('mobs', 'iron_horse_armor')
                const iron_horse_armor_sell = getSellPrice('mobs', 'iron_horse_armor')

                const diamond_horse_armor_buy = getBuyPrice('mobs', 'diamond_horse_armor')
                const diamond_horse_armor_sell = getSellPrice('mobs', 'diamond_horse_armor')


                servermarketcat_mobs(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            if (cash < dried_ghast_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${dried_ghast_buy}`)
                                source.runCommand(`give @s dired_ghast 1`)
                                source.sendMessage(`§aBought §e§lDried Ghast x1 §r§afor ${dried_ghast_buy}`)
                            }
                            break;

                        case 1:
                            if (cash < white_harness_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${white_harness_buy}`)
                                source.runCommand(`give @s white_harness 1`)
                                source.sendMessage(`§aBought §e§lWhite Harness x1 §r§afor ${white_harness_buy}`)
                            }
                            break;


                        case 2:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:white_harness, quantity=1..}] run say §cYou need to have 1 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:white_harness, quantity=1..}] run scoreboard players add @s balance ${white_harness_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:white_harness, quantity=1..}] run say §aSold §a§lWhite Harness x1§r §aFor §e§l${white_harness_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:white_harness, quantity=1..}] run clear @s white_harness 0 1`), 1)
                            break;

                        case 3:

                            if (cash < bone_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${bone_buy}`)
                                source.runCommand(`give @s bone 64`)
                                source.sendMessage(`§aBought §e§lBone x64 §r§afor ${bone_buy}`)
                            }
                            break;

                        case 4:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:bone, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:bone, quantity=64..}] run scoreboard players add @s balance ${bone_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:bone, quantity=64..}] run say §aSold §a§lBone x64§r §aFor §e§l${bone_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:bone, quantity=64..}] run clear @s bone 0 64`), 1)
                            break;

                        case 5:
                            if (cash < sadle_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${sadle_buy}`)
                                source.runCommand(`give @s sadle 1`)
                                source.sendMessage(`§aBought §e§Sadle x1 §r§afor ${sadle_buy}`)
                            }
                            break;

                        case 6:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:sadle, quantity=1..}] run say §cYou need to have 1 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:sadle, quantity=1..}] run scoreboard players add @s balance ${sadle_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:sadle, quantity=1..}] run say §aSold §a§lSadle x1§r §aFor §e§l${sadle_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:sadle, quantity=1..}] run clear @s sadle 0 1`), 1)
                            break;

                        case 7:
                            if (cash < golden_horse_armor_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${golden_horse_armor_buy}`)
                                source.runCommand(`give @s golden_horse_armor 1`)
                                source.sendMessage(`§aBought §e§lGolden Horse Armor x1 §r§afor ${golden_horse_armor_buy}`)
                            }
                            break;

                        case 6:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:golden_horse_armor, quantity=1..}] run say §cYou need to have 1 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:golden_horse_armor, quantity=1..}] run scoreboard players add @s balance ${golden_horse_armor_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:golden_horse_armor, quantity=1..}] run say §aSold §a§lSadle x1§r §aFor §e§l${golden_horse_armor_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:golden_horse_armor, quantity=1..}] run clear @s golden_horse_armor 0 1`), 1)
                            break;

                        case 5:
                            if (cash < iron_horse_armor_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${iron_horse_armor_buy}`)
                                source.runCommand(`give @s iron_horse_armor 1`)
                                source.sendMessage(`§aBought §e§lIron Horse Armor x1 §r§afor ${iron_horse_armor_buy}`)
                            }
                            break;

                        case 6:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:iron_horse_armor, quantity=1..}] run say §cYou need to have 1 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:iron_horse_armor, quantity=1..}] run scoreboard players add @s balance ${iron_horse_armor_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:iron_horse_armor, quantity=1..}] run say §aSold §a§lIron Horse Armor x1§r §aFor §e§l${iron_horse_armor_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:iron_horse_armor, quantity=1..}] run clear @s iron_horse_armor 0 1`), 1)
                            break;

                        case 5:
                            if (cash < diamond_horse_armor_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${diamond_horse_armor_buy}`)
                                source.runCommand(`give @s diamond_horse_armor 1`)
                                source.sendMessage(`§aBought §e§lDiamond Horse Armor x1 §r§afor ${diamond_horse_armor_buy}`)
                            }
                            break;

                        case 6:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:diamond_horse_armor, quantity=1..}] run say §cYou need to have 1 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:diamond_horse_armor, quantity=1..}] run scoreboard players add @s balance ${diamond_horse_armor_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:diamond_horse_armor, quantity=1..}] run say §aSold §a§lSadle x1§r §aFor §e§l${diamond_horse_armor_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:diamond_horse_armor, quantity=1..}] run clear @s diamond_horse_armor 0 1`), 1)
                            break;
                    }
                })
            }

            function servermarketcat_wood(source) {
                const cash = getCashScore(source, "balance")
                const bank = getBankScore(source, 'bank')


                const oak_log_buy = getBuyPrice('wood', 'oak_log')
                const oak_log_sell = getSellPrice('wood', 'oak_log')

                const spruce_log_buy = getBuyPrice('wood', 'spruce_log')
                const spruce_log_sell = getSellPrice('wood', 'spruce_log')

                const birch_log_buy = getBuyPrice('wood', 'birch_log')
                const birch_log_sell = getSellPrice('wood', 'birch_log')

                const jungle_log_buy = getBuyPrice('wood', 'jungle_log')
                const jungle_log_sell = getSellPrice('wood', 'jungle_log')

                const acacia_log_buy = getBuyPrice('wood', 'acacia_log')
                const acacia_log_sell = getSellPrice('wood', 'acacia_log')

                const dark_oak_log_buy = getBuyPrice('wood', 'dark_oak_log')
                const dark_oak_log_sell = getSellPrice('wood', 'dark_oak_log')

                const mangrove_log_buy = getBuyPrice('wood', 'mangrove_log')
                const mangrove_log_sell = getSellPrice('wood', 'mangrove_log')

                const cherry_log_buy = getBuyPrice('wood', 'cherry_log')
                const cherry_log_sell = getSellPrice('wood', 'cherry_log')

                const pale_oak_log_buy = getBuyPrice('wood', 'pale_oak_log')
                const pale_oak_log_sell = getSellPrice('wood', 'pale_oak_log')

                const crimson_stem_buy = getBuyPrice('wood', 'crimson_stem')
                const crimson_stem_sell = getSellPrice('wood', 'crimson_stem')

                const warped_stem_buy = getBuyPrice('wood', 'warped_stem')
                const warped_stem_sell = getSellPrice('wood', 'warped_stem')

                //leaves
                const oak_leaves_buy = getBuyPrice('leaves', 'oak_leaves')
                const oak_leaves_sell = getSellPrice('leaves', 'oak_leaves')

                const spruce_leaves_buy = getBuyPrice('leaves', 'spruce_leaves')
                const spruce_leaves_sell = getSellPrice('leaves', 'spruce_leaves')

                const birch_leaves_buy = getBuyPrice('leaves', 'bitch_leaves')
                const birch_leaves_sell = getSellPrice('leaves', 'bitch_leaves')

                const jungle_leaves_buy = getBuyPrice('leaves', 'jungle_leaves')
                const jungle_leaves_sell = getSellPrice('leaves', 'jungle_leaves')

                const acacia_leaves_buy = getBuyPrice('leaves', 'acacia_leaves')
                const acacia_leaves_sell = getSellPrice('leaves', 'acacia_leaves')

                const dark_oak_leaves_buy = getBuyPrice('leaves', 'dark_oak_leaves')
                const dark_oak_leaves_sell = getSellPrice('leaves', 'dark_oak_leaves')

                const mangrove_leaves_buy = getBuyPrice('leaves', 'mangrove_leaves')
                const mangrove_leaves_sell = getSellPrice('leaves', 'mangrove_leaves')

                const cherry_leaves_buy = getBuyPrice('leaves', 'cherry_leaves')
                const cherry_leaves_sell = getSellPrice('leaves', 'cherry_leaves')

                const pale_oak_leaves_buy = getBuyPrice('leaves', 'pale_oak_leaves')
                const pale_oak_leaves_sell = getSellPrice('leaves', 'pale_oak_leaves')

                const nether_wart_block_buy = getBuyPrice('leaves', 'nether_wart_block')
                const nether_wart_block_sell = getSellPrice('leaves', 'nether_wart_block')

                const warped_wart_block_buy = getBuyPrice('leaves', 'warped_wart_block')
                const warped_wart_block_sell = getSellPrice('leaves', 'warped_wart_block')


                return new ActionFormData()
                    .title('Server Market / Forestry')
                    .body('§l§eForestry Category§r' + "\n\n§c/!\\ Every button will give or take a full stack from your inventory. To Sell any item, you need to have a full stack of it!")
                    .divider()
                    .label(
                        '§aYour Balance§r' +
                        '\n\nCash: §e' + cash +
                        '\n\n§rBank: §e' + bank
                    )
                    .divider()
                    .header('§nLogs.')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.wood.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.wood.modifier + '%%'

                    )
                    .divider()
                    .label(
                        'Oak Logs' +
                        '\n\n§aBuy Price: §e§l' + oak_log_buy +
                        '\n§r§cSell Price: §e§l' + oak_log_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Spruce Logs' +
                        '\n\n§aBuy Price: §e§l' + spruce_log_buy +
                        '\n§r§cSell Price: §e§l' + spruce_log_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Birch Logs' +
                        '\n\n§aBuy Price: §e§l' + birch_log_buy +
                        '\n§r§cSell Price: §e§l' + birch_log_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Jungle Logs' +
                        '\n\n§aBuy Price: §e§l' + jungle_log_buy +
                        '\n§r§cSell Price: §e§l' + jungle_log_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Acacia Logs' +
                        '\n\n§aBuy Price: §e§l' + acacia_log_buy +
                        '\n§r§cSell Price: §e§l' + acacia_log_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Dark Oak Logs' +
                        '\n\n§aBuy Price: §e§l' + dark_oak_log_buy +
                        '\n§r§cSell Price: §e§l' + dark_oak_log_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Mangrove Logs' +
                        '\n\n§aBuy Price: §e§l' + mangrove_log_buy +
                        '\n§r§cSell Price: §e§l' + mangrove_log_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cherry Logs' +
                        '\n\n§aBuy Price: §e§l' + cherry_log_buy +
                        '\n§r§cSell Price: §e§l' + cherry_log_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Pale Oak Logs' +
                        '\n\n§aBuy Price: §e§l' + pale_oak_log_buy +
                        '\n§r§cSell Price: §e§l' + pale_oak_log_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Crimson Stem' +
                        '\n\n§aBuy Price: §e§l' + crimson_stem_buy +
                        '\n§r§cSell Price: §e§l' + crimson_stem_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Warped Stem' +
                        '\n\n§aBuy Price: §e§l' + warped_stem_buy +
                        '\n§r§cSell Price: §e§l' + warped_stem_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .header('§nLeaves.')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.leaves.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.leaves.modifier + '%%'

                    )
                    .divider()
                    .label(
                        'Oak Leaves' +
                        '\n\n§aBuy Price: §e§l' + oak_leaves_buy +
                        '\n§r§cSell Price: §e§l' + oak_leaves_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Spruce Leaves' +
                        '\n\n§aBuy Price: §e§l' + spruce_leaves_buy +
                        '\n§r§cSell Price: §e§l' + spruce_leaves_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Birch Leaves' +
                        '\n\n§aBuy Price: §e§l' + birch_leaves_buy +
                        '\n§r§cSell Price: §e§l' + birch_leaves_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Jungle Leaves' +
                        '\n\n§aBuy Price: §e§l' + jungle_leaves_buy +
                        '\n§r§cSell Price: §e§l' + jungle_leaves_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Acacia Leaves' +
                        '\n\n§aBuy Price: §e§l' + acacia_leaves_buy +
                        '\n§r§cSell Price: §e§l' + acacia_leaves_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Dark Oak Leaves' +
                        '\n\n§aBuy Price: §e§l' + dark_oak_leaves_buy +
                        '\n§r§cSell Price: §e§l' + dark_oak_leaves_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Mangrove Leaves' +
                        '\n\n§aBuy Price: §e§l' + mangrove_leaves_buy +
                        '\n§r§cSell Price: §e§l' + mangrove_leaves_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cherry Leaves' +
                        '\n\n§aBuy Price: §e§l' + cherry_leaves_buy +
                        '\n§r§cSell Price: §e§l' + cherry_leaves_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Pale Oak Leaves' +
                        '\n\n§aBuy Price: §e§l' + pale_oak_leaves_buy +
                        '\n§r§cSell Price: §e§l' + pale_oak_leaves_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Nether Wart Block' +
                        '\n\n§aBuy Price: §e§l' + nether_wart_block_buy +
                        '\n§r§cSell Price: §e§l' + nether_wart_block_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Warped Wart Block' +
                        '\n\n§aBuy Price: §e§l' + warped_wart_block_buy +
                        '\n§r§cSell Price: §e§l' + warped_wart_block_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .button('Back')
            }

            function woodmarket(source) {
                const cash = getCashScore(source, "balance")
                const bank = getBankScore(source, 'bank')


                const oak_log_buy = getBuyPrice('wood', 'oak_log')
                const oak_log_sell = getSellPrice('wood', 'oak_log')

                const spruce_log_buy = getBuyPrice('wood', 'spruce_log')
                const spruce_log_sell = getSellPrice('wood', 'spruce_log')

                const birch_log_buy = getBuyPrice('wood', 'birch_log')
                const birch_log_sell = getSellPrice('wood', 'birch_log')

                const jungle_log_buy = getBuyPrice('wood', 'jungle_log')
                const jungle_log_sell = getSellPrice('wood', 'jungle_log')

                const acacia_log_buy = getBuyPrice('wood', 'acacia_log')
                const acacia_log_sell = getSellPrice('wood', 'acacia_log')

                const dark_oak_log_buy = getBuyPrice('wood', 'dark_oak_log')
                const dark_oak_log_sell = getSellPrice('wood', 'dark_oak_log')

                const mangrove_log_buy = getBuyPrice('wood', 'mangrove_log')
                const mangrove_log_sell = getSellPrice('wood', 'mangrove_log')

                const cherry_log_buy = getBuyPrice('wood', 'cherry_log')
                const cherry_log_sell = getSellPrice('wood', 'cherry_log')

                const pale_oak_log_buy = getBuyPrice('wood', 'pale_oak_log')
                const pale_oak_log_sell = getSellPrice('wood', 'pale_oak_log')

                const crimson_stem_buy = getBuyPrice('wood', 'crimson_stem')
                const crimson_stem_sell = getSellPrice('wood', 'crimson_stem')

                const warped_stem_buy = getBuyPrice('wood', 'warped_stem')
                const warped_stem_sell = getSellPrice('wood', 'warped_stem')

                //leaves
                const oak_leaves_buy = getBuyPrice('leaves', 'oak_leaves')
                const oak_leaves_sell = getSellPrice('leaves', 'oak_leaves')

                const spruce_leaves_buy = getBuyPrice('leaves', 'spruce_leaves')
                const spruce_leaves_sell = getSellPrice('leaves', 'spruce_leaves')

                const birch_leaves_buy = getBuyPrice('leaves', 'bitch_leaves')
                const birch_leaves_sell = getSellPrice('leaves', 'bitch_leaves')

                const jungle_leaves_buy = getBuyPrice('leaves', 'jungle_leaves')
                const jungle_leaves_sell = getSellPrice('leaves', 'jungle_leaves')

                const acacia_leaves_buy = getBuyPrice('leaves', 'acacia_leaves')
                const acacia_leaves_sell = getSellPrice('leaves', 'acacia_leaves')

                const dark_oak_leaves_buy = getBuyPrice('leaves', 'dark_oak_leaves')
                const dark_oak_leaves_sell = getSellPrice('leaves', 'dark_oak_leaves')

                const mangrove_leaves_buy = getBuyPrice('leaves', 'mangrove_leaves')
                const mangrove_leaves_sell = getSellPrice('leaves', 'mangrove_leaves')

                const cherry_leaves_buy = getBuyPrice('leaves', 'cherry_leaves')
                const cherry_leaves_sell = getSellPrice('leaves', 'cherry_leaves')

                const pale_oak_leaves_buy = getBuyPrice('leaves', 'pale_oak_leaves')
                const pale_oak_leaves_sell = getSellPrice('leaves', 'pale_oak_leaves')

                const nether_wart_block_buy = getBuyPrice('leaves', 'nether_wart_block')
                const nether_wart_block_sell = getSellPrice('leaves', 'nether_wart_block')

                const warped_wart_block_buy = getBuyPrice('leaves', 'warped_wart_block')
                const warped_wart_block_sell = getSellPrice('leaves', 'warped_wart_block')



                servermarketcat_wood(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            if (cash < oak_log_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${oak_log_buy}`)
                                source.runCommand(`give @s oak_log 64`)
                                source.sendMessage(`§aBought §e§lOak Log x64 §r§afor ${oak_log_buy}`)
                            }
                            break;

                        case 1:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:oak_log, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:oak_log, quantity=64..}] run scoreboard players add @s balance ${oak_log_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:oak_log, quantity=64..}] run say §aSold §a§lOak Log x64§r §aFor §e§l${oak_log_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:oak_log, quantity=64..}] run clear @s oak_log 0 64`), 1)
                            break;
                        // Spruce Log
                        case 2:
                            if (cash < spruce_log_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${spruce_log_buy}`)
                                source.runCommand(`give @s spruce_log 64`)
                                source.sendMessage(`§aBought §e§lSpruce Log x64 §r§afor ${spruce_log_buy}`)
                            }
                            break;

                        case 3:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:spruce_log, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:spruce_log, quantity=64..}] run scoreboard players add @s balance ${spruce_log_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:spruce_log, quantity=64..}] run say §aSold §a§lSpruce Log x64§r §aFor §e§l${spruce_log_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:spruce_log, quantity=64..}] run clear @s spruce_log 0 64`), 1)
                            break;

                        // Birch Log
                        case 4:
                            if (cash < birch_log_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${birch_log_buy}`)
                                source.runCommand(`give @s birch_log 64`)
                                source.sendMessage(`§aBought §e§lBirch Log x64 §r§afor ${birch_log_buy}`)
                            }
                            break;

                        case 5:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:birch_log, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:birch_log, quantity=64..}] run scoreboard players add @s balance ${birch_log_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:birch_log, quantity=64..}] run say §aSold §a§lBirch Log x64§r §aFor §e§l${birch_log_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:birch_log, quantity=64..}] run clear @s birch_log 0 64`), 1)
                            break;

                        // Jungle Log
                        case 6:
                            if (cash < jungle_log_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${jungle_log_buy}`)
                                source.runCommand(`give @s jungle_log 64`)
                                source.sendMessage(`§aBought §e§lJungle Log x64 §r§afor ${jungle_log_buy}`)
                            }
                            break;

                        case 7:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:jungle_log, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:jungle_log, quantity=64..}] run scoreboard players add @s balance ${jungle_log_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:jungle_log, quantity=64..}] run say §aSold §a§lJungle Log x64§r §aFor §e§l${jungle_log_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:jungle_log, quantity=64..}] run clear @s jungle_log 0 64`), 1)
                            break;
                        // Acacia Log
                        case 8:
                            if (cash < acacia_log_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${acacia_log_buy}`)
                                source.runCommand(`give @s acacia_log 64`)
                                source.sendMessage(`§aBought §e§lAcacia Log x64 §r§afor ${acacia_log_buy}`)
                            }
                            break;

                        case 9:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:acacia_log, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:acacia_log, quantity=64..}] run scoreboard players add @s balance ${acacia_log_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:acacia_log, quantity=64..}] run say §aSold §a§lAcacia Log x64§r §aFor §e§l${acacia_log_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:acacia_log, quantity=64..}] run clear @s acacia_log 0 64`), 1)
                            break;

                        // Dark Oak Log
                        case 10:
                            if (cash < dark_oak_log_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${dark_oak_log_buy}`)
                                source.runCommand(`give @s dark_oak_log 64`)
                                source.sendMessage(`§aBought §e§lDark Oak Log x64 §r§afor ${dark_oak_log_buy}`)
                            }
                            break;

                        case 11:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:dark_oak_log, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dark_oak_log, quantity=64..}] run scoreboard players add @s balance ${dark_oak_log_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dark_oak_log, quantity=64..}] run say §aSold §a§lDark Oak Log x64§r §aFor §e§l${dark_oak_log_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dark_oak_log, quantity=64..}] run clear @s dark_oak_log 0 64`), 1)
                            break;

                        // Mangrove Log
                        case 12:
                            if (cash < mangrove_log_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${mangrove_log_buy}`)
                                source.runCommand(`give @s mangrove_log 64`)
                                source.sendMessage(`§aBought §e§lMangrove Log x64 §r§afor ${mangrove_log_buy}`)
                            }
                            break;

                        case 13:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:mangrove_log, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mangrove_log, quantity=64..}] run scoreboard players add @s balance ${mangrove_log_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mangrove_log, quantity=64..}] run say §aSold §a§lMangrove Log x64§r §aFor §e§l${mangrove_log_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mangrove_log, quantity=64..}] run clear @s mangrove_log 0 64`), 1)
                            break;

                        // Cherry Log
                        case 14:
                            if (cash < cherry_log_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cherry_log_buy}`)
                                source.runCommand(`give @s cherry_log 64`)
                                source.sendMessage(`§aBought §e§lCherry Log x64 §r§afor ${cherry_log_buy}`)
                            }
                            break;

                        case 15:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cherry_log, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cherry_log, quantity=64..}] run scoreboard players add @s balance ${cherry_log_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cherry_log, quantity=64..}] run say §aSold §a§lCherry Log x64§r §aFor §e§l${cherry_log_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cherry_log, quantity=64..}] run clear @s cherry_log 0 64`), 1)
                            break;

                        // Pale Oak Log
                        case 16:
                            if (cash < pale_oak_log_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${pale_oak_log_buy}`)
                                source.runCommand(`give @s pale_oak_log 64`)
                                source.sendMessage(`§aBought §e§lPale Oak Log x64 §r§afor ${pale_oak_log_buy}`)
                            }
                            break;

                        case 17:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:pale_oak_log, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pale_oak_log, quantity=64..}] run scoreboard players add @s balance ${pale_oak_log_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pale_oak_log, quantity=64..}] run say §aSold §a§lPale Oak Log x64§r §aFor §e§l${pale_oak_log_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pale_oak_log, quantity=64..}] run clear @s pale_oak_log 0 64`), 1)
                            break;
                        // Crimson Stem
                        case 18:
                            if (cash < crimson_stem_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${crimson_stem_buy}`)
                                source.runCommand(`give @s crimson_stem 64`)
                                source.sendMessage(`§aBought §e§lCrimson Stem x64 §r§afor ${crimson_stem_buy}`)
                            }
                            break;

                        case 19:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:crimson_stem, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:crimson_stem, quantity=64..}] run scoreboard players add @s balance ${crimson_stem_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:crimson_stem, quantity=64..}] run say §aSold §a§lCrimson Stem x64§r §aFor §e§l${crimson_stem_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:crimson_stem, quantity=64..}] run clear @s crimson_stem 0 64`), 1)
                            break;
                        // Warped Stem
                        case 20:
                            if (cash < warped_stem_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${warped_stem_buy}`)
                                source.runCommand(`give @s warped_stem 64`)
                                source.sendMessage(`§aBought §e§lWarped Stem x64 §r§afor ${warped_stem_buy}`)
                            }
                            break;

                        case 21:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:warped_stem, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')

                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:warped_stem, quantity=64..}] run scoreboard players add @s balance ${warped_stem_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:warped_stem, quantity=64..}] run say §aSold §a§lWarped Stem x64§r §aFor §e§l${warped_stem_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:warped_stem, quantity=64..}] run clear @s warped_stem 0 64`), 1)
                            break;
                        // Oak Leaves
                        case 22:
                            if (cash < oak_leaves_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${oak_leaves_buy}`)
                                source.runCommand(`give @s oak_leaves 64`)
                                source.sendMessage(`§aBought §e§lOak Leaves x64 §r§afor ${oak_leaves_buy}`)
                            }
                            break;

                        case 23:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:oak_leaves, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:oak_leaves, quantity=64..}] run scoreboard players add @s balance ${oak_leaves_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:oak_leaves, quantity=64..}] run say §aSold §a§lOak Leaves x64§r §aFor §e§l${oak_leaves_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:oak_leaves, quantity=64..}] run clear @s oak_leaves 0 64`), 1)
                            break;

                        // Spruce Leaves
                        case 24:
                            if (cash < spruce_leaves_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${spruce_leaves_buy}`)
                                source.runCommand(`give @s spruce_leaves 64`)
                                source.sendMessage(`§aBought §e§lSpruce Leaves x64 §r§afor ${spruce_leaves_buy}`)
                            }
                            break;

                        case 25:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:spruce_leaves, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:spruce_leaves, quantity=64..}] run scoreboard players add @s balance ${spruce_leaves_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:spruce_leaves, quantity=64..}] run say §aSold §a§lSpruce Leaves x64§r §aFor §e§l${spruce_leaves_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:spruce_leaves, quantity=64..}] run clear @s spruce_leaves 0 64`), 1)
                            break;

                        // Birch Leaves
                        case 26:
                            if (cash < birch_leaves_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${birch_leaves_buy}`)
                                source.runCommand(`give @s birch_leaves 64`)
                                source.sendMessage(`§aBought §e§lBirch Leaves x64 §r§afor ${birch_leaves_buy}`)
                            }
                            break;

                        case 27:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:birch_leaves, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:birch_leaves, quantity=64..}] run scoreboard players add @s balance ${birch_leaves_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:birch_leaves, quantity=64..}] run say §aSold §a§lBirch Leaves x64§r §aFor §e§l${birch_leaves_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:birch_leaves, quantity=64..}] run clear @s birch_leaves 0 64`), 1)
                            break;

                        // Jungle Leaves
                        case 28:
                            if (cash < jungle_leaves_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${jungle_leaves_buy}`)
                                source.runCommand(`give @s jungle_leaves 64`)
                                source.sendMessage(`§aBought §e§lJungle Leaves x64 §r§afor ${jungle_leaves_buy}`)
                            }
                            break;

                        case 29:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:jungle_leaves, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:jungle_leaves, quantity=64..}] run scoreboard players add @s balance ${jungle_leaves_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:jungle_leaves, quantity=64..}] run say §aSold §a§lJungle Leaves x64§r §aFor §e§l${jungle_leaves_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:jungle_leaves, quantity=64..}] run clear @s jungle_leaves 0 64`), 1)
                            break;

                        // Acacia Leaves
                        case 30:
                            if (cash < acacia_leaves_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${acacia_leaves_buy}`)
                                source.runCommand(`give @s acacia_leaves 64`)
                                source.sendMessage(`§aBought §e§lAcacia Leaves x64 §r§afor ${acacia_leaves_buy}`)
                            }
                            break;

                        case 31:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:acacia_leaves, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:acacia_leaves, quantity=64..}] run scoreboard players add @s balance ${acacia_leaves_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:acacia_leaves, quantity=64..}] run say §aSold §a§lAcacia Leaves x64§r §aFor §e§l${acacia_leaves_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:acacia_leaves, quantity=64..}] run clear @s acacia_leaves 0 64`), 1)
                            break;

                        // Dark Oak Leaves
                        case 32:
                            if (cash < dark_oak_leaves_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${dark_oak_leaves_buy}`)
                                source.runCommand(`give @s dark_oak_leaves 64`)
                                source.sendMessage(`§aBought §e§lDark Oak Leaves x64 §r§afor ${dark_oak_leaves_buy}`)
                            }
                            break;

                        case 33:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:dark_oak_leaves, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dark_oak_leaves, quantity=64..}] run scoreboard players add @s balance ${dark_oak_leaves_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dark_oak_leaves, quantity=64..}] run say §aSold §a§lDark Oak Leaves x64§r §aFor §e§l${dark_oak_leaves_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dark_oak_leaves, quantity=64..}] run clear @s dark_oak_leaves 0 64`), 1)
                            break;

                        // Mangrove Leaves
                        case 34:
                            if (cash < mangrove_leaves_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${mangrove_leaves_buy}`)
                                source.runCommand(`give @s mangrove_leaves 64`)
                                source.sendMessage(`§aBought §e§lMangrove Leaves x64 §r§afor ${mangrove_leaves_buy}`)
                            }
                            break;

                        case 35:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:mangrove_leaves, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mangrove_leaves, quantity=64..}] run scoreboard players add @s balance ${mangrove_leaves_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mangrove_leaves, quantity=64..}] run say §aSold §a§lMangrove Leaves x64§r §aFor §e§l${mangrove_leaves_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mangrove_leaves, quantity=64..}] run clear @s mangrove_leaves 0 64`), 1)
                            break;

                        // Cherry Leaves
                        case 36:
                            if (cash < cherry_leaves_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${cherry_leaves_buy}`)
                                source.runCommand(`give @s cherry_leaves 64`)
                                source.sendMessage(`§aBought §e§lCherry Leaves x64 §r§afor ${cherry_leaves_buy}`)
                            }
                            break;

                        case 37:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cherry_leaves, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cherry_leaves, quantity=64..}] run scoreboard players add @s balance ${cherry_leaves_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cherry_leaves, quantity=64..}] run say §aSold §a§lCherry Leaves x64§r §aFor §e§l${cherry_leaves_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cherry_leaves, quantity=64..}] run clear @s cherry_leaves 0 64`), 1)
                            break;

                        // Pale Oak Leaves
                        case 38:
                            if (cash < pale_oak_leaves_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${pale_oak_leaves_buy}`)
                                source.runCommand(`give @s pale_oak_leaves 64`)
                                source.sendMessage(`§aBought §e§lPale Oak Leaves x64 §r§afor ${pale_oak_leaves_buy}`)
                            }
                            break;

                        case 39:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:pale_oak_leaves, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pale_oak_leaves, quantity=64..}] run scoreboard players add @s balance ${pale_oak_leaves_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pale_oak_leaves, quantity=64..}] run say §aSold §a§lPale Oak Leaves x64§r §aFor §e§l${pale_oak_leaves_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:pale_oak_leaves, quantity=64..}] run clear @s pale_oak_leaves 0 64`), 1)
                            break;

                        // Nether Wart Block
                        case 40:
                            if (cash < nether_wart_block_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${nether_wart_block_buy}`)
                                source.runCommand(`give @s nether_wart_block 64`)
                                source.sendMessage(`§aBought §e§lNether Wart Block x64 §r§afor ${nether_wart_block_buy}`)
                            }
                            break;

                        case 41:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:nether_wart_block, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:nether_wart_block, quantity=64..}] run scoreboard players add @s balance ${nether_wart_block_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:nether_wart_block, quantity=64..}] run say §aSold §a§lNether Wart Block x64§r §aFor §e§l${nether_wart_block_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:nether_wart_block, quantity=64..}] run clear @s nether_wart_block 0 64`), 1)
                            break;

                        // Warped Wart Block
                        case 42:
                            if (cash < warped_wart_block_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            }
                            else {
                                source.runCommand(`scoreboard players remove @s balance ${warped_wart_block_buy}`)
                                source.runCommand(`give @s warped_wart_block 64`)
                                source.sendMessage(`§aBought §e§lWarped Wart Block x64 §r§afor ${warped_wart_block_buy}`)
                            }
                            break;

                        case 43:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:warped_wart_block, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:warped_wart_block, quantity=64..}] run scoreboard players add @s balance ${warped_wart_block_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:warped_wart_block, quantity=64..}] run say §aSold §a§lWarped Wart Block x64§r §aFor §e§l${warped_wart_block_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:warped_wart_block, quantity=64..}] run clear @s warped_wart_block 0 64`), 1)
                            break;

                    }
                })
            }

            function servermarketcat_nature(source) {
                const cash = getCashScore(source, 'balance')
                const bank = getBankScore(source, 'bank')

                const dirt_buy = getBuyPrice('nature', 'dirt')
                const dirt_sell = getSellPrice('nature', 'dirt')

                const coarse_dirt_buy = getBuyPrice('nature', 'coarse_dirt')
                const coarse_dirt_sell = getSellPrice('nature', 'coarse_dirt')

                const rooted_dirt_buy = getBuyPrice('nature', 'rooted_dirt')
                const rooted_dirt_sell = getSellPrice('nature', 'rooted_dirt')

                const grass_block_buy = getBuyPrice('nature', 'grass_block')
                const grass_block_sell = getSellPrice('nature', 'grass_block')

                const podzol_buy = getBuyPrice('nature', 'podzol')
                const podzol_sell = getSellPrice('nature', 'podzol')

                const mycelium_buy = getBuyPrice('nature', 'mycelium')
                const mycelium_sell = getSellPrice('nature', 'mycelium')

                const sand_buy = getBuyPrice('nature', 'sand')
                const sand_sell = getSellPrice('nature', 'sand')

                const red_sand_buy = getBuyPrice('nature', 'red_sand')
                const red_sand_sell = getSellPrice('nature', 'red_sand')

                const mud_buy = getBuyPrice('nature', 'mud')
                const mud_sell = getSellPrice('nature', 'mud')

                const packed_mud_buy = getBuyPrice('nature', 'packed_mud')
                const packed_mud_sell = getSellPrice('nature', 'packed_mud')

                const clay_buy = getBuyPrice('nature', 'clay')
                const clay_sell = getSellPrice('nature', 'clay')

                const magma_block_buy = getBuyPrice('nature', 'magma_block')
                const magma_block_sell = getSellPrice('nature', 'magma_block')

                const soul_sand_buy = getBuyPrice('nature', 'soul_sand')
                const soul_sand_sell = getSellPrice('nature', 'soul_sand')

                return new ActionFormData()
                    .title('Server Market / Nature')
                    .body('§l§eNature Category§r' + "\n\n§c/!\\ Every button will give or take a full stack from your inventory. To Sell any item, you need to have a full stack of it!")
                    .divider()
                    .label(
                        '§aYour Balance§r' +
                        '\n\nCash: §e' + cash +
                        '\n\n§rBank: §e' + bank
                    )
                    .divider()
                    .header('§nNatural Blocks')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.nature.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.nature.modifier + '%%'

                    )
                    .divider()
                    .label(
                        'Dirt' +
                        '\n\n§aBuy Price: §e§l' + dirt_buy +
                        '\n§r§cSell Price: §e§l' + dirt_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Coarse Dirt' +
                        '\n\n§aBuy Price: §e§l' + coarse_dirt_buy +
                        '\n§r§cSell Price: §e§l' + coarse_dirt_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Rooted Dirt' +
                        '\n\n§aBuy Price: §e§l' + rooted_dirt_buy +
                        '\n§r§cSell Price: §e§l' + rooted_dirt_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Grass Block' +
                        '\n\n§aBuy Price: §e§l' + grass_block_buy +
                        '\n§r§cSell Price: §e§l' + grass_block_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Podzol' +
                        '\n\n§aBuy Price: §e§l' + podzol_buy +
                        '\n§r§cSell Price: §e§l' + podzol_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Mycelium' +
                        '\n\n§aBuy Price: §e§l' + mycelium_buy +
                        '\n§r§cSell Price: §e§l' + mycelium_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Sand' +
                        '\n\n§aBuy Price: §e§l' + sand_buy +
                        '\n§r§cSell Price: §e§l' + sand_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Red Sand' +
                        '\n\n§aBuy Price: §e§l' + red_sand_buy +
                        '\n§r§cSell Price: §e§l' + red_sand_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Mud' +
                        '\n\n§aBuy Price: §e§l' + mud_buy +
                        '\n§r§cSell Price: §e§l' + mud_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Packed Mud' +
                        '\n\n§aBuy Price: §e§l' + packed_mud_buy +
                        '\n§r§cSell Price: §e§l' + packed_mud_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Clay' +
                        '\n\n§aBuy Price: §e§l' + clay_buy +
                        '\n§r§cSell Price: §e§l' + clay_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Magma Block' +
                        '\n\n§aBuy Price: §e§l' + magma_block_buy +
                        '\n§r§cSell Price: §e§l' + magma_block_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()

                    .label(
                        'Soul Sand' +
                        '\n\n§aBuy Price: §e§l' + soul_sand_buy +
                        '\n§r§cSell Price: §e§l' + soul_sand_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .button('Back')
            }

            function naturemarket(source) {

                const cash = getCashScore(source, 'balance')
                const bank = getBankScore(source, 'bank')

                const dirt_buy = getBuyPrice('nature', 'dirt')
                const dirt_sell = getSellPrice('nature', 'dirt')

                const coarse_dirt_buy = getBuyPrice('nature', 'coarse_dirt')
                const coarse_dirt_sell = getSellPrice('nature', 'coarse_dirt')

                const rooted_dirt_buy = getBuyPrice('nature', 'rooted_dirt')
                const rooted_dirt_sell = getSellPrice('nature', 'rooted_dirt')

                const grass_block_buy = getBuyPrice('nature', 'grass_block')
                const grass_block_sell = getSellPrice('nature', 'grass_block')

                const podzol_buy = getBuyPrice('nature', 'podzol')
                const podzol_sell = getSellPrice('nature', 'podzol')

                const mycelium_buy = getBuyPrice('nature', 'mycelium')
                const mycelium_sell = getSellPrice('nature', 'mycelium')

                const sand_buy = getBuyPrice('nature', 'sand')
                const sand_sell = getSellPrice('nature', 'sand')

                const red_sand_buy = getBuyPrice('nature', 'red_sand')
                const red_sand_sell = getSellPrice('nature', 'red_sand')

                const mud_buy = getBuyPrice('nature', 'mud')
                const mud_sell = getSellPrice('nature', 'mud')

                const packed_mud_buy = getBuyPrice('nature', 'packed_mud')
                const packed_mud_sell = getSellPrice('nature', 'packed_mud')

                const clay_buy = getBuyPrice('nature', 'clay')
                const clay_sell = getSellPrice('nature', 'clay')

                const magma_block_buy = getBuyPrice('nature', 'magma_block')
                const magma_block_sell = getSellPrice('nature', 'magma_block')

                const soul_sand_buy = getBuyPrice('nature', 'soul_sand')
                const soul_sand_sell = getSellPrice('nature', 'soul_sand')

                servermarketcat_nature(source).show(source).then((r) => {
                    switch (r.selection) {
                        // DIRT
                        case 0:
                            if (cash < dirt_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${dirt_buy}`)
                                source.runCommand(`give @s dirt 64`)
                                source.sendMessage(`§aBought §e§lDirt x64 §r§afor ${dirt_buy}`)
                            }
                            break;

                        case 1:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:dirt, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dirt, quantity=64..}] run scoreboard players add @s balance ${dirt_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dirt, quantity=64..}] run say §aSold §a§lDirt x64§r §aFor §e§l${dirt_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:dirt, quantity=64..}] run clear @s dirt 0 64`), 1)
                            break;

                        // COARSE DIRT
                        case 2:
                            if (cash < coarse_dirt_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${coarse_dirt_buy}`)
                                source.runCommand(`give @s coarse_dirt 64`)
                                source.sendMessage(`§aBought §e§lCoarse Dirt x64 §r§afor ${coarse_dirt_buy}`)
                            }
                            break;

                        case 3:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:coarse_dirt, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:coarse_dirt, quantity=64..}] run scoreboard players add @s balance ${coarse_dirt_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:coarse_dirt, quantity=64..}] run say §aSold §a§lCoarse Dirt x64§r §aFor §e§l${coarse_dirt_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:coarse_dirt, quantity=64..}] run clear @s coarse_dirt 0 64`), 1)
                            break;

                        // ROOTED DIRT
                        case 4:
                            if (cash < rooted_dirt_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${rooted_dirt_buy}`)
                                source.runCommand(`give @s rooted_dirt 64`)
                                source.sendMessage(`§aBought §e§lRooted Dirt x64 §r§afor ${rooted_dirt_buy}`)
                            }
                            break;

                        case 5:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:rooted_dirt, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:rooted_dirt, quantity=64..}] run scoreboard players add @s balance ${rooted_dirt_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:rooted_dirt, quantity=64..}] run say §aSold §a§lRooted Dirt x64§r §aFor §e§l${rooted_dirt_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:rooted_dirt, quantity=64..}] run clear @s rooted_dirt 0 64`), 1)
                            break;

                        // GRASS BLOCK
                        case 6:
                            if (cash < grass_block_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${grass_block_buy}`)
                                source.runCommand(`give @s grass_block 64`)
                                source.sendMessage(`§aBought §e§lGrass Block x64 §r§afor ${grass_block_buy}`)
                            }
                            break;

                        case 7:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:grass_block, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:grass_block, quantity=64..}] run scoreboard players add @s balance ${grass_block_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:grass_block, quantity=64..}] run say §aSold §a§lGrass Block x64§r §aFor §e§l${grass_block_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:grass_block, quantity=64..}] run clear @s grass_block 0 64`), 1)
                            break;

                        // PODZOL
                        case 8:
                            if (cash < podzol_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${podzol_buy}`)
                                source.runCommand(`give @s podzol 64`)
                                source.sendMessage(`§aBought §e§lPodzol x64 §r§afor ${podzol_buy}`)
                            }
                            break;

                        case 9:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:podzol, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:podzol, quantity=64..}] run scoreboard players add @s balance ${podzol_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:podzol, quantity=64..}] run say §aSold §a§lPodzol x64§r §aFor §e§l${podzol_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:podzol, quantity=64..}] run clear @s podzol 0 64`), 1)
                            break;

                        // MYCELIUM
                        case 10:
                            if (cash < mycelium_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${mycelium_buy}`)
                                source.runCommand(`give @s mycelium 64`)
                                source.sendMessage(`§aBought §e§lMycelium x64 §r§afor ${mycelium_buy}`)
                            }
                            break;

                        case 11:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:mycelium, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mycelium, quantity=64..}] run scoreboard players add @s balance ${mycelium_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mycelium, quantity=64..}] run say §aSold §a§lMycelium x64§r §aFor §e§l${mycelium_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mycelium, quantity=64..}] run clear @s mycelium 0 64`), 1)
                            break;

                        // SAND
                        case 12:
                            if (cash < sand_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${sand_buy}`)
                                source.runCommand(`give @s sand 64`)
                                source.sendMessage(`§aBought §e§lSand x64 §r§afor ${sand_buy}`)
                            }
                            break;

                        case 13:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:sand, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:sand, quantity=64..}] run scoreboard players add @s balance ${sand_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:sand, quantity=64..}] run say §aSold §a§lSand x64§r §aFor §e§l${sand_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:sand, quantity=64..}] run clear @s sand 0 64`), 1)
                            break;

                        // RED SAND
                        case 14:
                            if (cash < red_sand_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${red_sand_buy}`)
                                source.runCommand(`give @s red_sand 64`)
                                source.sendMessage(`§aBought §e§lRed Sand x64 §r§afor ${red_sand_buy}`)
                            }
                            break;

                        case 15:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:red_sand, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:red_sand, quantity=64..}] run scoreboard players add @s balance ${red_sand_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:red_sand, quantity=64..}] run say §aSold §a§lRed Sand x64§r §aFor §e§l${red_sand_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:red_sand, quantity=64..}] run clear @s red_sand 0 64`), 1)
                            break;

                        // MUD
                        case 16:
                            if (cash < mud_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${mud_buy}`)
                                source.runCommand(`give @s mud 64`)
                                source.sendMessage(`§aBought §e§lMud x64 §r§afor ${mud_buy}`)
                            }
                            break;

                        case 17:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:mud, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mud, quantity=64..}] run scoreboard players add @s balance ${mud_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mud, quantity=64..}] run say §aSold §a§lMud x64§r §aFor §e§l${mud_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:mud, quantity=64..}] run clear @s mud 0 64`), 1)
                            break;

                        // PACKED MUD
                        case 18:
                            if (cash < packed_mud_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${packed_mud_buy}`)
                                source.runCommand(`give @s packed_mud 64`)
                                source.sendMessage(`§aBought §e§lPacked Mud x64 §r§afor ${packed_mud_buy}`)
                            }
                            break;

                        case 19:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:packed_mud, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:packed_mud, quantity=64..}] run scoreboard players add @s balance ${packed_mud_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:packed_mud, quantity=64..}] run say §aSold §a§lPacked Mud x64§r §aFor §e§l${packed_mud_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:packed_mud, quantity=64..}] run clear @s packed_mud 0 64`), 1)
                            break;

                        // CLAY
                        case 20:
                            if (cash < clay_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${clay_buy}`)
                                source.runCommand(`give @s clay 64`)
                                source.sendMessage(`§aBought §e§lClay x64 §r§afor ${clay_buy}`)
                            }
                            break;

                        case 21:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:clay, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:clay, quantity=64..}] run scoreboard players add @s balance ${clay_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:clay, quantity=64..}] run say §aSold §a§lClay x64§r §aFor §e§l${clay_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:clay, quantity=64..}] run clear @s clay 0 64`), 1)
                            break;

                        // MAGMA BLOCK
                        case 22:
                            if (cash < magma_block_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${magma_block_buy}`)
                                source.runCommand(`give @s magma_block 64`)
                                source.sendMessage(`§aBought §e§lMagma Block x64 §r§afor ${magma_block_buy}`)
                            }
                            break;

                        case 23:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:magma_block, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:magma_block, quantity=64..}] run scoreboard players add @s balance ${magma_block_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:magma_block, quantity=64..}] run say §aSold §a§lMagma Block x64§r §aFor §e§l${magma_block_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:magma_block, quantity=64..}] run clear @s magma_block 0 64`), 1)
                            break;

                        // SOUL SAND
                        case 24:
                            if (cash < soul_sand_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${soul_sand_buy}`)
                                source.runCommand(`give @s soul_sand 64`)
                                source.sendMessage(`§aBought §e§lSoul Sand x64 §r§afor ${soul_sand_buy}`)
                            }
                            break;

                        case 25:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:soul_sand, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:soul_sand, quantity=64..}] run scoreboard players add @s balance ${soul_sand_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:soul_sand, quantity=64..}] run say §aSold §a§lSoul Sand x64§r §aFor §e§l${soul_sand_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:soul_sand, quantity=64..}] run clear @s soul_sand 0 64`), 1)
                            break;

                        default:
                            servermarket_menu(source);
                            break;
                    }
                })
            }

            function servermarketcat_bb(source) {
                const cash = getCashScore(source, "balance")
                const bank = getBankScore(source, "bank")

                const cobblestone_buy = getBuyPrice('stone_blocks', 'cobblestone')
                const cobblestone_sell = getSellPrice('stone_blocks', 'cobblestone')

                const stone_buy = getBuyPrice('stone_blocks', 'stone')
                const stone_sell = getSellPrice('stone_blocks', "stone")

                const granite_buy = getBuyPrice('stone_blocks', 'granite')
                const granite_sell = getSellPrice('stone_blocks', 'granite')

                const diorite_buy = getBuyPrice('stone_blocks', 'diorite')
                const diorite_sell = getSellPrice('stone_blocks', 'diorite')

                const andesite_buy = getBuyPrice('stone_blocks', 'andesite')
                const andesite_sell = getSellPrice('stone_blocks', 'andesite')

                const cobbled_deepslate_buy = getBuyPrice('stone_blocks', 'cobbled_deepslate')
                const cobbled_deepslate_sell = getSellPrice('stone_blocks', 'cobbled_deepslate')

                const deepslate_buy = getBuyPrice('stone_blocks', 'deepslate')
                const deepslate_sell = getSellPrice('stone_blocks', 'deepslate')

                const basalt_buy = getBuyPrice('stone_blocks', 'basalt')
                const basalt_sell = getSellPrice('stone_blocks', 'basalt')

                const blackstone_buy = getBuyPrice('stone_blocks', 'blackstone')
                const blackstone_sell = getSellPrice('stone_blocks', 'blackstone')

                const obsidian_buy = getBuyPrice('stone_blocks', 'obsidian')
                const obsidian_sell = getSellPrice('stone_blocks', 'obsidian')

                const crying_obsidian_buy = getBuyPrice('stone_blocks', 'crying_obsidian')
                const crying_obsidian_sell = getSellPrice('stone_blocks', 'crying_obsidian')

                return new ActionFormData()
                    .title('Server Market / Building Blocks')
                    .body('§l§eBuilding Blocks Category§r' + "\n\n§c/!\\ Every button will give or take a full stack from your inventory. To Sell any item, you need to have a full stack of it!")
                    .divider()
                    .label(
                        '§aYour Balance§r' +
                        '\n\nCash: §e' + cash +
                        '\n\n§rBank: §e' + bank
                    )
                    .divider()
                    .header('§nStone.')
                    .label(
                        `§aPurchase Price Adjustment: §e§l` + buy_food_price.stone_blocks.modifier + '%%' +
                        `\n§cSales Price Adjustment: §e§l` + sell_food_price.stone_blocks.modifier + '%%'

                    )
                    .divider()
                    .label(
                        'Cobblestone' +
                        '\n\n§aBuy Price: §e§l' + cobblestone_buy +
                        '\n§r§cSell Price: §e§l' + cobblestone_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Stone' +
                        '\n\n§aBuy Price: §e§l' + stone_buy +
                        '\n§r§cSell Price: §e§l' + stone_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Granite' +
                        '\n\n§aBuy Price: §e§l' + granite_buy +
                        '\n§r§cSell Price: §e§l' + granite_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Diorite' +
                        '\n\n§aBuy Price: §e§l' + diorite_buy +
                        '\n§r§cSell Price: §e§l' + diorite_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Andesite' +
                        '\n\n§aBuy Price: §e§l' + andesite_buy +
                        '\n§r§cSell Price: §e§l' + andesite_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Cobbled Deepslate' +
                        '\n\n§aBuy Price: §e§l' + cobbled_deepslate_buy +
                        '\n§r§cSell Price: §e§l' + cobbled_deepslate_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Deepslate' +
                        '\n\n§aBuy Price: §e§l' + deepslate_buy +
                        '\n§r§cSell Price: §e§l' + deepslate_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Basalt' +
                        '\n\n§aBuy Price: §e§l' + basalt_buy +
                        '\n§r§cSell Price: §e§l' + basalt_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Blackstone' +
                        '\n\n§aBuy Price: §e§l' + blackstone_buy +
                        '\n§r§cSell Price: §e§l' + blackstone_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Obsidian' +
                        '\n\n§aBuy Price: §e§l' + obsidian_buy +
                        '\n§r§cSell Price: §e§l' + obsidian_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .label(
                        'Crying Obsidian' +
                        '\n\n§aBuy Price: §e§l' + crying_obsidian_buy +
                        '\n§r§cSell Price: §e§l' + crying_obsidian_sell
                    )
                    .button('Buy x64')
                    .button('Sell x64')
                    .divider()
                    .button('Back')
            }

            function bbmarket(source) {
                const cash = getCashScore(source, "balance")
                const bank = getBankScore(source, "bank")

                const cobblestone_buy = getBuyPrice('stone_blocks', 'cobblestone')
                const cobblestone_sell = getSellPrice('stone_blocks', 'cobblestone')

                const stone_buy = getBuyPrice('stone_blocks', 'stone')
                const stone_sell = getSellPrice('stone_blocks', "stone")

                const granite_buy = getBuyPrice('stone_blocks', 'granite')
                const granite_sell = getSellPrice('stone_blocks', 'granite')

                const diorite_buy = getBuyPrice('stone_blocks', 'diorite')
                const diorite_sell = getSellPrice('stone_blocks', 'diorite')

                const andesite_buy = getBuyPrice('stone_blocks', 'andesite')
                const andesite_sell = getSellPrice('stone_blocks', 'andesite')

                const cobbled_deepslate_buy = getBuyPrice('stone_blocks', 'cobbled_deepslate')
                const cobbled_deepslate_sell = getSellPrice('stone_blocks', 'cobbled_deepslate')

                const deepslate_buy = getBuyPrice('stone_blocks', 'deepslate')
                const deepslate_sell = getSellPrice('stone_blocks', 'deepslate')

                const basalt_buy = getBuyPrice('stone_blocks', 'basalt')
                const basalt_sell = getSellPrice('stone_blocks', 'basalt')

                const blackstone_buy = getBuyPrice('stone_blocks', 'blackstone')
                const blackstone_sell = getSellPrice('stone_blocks', 'blackstone')

                const obsidian_buy = getBuyPrice('stone_blocks', 'obsidian')
                const obsidian_sell = getSellPrice('stone_blocks', 'obsidian')

                const crying_obsidian_buy = getBuyPrice('stone_blocks', 'crying_obsidian')
                const crying_obsidian_sell = getSellPrice('stone_blocks', 'crying_obsidian')


                servermarketcat_bb(source).show(source).then((r) => {
                    switch (r.selection) {

                        // --- COBBLESTONE ---
                        case 0:
                            if (cash < cobblestone_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${cobblestone_buy}`)
                                source.runCommand(`give @s cobblestone 64`)
                                source.sendMessage(`§aBought §e§lCobblestone x64 §r§afor ${cobblestone_buy}`)
                            }
                            break;

                        case 1:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cobblestone, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cobblestone, quantity=64..}] run scoreboard players add @s balance ${cobblestone_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cobblestone, quantity=64..}] run say §aSold §a§lCobblestone x64§r §aFor §e§l${cobblestone_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cobblestone, quantity=64..}] run clear @s cobblestone 0 64`), 1)
                            break;


                        // --- STONE ---
                        case 2:
                            if (cash < stone_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${stone_buy}`)
                                source.runCommand(`give @s stone 64`)
                                source.sendMessage(`§aBought §e§lStone x64 §r§afor ${stone_buy}`)
                            }
                            break;

                        case 3:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:stone, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:stone, quantity=64..}] run scoreboard players add @s balance ${stone_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:stone, quantity=64..}] run say §aSold §a§lStone x64§r §aFor §e§l${stone_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:stone, quantity=64..}] run clear @s stone 0 64`), 1)
                            break;


                        // --- GRANITE ---
                        case 4:
                            if (cash < granite_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${granite_buy}`)
                                source.runCommand(`give @s granite 64`)
                                source.sendMessage(`§aBought §e§lGranite x64 §r§afor ${granite_buy}`)
                            }
                            break;

                        case 5:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:granite, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:granite, quantity=64..}] run scoreboard players add @s balance ${granite_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:granite, quantity=64..}] run say §aSold §a§lGranite x64§r §aFor §e§l${granite_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:granite, quantity=64..}] run clear @s granite 0 64`), 1)
                            break;


                        // --- DIORITE ---
                        case 6:
                            if (cash < diorite_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${diorite_buy}`)
                                source.runCommand(`give @s diorite 64`)
                                source.sendMessage(`§aBought §e§lDiorite x64 §r§afor ${diorite_buy}`)
                            }
                            break;

                        case 7:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:diorite, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:diorite, quantity=64..}] run scoreboard players add @s balance ${diorite_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:diorite, quantity=64..}] run say §aSold §a§lDiorite x64§r §aFor §e§l${diorite_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:diorite, quantity=64..}] run clear @s diorite 0 64`), 1)
                            break;

                        // --- ANDESITE ---
                        case 8:
                            if (cash < andesite_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${andesite_buy}`)
                                source.runCommand(`give @s andesite 64`)
                                source.sendMessage(`§aBought §e§lAndesite x64 §r§afor ${andesite_buy}`)
                            }
                            break;

                        case 9:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:andesite, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:andesite, quantity=64..}] run scoreboard players add @s balance ${andesite_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:andesite, quantity=64..}] run say §aSold §a§lAndesite x64§r §aFor §e§l${andesite_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:andesite, quantity=64..}] run clear @s andesite 0 64`), 1)
                            break;

                        // --- COBBLED DEEPSLATE ---
                        case 10:
                            if (cash < cobbled_deepslate_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${cobbled_deepslate_buy}`)
                                source.runCommand(`give @s cobbled_deepslate 64`)
                                source.sendMessage(`§aBought §e§lCobbled Deepslate x64 §r§afor ${cobbled_deepslate_buy}`)
                            }
                            break;

                        case 11:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:cobbled_deepslate, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cobbled_deepslate, quantity=64..}] run scoreboard players add @s balance ${cobbled_deepslate_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cobbled_deepslate, quantity=64..}] run say §aSold §a§lCobbled Deepslate x64§r §aFor §e§l${cobbled_deepslate_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:cobbled_deepslate, quantity=64..}] run clear @s cobbled_deepslate 0 64`), 1)
                            break;

                        // --- DEEPSLATE ---
                        case 12:
                            if (cash < deepslate_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${deepslate_buy}`)
                                source.runCommand(`give @s deepslate 64`)
                                source.sendMessage(`§aBought §e§lDeepslate x64 §r§afor ${deepslate_buy}`)
                            }
                            break;

                        case 13:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:deepslate, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:deepslate, quantity=64..}] run scoreboard players add @s balance ${deepslate_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:deepslate, quantity=64..}] run say §aSold §a§lDeepslate x64§r §aFor §e§l${deepslate_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:deepslate, quantity=64..}] run clear @s deepslate 0 64`), 1)
                            break;

                        // --- BASALT ---
                        case 14:
                            if (cash < basalt_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${basalt_buy}`)
                                source.runCommand(`give @s basalt 64`)
                                source.sendMessage(`§aBought §e§lBasalt x64 §r§afor ${basalt_buy}`)
                            }
                            break;

                        case 15:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:basalt, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:basalt, quantity=64..}] run scoreboard players add @s balance ${basalt_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:basalt, quantity=64..}] run say §aSold §a§lBasalt x64§r §aFor §e§l${basalt_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:basalt, quantity=64..}] run clear @s basalt 0 64`), 1)
                            break;

                        // --- BLACKSTONE ---
                        case 16:
                            if (cash < blackstone_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${blackstone_buy}`)
                                source.runCommand(`give @s blackstone 64`)
                                source.sendMessage(`§aBought §e§lBlackstone x64 §r§afor ${blackstone_buy}`)
                            }
                            break;

                        case 17:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:blackstone, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:blackstone, quantity=64..}] run scoreboard players add @s balance ${blackstone_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:blackstone, quantity=64..}] run say §aSold §a§lBlackstone x64§r §aFor §e§l${blackstone_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:blackstone, quantity=64..}] run clear @s blackstone 0 64`), 1)
                            break;

                        // --- OBSIDIAN ---
                        case 18:
                            if (cash < obsidian_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${obsidian_buy}`)
                                source.runCommand(`give @s obsidian 64`)
                                source.sendMessage(`§aBought §e§lObsidian x64 §r§afor ${obsidian_buy}`)
                            }
                            break;

                        case 19:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:obsidian, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:obsidian, quantity=64..}] run scoreboard players add @s balance ${obsidian_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:obsidian, quantity=64..}] run say §aSold §a§lObsidian x64§r §aFor §e§l${obsidian_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:obsidian, quantity=64..}] run clear @s obsidian 0 64`), 1)
                            break;

                        // --- CRYING OBSIDIAN ---
                        case 20:
                            if (cash < crying_obsidian_buy) {
                                source.sendMessage('You don\'t have enough money to buy this item!')
                            } else {
                                source.runCommand(`scoreboard players remove @s balance ${crying_obsidian_buy}`)
                                source.runCommand(`give @s crying_obsidian 64`)
                                source.sendMessage(`§aBought §e§lCrying Obsidian x64 §r§afor ${crying_obsidian_buy}`)
                            }
                            break;

                        case 21:
                            source.runCommand('execute as @s unless entity @s[hasitem={item=minecraft:crying_obsidian, quantity=64..}] run say §cYou need to have 64 of the item you want to sell!')
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:crying_obsidian, quantity=64..}] run scoreboard players add @s balance ${crying_obsidian_sell}`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:crying_obsidian, quantity=64..}] run say §aSold §a§lCrying Obsidian x64§r §aFor §e§l${crying_obsidian_sell} Credits§r§a!`), 1)
                            system.runTimeout(() => source.runCommand(`execute as @s if entity @s[hasitem={item=minecraft:crying_obsidian, quantity=64..}] run clear @s crying_obsidian 0 64`), 1)
                            break;

                        default:
                            servermarket_menu(source);
                    }
                })
            }


            open_igmenu(source);

        }
    })
})