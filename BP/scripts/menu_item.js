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
                            servermarket(source).show(source);
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
                const bank = getBankScore(source, "bank")
                const balance = getCashScore(source, 'balance')

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
                    .label(playerName + '\'s Transfer Menu' + '\n\nYour Balance:' + '\n\nCash: §e' + balance + '\n\n§rBank: §e' + bank)
                    .divider()
                    .dropdown("Choose a player you want to Transfer your Credits to", playerNames)
                    .textField("Credits amount", "Example. 100")
                    .show(source)
                    .then(response => {
                        if (response.canceled) return;

                        const selectedIndex = response.formValues[0];
                        const recipientName = playerNames[selectedIndex];
                        const amount = parseInt(response.formValues[1]);
                        const senderName = source.name;

                        if (isNaN(amount) || amount <= 0) {
                            source.sendMessage("§cIncorrect Amount. Minium amount is 1.");
                            return;
                        }

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
                const balance = getCashScore(source, "balance")
                const bank = getBankScore(source, "bank")

            }

            function foodmarket(source) { }



            open_igmenu(source);

        }
    })
})