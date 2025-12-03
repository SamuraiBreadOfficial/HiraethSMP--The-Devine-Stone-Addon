import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui"

import { typeActionbar, waitTicks, textFormats, typeTitleSubtitle, typeTitleTitle, gender } from "../../../../formats.js"
import { questRegistry, questUpdatedGoals } from "./../../../quests/main/core.js"

system.runInterval(async () => {
    for (const player of world.getPlayers()) {
        const weaponsmithLoc = { x: 223, y: 70, z: 1983 }

        const radius = 11;

        const { x, y, z } = player.location;

        const inBox =
            x >= weaponsmithLoc.x - radius && x <= weaponsmithLoc.x + radius &&
            y >= weaponsmithLoc.y - radius && y <= weaponsmithLoc.y + radius &&
            z >= weaponsmithLoc.z - radius && z <= weaponsmithLoc.z + radius;

        const x1 = weaponsmithLoc.x - radius;
        const y1 = weaponsmithLoc.y - radius;
        const z1 = weaponsmithLoc.z - radius;
        const x2 = weaponsmithLoc.x + radius;
        const y2 = weaponsmithLoc.y + radius;
        const z2 = weaponsmithLoc.z + radius;



        if (inBox && player.hasTag(`quest_sofia`) && !player.hasTag(`sofiaInitiated`)) {

            player.addTag(`sofiaInitiated`)
            player.runCommand(`fill ${x1} ${y1} ${z1} ${x2} ${y2} ${z1} hsmp:lock_block replace air`);
            player.runCommand(`fill 235 70 1972 235 81 1972 hsmp:lock_block replace air`)


            const me = player.name;
            const adam = `Adam`;
            await typeActionbar(player, adam, `${me}!! I'm happy you came here that fast!`)
            await waitTicks(20)
            await typeActionbar(player, me, `Adam? Something happened? What is that on the table?`)
            await waitTicks(20)
            await typeActionbar(player, adam, `I will tell you everything... Just please. Sit down.`)
        }

    }
}, 20)

world.afterEvents.playerInteractWithEntity.subscribe(e => {
    const player = e.player;
    const entity = e.target;

    if (entity.typeId == "hsmp:adam" && player.hasTag(`sofiaInitiated`) && player.hasTag(`quest_sofia`)) {
        quest_sofia_start(player);
    }
})


const dial_unlock = {
    dial01(player) {
        if (player.hasTag(`sofia_dial01`)) return `[ OPTIONAL ] What is Darkshard..?`;
        return `[ §cLOCKED§r ]`;
    },
    dial02(player) {
        if (player.hasTag(`sofia_dial02`)) return `[ OPTIONAL ] Zapad?`;
        return `[ §cLOCKED§r ]`;
    },
    dial03(player) {
        if (player.hasTag(`sofia_dial03`)) return `[ OPTIONAL ] The hell is Cortex?`;
        return `[ §cLOCKED§r ]`;

    }
}

async function quest_sofia_start(player) {
    const adam = `Adam`;
    const me = player.name;

    await typeActionbar(player, me, `So.. Tell me. What happened? Who's laying on the table`)
    await waitTicks(20)
    await typeActionbar(player, adam, `That's.. ehh...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `My daughter...`)
    await waitTicks(20)
    await typeActionbar(player, me, `What?!`)
    await waitTicks(20)
    quest_sofia_dial00(player);
}

async function quest_sofia_dial00(player) {
    const adam = `Adam`;
    const me = player.name;

    const response01 = await new ActionFormData()
        .title(`§lRESPOND`)
        .body(``)
        .divider()
        .header(`How Will You Respond?`)
        .label(
            `< ${adam} > That's.. ehh... My daughter...

< ${me} > WHAT?!`
        )
        .button(`[ Main ] I'm so sorry..`)              //Case 0
        .button(`[ Main ] What have you done?`)         //Case 1
        .button(`[ Main ] Should I cry?`)               //Case 2
        .button(`[ OPTIONAL || CW: Self Harm ] What happened to her..?`) //Case 3
        .button(dial_unlock.dial01(player))             //Case 4
        .button(dial_unlock.dial02(player))             //Case 5
        .button(dial_unlock.dial03(player))             //Case 6
        .show(player)

    const selection = response01.selection;
    const canceled = response01.canceled;

    if (canceled) quest_sofia_dial00(player);

    if (selection == 0) quest_sofia_dial00_case0(player);
    if (selection == 1) quest_sofia_dial00_case1(player);
    if (selection == 2) quest_sofia_dial00_case2(player);
    if (selection == 3) quest_sofia_dial00_case3(player);
    if (selection == 4) {
        if (player.hasTag(`sofia_dial01`)) {
            quest_sofia_dial00_case4(player)
        } else {
            player.sendMessage(`[ LOCKED ] Dialogue locked.

Tip: Try all Optional Dialogues to unlock full dialogue Lines.`)
            await waitTicks(20)
            quest_sofia_dial00(player)
        }
    }
    if (selection == 5) {
        if (player.hasTag(`sofia_dial02`)) quest_sofia_dial00_case5(player); else {
            player.sendMessage(`[ LOCKED ] Dialogue locked.

Tip: Try all Optional Dialogues to unlock full dialogue Lines.`)
            await waitTicks(20)
            quest_sofia_dial00(player)
        }
    }
    if (selection == 6) {
        if (player.hasTag(`sofia_dial03`)) quest_sofia_dial00_case6(player); else {
            player.sendMessage(`[ LOCKED ] Dialogue locked.

Tip: Try all Optional Dialogues to unlock full dialogue Lines.`)
            await waitTicks(20)
            quest_sofia_dial00(player)
        }
    }
}

async function quest_sofia_dial00_case0(player) {
    const me = player.name;
    const adam = `Adam`

    await typeActionbar(player, me, `I'm so sorry...`)
    await waitTicks(20)
    await typeTitleTitle(player, `Adam will`)
    await typeTitleSubtitle(player, `Remember that.`)
    player.addTag(`sofia_is`)
    await typeActionbar(player, adam, `It's fine buddy..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Heh... Traveler comforting a tavern keeper`)
    await waitTicks(20)
    await typeActionbar(player, adam, `That's.. just not fair..`)
    await waitTicks(20)
    await typeActionbar(player, me, `Hey mate, everything will be alright.`)
    await waitTicks(20)
    await typeActionbar(player, me, `I know how you could feel when loosing someone important..`)
    await waitTicks(20)
    await typeActionbar(player, me, `Somehow i understand this feeling.. Even though my past is not known to me..`)
    await waitTicks(20)
    await typeActionbar(player, me, `But i feel like i lost someone important too.`)
    await waitTicks(20)
    if (player.hasTag(`sofia_dial01`)) {
        await typeActionbar(player, me, `This.. Darkshard is.. well.`)
        await waitTicks(20)
        await typeActionbar(player, adam, `She didn't deserved this kind of death...`)
        await waitTicks(20)
        await typeActionbar(player, me, `Exactly.. But hear me out, bud.`)
        await waitTicks(20)
    }
    await typeActionbar(player, me, `Even if she's gone on this horrible world..`)
    await waitTicks(20)
    await typeActionbar(player, me, `It does not mean that she will not be next to you.`)
    await waitTicks(20)
    await typeActionbar(player, me, `And trust me, \nthe ones we loved, \nwill always be by our side.`)
    await waitTicks(20)
    await typeActionbar(player, me, `No matter where we go... Or do.`)
    await waitTicks(20)
    await typeActionbar(player, me, `They will always protect us from the evil.`)
    await waitTicks(20)
    await typeActionbar(player, me, `And if the time comes for us too...`)
    await waitTicks(20)
    await typeActionbar(player, me, `They will be waiting, to welcome us, \nand to hug us with love that we didn't even got\nin this world.`)
    await waitTicks(20)
    await typeActionbar(player, me, `So heads up Adam, show your daughter that you are a strong father.`)
    await waitTicks(20)
    await typeActionbar(player, me, `Like you always were.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `... Thank you.`)
    await waitTicks(20)
    await typeActionbar(player, me, `Listed bud. Don't thank me.`)
    await waitTicks(20)
    await typeActionbar(player, me, `Thank yourself for being that strong of a son of a bitch.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Yeah...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `${me}.. I need a favor.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Can you.. transport her to the volcano, and burn her body..?`)
    await waitTicks(20)
    await typeActionbar(player, me, `Well.. That's a lot to ask for, why?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `If we don't burn her within 12 hours, she might become a Mroth.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `A corrupted soul, which will not give her peace which she deserves.`)
    await waitTicks(20)
    if (
        player.hasTag(`sofia_dial01`) &&
        player.hasTag(`sofia_dial02`) &&
        player.hasTag(`sofia_dial03`)
    ) {
        await typeActionbar(player, me, `It's because she had a Darkshard?`)
        await waitTicks(20)
        await typeActionbar(player, adam, `Yeah...`)
        await waitTicks(20)
        await typeActionbar(player, me, `I understand. Zapad and Cortex..`)
        await waitTicks(20)
        await typeActionbar(player, adam, `With her mU, it's only Zapad..`)
        await waitTicks(20)
        await typeActionbar(player, me, `How much time will i have?`)
        await typeActionbar(player, adam, `Around 12 to 14 hours. `)
        await specialQuestExplain(player)
        player.sendMessage(`Tip: One in-Game hour equals One reallife minute. Use this knowledge to plan your route to the volcano.`)
        await waitTicks(20)

    }
    else {
        await typeActionbar(player, me, `That sounds horrible...`)
        await waitTicks(20)
        await typeActionbar(player, adam, `Yeah...`)
        await waitTicks(20)
        await typeActionbar(player, me, `Ehh so if i don't do it in time, i will die?`)
        await waitTicks(20)
        await typeActionbar(player, adam, `Probably.`)
        await waitTicks(20)
        await typeActionbar(player, me, `How much time will i have?`)
        await typeActionbar(player, adam, `Around 12 to 14 hours. `)
        await specialQuestExplain(player)
        player.sendMessage(`Tip: One in-Game hour equals One reallife minute. Use this knowledge to plan your route to the volcano.`)
        await waitTicks(20)
        await questRegistry.questInfo.sofia.onComplete(player)

    }
}
async function quest_sofia_dial00_case1(player) {
    const me = player.name;
    const adam = `Adam`

    await typeActionbar(player, me, `What have you done..?`)
    await typeTitleTitle(player, `Adam will`)
    await typeTitleSubtitle(player, `Remember that.`)
    player.addTag(`sofia_whyd`)

}
async function quest_sofia_dial00_case2(player) {
    const me = player.name;
    const adam = `Adam`
    await typeActionbar(player, me, `Should i cry?`)
    await typeTitleTitle(player, `Adam will`)
    await typeTitleSubtitle(player, `Remember that.`)
    player.addTag(`sofia_sic`)

}
async function quest_sofia_dial00_case3(player) {
    const me = player.name;
    const adam = `Adam`
    await typeActionbar(player, me, `What happened to her?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `She was sick.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Very sick..`)
    await waitTicks(20)
    await typeActionbar(player, me, `How sick are we talking about?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Energy sick.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Her mana was corrupted, then swallowed by the Darkshard..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `And if your mana gets corrupted.. eh..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Can you imagine being a father, and cutting a rope which your own doughter was...`)
    await waitTicks(20)
    await typeActionbar(player, me, `Enough buddy. I understand..`)
    await waitTicks(20)
    await typeActionbar(player, me, `I'm with you.`)
    player.sendMessage(`[ Dialogue ] Option Unlocked: Darkshard?`)
    player.addTag(`sofia_dial01`)
    quest_sofia_dial00(player)

}
async function quest_sofia_dial00_case4(player) {
    const me = player.name;
    const adam = `Adam`
    await typeActionbar(player, me, `What is Darkshard..?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Ah right.. You don't remember anything about this world do you?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Darkshard.. Well. How can I say it.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `You know what magic is, right?`)
    await waitTicks(20)
    await typeActionbar(player, me, `Yes, i think so..?`)
    await waitTicks(20)
    await typeActionbar(player, me, `Magic comes from Mana, a life energy of each living being`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Yeah, you're right. Something like that... we measure it with mU.`)
    await waitTicks(20)
    await typeActionbar(player, me, `mU?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Mana Unit. To use magic you need to have at least 20mU`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Now imagine an energy, that feeds on it.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `And when it does, it oveloads, it destroys everything around it.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `When someone has a Darkshard, it opens a gate for Danergy to swallow whole mana.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Corrupting someone in a meantime.`)
    await waitTicks(20)
    await typeActionbar(player, me, `It sounds not good...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `It realy is. Darkshard is a scary way to die.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Not only it destroys you from the inside,`)
    await waitTicks(20)
    await typeActionbar(player, adam, `But also endangers an area when you die.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Creating either Zapad, or Cortex.`)
    player.sendMessage(`[ Dialogue ] Option Unlocked: Zapad?`)
    player.addTag(`sofia_dial02`)

    await waitTicks(40)
    quest_sofia_dial00(player)
}
async function quest_sofia_dial00_case5(player) {
    const me = player.name;
    const adam = `Adam`
    await typeActionbar(player, me, `Zapad?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `An local Catastrophe..`)
    await waitTicks(20)
    await typeActionbar(player, me, `It sounds.. scary.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Because it is.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `It sounds and looks scary at the same time.`)
    await waitTicks(20)
    await typeActionbar(player, me, `What do you mean?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `When it happens... well..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `You will see it from afar..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `But not only that..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `You will feel it... Hear it and.. Smell it.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `A horrible rotten smell. Like there were hundreds of rotten corpses near you.`)
    await waitTicks(20)
    await typeActionbar(player, me, `Sounds horrible...`)
    await waitTicks(20)
    await typeActionbar(player, me, `But.. How will i know there is Zapad happening?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Well...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `There will be a dark rain, the sky will turn black and.. the ground..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `The ground will start to rot.`)
    await waitTicks(20)
    await typeActionbar(player, me, `What triggers it?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `A person, who has minimum 20mU and maximum 134mU.`)
    await waitTicks(20)
    await typeActionbar(player, me, `And what happens when mU is higher than that?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Cortex will happen..`)
    await waitTicks(20)
    await typeActionbar(player, me, `Cortex?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `You don't want to know...`)
    player.sendMessage(`[ Dialogue ] Option Unlocked: Cortex`)
    player.addTag(`sofia_dial03`)

    quest_sofia_dial00(player)
}
async function quest_sofia_dial00_case6(player) {
    const me = player.name;
    const adam = `Adam`
    await typeActionbar(player, me, `The hell is Cortex?`)

    await waitTicks(20)
    await typeActionbar(player, adam, `It's simillar to Zapad.. But 100 times worse.`)
    await waitTicks(20)
    await typeActionbar(player, me, `What do you mean? What happens then?`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Cortex is... Ugh. I never saw it myself.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `But i heard it...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Everyone did.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `And the rain that comes after it... Well..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Does seeing your close ones rot gives you goosebumps?`)
    await waitTicks(20)
    await typeActionbar(player, me, `Don't say it...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Yes. It does.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `It starts with someone who has more than 135mU.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `It shatters the space around the center..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `It destroys.. whole regions.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `We had cars in the past..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `We had an internet, society connected all together...`)
    await waitTicks(20)
    await typeActionbar(player, adam, `But whatever has it's beggining, will also have it's end.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `First cortex destroyed our society..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Turned us around straight to the medieval age.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `And now we live like rats.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `Cramped in cities, being afraid to go outside due to Scrap Seekers or this..`)
    await waitTicks(20)
    await typeActionbar(player, adam, `god damn sect that treats Danergy like it's some fucking devine magic.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `It doesn't even falls into the category of magic.`)
    await waitTicks(20)
    await typeActionbar(player, adam, `It's just... Death.`)
    player.sendMessage(`[ Dialogue ] Reached all possible optional dialogues.`)

    quest_sofia_dial00(player)
}

async function specialQuestExplain(player) {
    const tuto = await new ActionFormData()
        .title(`§lSPECIAL QUESTS`)
        .body(``)
        .divider()
        .header(`SPECIAL QUESTS:
Body Transport`)
        .label(`Some Special quests have a TimeLimit. Use this to your advantage and plan your routes based on the time which was given in the quest description.
If you accept Special Quests, Fast travel will be disabled and the only thing that should matter to you is the objective and remaining time which you need to track yourself as there is no in-game countdown.

In this scenario use clock, or your phone to track the time.

The SQ: Body Transport time limit can vary, some can have a long limit, some short. Most this types of quests have 30 in-game hours (30 minutes in reallife.)

If you fail to transport the body, you will need to deal with "ZAPAD".
For more info about: Danergy, Mroths, Darkshard, Zapad and Cortex open a Guide in your menu.`)
        .button(`Okay.`)
        .show(player)
} 