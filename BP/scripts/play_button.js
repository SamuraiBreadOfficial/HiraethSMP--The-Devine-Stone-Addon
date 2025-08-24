import { system } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui"

system.beforeEvents.startup.subscribe((e) => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:playmenu', {
        onPlayerInteract(e) {
            const source = e.player
            const block = e.block
            const menu = new ActionFormData()
                .title('Main Menu')
                .body('')
                .label('Game')
                .button('Play Case 0')

                .label('Informative Section')
                .divider()
                .button('Information Case 1')
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
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            openmenu(source)
                            break;
                        default:
                            openmenu(source);
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
            }

            openmenu(source)
        },
    })
})