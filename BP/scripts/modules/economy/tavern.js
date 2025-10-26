console.warn("§d[HIRAETH]§r Loading scripts/modules/economy/tavern.js");


import { world, system } from "@minecraft/server";
import { formatCurrency, waitTicks, typeActionbar } from "../../formats.js"


system.beforeEvents.startup.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('hsmp:tavern', {
        onPlayerInteract(e) {
            const player = e.player
            if (player.hasTag(`hsmp_quest_freshly_awoken`)) {
                tavern_firstEncounter(player)
            }
        }
    })
})

async function tavern_firstEncounter(player) {
    await typeActionbar(player, 'Adam', 'Welcome to the Iron Cup! How can I help you?')

    await waitTicks(60)
    await typeActionbar(player, `${player.name}`, 'Uh... hi. Uhh, weird to say.', 3)

    await waitTicks(60)
    await typeActionbar(player, 'Adam', 'C\'mon, spit it out! I don\'t bite... ;)', 1)

    await waitTicks(60)
    await typeActionbar(player, `${player.name}`, 'I, uhh... kinda forgot where I am?', 3)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'Ah... I see. Another one, huh?', 1)

    await waitTicks(60)
    await typeActionbar(player, `${player.name}`, 'What? What do you mean?', 1)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'There have been... a lot of strange things happening here lately.', 1)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'People appearing when no one\'s looking.', 1)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'All of them not remembering anything.', 1)

    await waitTicks(60)
    await typeActionbar(player, `${player.name}`, 'Appearing out of nowhere... huh?', 1)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'You know, out of nowhere. One second you\'re looking at the bench, and the next, \nsomeone\'s already there... Uncountious.', 3)

    await waitTicks(60)
    await typeActionbar(player, `${player.name}`, 'Huh...', 3)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'Anyway, you\'re in Silvi! The one and only city on this continent!', 1)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'The continet\'s called Threeclover.', 1)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'Hmm... you know what? Here, take this.', 1)

    player.sendMessage(`§e[ TRANSFER ]§a You've received §e5,000.00§a from §eAdam`)
    world.scoreboard.getObjective(`balance`).addScore(player, 500000)
    world.scoreboard.getObjective(`bank`).addScore(player, 0)
    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'Use it to get yourself some weapons. At night, monsters love to appear out of nowhere.', 1)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'I don\'t know what about you, but i would not like to be\nwacked by a zombie in the middle of the night.', 1)
    await typeActionbar(player, `Adam`, '', 1)


    await waitTicks(60)
    await typeActionbar(player, `${player.name}`, 'Uhh... Thanks.', 1)

    await waitTicks(60)
    await typeActionbar(player, `Adam`, 'Sure! Come back anytime you want!', 1)

    await waitTicks(60)
    player.sendMessage(`[ §a§lQUEST COMPLETED§r ]`)
    player.addTag(`quest_complete_fawoken`)
    player.setDynamicProperty("quest_complete_fawoken_date", Date.now());
    player.removeTag(`hsmp_quest_freshly_awoken`)
    await waitTicks(60)
    player.sendMessage(`Tip: You can send your friends money by typing out a command: /transfer.

If you're on console, you can type /qa which opens quick action menu, then you can select transfer for quicker command triggering`)
    await waitTicks(60)
    player.sendMessage(`[ §e§lQUEST§r ]
Title: §eIntense Preparations... kind of.§r

Go to the local §eWeaponsmith§r and buy yourself a weapon and an armor.

Rewards: §a\$2k + Achievement §l"Intense Preparation!"`)
}