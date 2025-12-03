import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui"

import { typeActionbar, waitTicks, textFormats, typeTitleSubtitle, typeTitleTitle, gender } from "../../../../formats.js"
import { questRegistry, questUpdatedGoals } from "./../../../quests/main/core.js"


export async function ayourself_start(player) {
    const me = player.name;
    const wsmith = "§aOscar§r"
    const wsmith0 = "§a???§r"

    await typeActionbar(player, me, `Are you... alright?`)
    await waitTicks(40)
    await typeActionbar(player, wsmith0, `Ughhhhh...`)
    await waitTicks(40)
    await typeActionbar(player, me, `Can I.. Help somehow?`)
    await waitTicks(40)
    await typeActionbar(player, wsmith0, `UGHHHHH..`)
    await waitTicks(40)
    await typeActionbar(player, me, `You know... Maybe i'll come back next time..?`)
    player.runCommand(`playanimation @e[type=hsmp:weaponsmith] animation.weaponsmith.in_pain animation.weaponsmith.idle 0.5`)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith0, `ABSOLUTELY NOT!!!`)
    await waitTicks(20)
    await typeActionbar(player, me, `Jeez!`)
    await typeActionbar(player, wsmith0, `I'm completely fine!`)
    await waitTicks(20)
    await typeActionbar(player, me, `...`)
    await typeActionbar(player, me, `Your finger says otherwise...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `SH SHH SHH SHHHHH`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `Fingers does not talk, HE EHE HE`)
    await waitTicks(20)
    await typeActionbar(player, me, `Are you sure, you're alright? Like... Mentally?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `What do you mean? I'm fine! I'M COMPLETELY FINE!!!`)
    await waitTicks(20)
    await typeActionbar(player, me, `Yeaaaa... Maybe i'll come ba--`)
    await typeActionbar(player, wsmith0, `NO!`)
    await waitTicks(20)

    const response = await new ActionFormData()
        .title(`Respond`)
        .body(``)
        .divider()
        .header(`How will you respond?`)
        .label(`< ${me} > Yeaaa... Maybe i'll come ba--

< ${wsmith0} > NO!`)
        .divider()
        .button(`[ MAIN ] Fuck you mean No?`)
        .button(`[ MAIN ] What is wrong with you?`)
        .button(`[ MAIN ] Are you sure you don't need help?`)
        .show(player)

    if (response.canceled || response.selection == 0) {
        player.sendMessage(`Chose "F you mean no?"`)
        ayourself_start_fymn(player)
    }
    if (response.selection == 1) {
        player.sendMessage(`Chose "What is wrong with you?"`)
        ayourself_start_wiwwy(player)

    }

    if (response.selection == 2) {
        player.sendMessage(`Chose "Are you sure you don't need help?"`)
        ayourself_start_ausudnh(player)
    }
}

async function ayourself_start_fymn(player) {
    const me = player.name
    const wsmith = "§aOscar§r"
    const wsmith0 = "§a???§r"

    await typeActionbar(player, me, `Fuck you mean no?`)
    typeTitleTitle(player, wsmith0)
    typeTitleSubtitle(player, `Will remember that.`)
    player.addTag(`wsmith_fymn`)
    if (player.hasTag(`male`)) await typeActionbar(player, wsmith0, `Hold your horses gorilla man!`);
    if (player.hasTag(`female`)) await typeActionbar(player, wsmith0, `Hold your horses gorill... girl? YES! GORILLA GIRL!`);
    if (!player.hasTag(`male`) && !player.hasTag(`female`)) await typeActionbar(player, wsmith0, `Hold your horses gorilla... well... who exactly are you?`);
    await typeActionbar(player, me, `Oh dear goddess...`)
    await waitTicks(20)
    await typeActionbar(player, me, `So.. Adam have told me to come here..? Maybe it's here?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0,
        `AH YES! A person who always says that i'm unstable
emotionally and that i should really go to the profesional
and see if i don't have a brain damage!`
    )
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `Ahhh... What a lovely friend he is! :D`)
    await waitTicks(40)
    await typeActionbar(player, me, `...`)
    await waitTicks(40)
    await typeActionbar(player, wsmith0, `...`)
    await waitTicks(20)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith0, `ANYWAY!`)
    await typeActionbar(player, me, `FUCK! CAN YOU STOP DOING THAT?!`)
    await typeActionbar(player, wsmith0, `Doing what? :D`)
    await waitTicks(20)
    await typeActionbar(player, me, `... Eh.. Nevermind.`)
    await waitTicks(20)
    await typeActionbar(player, me, `So.. Can i buy some weapons he---`)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith0, `OF COURSE!`)
    await typeActionbar(player, me, `I SWEAR I'M GONNA FRICKING PUNCH YOU IN THE FACE!`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `No, thanks! :D`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `I can give you weapons and tools FOR FREE!!`)
    await waitTicks(80)
    await typeActionbar(player, me, `... But where's the catch?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `You need to do something for me!`)
    await waitTicks(20)
    await typeActionbar(player, me, `I.. uh.. Figured. -_-`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `Can you go to my home and bring me some medicine for my...`)
    await waitTicks(40)
    await typeActionbar(player, me, `I'm waiting for the punchline...`)
    await waitTicks(40)
    await typeActionbar(player, wsmith0, `§oFingering Problem§r? Hah. Get it? AHHAHAAAHAHA`)
    await waitTicks(20)
    await typeActionbar(player, me, `Discusting...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `AH BY THE WAY!`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `I'm ${wsmith}!`)
    await waitTicks(20)
    await typeActionbar(player, me, `Sure...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `May i know your name little Stranger?`)
    wsmith_name(player)

}

async function ayourself_start_wiwwy(player) {
    const me = player.name
    const wsmith = "§aOscar§r"
    const wsmith0 = "§a???§r"

    await typeActionbar(player, me, `What is wrong with you...`)
    typeTitleTitle(player, wsmith0)
    typeTitleSubtitle(player, `Will remember that.`)
    player.addTag(`wsmith_wiwwy`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `You know sometimes i ask myself the same question hehe~`)

    await typeActionbar(player, me, `So.. Adam have told me to come here..? Maybe it's here?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0,
        `AH YES! A person who always says that i'm unstable
emotionally and that i should really go to the profesional
and see if i don't have a brain damage!`
    )
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `Ahhh... What a lovely friend he is! :D`)
    await waitTicks(40)
    await typeActionbar(player, me, `...`)
    await waitTicks(40)
    await typeActionbar(player, wsmith0, `...`)
    await waitTicks(20)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith0, `ANYWAY!`)
    await typeActionbar(player, me, `FUCK! CAN YOU STOP DOING THAT?!`)
    await typeActionbar(player, wsmith0, `Doing what? :D`)
    await waitTicks(20)
    await typeActionbar(player, me, `... Eh.. Nevermind.`)
    await waitTicks(20)
    await typeActionbar(player, me, `So.. Can i buy some weapons he---`)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith0, `OF COURSE!`)
    await typeActionbar(player, me, `I SWEAR I'M GONNA FRICKING PUNCH YOU IN THE FACE!`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `No, thanks! :D`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `I can give you weapons and tools FOR FREE!!`)
    await waitTicks(80)
    await typeActionbar(player, me, `... But where's the catch?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `You need to do something for me!`)
    await waitTicks(20)
    await typeActionbar(player, me, `I.. uh.. Figured. -_-`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `Can you go to my home and bring me some medicine for my...`)
    await waitTicks(40)
    await typeActionbar(player, me, `I'm waiting for the punchline...`)
    await waitTicks(40)
    await typeActionbar(player, wsmith0, `§oFingering Problem§r? Hah. Get it? AHHAHAAAHAHA`)
    await waitTicks(20)
    await typeActionbar(player, me, `Discusting...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `AH BY THE WAY!`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `I'm ${wsmith}!`)
    await waitTicks(20)
    await typeActionbar(player, me, `Sure...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `May i know your name little Stranger?`)
    wsmith_name(player)


}

async function ayourself_start_ausudnh(player) {
    const me = player.name
    const wsmith = "§aOscar§r"
    const wsmith0 = "§a???§r"

    await typeActionbar(player, me, `Are you sure you don't need any help?`)
    typeTitleTitle(player, wsmith0)
    typeTitleSubtitle(player, `Will remember that.`)
    player.addTag(`wsmith_ausudnh`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `What do you mean?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `I'm completely FOINE! :D`)


    await typeActionbar(player, me, `So.. Adam have told me to come here..? Maybe it's here?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0,
        `AH YES! A person who always says that i'm unstable
emotionally and that i should really go to the profesional
and see if i don't have a brain damage!`
    )
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `Ahhh... What a lovely friend he is! :D`)
    await waitTicks(40)
    await typeActionbar(player, me, `...`)
    await waitTicks(40)
    await typeActionbar(player, wsmith0, `...`)
    await waitTicks(20)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith0, `ANYWAY!`)
    await typeActionbar(player, me, `FUCK! CAN YOU STOP DOING THAT?!`)
    await typeActionbar(player, wsmith0, `Doing what? :D`)
    await waitTicks(20)
    await typeActionbar(player, me, `... Eh.. Nevermind.`)
    await waitTicks(20)
    await typeActionbar(player, me, `So.. Can i buy some weapons he---`)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith0, `OF COURSE!`)
    await typeActionbar(player, me, `I SWEAR I'M GONNA FRICKING PUNCH YOU IN THE FACE!`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `No, thanks! :D`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `I can give you weapons and tools FOR FREE!!`)
    await waitTicks(80)
    await typeActionbar(player, me, `... But where's the catch?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `You need to do something for me!`)
    await waitTicks(20)
    await typeActionbar(player, me, `I.. uh.. Figured. -_-`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `Can you go to my home and bring me some medicine for my...`)
    await waitTicks(40)
    await typeActionbar(player, me, `I'm waiting for the punchline...`)
    await waitTicks(40)
    await typeActionbar(player, wsmith0, `§oFingering Problem§r? Hah. Get it? AHHAHAAAHAHA`)
    await waitTicks(20)
    await typeActionbar(player, me, `Discusting...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith0, `AH BY THE WAY!`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `I'm ${wsmith}!`)
    await waitTicks(20)
    await typeActionbar(player, me, `Sure...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `May i know your name little Stranger?`)
    await waitTicks(20)
    wsmith_name(player)
}

async function wsmith_name(player) {
    const me = player.name
    const wsmith = "§aOscar§r"


    const response = await new ActionFormData()
        .title(`Respond`)
        .body(``)
        .divider()
        .header(`How will you respond?`)
        .label(`< ${wsmith} > I'm ${wsmith}!

< ${me} > Sure...

< ${wsmith} > May i know your name little Stranger?
`)
        .divider()
        .button(`[ MAIN ] Never Call Me That.`)
        .button(`[ MAIN ] I'm ${me}.`)
        .button(`[ MAIN ] I'm Flapjack McNoodle`)
        .show(player)

    if (response.canceled || response.selection == 0) {
        wsmith_name_ncmt(player)
    }
    if (response.selection == 1) {
        wsmith_name_normal(player)

    }

    if (response.selection == 2) {
        wsmith_name_ifn(player)
    }
}

async function wsmith_name_ncmt(player) {
    const me = player.name
    const wsmith = "§aOscar§r"

    typeTitleTitle(player, wsmith)
    typeTitleSubtitle(player, `Will remember that.`)

    player.addTag('wsmith_ncmt')

    await typeActionbar(player, me, `Yeah, never call me that EVER again.`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `Why? ._.?`)
    await waitTicks(20)
    await typeActionbar(player, me, `Because.. ughh. Nevermind.`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `Name pleaaaaaaaaase? :c`)
    await waitTicks(20)
    await typeActionbar(player, me, `Do i really need to?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `PLEAAAAAASEEEEEEE`)
    await waitTicks(20)
    await typeActionbar(player, me, `Ah dear goddess... It's ${me}...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `${me}... What a great name! :D`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `${me}... ${me}..... ${me}..........`)
    await typeActionbar(player, me, `Can you please.. Just stop?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `AH YES! HOME! MEDICINE!`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `My home.. Hmmm.`)
    await waitTicks(20)
    await typeActionbar(player, me, `Don't tell me you forgot where is your home...`)
    world.getDimension('overworld').runCommand(`structure load wsmith_home 60 69 1914`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `Hmmmmm.... AH YES! Check the barrel!`)
    await waitTicks(20)
    await typeActionbar(player, me, `Uhh i can't believe i'm asking, but do you perhaps have anything for a headache?`)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith, `YES!`)
    await typeActionbar(player, me, `AH! Uh.. You know? Whatever.`)
    player.addTag(`wsmith_medicinelookout`)
    await typeTitleTitle(player, questRegistry.questInfo.arm_yourself.name)
    await typeTitleSubtitle(player, `Updated`)
    player.sendMessage(`[ §a§lQUEST UPDATED§r ] ${questUpdatedGoals(player)}`)
    player.removeTag(`isTalking`)
    player.removeTag(`temmie_loop`)
    player.runCommand(`stopsound @s`)

    const weaponsmithLoc = { x: 64, y: 67, z: 1921 }

    const radius = 5;

    const x1 = weaponsmithLoc.x - radius;
    const y1 = weaponsmithLoc.y - radius;
    const z1 = weaponsmithLoc.z - radius;
    const x2 = weaponsmithLoc.x + radius;
    const y2 = weaponsmithLoc.y + radius;
    const z2 = weaponsmithLoc.z + radius;


    player.runCommand(`fill ${x1} ${y1} ${z2} ${x2} ${y2} ${z2} air replace hsmp:lock_block`);

    player.runCommand(
        `fill ${x1} ${y1} ${z1} ${x1} ${y2} ${z2} air replace hsmp:lock_block`
    );
    player.runCommand(
        `fill ${x2} ${y1} ${z1} ${x2} ${y2} ${z2} air replace hsmp:lock_block`
    );

}

async function wsmith_name_normal(player) {
    const me = player.name
    const wsmith = "§aOscar§r"


    await typeActionbar(player, me, `It's ${me}.`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `${me}... What a great name! :D`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `${me}... ${me}..... ${me}..........`)
    await typeActionbar(player, me, `Can you please.. Just stop?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `AH YES! HOME! MEDICINE!`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `My home.. Hmmm.`)
    await waitTicks(20)
    await typeActionbar(player, me, `Don't tell me you forgot where is your home...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `Hmmmmm.... AH YES! Check the barrel!`)
    await waitTicks(20)
    await typeActionbar(player, me, `Uhh i can't believe i'm asking, but do you perhaps have anything for a headache?`)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith, `YES!`)
    await typeActionbar(player, me, `AH! Uh.. You know? Whatever.`)
    player.addTag(`wsmith_medicinelookout`)
    await typeTitleTitle(player, questRegistry.questInfo.arm_yourself.name)
    await typeTitleSubtitle(player, `Updated`)
    player.sendMessage(`[ §a§lQUEST UPDATED§r ] ${questUpdatedGoals(player)}`)
    player.removeTag(`isTalking`)
    player.removeTag(`temmie_loop`)
    player.runCommand(`stopsound @s`)

    const weaponsmithLoc = { x: 64, y: 67, z: 1921 }

    const radius = 5

    const x1 = weaponsmithLoc.x - radius;
    const y1 = weaponsmithLoc.y - radius;
    const z1 = weaponsmithLoc.z - radius;
    const x2 = weaponsmithLoc.x + radius;
    const y2 = weaponsmithLoc.y + radius;
    const z2 = weaponsmithLoc.z + radius;


    player.runCommand(`fill ${x1} ${y1} ${z2} ${x2} ${y2} ${z2} air replace hsmp:lock_block`);

    player.runCommand(
        `fill ${x1} ${y1} ${z1} ${x1} ${y2} ${z2} air replace hsmp:lock_block`
    );
    player.runCommand(
        `fill ${x2} ${y1} ${z1} ${x2} ${y2} ${z2} air replace hsmp:lock_block`
    );


}

async function wsmith_name_ifn(player) {
    const me = `Flapjack McNoodle`
    const mereal = player.name
    const wsmith = "§aOscar§r"

    typeTitleTitle(player, wsmith)
    typeTitleSubtitle(player, `Will remember that.`)


    player.addTag(`FlapjackMcNoodle`)
    await typeActionbar(player, mereal, `It's ${me}...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `${me}... What a great name! :D`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `${me}... ${me}..... ${me}..........`)
    await typeActionbar(player, mereal, `Can you please.. Just stop?`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `AH YES! HOME! MEDICINE!`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `My home.. Hmmm.`)
    await waitTicks(20)
    await typeActionbar(player, mereal, `Don't tell me you forgot where is your home...`)
    await waitTicks(20)
    await typeActionbar(player, wsmith, `Hmmmmm.... AH YES! Check the barrel!`)
    await waitTicks(20)
    await typeActionbar(player, mereal, `Uhh i can't believe i'm asking, but do you perhaps have anything for a headache?`)
    player.runCommand(`camerashake add @a 1 0.1`)
    await typeActionbar(player, wsmith, `YES!`)
    await typeActionbar(player, mereal, `AH! Uh.. You know? Whatever.`)
    player.addTag(`wsmith_medicinelookout`)
    await typeTitleTitle(player, questRegistry.questInfo.arm_yourself.name)
    await typeTitleSubtitle(player, `Updated`)
    player.sendMessage(`[ §a§lQUEST UPDATED§r ] ${questUpdatedGoals(player)}`)
    player.removeTag(`isTalking`)
    player.removeTag(`temmie_loop`)
    player.runCommand(`stopsound @s`)


    const weaponsmithLoc = { x: 64, y: 67, z: 1921 }

    const radius = 5


    const x1 = weaponsmithLoc.x - radius;
    const y1 = weaponsmithLoc.y - radius;
    const z1 = weaponsmithLoc.z - radius;
    const x2 = weaponsmithLoc.x + radius;
    const y2 = weaponsmithLoc.y + radius;
    const z2 = weaponsmithLoc.z + radius;


    player.runCommand(`fill ${x1} ${y1} ${z2} ${x2} ${y2} ${z2} air replace hsmp:lock_block`);

    player.runCommand(
        `fill ${x1} ${y1} ${z1} ${x1} ${y2} ${z2} air replace hsmp:lock_block`
    );
    player.runCommand(
        `fill ${x2} ${y1} ${z1} ${x2} ${y2} ${z2} air replace hsmp:lock_block`
    );


}


//part 2

export async function wsmith_final(player) {
    const me = player.name
    const wsmith = "§aOscar§r"

    const finale = {

        firstDial(player) {
            if (player.hasTag('wsmith_fymn')) return `You responded to Oscar with: "Fuck you mean No?" which caused him to feel worse.`
            if (player.hasTag('wsmith_wiwwy')) return `You responded to Oscar with: "What is wrong with you?" which caused him to feel like he's not normal.`
            if (player.hasTag('wsmith_ausudnh')) return `You responded to Oscar with: "Are you sure you don't need any help?" which caused him to feel cared for.`
        },
        secondDial(player) {
            if (player.hasTag(`wsmith_ncmt`)) return `You did not wanted to tell Oscar your name.`;
            if (player.hasTag(`Flapjack_McNoodle`)) return `You treated Oscar like an Idiot, calling yoursel 'Flapjack McNoodle'`;
            return `You said your name to Oscar, which made him feel like he finally made a friend.`
        },
        thirdDial(player) {
            if (player.hasTag(`wsmith_distanced`)) return `You ignored Oscar's feelings of loneliness, and put your weapons above a person's well being.`;
            if (player.hasTag(`wsmith_neutral`)) return `You called Oscar "Friend" which made him feel better.`;
            if (player.hasTag(`wsmith_bestie`)) return `You called Oscar "Bestie" which made him feel like he got a new friend.`
        }
    }


    await typeActionbar(player, me, `I've got something for your finger.`)
    if (player.hasTag(`wsmith_fymn`)) {
        await typeActionbar(player, wsmith, `Wow, for me? A MEDICINE?
${gender.getGender(player)}, i thought you would call me a slur like always. HAHAHHAA`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `But i don't mind! At all.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I know i am a little.. not normal.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `And i know why i don't have enough customers due to my chaotic character.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `But, if i will get a customer, them calling me however they want,
it really doesn't make me sad.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `It makes me happy, because i have someone to talk to! ^^`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `Even if it won't last.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `So even if you tell me 'Fuck you mean' or be mean...`)
        await waitTicks(20)
        if (player.hasTag(`Flapjack_McNoodle`)) {
            await typeActionbar(player, wsmith, `Or joke with lying about your name, calling yourself 'Flapjack McNoodle'`)
        }
        await waitTicks(20)
        if (player.hasTag('wsmith_ncmt')) await typeActionbar(player, wsmith, `Or if you really didn't wanted to say your name to me.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I really won't mind. ^v^`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `As long as you will visit from time to time.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `Thank you for the moments i've had with you.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I really don't know if i can call you my friend.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `But know that, you made me happy coming here.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `Thank you.`)
        await waitTicks(20)
        const response = await new ActionFormData()
            .title(`Respond`)
            .body(``)
            .divider()
            .header(`How will you respond?`)
            .label(`< ${wsmith} > I really don't know if i can call you my friend.

< ${wsmith} > But know that, you made me happy coming here.

< ${wsmith} > Thank you.
`)
            .divider()
            .button(`[ MAIN ] I just came here for weapons`)
            .button(`[ MAIN ] You can Call me 'Friend' :)`)
            .button(`[ MAIN ] No problem at all, Bestie`)
            .show(player)

        if (response.canceled || response.selection == 0) {
            player.addTag(`wsmith_distanced`)
            await typeActionbar(player, me, `I just came here for weapons`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Oh.. Yeah.. I see...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Anyway.`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `They are for free anyway :D`)
            await waitTicks(20)
            await questRegistry.questInfo.arm_yourself.onComplete(player)
            await waitTicks(20)
            await typeActionbar(player, me, `Thanks.`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME GORILLA! :DD`)


            const finale_distanced = await new ActionFormData()
                .title(`Main Quest Completion`)
                .body('')
                .header(`Quest Summary`)
                .divider()
                .label(`1)
${finale.firstDial(player)}

2)
${finale.secondDial(player)}

3)
${finale.thirdDial(player)}

You've reached "Distanced" outcome.

Oscar will not:
- Give you free items in the future.
- Give you special quests.
- Give you tips.
- Refund you 20\$ each purchase.`)
                .button(`§lOKAY`)
                .show(player)

            if (finale_distanced.canceled || finale_distanced.selection == 0) {
                await waitTicks(200)
                await typeActionbar(player, player.name, `I should come back to Adam.`)
                await waitTicks(20)
                await typeTitleTitle(player, `§aNEW QUEST`)
                await typeTitleSubtitle(player, questRegistry.questInfo.sofia.name)
            }

        }

        if (response.selection == 1) {
            player.addTag(`wsmith_neutral`)
            await typeActionbar(player, me, `You can Call me 'Friend' :)`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Wait... REALLY?!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Oh. My. God.`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `THANK YOU SO MUCH! *sob*`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `You *sob* don't *sobbing* know *sobbingus* how much it means for me!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `We will be friends! *sob*`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `FOREVER!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `AND EVER!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `AND EVER!!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Yeah..?`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `You were so good for me.. I can't ;v;`)
            await waitTicks(20)
            if (player.hasTag(`Flapjack_McNoodle`)) {
                await typeActionbar(player, wsmith, `Altough you said that your name was Flapjack McNoodle`)
                await waitTicks(20)
                await typeActionbar(player, wsmith, `IT MADE ME LAUGH ANYWAY! :D`)

            }
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Here! Your tools and Armour :D`)
            await questRegistry.questInfo.arm_yourself.onComplete(player)
            await waitTicks(20)
            await typeActionbar(player, me, `Thank you.`)
            await waitTicks(20)
            if (player.hasTag(`Flapjack_McNoodle`)) await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME FLAPJACK MCNOODLE! :DD`)
            if (!player.hasTag(`Flapjack_McNoodle`)) await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME GORILLA! :DD`)


            const finale_neutral = await new ActionFormData()
                .title(`Main Quest Completion`)
                .body('')
                .header(`Quest Summary`)
                .divider()
                .label(`1)
${finale.firstDial(player)}

2)
${finale.secondDial(player)}

3)
${finale.thirdDial(player)}

You've reached "Neutral" outcome.

Oscar will:
- Give you free items in the future.
- Give you tips.

Oscar will not:
- Give you special quests.
- Refund you 20\$ each purchase.`)
                .button(`§lOKAY`)
                .show(player)

            if (finale_neutral.canceled || finale_distanced.selection == 0) {
                await waitTicks(200)
                await typeActionbar(player, player.name, `I should come back to Adam.`)
                await waitTicks(20)
                await typeTitleTitle(player, `§aNEW QUEST`)
                await typeTitleSubtitle(player, questRegistry.questInfo.sofia.name)
            }

        }

        if (response.selection == 2) {
            player.addTag(`wsmith_bestie`)
            await typeActionbar(player, me, `No problem at all, Bestie ^^`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `WHA..`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `HUH?!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `HOW`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `DID`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `YOU`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `CALLED`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `ME?!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Bestie :)`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `HUUUUUHHH?!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Well...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Never thought i hear this word in my entire life!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Bestie...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `IT SOUND FUCKING AMAZING AAAAAAAAA!!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Calm down jeez`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I AM CALM!!!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `THANK YOU!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `TAKE THIS`)
            await waitTicks(20)
            await questRegistry.questInfo.arm_yourself.onComplete(player)
            await typeActionbar(player, wsmith, `I'll make sure to prepare something AMAZING for you!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `You really don't need to..`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I WILL!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I WILL TREAT YOU AS MY BEST FRIEND!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `WHICH I NEVER HAD!!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `FOREVER!!!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `I'll.. uhhh.. go now okay?`)
            await waitTicks(20)


            await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME GORILLA! :DD`)


            const finale_distanced = await new ActionFormData()
                .title(`Main Quest Completion`)
                .body('')
                .header(`Quest Summary`)
                .divider()
                .label(`1)
${finale.firstDial(player)}

2)
${finale.secondDial(player)}

3)
${finale.thirdDial(player)}

You've reached "Bestie" outcome.

Oscar will:
- Give you free items in the future.
- Give you special quests.
- Give you tips.
- Refund you 20\$ each purchase.`)
                .button(`§lOKAY`)
                .show(player)

            if (finale_distanced.canceled || finale_distanced.selection == 0) {
                await waitTicks(200)
                await typeActionbar(player, player.name, `I should come back to Adam.`)
                await waitTicks(20)
                await typeTitleTitle(player, `§aNEW QUEST`)
                await typeTitleSubtitle(player, questRegistry.questInfo.sofia.name)
            }

        }

    } else if (player.hasTag("wsmith_wiwwy")) {
        await typeActionbar(player, wsmith, `Wow, for me? A MEDICINE?
${gender.getGender(player)}, i thought you would come back with a specialist! HAHAHHAA`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `But i don't mind! At all.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I know i am a little.. not normal.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `And i know why i don't have enough customers due to my chaotic character.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `But, if i will get a customer, them calling me however they want,
it really doesn't make me sad.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `It makes me happy, because i have someone to talk to! ^^`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `Even if it won't last.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `So even if you tell me 'Fuck you mean' or be mean...`)
        await waitTicks(20)
        if (player.hasTag(`Flapjack_McNoodle`)) {
            await typeActionbar(player, wsmith, `Or joke with lying about your name, calling yourself 'Flapjack McNoodle'`)
        }
        await waitTicks(20)
        if (player.hasTag('wsmith_ncmt')) await typeActionbar(player, wsmith, `Or if you really didn't wanted to say your name to me.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I really won't mind. ^v^`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `As long as you will visit from time to time.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `Thank you for the moments i've had with you.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I really don't know if i can call you my friend.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `But know that, you made me happy coming here.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `Thank you.`)
        await waitTicks(20)
        const response = await new ActionFormData()
            .title(`Respond`)
            .body(``)
            .divider()
            .header(`How will you respond?`)
            .label(`< ${wsmith} > I really don't know if i can call you my friend.

< ${wsmith} > But know that, you made me happy coming here.

< ${wsmith} > Thank you.
`)
            .divider()
            .button(`[ MAIN ] I just came here for weapons`)
            .button(`[ MAIN ] You can Call me 'Friend' :)`)
            .button(`[ MAIN ] No problem at all, Bestie`)
            .show(player)

        if (response.canceled || response.selection == 0) {
            player.addTag(`wsmith_distanced`)
            await typeActionbar(player, me, `I just came here for weapons`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Oh.. Yeah.. I see...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Anyway.`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `They are for free anyway :D`)
            await waitTicks(20)
            await questRegistry.questInfo.arm_yourself.onComplete(player)
            await waitTicks(20)
            await typeActionbar(player, me, `Thanks.`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME GORILLA! :DD`)


            const finale_distanced = await new ActionFormData()
                .title(`Main Quest Completion`)
                .body('')
                .header(`Quest Summary`)
                .divider()
                .label(`1)
${finale.firstDial(player)}

2)
${finale.secondDial(player)}

3)
${finale.thirdDial(player)}

You've reached "Distanced" outcome.

Oscar will not:
- Give you free items in the future.
- Give you special quests.
- Give you tips.
- Refund you 20\$ each purchase.`)
                .button(`§lOKAY`)
                .show(player)

            if (finale_distanced.canceled || finale_distanced.selection == 0) {
                await waitTicks(200)
                await typeActionbar(player, player.name, `I should come back to Adam.`)
                await waitTicks(20)
                await typeTitleTitle(player, `§aNEW QUEST`)
                await typeTitleSubtitle(player, questRegistry.questInfo.sofia.name)
            }

        }

        if (response.selection == 1) {
            player.addTag(`wsmith_neutral`)
            await typeActionbar(player, me, `You can Call me 'Friend' :)`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Wait... REALLY?!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Oh. My. God.`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `THANK YOU SO MUCH! *sob*`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `You *sob* don't *sobbing* know *sobbingus* how much it means for me!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `We will be friends! *sob*`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `FOREVER!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `AND EVER!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `AND EVER!!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Yeah..?`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `You were so good for me.. I can't ;v;`)
            await waitTicks(20)
            if (player.hasTag(`Flapjack_McNoodle`)) {
                await typeActionbar(player, wsmith, `Altough you said that your name was Flapjack McNoodle`)
                await waitTicks(20)
                await typeActionbar(player, wsmith, `IT MADE ME LAUGH ANYWAY! :D`)

            }
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Here! Your tools and Armour :D`)
            await questRegistry.questInfo.arm_yourself.onComplete(player)
            await waitTicks(20)
            await typeActionbar(player, me, `Thank you.`)
            await waitTicks(20)
            if (player.hasTag(`Flapjack_McNoodle`)) await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME FLAPJACK MCNOODLE! :DD`)
            if (!player.hasTag(`Flapjack_McNoodle`)) await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME GORILLA! :DD`)


            const finale_neutral = await new ActionFormData()
                .title(`Main Quest Completion`)
                .body('')
                .header(`Quest Summary`)
                .divider()
                .label(`1)
${finale.firstDial(player)}

2)
${finale.secondDial(player)}

3)
${finale.thirdDial(player)}

You've reached "Neutral" outcome.

Oscar will:
- Give you free items in the future.
- Give you tips.

Oscar will not:
- Give you special quests.
- Refund you 20\$ each purchase.`)
                .button(`§lOKAY`)
                .show(player)

            if (finale_neutral.canceled || finale_distanced.selection == 0) {
                await waitTicks(200)
                await typeActionbar(player, player.name, `I should come back to Adam.`)
                await waitTicks(20)
                await typeTitleTitle(player, `§aNEW QUEST`)
                await typeTitleSubtitle(player, questRegistry.questInfo.sofia.name)
            }

        }

        if (response.selection == 2) {
            player.addTag(`wsmith_bestie`)
            await typeActionbar(player, me, `No problem at all, Bestie ^^`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `WHA..`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `HUH?!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `HOW`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `DID`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `YOU`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `CALLED`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `ME?!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Bestie :)`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `HUUUUUHHH?!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Well...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Never thought i hear this word in my entire life!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Bestie...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `IT SOUND FUCKING AMAZING AAAAAAAAA!!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Calm down jeez`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I AM CALM!!!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `THANK YOU!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `TAKE THIS`)
            await waitTicks(20)
            await questRegistry.questInfo.arm_yourself.onComplete(player)
            await typeActionbar(player, wsmith, `I'll make sure to prepare something AMAZING for you!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `You really don't need to..`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I WILL!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I WILL TREAT YOU AS MY BEST FRIEND!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `WHICH I NEVER HAD!!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `FOREVER!!!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `I'll.. uhhh.. go now okay?`)
            await waitTicks(20)


            await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME GORILLA! :DD`)


            const finale_distanced = await new ActionFormData()
                .title(`Main Quest Completion`)
                .body('')
                .header(`Quest Summary`)
                .divider()
                .label(`1)
${finale.firstDial(player)}

2)
${finale.secondDial(player)}

3)
${finale.thirdDial(player)}

You've reached "Bestie" outcome.

Oscar will:
- Give you free items in the future.
- Give you special quests.
- Give you tips.
- Refund you 20\$ each purchase.`)
                .button(`§lOKAY`)
                .show(player)

            if (finale_distanced.canceled || finale_distanced.selection == 0) {
                await waitTicks(200)
                await typeActionbar(player, player.name, `I should come back to Adam.`)
                await waitTicks(20)
                await typeTitleTitle(player, `§aNEW QUEST`)
                await typeTitleSubtitle(player, questRegistry.questInfo.sofia.name)
                player.removeTag('isTalking')

            }

        }

    } else if (player.hasTag(`wsmith_ausudnh`)) {
        await typeActionbar(player, wsmith, `Wow, for me? A MEDICINE?
${gender.getGender(player)}, I knew you would help me! :D`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I really feel like you care about my emotions, not like others..`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I know i am a little.. not normal.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `And i know why i don't have enough customers due to my chaotic character.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `But, if i will get a customer, them calling me however they want,
it really doesn't make me sad.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `It makes me happy, because i have someone to talk to! ^^`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `Even if it won't last.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `So even if you tell me 'Fuck you mean' or be mean...`)
        await waitTicks(20)
        if (player.hasTag(`Flapjack_McNoodle`)) {
            await typeActionbar(player, wsmith, `Or joke with lying about your name, calling yourself 'Flapjack McNoodle'`)
        }
        await waitTicks(20)
        if (player.hasTag('wsmith_ncmt')) await typeActionbar(player, wsmith, `Or if you really didn't wanted to say your name to me.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I really won't mind. ^v^`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `As long as you will visit from time to time.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `Thank you for the moments i've had with you.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `I really don't know if i can call you my friend.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `But know that, you made me happy coming here.`)
        await waitTicks(20)
        await typeActionbar(player, wsmith, `Thank you.`)
        await waitTicks(20)
        const response = await new ActionFormData()
            .title(`Respond`)
            .body(``)
            .divider()
            .header(`How will you respond?`)
            .label(`< ${wsmith} > I really don't know if i can call you my friend.

< ${wsmith} > But know that, you made me happy coming here.

< ${wsmith} > Thank you.
`)
            .divider()
            .button(`[ MAIN ] I just came here for weapons`)
            .button(`[ MAIN ] You can Call me 'Friend' :)`)
            .button(`[ MAIN ] No problem at all, Bestie`)
            .show(player)

        if (response.canceled || response.selection == 0) {
            player.addTag(`wsmith_distanced`)
            await typeActionbar(player, me, `I just came here for weapons`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Oh.. Yeah.. I see...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Anyway.`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `They are for free anyway :D`)
            await waitTicks(20)
            await questRegistry.questInfo.arm_yourself.onComplete(player)
            await waitTicks(20)
            await typeActionbar(player, me, `Thanks.`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME GORILLA! :DD`)


            const finale_distanced = await new ActionFormData()
                .title(`Main Quest Completion`)
                .body('')
                .header(`Quest Summary`)
                .divider()
                .label(`1)
${finale.firstDial(player)}

2)
${finale.secondDial(player)}

3)
${finale.thirdDial(player)}

You've reached "Distanced" outcome.

Oscar will not:
- Give you free items in the future.
- Give you special quests.
- Give you tips.
- Refund you 20\$ each purchase.`)
                .button(`§lOKAY`)
                .show(player)

            if (finale_distanced.canceled || finale_distanced.selection == 0) {
                await waitTicks(200)
                await typeActionbar(player, player.name, `I should come back to Adam.`)
                await waitTicks(20)
                await typeTitleTitle(player, `§aNEW QUEST`)
                await typeTitleSubtitle(player, questRegistry.questInfo.sofia.name)
                player.removeTag('isTalking')
                player.addTag(questRegistry.questInfo.sofia.tag)


            }

        }

        if (response.selection == 1) {
            player.addTag(`wsmith_neutral`)
            await typeActionbar(player, me, `You can Call me 'Friend' :)`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Wait... REALLY?!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Oh. My. God.`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `THANK YOU SO MUCH! *sob*`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `You *sob* don't *sobbing* know *sobbingus* how much it means for me!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `We will be friends! *sob*`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `FOREVER!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `AND EVER!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `AND EVER!!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Yeah..?`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `You were so good for me.. I can't ;v;`)
            await waitTicks(20)
            if (player.hasTag(`Flapjack_McNoodle`)) {
                await typeActionbar(player, wsmith, `Altough you said that your name was Flapjack McNoodle`)
                await waitTicks(20)
                await typeActionbar(player, wsmith, `IT MADE ME LAUGH ANYWAY! :D`)

            }
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Here! Your tools and Armour :D`)
            await questRegistry.questInfo.arm_yourself.onComplete(player)
            await waitTicks(20)
            await typeActionbar(player, me, `Thank you.`)
            await waitTicks(20)
            if (player.hasTag(`Flapjack_McNoodle`)) await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME FLAPJACK MCNOODLE! :DD`)
            if (!player.hasTag(`Flapjack_McNoodle`)) await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME GORILLA! :DD`)


            const finale_neutral = await new ActionFormData()
                .title(`Main Quest Completion`)
                .body('')
                .header(`Quest Summary`)
                .divider()
                .label(`1)
${finale.firstDial(player)}

2)
${finale.secondDial(player)}

3)
${finale.thirdDial(player)}

You've reached "Neutral" outcome.

Oscar will:
- Give you free items in the future.
- Give you tips.

Oscar will not:
- Give you special quests.
- Refund you 20\$ each purchase.`)
                .button(`§lOKAY`)
                .show(player)

            if (finale_neutral.canceled || finale_distanced.selection == 0) {
                await waitTicks(200)
                await typeActionbar(player, player.name, `I should come back to Adam.`)
                await waitTicks(20)
                await typeTitleTitle(player, `§aNEW QUEST`)
                await typeTitleSubtitle(player, questRegistry.questInfo.sofia.name)
                player.removeTag('isTalking')
                player.addTag(questRegistry.questInfo.sofia.tag)


            }

        }

        if (response.selection == 2) {
            player.addTag(`wsmith_bestie`)
            await typeActionbar(player, me, `No problem at all, Bestie ^^`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `WHA..`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `HUH?!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `HOW`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `DID`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `YOU`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `CALLED`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `ME?!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Bestie :)`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `HUUUUUHHH?!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Well...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Never thought i hear this word in my entire life!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `Bestie...`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `IT SOUND FUCKING AMAZING AAAAAAAAA!!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Calm down jeez`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I AM CALM!!!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `THANK YOU!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `TAKE THIS`)
            await waitTicks(20)
            await questRegistry.questInfo.arm_yourself.onComplete(player)
            await typeActionbar(player, wsmith, `I'll make sure to prepare something AMAZING for you!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `You really don't need to..`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I WILL!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `I WILL TREAT YOU AS MY BEST FRIEND!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `WHICH I NEVER HAD!!`)
            await waitTicks(20)
            await typeActionbar(player, wsmith, `FOREVER!!!!`)
            await waitTicks(20)
            await typeActionbar(player, me, `I'll.. uhhh.. go now okay?`)
            await waitTicks(20)


            await typeActionbar(player, wsmith, `MAKE SURE TO COME BACK ANYTIME GORILLA! :DD`)


            const finale_distanced = await new ActionFormData()
                .title(`Main Quest Completion`)
                .body('')
                .header(`Quest Summary`)
                .divider()
                .label(`1)
${finale.firstDial(player)}

2)
${finale.secondDial(player)}

3)
${finale.thirdDial(player)}

You've reached "Bestie" outcome.

Oscar will:
- Give you free items in the future.
- Give you special quests.
- Give you tips.
- Refund you 20\$ each purchase.`)
                .button(`§lOKAY`)
                .show(player)

            if (finale_distanced.canceled || finale_distanced.selection == 0) {
                await waitTicks(200)
                await typeActionbar(player, player.name, `I should come back to Adam.`)
                await waitTicks(20)
                await typeTitleTitle(player, `§aNEW QUEST`)
                await typeTitleSubtitle(player, questRegistry.questInfo.sofia.name)
                player.removeTag('isTalking')
                player.addTag(questRegistry.questInfo.sofia.tag)
            }

        }

    }
}