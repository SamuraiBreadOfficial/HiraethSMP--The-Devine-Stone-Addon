console.warn("§d[HIRAETH]§r Loading scripts/modules/economy/tavern.js");


import { world, system } from "@minecraft/server";
import { formatCurrency, waitTicks } from "../../formats.js"


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
    system.run(() => player.runCommand(`title @s actionbar < Adam > Welcome to the Iron Cup! How can I help you?`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < ${player.name} > Uh... hi. Uhh, weird to say.`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > C'mon, spit it out — I don't bite ;)`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < ${player.name} > I, uhh... kinda forgot where I am?`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > Ah... I see. Another one, huh?`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < ${player.name} > What? What do you mean?`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > There have been... a lot of strange things happening here lately.`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > People appearing when no one's looking.`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > All of them not remembering anything.`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < ${player.name} > Appearing out of nowhere?`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > Y'know, out of nowhere. One second you're looking at the bench, and the next, someone's already there. Sleeping.`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < ${player.name} > Huh...`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > Anyway, you're in Silvi! The only city on this continent.`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > The continent's called Threeclover.`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > Hmm... you know what? Here, take this.`))
    player.sendMessage(`§e[ TRANSFER ]§a You've received §e5,000.00§a from §eAdam`)
    world.scoreboard.getObjective(`balance`).addScore(player, 500000)
    world.scoreboard.getObjective(`bank`).addScore(player, 0)
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > Use it to get yourself some weapons. At night, monsters appear out of nowhere.`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > You really don't want to be unprepared here, hah...`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < ${player.name} > Uhh... thanks.`))
    await waitTicks(100)
    system.run(() => player.runCommand(`title @s actionbar < Adam > Sure! Come back anytime you want!`))
    await waitTicks(100)
    player.sendMessage(`[ §a§lQUEST COMPLETED§r ]`)
    player.addTag(`quest_complete_fawoken`)
    player.removeTag(`hsmp_quest_freshly_awoken`)
    await waitTicks(100)
    player.sendMessage(`Tip: You can send your friends money by typing out a command: /transfer.

If you're on console, you can type /qa which opens quick action menu, then you can select transfer for quicker command triggering`)
    await waitTicks(100)
    player.sendMessage(`[ §e§lQUEST§r ]
Title: §eIntense Preparations... kind of.§r

Go to the local §eWeaponsmith§r and buy yourself a weapon and an armor.

Rewards: §a\$2k + Achievement §l"Intense Preparation!"`)
}