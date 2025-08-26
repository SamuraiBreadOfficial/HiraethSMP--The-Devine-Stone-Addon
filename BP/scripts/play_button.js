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
                .button('Factions Case 2')
                .button('Credits Case 3')
                .divider()
                .label('Explore')
                .button('Explore the Spawn Case 4');

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
                            break;

                        case 1:
                            break;

                        case 3:
                            break;

                        case 4:
                            openmenu(source)
                            break;

                        default:
                            openmenu(source)
                    }
                })
            };

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