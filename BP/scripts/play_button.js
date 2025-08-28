import { system } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui"

system.beforeEvents.startup.subscribe((e) => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:playmenu', {
        onPlayerInteract(e) {
            const source = e.player
            const block = e.block
            const menu = new ActionFormData()
                .title('Main Menu')
                .body('§e§lWelcome to HiraethSMP!§r An §eNation based Minecraft:Bedrock Edition SMP§r with a lot to do!' +
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
                .button('Sunlight Faction C0')
                .button('Crimsonhood Faction C1')
                .button('Witherhood Faction C2')
                .button('Red Lotus Faction C3')
                .divider()
                .button('Cancel C4');

            function getFactionName(source) {
                if (source.hasTag('sunlight_faction')) return '§e§lSunlight§r';
                if (source.hasTag('crimsonhood_faction')) return '§l§mCrimsonhood§r';
                if (source.hasTag('witherhood_faction')) return '§5§lWitherhood§r';
                if (source.hasTag('redlotus_faction')) return '§c§lRed Lotus§r';
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
                if (source.hasTag('human')) return 'Human';
                if (source.hasTag('elf')) return 'Elf';
                if (source.hasTag('halforc')) return 'Half Orc';
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
                    .button('Okay');
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
                .label('Addon Version: §sv0.0.100§r')
                .divider()
                .label('Colour Meaning:\n\n' +
                    '§2Green§r - Bigger update\n' + '§sCyan§r - Smaller update.\n' +
                    '§eYellow§r - Bridge version, newer versions means a lot more possibilities.')
                .divider()
                .button('Back')

            const nerdinfo_latestupdate = new ActionFormData()
                .title('Latest Update')
                .body('v0.0.100 Built with "bridge. v2" v2.7.50')
                .divider()
                .label(
                    "What's new?\n\n" +
                    "- Added Main Menu\n" +
                    "- Added Play button"
                )
                .divider()
                .button('Back');

            const factions = new ActionFormData()
                .title('Factions')
                .body('')
                .divider()
                .label('Faction Information')
                .button('Sunlight Case 0')
                .button('Crimsonhold Case 1')
                .button('Witherhood Case 2')
                .button('Red Lotus Case 3')
                .divider()
                .label('Go back to Main Menu')
                .button('Back');

            const factioninfo_Sunlight = new ActionFormData()
                .title('Sunlight Faction')
                .body(
                    'Sunlight Faction\n\n' +
                    'The story is yet to be written by YOU.'
                )
                .divider()
                .button('Back');

            const factioninfo_Crimson = new ActionFormData()
                .title('Crimsonhold Faction')
                .body('Crimsonhold Faction\n\n' + 'The story is yet to be written by YOU.')
                .divider()
                .button('Back');

            const factioninfo_Witherhood = new ActionFormData()
                .title('Witherhood Faction')
                .body('Witherhood Faction\n\n' + 'The story is yet to be written by YOU.')
                .divider()
                .button('Back');

            const factioninfo_Red = new ActionFormData()
                .title('Red Lotus Faction')
                .body('Red Lotus Faction\n\n' + 'The story is yet to be written by YOU.')
                .divider()
                .button('Back');



            const credits = new ActionFormData()
                .title('Credits')
                .divider()
                .body('Credits for the server and Addon itself. Without those people, the addon would not be possible :D\n\n' +
                    'Addon Credits\n\n' +
                    'Developed by: SamuraiBread\n\n' +
                    'Tested by: Shadow\n\n' +
                    'Paste more credits when needed here lol\n\n'
                )
                .button('Back');

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
                            source.addTag('sunlight_faction')
                            faction_confirm(source)
                            break;

                        case 1:
                            source.addTag('crimsonhood_faction')
                            faction_confirm(source)
                            break;

                        case 2:
                            source.addTag('witherhood_faction')
                            faction_confirm(source)
                            break;

                        case 3:
                            source.addTag('redlotus_faction')
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
                            source.removeTag('sunlight_faction');
                            source.removeTag('crimsonhood_faction');
                            source.removeTag('witherhood_faction');
                            source.removeTag('redlotus_faction');
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

                finalization_form.show(source)
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