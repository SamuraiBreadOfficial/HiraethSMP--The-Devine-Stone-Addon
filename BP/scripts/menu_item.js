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
                .button('Faction Info')
                .button('Your Info')
                .divider()
                .label('System')
                .button('Settings')
                .divider()
                .label('Economy')
                .button('Your Balance')
                .button('Server Market')
                .button('Player Market')

            function getFactionName(source) {
                if (source.hasTag('sunlight_faction')) return '§e§lSunlight§r';
                if (source.hasTag('crimsonhood_faction')) return '§l§mCrimsonhood§r';
                if (source.hasTag('witherhood_faction')) return '§5§lWitherhood§r';
                if (source.hasTag('redlotus_faction')) return '§c§lRed Lotus§r';
                return '§7§oNo Faction Selected§r';
            }

            function getFactionInfo(source) {
                if (source.hasTag('sunlight_faction')) return 'The Sunlight faction resides along the Niver River, near the blooming cherry blossom forest.\nSurrounded by fertile lands and natural beauty, they thrive through their mastery of economy, farming, and light magic.\n\nFaction Traits:\nEconomy – Skilled traders and merchants, Sunlight excels in commerce and resource exchange.\nFarming – The rich soil by the river grants them abundant harvests, including unique crops enhanced by light magic.\nLight Magic – Harnessing the pure energy of the sun, their magic heals, protects, and strengthens allies.\n\nValues:\nSunlight believes that light represents hope, life, and growth. Their way of life is built on balance between work, nature, and the common good';
                if (source.hasTag('crimsonhood_faction')) return 'The Crimsonhood faction dwells deep within the Taiga Forest,\nhigh above sea level where the air is sharp and the ground is rich with minerals.\n\nTheir strength lies in forging weapons, mining the land\'s hidden treasures, and mastering the ancient stone magic.\n\nFaction Traits:\nWeapon Crafting – Crimsonhood are skilled blacksmiths, known for creating durable and deadly weapons.\nMining – Positioned in mineral-rich highlands, they specialize in excavating gold, copper, and iron.\nStone Magic – Through their bond with the mountains, they wield earth\'s raw power to shield, fortify, and strike with crushing force.\n\nValues:\nCrimsonhood thrives on resilience, strength, and unity. To them, the earth is both a resource and a sacred ally—every weapon forged and every stone moved is an act of devotion to their craft and survival.';
                if (source.hasTag('witherhood_faction')) return '§5§lWitherhood§r';
                if (source.hasTag('redlotus_faction')) return '§c§lRed Lotus§r';
                return '§7§oNo Faction Selected§r';

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
                    .button('Back')

            }

            function open_igmenu(source) {
                const factionmenu = createPlayerFactionMenu(source)
                const playerinfo = showPlayerInfo(source)
                ig_menu.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            factionmenu.show(source)
                            break;

                        case 1:
                            playerinfo.show(source)
                            break;

                        case 2:
                            settingsmenu_main(source)
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
                        if (isNaN(amount) || amount <= 0) {
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

                        if (isNaN(amount) || amount <= 0) {
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

                        if (isNaN(amount) || amount <= 0) {
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
                        '§c/!\\ Remember! You need to have your cash withdrawed to be able to buy something!§r' +
                        '\n\nYour Cash Balance: §e' + balance +
                        '\n§rBank Balance: §e' + bank
                    )
                    .divider()
                    .label('Categories')
                    .button('Food')
                    .button('Crops')
                    .button('Nature')
                    .button('Wood')
                    .button('Stone')
                    .button('Other Materials')
                    .button('Weapons')
                    .button('Armours')
                    .button('Armour Upgrades (Addon Only)')
            }

            function servermarket_menu(source) {
                servermarket(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            servermarketcat_food(source).show(source);
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
                        cooked_chicken: 50,
                        cooked_porkchop: 45,
                        cooked_beef: 60,
                        cooked_mutton: 60,
                        cooked_rabbit: 60,
                        cooked_cod: 50,
                        cooked_salmon: 50
                    }
                },
                miscellaneous: {
                    modifier: 0,
                    items: {
                        bread: 20,
                        mushroom_stew: 15,
                        beetroot_soup: 10,
                        rabbit_stew: 20,
                        jacked_potato: 15,
                        cookie: 10,
                        pumpkin_pie: 30,
                        cake: 105,
                        dried_kelp: 3
                    }
                },
                extra: {
                    modifier: 0,
                    items: {
                        golden_carrot: 550,
                        golden_apple: 1119,
                        notch_apple: 15080
                    }
                }
            }

            const sell_food_price = {
                cooked: {
                    modifier: 5,
                    items: {
                        cooked_chicken: 30,
                        cooked_porkchop: 35,
                        cooked_beef: 30,
                        cooked_mutton: 30,
                        cooked_rabbit: 30,
                        cooked_cod: 20,
                        cooked_salmon: 20
                    }
                },
                miscellaneous: {
                    modifier: 0,
                    items: {
                        bread: 10,
                        mushroom_stew: 10,
                        beetroot_soup: 3,
                        rabbit_stew: 8,
                        jacked_potato: 7,
                        cookie: 7,
                        pumpkin_pie: 21,
                        cake: 59,
                        dried_kelp: 1
                    }
                },
                extra: {
                    modifier: 0,
                    items: {
                        golden_carrot: 399,
                        golden_apple: 994,
                        notch_apple: 13999
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
                const golden_apple_sell = getSellPrice('extra', "golden_apple")

                const notch_apple_buy = getBuyPrice('extra', "notch_apple")
                const notch_apple_sell = getSellPrice('extra', "notch_apple")




                return new ActionFormData()
                    .title('Server Market / Food')
                    .body('Food Category' + "\n\n§c/!\\ Every button will give or take a full stack from your inventory. To Sell any item, you need to have a full stack of it!")
                    .divider()
                    .label(
                        'Your Balance' +
                        '\n\nCash: ' + cash +
                        '\n\nBank: ' + bank
                    )
                    .divider()
                    .header('Cooked Food.')
                    .divider()
                    .label(
                        'Cooked Chicken' +
                        '\n\nBuy Price: ' + cooked_chicken_buy +
                        '\nSell Price: ' + cooked_chicken_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Cooked Porkchop' +
                        '\n\nBuy Price: ' + cooked_porkchop_buy +
                        '\nSell Price ' + cooked_porkchop_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Cooked Beef' +
                        '\n\nBuy Price: ' + cooked_beef_buy +
                        '\nSell Price: ' + cooked_beef_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Cooked Mutton' +
                        '\n\nBuy Price: ' + cooked_mutton_buy +
                        '\nSell Price: ' + cooked_mutton_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Cooked Rabbit' +
                        '\n\nBuy Price: ' + cooked_rabbit_buy +
                        '\nSell Price: ' + cooked_rabbit_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Cooked Cod' +
                        '\n\nBuy Price: ' + cooked_cod_buy +
                        '\nSell Price: ' + cooked_cod_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Cooked Salmon' +
                        '\n\nBuy Price: ' + cooked_salmon_buy +
                        '\nSell Price: ' + cooked_salmon_sell
                    )
                    .divider()
                    .header('Miscellaneous')
                    .divider()
                    .label(
                        'Bread' +
                        '\n\nBuy Price: ' + bread_buy +
                        '\nSell Price: ' + bread_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Mushroom Stew' +
                        '\n\nBuy Price: ' + mushroom_stew_buy +
                        '\nSell Price: ' + mushroom_stew_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Beetroot Soup' +
                        '\n\nBuy Price: ' + beetroot_soup_buy +
                        '\nSell Price: ' + beetroot_soup_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Rabbit Stew' +
                        '\n\nBuy Price: ' + rabbit_stew_buy +
                        '\nSell Price: ' + rabbit_stew_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Jacked Potato' +
                        '\n\nBuy Price: ' + jacked_potato_buy +
                        '\nSell Price: ' + jacked_potato_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Cookie' +
                        '\n\nBuy Price: ' + cookie_buy +
                        '\nSell Price: ' + cookie_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Pumpkin Pie' +
                        '\n\nBuy Price: ' + pumpkin_pie_buy +
                        '\nSell Price: ' + pumpkin_pie_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Cake' +
                        '\n\nBuy Price: ' + cake_buy +
                        '\nSell Price: ' + cake_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Dried Kelp' +
                        '\n\nBuy Price: ' + dried_kelp_buy +
                        '\nSell Price: ' + dried_kelp_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .header('Extra')
                    .divider()
                    .label(
                        'Golden Carrots' +
                        '\n\nBuy Price: ' + golden_carrot_buy +
                        '\nSell Price: ' + golden_carrot_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Golden Apple' +
                        '\n\nBuy Price: ' + golden_apple_buy +
                        '\nSell Price: ' + golden_apple_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .label(
                        'Enchanted Golden Apple' +
                        '\n\nBuy Price: ' + notch_apple_buy +
                        '\nSell Price: ' + notch_apple_sell
                    )
                    .button('Buy')
                    .button('Sell')
                    .divider()
                    .button('Back')



            }


            function foodmarket(source) { }



            open_igmenu(source);

        }
    })
})