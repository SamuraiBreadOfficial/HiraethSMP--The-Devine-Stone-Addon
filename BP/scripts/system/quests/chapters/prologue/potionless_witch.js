import { system, world } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui";
import { waitTicks, formatCurrency, typeActionbar } from "../../../../formats.js"


export async function witchTalks(player) {
    const witch_not_known = 'Weird Girl'
    const witch = 'Evangeline';
    const cat = 'Zephyr';
    const me = player.name

    await typeActionbar(player, me, 'Um, hi.')
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, "Hmm..?", 1)
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, `And who exactly are you?`, 1)
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, `Why did you entered my home without knocking?`, 1)
    await waitTicks(20)
    await typeActionbar(player, me, 'Wait. This is your house?', 1)
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, 'And do you see anyone else in here?', 1)
    await waitTicks(20)
    await typeActionbar(player, me, `OH! I'm so sorry!`, 1)
    await waitTicks(10)
    await typeActionbar(player, me, '§o(Who exactly leaves their doors open?)', 1)
    await waitTicks(20)
    await typeActionbar(player, me, 'I\'ve seen the sign and thought that it\'s a store...', 1)
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, 'And have you seen a sign that says "Please knock"?')
    await waitTicks(20)
    await typeActionbar(player, me, '§o(There was a sign, but overgrown by a cherry tree...)')
    await waitTicks(20)
    await typeActionbar(player, me, 'No, i\'m sorry.', 1)
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, 'Eghh... It is fine.', 1)
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, 'It\'s not like much people comes here anyway.', 1)
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, 'They think that magic can be only held by the cursed ones... Idiots.')
    await waitTicks(20)
    await typeActionbar(player, me, '"They"?')
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, `The towns folks. They are so.. UGH.`)
    await waitTicks(20)
    await typeActionbar(player, me, '§o(Yeah, some of them are weird.)')
    await waitTicks(20)
    await typeActionbar(player, me, 'So, you are travelling to Silvi often?')
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, 'No.. Not without a hood.')
    await waitTicks(20)
    await typeActionbar(player, me, 'What..? Are you some kind of wanted criminal?')
    await waitTicks(20)
    await typeActionbar(player, witch_not_known, 'And do i look like one? Rude...')
    await waitTicks(20)
    await typeActionbar(player, me, `Sorry. By the way, i'm ${me}. What about you?`)
    await waitTicks(20)
    await typeActionbar(player, witch, `It's ${witch}.`)
    await waitTicks(20)
    await typeActionbar(player, me, `${witch}... Beautifull name.`)
    await waitTicks(20)
    await typeActionbar(player, witch, `Eek-! F-for you miss ${witch}! And don't flatter me, p-please.`)
    await waitTicks(20)
    await typeActionbar(player, me, '§o(Huh. Is this some kind of a joke?)')
    await waitTicks(20)
    await typeActionbar(player, me, `Sure, Miss ${witch}.`)
    await waitTicks(20)
    await typeActionbar(player, witch, 'A-Anyway! What have you came here for?')
    await waitTicks(20)
    await typeActionbar(player, me, `Well, Adam told me that i can find some health potions in here.`)
    await waitTicks(20)
    await typeActionbar(player, witch, `Yeah! But there is a one problem.`)
    await waitTicks(20)
    await typeActionbar(player, witch, `I may have used all of the potions when i was tavelling.`)
    await waitTicks(20)
    await typeActionbar(player, me, `. . .`, 3)
    await waitTicks(20)
    await typeActionbar(player, witch, '. . .', 3)
    await waitTicks(20)
    await typeActionbar(player, witch, `Buuut! With your help, i can make some!`)
    await waitTicks(20)
    await typeActionbar(player, witch, 'You can collect 12 §eGlow Berries§r and bring them to me!')
    await waitTicks(20)
    await typeActionbar(player, witch, 'Of course, there is a reward. You\'ll get the potions for free.. And some cash.')
    await waitTicks(20)
    await typeActionbar(player, witch, 'Sounds good?')
    await waitTicks(60)
    quest_proposition_1(player)
}

export async function quest_proposition_1(player) {
    const r = await new ActionFormData()
        .title(`§lQUEST`)
        .body(`Evangeline Offers you a C&T Quest!`)
        .divider()
        .header(`Potionless Witch`)
        .label(`Collect Glow Berries x12 which grows in the jungle and bring them back to §eWitch Evangeline§r
    
§aRewards:
- 5x Health Potions
- 5,000.00\$
- Unlocks Witch Hut
- +5 Reputation.`)
        .button(`§lACCEPT`)
        .button(`§lMAYBE LATER`)
        .button(`§l§cDECLINE`)
        .label(`DECLINING WILL GIVE YOU -20 REP (If your reputation is too low, stores might decline offering you a deal!)`)
        .show(player)

    if (r.canceled || r.selection == 1) {
        player.addTag(`quest_witch_later`)
        await typeActionbar(player, `${player.name}`, `Sorry, I'm in rush. Maybe later?`)
        await waitTicks(20)
        await typeActionbar(player, `Evangeline`, `Ah, Yeah. Sure.. No problem at all.`)
        return;
    }

    if (r.selection == 2) {
        player.addTag(`hsmp_witch_quests_lock`)
        if (player.hasTag(`quest_witch_later`)) player.removeTag(`quest_witch_later`)
        await typeActionbar(player, `${player.name}`, `Sorry, but no.`)
        await typeActionbar(player, `Evangeline`, `Ah i see. No problem at all. I'll go myself...`)
        player.sendMessage(`You will no longer gain quests from Evangeline.
To unlock quests from her, you need to interact with her with a Torchflower.`)
        return;
    }

    if (r.selection == 0) {
        player.addTag(`hsmp_whitch_quest_accepted`)
        if (player.hasTag(`quest_witch_later`)) player.removeTag(`quest_witch_later`)
        await typeActionbar(player, `${player.name}`, `Sure, i'll do it!`)
        await waitTicks(20)
        await typeActionbar(player, 'Evangeline', `Great! I knew i could count on you!`)
        await waitTicks(20)
        await typeActionbar(player, `Evangeline`, `They grow mostly on the trees. They are shiny.`)
        await waitTicks(20)
        await typeActionbar(player, `${player.name}`, `I'll be on my way then`)
        player.sendMessage(`[ §e§lQUEST§r ]
§l§ePotionless Witch
            
§rCollect Glow Berries which grows in the jungle and bring them back to §eWitch Evangeline§r
    
§aRewards:
- 5x Health Potions
- 5,000.00\$
- Unlocks Witch Hut
- +5 Reputation.`)
    }
}

export async function dialogue_quest1(player) {
    const witch = 'Evangeline';
    const me = player.name

    const r = await new ActionFormData()
        .title(`§lEVANGELINE`)
        .body(`< Evangeline > Need something else?`)
        .divider()
        .button(`Complete the quest
[ MAIN ]`)
        .button(`Why are you tabeling with a hood?`)
        .button(`How did you end up in here?`)
        .button(`Why did you became the Witch?`)
        .button(`Nevermind`)
        .show(player)
    if (r.canceled || r.selection == 4) {
        await typeActionbar(player, `${player.name}`, `No, i was just looking around.`)
        await waitTicks(20)
        await typeActionbar(player, `Evangeline`, `Okie, good luck on your travels!.`)
    }

    if (r.selection == 0) {
        const heldItem = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
        const stackSize = heldItem ? heldItem.amount : 0;

        if (heldItem && heldItem.typeId == "minecraft:glow_berries" && stackSize >= 12) {
            player.sendMessage(`[ §l§aQUEST COMPLETED§r ]`)
            await typeActionbar(player, me, "I've got those berries you wanted.")
            await waitTicks(20)
            await typeActionbar(player, witch, 'Great! With an empty stomach i would never do anything!')
            await waitTicks(20)
            await typeActionbar(player, me, '... WAIT! You sent me for those berries... BECAUSE YOU WERE HUNGRY?!')
            await waitTicks(20)
            await typeActionbar(player, witch, `Of course! For health potions you just need glided melon slices. Silly.`)
            await waitTicks(20)
            await typeActionbar(player, me, '§o(Is she really serious?)')
            await waitTicks(20)
            await typeActionbar(player, witch, 'Anyway, here is your reward! Come back in 1 day so you will get your potions too!')
            await waitTicks(200)
            await typeActionbar(player, me, 'I swear... This women.')
            return;
        } else {
            await typeActionbar(player, me, 'Umm, where do i find those Berries again?')
            await waitTicks(20)
            await typeActionbar(player, witch, 'On the trees... In the jungle..? I told you before. Also bring 12 of them.')
        }
    }
}