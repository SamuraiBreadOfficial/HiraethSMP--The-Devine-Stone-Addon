import { system } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui"

system.beforeEvents.startup.subscribe((e) => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:playmenu', {
        onPlayerInteract(e) {
            const source = e.player
            const block = e.block
            const playerName = source.name
            const menu = new ActionFormData()
                .title('Main Menu')
                .body('Hello §e§l' + playerName + '§r!\n' + '§e§lWelcome to HiraethSMP!§r An §eNation based Minecraft:Bedrock Edition SMP§r with a lot to do!' +
                    "\n\nExplore the §e10k by 10k map§r made by §2SamuraiBread§r - An owner of the SMP itself!" +
                    "\n\nHave fun trying out §emagical properties of special items§r added to the game!" +
                    "\n\nEnjoy §efree Addon download and support§r, plus §ebe the one who will grow HiraethSMP addon§r with us!")
                .label('Game')
                .button('Play Case 0', "textures/ui/hsmp_mainmenu/hsmp_play_button")

                .label('Informative Section')
                .divider()
                .button('Information Case 1', "textures/ui/hsmp_mainmenu/info_button")
                .button('Factions Case 2', "textures/ui/hsmp_mainmenu/factions_icon")
                .button('Credits Case 3', "textures/ui/hsmp_mainmenu/credits_button")
                .divider()
                .label('Explore')
                .button('Explore the Spawn Case 4', "textures/ui/hsmp_mainmenu/back_button");

            const play_choosefac = new ActionFormData()
                .title('Faction Choosing')
                .body("First, let's start by choosing a faction.")
                .divider()
                .label('Avaible Factions')
                .button('Moonset Faction')
                .button('Stargaze Faction')
                .button('Sunrest Faction')
                .button('Anemoiagaze Faction')
                .divider()
                .button('Cancel');

            function getFactionName(source) {
                if (source.hasTag('moonset_faction')) return '§b§lMoonset§r';
                if (source.hasTag('stargaze_faction')) return '§l§9Stargaze§r';
                if (source.hasTag('sunrest_faction')) return '§p§lSunrest§r';
                if (source.hasTag('anemoiagaze_faction')) return '§t§lAnemoiagaze§r';
                return '§7§oNo Faction Selected§r';
            }

            function createFactionConfirmForm(source) {
                const factionName = getFactionName(source);

                return new ActionFormData()
                    .title('Confirm Your Faction')
                    .body('/!\\ To Change a Faction you\'ll need to contact our staff team. /!\\\n\n' + 'Are you sure you want to join ' + factionName + ' Faction?')
                    .divider()
                    .button('Confirm')
                    .button('Cancel');
            }

            const play_chooserace = new ActionFormData()
                .title('Choose Your Race')
                .body('\t /!\\ Races cannot be changed! /!\\ ')
                .divider()
                .button('Human')
                .divider()
                .label('Pros:\n- Balanced physical aspects\n- Can wear Heavy Duty Armor\n- Can become a Mage\n- Adapts to any environment\n- Trades more effectively (-20 coins on the price of the item)\n\nCons:\n- As a Mage, has reduced mana\n- Wearing Heavy Duty Armor noticeably decreases speed\n- No vision-related advantages\n- The Divine Stone has a 20% chance of killing Humans on touch\n- Stamina regenerates slower than Elves or Half-Orcs')
                .divider()
                .button('Elf')
                .divider()
                .label('Pros:\n- Night Vision\n- Strongest magical ability (more Mana)\n- Bows automatically gain Infinity upon crafting\n- Faster than other races\n- Natural resistance to poison\n\nCons:\n- Cannot wear heavy armor (Iron, Diamond, Netherite)\n- Weaker body: takes more damage from swords, axes, and spears\n- Cannot stay in stone structures for too long, causes discomfort\n- Mining speed is slower underground')
                .divider()
                .button('Half-Orc')
                .divider()
                .label('Pros:\n- Permanent Strength I\n- More resilient to damage\n- Deals more melee damage with axes and swords\n- Natural knockback resistance\n- Health regenerates faster than Humans and Elves\n\nCons:\n- Cannot use advanced magic\n- Slowest race (permanent Slowness I)\n- Higher Prices')
                .divider()
                .label('There is no going back from this menu. Sorry.')

            function getPlayerRace(source) {
                if (source.hasTag('human')) return '§eHuman§r';
                if (source.hasTag('elf')) return '§qElf§r';
                if (source.hasTag('halforc')) return '§mHalf Orc§r';
                return 'Error Found: No race detected. Contact SamuraiBread.';
            }

            function createRaceConfirmForm(source) {
                const playerRace = getPlayerRace(source);

                return new ActionFormData()
                    .title('Confirm Your Race')
                    .body('Are you sure you want to become an ' + playerRace + ' ?')
                    .divider()
                    .button('Continue')
                    .button('Cancel');
            }

            function createFinalizationForm(source) {
                const playerRace = getPlayerRace(source);
                const factionName = getFactionName(source);

                return new ActionFormData()
                    .title('Finalization')
                    .body('You\'re an ' + playerRace + ' from ' + factionName + ' Faction. You don\'t remember the past')
                    .divider()
                    .button('Okay')
                    .button('Start Over')
            }

            const info = new ActionFormData()
                .title('Information')
                .body('Here you will find all info needed for you :)')
                .button('About Case 0')
                .divider()
                .label('Nerd Info')
                .button('Addon Version Case 1')
                .button('Latest Update Case 2')
                .divider()
                .button('Back Case 3');

            const infoabout = new ActionFormData()
                .title('About HiraethSMP')
                .body('What is HiraethSMP? How it was created and what is it`s story?\n\nHere you will read about everything about HiraethSMP')
                .label('So, what is HiraethSMP about?')
                .divider()
                .label('HiraethSMP is mostly about factions, with a little plot twist.\n\nIt is a world with a story and horror parts of it.' +
                    '\n\nIt`s mission? Make you cry at the end :).' + '\n\nIt`s connected with my own life expierience. So consider it a story within a story.')
                .divider()
                .button('Back');

            const nerdinfo_addonversion = new ActionFormData()
                .title('Addon Version')
                .body('Bridge Build: §ev2.7.50§r')
                .divider()
                .label('Addon Version: §2v0.0.206§r')
                .divider()
                .label('Colour Meaning:\n\n' +
                    '§2Green§r - Bigger update\n' + '§sCyan§r - Smaller update.\n' +
                    '§eYellow§r - Bridge version, newer versions means a lot more possibilities.')
                .divider()
                .button('Back')

            const nerdinfo_latestupdate = new ActionFormData()
                .title('Latest Update')
                .body('v0.0.206 Built with "bridge. v2" v2.7.50')
                .divider()
                .label(
                    'v0.0.206 - What\'s New?' +

                    '\n\nNew Features:' +
                    '\n- Added §ejoin_init§r and §ejoined§r tags.' +
                    '\n- §ejoin_init§r now triggers the join message for first-time players.' +
                    '\n- Added Main Menu structure that spawns automatically on join.' +
                    '\n- Added Stone Building Blocks to the economy.' +
                    '\n- Added more info about balance and bank balance.' +
                    '\n- Script added to replace 9th hotbar slot with §ehsmp:main_menu§r on join.' +

                    '\n\nFixes:' +
                    '\n- Fixed Golden Carrots not sellable on server market.' +
                    '\n- Fixed "Deposit All" showing "Not enough Credits" when balance = deposit amount.' +
                    '\n- Fixed "Not Enough Credits" error when cash = price.' +
                    '\n- Fixed selling items not adding cash.' +
                    '\n- Fixed crash bug in withdraw function.' +
                    '\n- Optimized main menu.' +
                    '\n- Economy tabs and transfer menu now return to the previous page correctly.'

                )
                .divider()
                .button('Back');

            const factions = new ActionFormData()
                .title('Factions')
                .body('')
                .divider()
                .label('Faction Information')
                .button('Moonset')
                .button('Stargaze')
                .button('Sunrest')
                .button('Anemoiagaze')
                .divider()
                .label('Go back to Main Menu')
                .button('Back');

            const factioninfo_Sunlight = new ActionFormData()
                .title('Moonset Faction')
                .body(
                    'Work In Progress'
                )
                .divider()
                .button('Back');

            const factioninfo_Crimson = new ActionFormData()
                .title('Stargaze Faction')
                .body('Work In Progress')
                .divider()
                .button('Back');

            const factioninfo_Witherhood = new ActionFormData()
                .title('Sunrest Faction')
                .body('Work In Progress')
                .divider()
                .button('Back');

            const factioninfo_Red = new ActionFormData()
                .title('Anemoiagaze Faction')
                .body('Work In Progress')
                .divider()
                .button('Back');



            const credits = new ActionFormData()
                .title('Credits')
                .divider()
                .body('')
                .header('Credits')
                .label(
                    'Developed and Scripted by: SamuraiBread' +
                    '\n\nTested by: ShadowTheBloodyWolf.' +
                    '\n\nMusic:' +
                    '\n\nInfinite Amethyst (Andrew Prahlow Remix) - §eMinecraft§r' +
                    '\n\nComforting Memories (Andrew Prahlow Remix) - §eMinecraft§r' +
                    '\n\notherside (Andrew Prahlow Remix) - §eMinecraft§r' +
                    '\n\nAerie (Andrew Prahlow Remix) - §eMinecraft§r' +
                    '\n\nLeft to Bloom (Andrew Prahlow Remix) - §eMinecraft§r' +
                    '\n\nCreator (Andrew Prahlow Remix) - §eMinecraft§r'
                )
                .button('Back');


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
                if (source.hasTag('no_voicevol')) return '§4Even Dialogue Muted§r';
            }

            function getSettingsJumpscareToogle(source) {
                if (source.hasTag('scare_full')) return '§qFull Jumpscares§r';
                if (source.hasTag('scare_minimum')) return '§eMinimum Jumpscares§r';
                if (source.hasTag('scare_disable')) return '§4Jumpscares Disabled§r';
            }

            const init_settings1 = new ActionFormData()
                .title('Choose Your Settings (Page 1/5)')
                .body(
                    "You will now be able to choose your settings based on your likings.\n\nThere are 5 settings: SFX, Audio, Voice and Jumpscares.\n\nBe patient and choose what is the best for you :)"

                )
                .button('Next')

            const init_settings2 = new ActionFormData()
                .title('Event SFX (Page 2/5)')
                .body(
                    'Choose your prefered volume of the event sfx like:/n/n' +
                    '- Footsteps\n' +
                    '- Machinery Working\n' +
                    '- Ambient\n\n' +
                    '§m/!\\ It is Better to set this setting to full to get the best experience!§r'
                )
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
                .button('Choose');

            function init_settings3(source) {
                const sfx_vol = getSettingsEventSFXVolume(source)

                return new ActionFormData()
                    .title('Event Music (Page 3/5)')
                    .body(
                        '§l§eYour Settings:§r\n' +
                        '§eSFX§r: ' + sfx_vol +
                        '\n§sMusic§r: Now Choosing' +
                        '\n§qDialogue§r: Up next' +
                        '\n§mJumpscares§r: Up next' +
                        '\n\n§eChoose your prefered volume of the event music§r\n\n' +
                        '§m/!\\ It is Better to set this setting to Half to get the best experience!§r'
                    )
                    .divider()
                    .label('Full Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('Half Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('Mute')
                    .button('Choose')
                    .divider()
                    .button('Back')
            }

            function init_settings4(source) {
                const sfx_vol = getSettingsEventSFXVolume(source)
                const music_vol = getSettingsEventMusicVolume(source)

                return new ActionFormData()
                    .title('Event Dialogue (Page 4/5)')
                    .body(
                        '§l§eYour Settings:§r\n' +
                        '§eSFX§r: ' + sfx_vol +
                        '\n§sMusic§r: ' + music_vol +
                        '\n§qDialogue§r: Now Choosing' +
                        '\n§mJumpscares§r: Up next' +
                        '\n\n§eChoose your prefered volume of the event music§r\n\n' +
                        '§m/!\\ It is Better to set this setting to Full to get the best experience!§r'
                    )
                    .divider()
                    .label('Full Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('Half Volume')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('Mute')
                    .button('Choose')
                    .divider()
                    .button('Back')
            }

            function init_settings5(source) {
                const sfx_vol = getSettingsEventSFXVolume(source)
                const music_vol = getSettingsEventMusicVolume(source)
                const dial_vol = getSettingsEventVoiceVolume(source)
                return new ActionFormData()
                    .title('Jumpscares (Page 5/5)')
                    .body(
                        '§l§eYour Settings:§r\n' +
                        '§eSFX§r: ' + sfx_vol +
                        '\n§sMusic§r: ' + music_vol +
                        '\n§qDialogue§r: ' + dial_vol +
                        '\n§mJumpscares§r: Now Choosing' +
                        '\n\n§eChoose your prefered volume of the event music§r\n\n' +
                        '§m/!\\ It is Better to set this setting to Maximum to get the best experience!§r'
                    )
                    .divider()
                    .label('Maximum')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('Minimum')
                    .button('Check')
                    .button('Choose')
                    .divider()
                    .label('Disable')
                    .button('Choose')
                    .divider()
                    .button('Back')
            }

            function finalize_settings(source) {
                const sfx_vol = getSettingsEventSFXVolume(source)
                const music_vol = getSettingsEventMusicVolume(source)
                const dial_vol = getSettingsEventVoiceVolume(source)
                const scare_vol = getSettingsJumpscareToogle(source)

                return new ActionFormData()
                    .title('Check Settings')
                    .body(
                        '§m/!\\ You can always change those settings inside the HiraethSMP Menu Item!§r' +
                        '\n\n§l§eYour settings§r:' +
                        '\n- Event SFX: ' + sfx_vol +
                        '\n- Event Music: ' + music_vol +
                        '\n- Event Dialogue: ' + dial_vol +
                        '\n- Jumpscares: ' + scare_vol
                    )
                    .divider()
                    .button('Finish')
                    .button('Start Over')
            }




            function openmenu(source) {
                menu.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            play_page1(source)
                            break;

                        case 1:
                            openinfo(source)
                            break;

                        case 2:
                            openfacinfo(source)
                            break;

                        case 3:
                            opencredits(source)
                            break;

                        default:
                            break;
                    }
                })
            };

            function play_page1(source) {
                play_choosefac.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.addTag('moonset_faction')
                            faction_confirm(source)
                            break;

                        case 1:
                            source.addTag('stargaze_faction')
                            faction_confirm(source)
                            break;

                        case 2:
                            source.addTag('sunrest_faction')
                            faction_confirm(source)
                            break;

                        case 3:
                            source.addTag('anemoiagaze_faction')
                            faction_confirm(source)
                            break;

                        case 4:
                            openmenu(source)
                            break;

                        default:
                            openmenu(source)
                            break;
                    }
                })
            }

            function faction_confirm(source) {
                const fac_confirm = createFactionConfirmForm(source);

                fac_confirm.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            choose_race(source)
                            break;

                        case 1:
                            source.removeTag('moonset_faction');
                            source.removeTag('stargaze_faction');
                            source.removeTag('sunrest_faction');
                            source.removeTag('anemoiagaze_faction');
                            play_page1(source);
                            break;
                    }
                });
            }

            function choose_race(source) {
                play_chooserace.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.addTag('human')
                            race_confirm(source)
                            break;

                        case 1:
                            source.addTag('elf')
                            source.addTag('elf_pale_ears')
                            race_confirm(source)
                            break;
                        case 2:
                            source.addTag('halforc')
                            race_confirm(source)
                            break;

                        default:
                            choose_race(source)
                    }
                })
            }

            function race_confirm(source) {
                const r_confirm = createRaceConfirmForm(source);

                r_confirm.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            finalization(source)
                            break;

                        case 1:
                            source.removeTag('human')
                            source.removeTag('elf')
                            source.removeTag('halforc')
                            source.removeTag('elf_pale_ears')
                            source.runCommand('clear @s hsmp:elf_ears')
                            choose_race(source)
                            break;

                        default:
                            source.removeTag('human')
                            source.removeTag('elf')
                            source.removeTag('halforc')
                            choose_race(source)
                            break;



                    }
                })
            }

            function finalization(source) {
                const finalization_form = createFinalizationForm(source)

                finalization_form.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            settingspage1(source)
                            break;

                        case 1:
                            source.removeTag('sunlight_faction');
                            source.removeTag('crimsonhood_faction');
                            source.removeTag('witherhood_faction');
                            source.removeTag('redlotus_faction');
                            source.removeTag('human');
                            source.removeTag('elf');
                            source.removeTag('halforc');
                            play_page1(source);
                            break;

                        default:
                            finalization(source)
                            break;



                    }
                })
            }

            function settingspage1(source) {
                init_settings1.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            settingspage2(source);
                            break;

                        default:
                            settingspage1(source)
                            break;
                    }
                })
            }

            function settingspage2(source) {
                init_settings2.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 1 1 1");
                            settingspage2(source);
                            break;

                        case 1:
                            source.addTag('full_sfxvol')
                            settingspage3(source)
                            break;

                        case 2:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 0.3 1 0.3");
                            settingspage2(source);
                            break;

                        case 3:
                            source.addTag('half_sfxvol')
                            settingspage3(source)
                            break;

                        case 4:
                            source.addTag('no_sfxvol')
                            settingspage3(source)
                            break;

                        default:
                            settingspage2(source)
                            break;


                    }
                })

            }

            function settingspage3(source) {
                init_settings3(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 1 1 1");
                            settingspage3(source);
                            break;

                        case 1:
                            source.addTag('full_audiovol')
                            settingspage4(source)
                            break;

                        case 2:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 0.3 1 0.3");
                            settingspage3(source);
                            break;

                        case 3:
                            source.addTag('half_audiovol')
                            settingspage4(source)
                            break;

                        case 4:
                            source.addTag('no_audiovol')
                            settingspage4(source)
                            break;

                        case 5:
                            source.removeTag('full_sfxvol')
                            source.removeTag('half_sfxvol')
                            source.removeTag('no_sfxvol')
                            settingspage2(source)
                            break;



                        default:
                            settingspage3(source)
                            break;


                    }
                })


            }

            function settingspage4(source) {
                init_settings4(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 1 1 1");
                            settingspage4(source);
                            break;

                        case 1:
                            source.addTag('full_voicevol')
                            settingspage5(source)
                            break;

                        case 2:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 0.3 1 0.3");
                            settingspage4(source);
                            break;

                        case 3:
                            source.addTag('half_voicevol')
                            settingspage5(source)
                            break;

                        case 4:
                            source.addTag('no_voicevol')
                            settingspage5(source)
                            break;

                        case 5:
                            source.removeTag('full_audiovol')
                            source.removeTag('half_audiovol')
                            source.removeTag('no_audiovol')
                            settingspage4(source)
                            break;



                        default:
                            settingspage4(source)
                            break;


                    }
                })

            }

            function settingspage5(source) {
                init_settings5(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 1 1 1");
                            settingspage5(source);
                            break;

                        case 1:
                            source.addTag('scare_full')
                            settingsfinal(source)
                            break;

                        case 2:
                            source.runCommand("playsound random.chestopen @s ~ ~ ~ 0.3 1 0.3");
                            settingspage5(source);
                            break;

                        case 3:
                            source.addTag('scare_minimum')
                            settingsfinal(source)
                            break;

                        case 4:
                            source.addTag('scare_disable')
                            settingsfinal(source)
                            break;

                        case 5:
                            source.removeTag('full_voicevol')
                            source.removeTag('half_voicevol')
                            source.removeTag('no_voicevol')
                            settingspage4(source)
                            break;



                        default:
                            settingspage4(source)
                            break;
                    }
                })


            }

            function settingsfinal(source) {
                finalize_settings(source).show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            validate_check(source);
                            break;

                        case 1:
                            source.removeTag('full_voicevol')
                            source.removeTag('half_voicevol')
                            source.removeTag('no_voicevol')
                            source.removeTag('full_audiovol')
                            source.removeTag('half_audiovol')
                            source.removeTag('no_audiovol')
                            source.removeTag('full_sfxvol')
                            source.removeTag('half_sfxvol')
                            source.removeTag('no_sfxvol')
                            source.removeTag('scare_full')
                            source.removeTag('scare_minimum')
                            source.removeTag('scare_disable')

                            settingspage1(source)
                            break;

                        default:
                            settingsfinal(source)
                            break;
                    }
                })

            }

            function validate_check(source) {
                const isInProgress = source.hasTag("loading_check") || source.hasTag("loading");
                const notValidated = source.hasTag("not_validated");

                const audiovoltags = ["full_audiovol", "half_audiovol", "no_audiovol"];
                const sfxvoltags = ["full_sfxvol", "half_sfxvol", "no_sfxvol"];
                const voicevoltags = ["full_voicevol", "half_voicevol", "no_voicevol"];
                const scaretags = ["scare_full", "scare_minimum", "scare_disable"];
                const factiontags = ["moonset_faction", "stargaze_faction", "sunrest_faction", "anemoiagaze_faction"];
                const racetags = ["human", "elf", "halforc"];

                if (notValidated && isInProgress) {
                    source.removeTag("not_validated");
                    source.sendMessage("§7Setup check in progress... Tag §enot_validated§r §7removed.");
                    return;
                }

                if (notValidated && !isInProgress) {
                    source.sendMessage("§cSetup inconsistency detected. Resetting...");

                    const allSetupTags = [
                        "init_join", "loading_check", "loading",
                        "joined", "init_complete", "not_validated",
                        ...audiovoltags, ...sfxvoltags, ...voicevoltags,
                        ...scaretags, ...factiontags, ...racetags
                    ];

                    for (const tag of allSetupTags) {
                        if (source.hasTag(tag)) source.removeTag(tag);
                    }

                    source.addTag("init_join");
                    source.addTag("loading_check");

                    source.sendMessage("§ePlease restart setup. You have been reset.");
                    return;
                }

                // Etapowe sprawdzanie tagów
                const checkGroups = [
                    { name: "Audio Volume", tags: audiovoltags },
                    { name: "SFX Volume", tags: sfxvoltags },
                    { name: "Voice Volume", tags: voicevoltags },
                    { name: "Scare Level", tags: scaretags },
                    { name: "Faction", tags: factiontags },
                    { name: "Race", tags: racetags }
                ];

                for (const group of checkGroups) {
                    const hasOne = group.tags.some(tag => source.hasTag(tag));
                    if (!hasOne) {
                        source.sendMessage(`§cMissing tag in category: §6${group.name}`);
                        source.sendMessage("§cResetting setup due to incomplete configuration...");

                        const allSetupTags = [
                            "init_join", "loading_check", "loading",
                            "joined", "init_complete", "not_validated",
                            ...audiovoltags, ...sfxvoltags, ...voicevoltags,
                            ...scaretags, ...factiontags, ...racetags
                        ];

                        for (const tag of allSetupTags) {
                            if (source.hasTag(tag)) source.removeTag(tag);
                        }

                        source.addTag("init_join");
                        source.addTag("loading_check");

                        source.sendMessage("§ePlease restart setup. You have been reset.");
                        return;
                    }
                }

                // Jeśli wszystko OK
                source.sendMessage("§aAll setup tags validated successfully.");
                play_cutscene(source);
            }
            function play_cutscene(source) {
                source.runCommand('gamerule doimmediaterespawn true')
                source.runCommand('gamerule keepinventory true')
                system.runTimeout(() => source.runCommand(`camera @s fade time 1 5 1`), 10)
                system.runTimeout(() => source.runCommand(`Title @s title `), 10)
                system.runTimeout(() => source.runCommand('kill @s'), 10)
                system.runTimeout(() => source.runCommand('gamerule doimmediaterespawn false'), 20)
                system.runTimeout(() => source.runCommand('gamerule keepinventory false'), 20)

            }

            function openinfo(source) {
                info.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openinfoabout(source)
                            break;
                        case 1:
                            openinfoversion(source)
                            break;
                        case 2:
                            openinfolatestupdate(source)
                            break;
                        case 3:
                            openmenu(source)
                            break;
                        default:
                            openmenu(source);
                            break;
                    }
                })
            };

            function openinfoabout(source) {
                infoabout.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openinfo(source)
                            break;
                        default:
                            openinfo(source)
                            break;
                    }
                })
            };

            function openinfoversion(source) {
                nerdinfo_addonversion.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openinfo(source)
                            break;
                        default:
                            openinfo(source)
                            break;
                    }
                })
            };

            function openinfolatestupdate(source) {
                nerdinfo_latestupdate.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openinfo(source)
                            break;

                        default:
                            openinfo(source)
                            break;
                    }
                })
            }

            function openfacinfo(source) {
                factions.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openfacinfo_sunlight(source)
                            break;

                        case 1:
                            openfacinfo_crimson(source)
                            break;

                        case 2:
                            openfacinfo_wither(source)
                            break;

                        case 3:
                            openfacinfo_red(source)
                            break;

                        case 4:
                            openmenu(source)
                            break;

                        default:
                            openmenu(source)
                            break;
                    }
                })
            };

            function openfacinfo_sunlight(source) {
                factioninfo_Sunlight.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openfacinfo(source)
                            break;

                        default:
                            openfacinfo(source)
                            break;
                    }
                })
            }

            function openfacinfo_crimson(source) {
                factioninfo_Crimson.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openfacinfo(source)
                            break;

                        default:
                            openfacinfo(source)
                            break;
                    }
                })
            }

            function openfacinfo_wither(source) {
                factioninfo_Witherhood.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openfacinfo(source)
                            break;

                        default:
                            openfacinfo(source)
                            break;
                    }
                })
            }

            function openfacinfo_red(source) {
                factioninfo_Red.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openfacinfo(source)
                            break;

                        default:
                            openfacinfo(source)
                            break;
                    }
                })
            }




            function opencredits(source) {
                credits.show(source).then((r) => {
                    switch (r.selection) {
                        case 0:
                            openmenu(source)
                    }
                })
            };
            openmenu(source)
        },
    })
})