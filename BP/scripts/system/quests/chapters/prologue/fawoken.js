import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui"

import { typeActionbar, waitTicks, textFormats, typeTitleSubtitle, typeTitleTitle } from "../../../../formats.js"
import { questRegistry } from "./../../../quests/main/core.js"
export async function tavern_firstEncounter(player) {
    const me = player.name;
    const adam = `Adam`
    const adam0 = `???`
    await typeActionbar(player, adam0, `Hi there!`)
    await waitTicks(20)
    await typeActionbar(player, adam0, `Welcome to my tavern!`)
    await waitTicks(20)
    await typeActionbar(player, adam, `I'm Adam! What can i get for you?`)
    await waitTicks(20)
    await typeActionbar(player, me, `Oh. Well. Uh...`)
    dial0(player)
}


async function dial0(player) {

    const dial0_form = await new ActionFormData()
        .title(`Dialogue Options`)
        .body(`ID: dial0`)
        .divider()
        .label(`How you will respond?`)
        .divider()
        .button(`[ MAIN ]
I'm lost...`)
        .button(`Tavern?`)
        .button(`Do you own this Tavern?`)
        .button(`For how long have you been working in here?`)
        .show(player)

    if (dial0_form.canceled) dial0(player);

    if (dial0_form.selection == 0) {
        dial0_main(player)
    }

    if (dial0_form.selection == 1) {
        dial0_tavern(player)
    }

    if (dial0_form.selection == 2) dial0_dyott(player);

    if (dial0_form.selection == 3) dial0_fhlhybwih(player);
}
// Opt. I'm Lost...
async function dial0_main(player) {
    const me = player.name;
    const adam = `Adam`

    await typeActionbar(player, me, `Ehh. How can i say that without making an idiot out of me...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `C'mon, spit it out! I won't bite.. I think at least`)
    await waitTicks(20)
    if (player.hasTag('fhlhybwih')) {
        await typeActionbar(player, me, `It sounds not right when 40 years old says it.`)
        await waitTicks(20)
        await typeActionbar(player, adam, `Piss off may you? Haha`)
        await waitTicks(20)
    }
    await typeActionbar(player, me, `Well.. I got lost.`)
    await waitTicks(20)
    await typeActionbar(player, me, `I woke up in the field and i don't even know where am i.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Another one huh?`)
    system.run(() => player.runCommand(`/playsound hsmp_music.prologue_connected @s ~ ~ ~ 0.5 1 1`))
    typeTitleTitle(player, `Now Playing:`, 1, "random.click", 0.2)
    typeTitleSubtitle(player, `Barotrauma OST - 24 - Overclocked Weakness`, 1, "random.click", 0.2)
    await waitTicks(20)
    await typeActionbar(player, me, `Ye-- Wait what do you mean?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `You're not the only one who got here this way.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Do you perhaps.. remember anything?`)
    await waitTicks(20)
    await typeActionbar(player, me, `No. I only know my name, and.. i remember a voice... Female voice`)
    await waitTicks(20)
    await typeActionbar(player, me, `It seemed like she was close with me..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Anything about §o§7Escape§r?`)
    await waitTicks(20)
    await typeActionbar(player, me, `What?! What do you mean?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `§o§7I had a flashback, i was fighting§r, §o§7I remembered only a sound, a bang and darkness§r blah blah.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `You're not the only one. People like you...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Your memories are connected. Somehow.`)
    await waitTicks(20)
    await typeActionbar(player, me, `What do you even mean?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Death in the most dramatic way.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Hearing your loved ones beg for you to wake up.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Everything is connected.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Don't you think?`)
    await waitTicks(20)
    await typeActionbar(player, me, `I don't.. Well. If that girl was my loved one i should remember her.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `And do you remember your past?`)
    await waitTicks(20)
    await typeActionbar(player, me, `...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Exactly.`)
    await waitTicks(20)
    await typeActionbar(player, me, `What the fuck is going on?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `If i would know, i'd say it.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `But it's up to you to figure everything out.`)
    await waitTicks(20)
    await typeActionbar(player, me, `But how? Where should i start?!`)
    await waitTicks(20)
    await typeActionbar(player, adam, `First you need to get yourself some tools.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Close to the gate, there is a lumberjack and a weaponsmith`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Buy yourself some things.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `I have a feeling that something will try to hunt you down...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Like others...`)
    await waitTicks(20)
    await questRegistry.questInfo.fawoken.onComplete(player)
    await waitTicks(60)
    await player.addTag(questRegistry.questInfo.arm_yourself.tag)
    player.addTag(`weaponsmithNotInitialized`)
    player.runCommand(`hud @s reset all`)
    await typeTitleTitle(player, "§aNew Quest")
    await typeTitleSubtitle(player, questRegistry.questInfo.arm_yourself.name)
    await waitTicks(400)
    await typeActionbar(player, me, `Others.. huh?`)
    player.removeTag(`isTalking`)

}

// Opt. Tavern?
async function dial0_tavern(player) {
    const me = player.name;
    const adam = `Adam`

    await typeActionbar(player, me, `Tavern?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `What, you see this kind of beauty of building for the first time?`)
    await waitTicks(20)
    await typeActionbar(player, me, `No i just.. Am curious what do you sell here?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Oh well. §oEghem§r... Beer, Vodka, Drinks, i give you quests, 
you collect rewards for quests here. Yada Yada.. Blah blah blah.
Just check the advertisment ;)`)
    await waitTicks(40)
    dial0(player)
}


// Opt. Do you own this Tavern?
async function dial0_dyott(player) {
    const me = player.name;
    const adam = `Adam`

    await typeActionbar(player, me, `Do you own this tavern?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Yeah, this tavern is kind of.. my life you know. Why did you asked?`)
    await waitTicks(20)
    await typeActionbar(player, me, `Well, it's very well maintained.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Ehh. Yeah i guess so.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `It was given to me by my long dead father.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `It was his last wish for me to own it..
Even if i wanted to become a traveler.`)
    await waitTicks(20)
    await typeActionbar(player, me, `Oh i'm so sorry...`)
    await waitTicks(20)
    dial0(player)
}

// Opt. For how long have you been working in here?
async function dial0_fhlhybwih(player) {
    const me = player.name;
    const adam = `Adam`

    await typeActionbar(player, me, `For how long have you been working in here?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Well that's a great question! Although, i lost my track of time..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `I'd say, for 15 years? Maybe.`)
    await typeActionbar(player, me, `Oh damn, how old were you when you started?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Well, i was 16 when my father died and gave me this big of a tavern.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Wait.. I just figured. It's been 24 years already..`)
    await waitTicks(20)
    await typeActionbar(player, me, `Wait.. You're old?!`)
    await typeActionbar(player, adam, `Watch it bozo, Big 40 is not that old!`)
    await waitTicks(20)
    system.run(() => player.addTag('fhlhybwih'))

    dial0(player)



}



