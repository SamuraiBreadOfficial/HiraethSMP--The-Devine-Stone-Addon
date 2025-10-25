import { ActionFormData } from "@minecraft/server-ui";
import { system, world } from "@minecraft/server";

export const tag_human = 'hsmp_race_human';
export const tag_elf = 'hsmp_race_elf';
export const tag_half_orc = 'hsmp_race_half_orc';
export const tag_demon = 'hsmp_race_demon';

export const tag_fire = 'hsmp_magic_fire'
export const tag_wind = 'hsmp_magic_wind'
export const tag_earth = 'hsmp_magic_earth'
export const tag_nature = 'hsmp_magic_nature'

import { getRaceTags, getMagicTags } from "../../modules/playerinfo/registered-tags.js";

import { hiraethLOGO } from "../../modules/playerinfo/utils.js";

import { waitTicks, formatCurrency } from "../../formats.js"

const menuBuild = `Main Menu v2 || Build 0.1 (WIP)`

export function joinMenu_START(player) {

    return new ActionFormData()
        .title("")
        .body(menuBuild)
        .divider()
        .label('Welcome to:\n')
        .header(``)
        .divider()
        .label('You can continue reading by scrolling down, otherwise select "§lSTART YOUR JOURNEY§r". Closing the menu will make the menu appear again unless you have finished your setup.')
        .button('§lSTART YORU JOURNEY')
        .divider()
        .header(`What exactly is this SMP?`)
        .label(`HiraethSMP is all about story telling.
        
No matter if it is your's or world's story, it all shapes the future of the server's main storyline.

With the power you hold, each event, each decision you all make will say if the end of this story will be an good ending, or bad ending.

Your decision, your actions and your abbility to change the world has it's final word.

So what are you waiting for? Ready to join our amazing community?

For questions about storyline, voice acting, helping in build, codes or possible partnerships, contact @samuraibread on Discord directly.`)
        .show(player)
        .then(res => {
            const selection = res.selection;

            if (res.canceled) joinMenu_START(player);

            if (selection == 0) {
                joinMenu_RACE(player);
            }
        })

}

export function joinMenu_RACE(player) {
    return new ActionFormData()
        .title("")
        .body(menuBuild)
        .divider()
        .header('Race Selection')
        .label(`This season, you can select your race.
            
Each race has it's own buffs and debuffs which all are explained in their section.
Choose wisely, because you will not be able to change it later in the game.`)
        .divider()
        .header('§lHUMAN')
        .label(`
Humans are known for their amazing inventions! They were the first to invent fire in the past, but also they were the first who fought wars over food supplies.
Cave man age was crazy, but now we're in §k§4Sci-fi Age§r as you guessed by your arrival in this world :)
Their magic skills? Basically none, §lUNLESS§r they hold special item in off hand!

Buffs:
- Immune to negative mana effects when holding Mana Absorbsion Orb in off hand
- Normal strenght
- Abbillity to use human-specific item which gives them more special effects

Debuffs:
- Their Mana Points when not holding Mana Absorber are significally smaller
- They lack race-specific boosts
- They lack special weaponry skills (Can Be Learned)

Overall, humans are not the most boring race, as all races here have their own special sweets coming your way.`)
        .button('§lBECOME HUMAN')
        .divider()
        .header('§a§lELF')
        .divider()
        .label(`Elves are good sharp shooters... I mean archers.
They mostly feel good in the area surrounded by trees, with a sunlight shining through the leaves.
While they are weak physically, their abbillity, agillity and mostly good eyesight are returning them a favour.
They were here before humans, already living inside the trees, making them home-like.
Although they did not used fire, they made their own light, weaker than normal lanters but, you know. It is what it is.
They used §lFirefly lanters§r, to look around although they see in the dark like in the day.

Buffs:
- Night Vision
- Bow Zoom
- 40pt. of Mana
- Speed
- Jump Boost
- Dash (basically super speed)

Debuffs:
- Weak
- Can't wear armour stronger than iron (not including steel)
- Lacks the abbillity to operate human invention`)
        .button("§q§lBECOME ELF")
        .divider()
        .header('§v§lHALF ORC')
        .divider()
        .label('')
        .button('§v§lBECOME HALF ORC')
        .divider()
        .header(`§m§lDEMON`)
        .divider()
        .label('')
        .button('§m§lBECOME DEMON')
        .show(player)
        .then(res => {
            const selection = res.selection

            if (res.canceled) joinMenu_START;

            if (selection == 0) {
                player.addTag(`hsmp_race_human`)
                joinMenu_RACECONFIRM(player)
            }

            if (selection == 1) {
                player.addTag('hsmp_race_elf')
                joinMenu_RACECONFIRM(player)
            }

            if (selection == 2) {
                player.addTag('hsmp_race_half_orc')
                joinMenu_RACECONFIRM(player)
            }

            if (selection == 3) {
                player.addTag('hsmp_race_demon')
                joinMenu_RACECONFIRM(player)
            }
        })

}

export function joinMenu_RACECONFIRM(player) {
    const race = getRaceTags(player)

    return new ActionFormData()
        .title('')
        .body(menuBuild)
        .divider()
        .header(`Confirm Your Race`)
        .label(`Are you sure you want to choose ${race}? You will not be able to change it to other race.`)
        .divider()
        .button(`§lYES`)
        .button(`§lNO`)
        .show(player)
        .then(res => {
            const selection = res.selection;

            if (res.canceled) {
                player.removeTag(`hsmp_race_human`)
                player.removeTag('hsmp_race_elf')
                player.removeTag('hsmp_race_half_orc')
                player.removeTag('hsmp_race_demon')
                joinMenu_RACE(player)
            }

            if (selection == 0) joinMenu_MAGIC(player);

            if (selection == 1) {
                player.removeTag(`hsmp_race_human`)
                player.removeTag('hsmp_race_elf')
                player.removeTag('hsmp_race_half_orc')
                player.removeTag('hsmp_race_demon')
                joinMenu_RACE(player)

            }
        })

}

export function joinMenu_MAGIC(player) {
    return new ActionFormData()
        .title('')
        .body(menuBuild)
        .divider()
        .header('Magic Selection')
        .divider()
        .label('Fuck off Luka')
        .divider()
        .header('§l§cFIRE')
        .divider()
        .label('')
        .button('§l§cCHOOSE FIRE\nMAGIC')
        .divider()
        .header('§l§bWIND')
        .divider()
        .label('')
        .button('§l§bCHOOSE WIND\nMAGIC')
        .divider()
        .header('§l§vSOIL')
        .divider()
        .label('')
        .button('§l§vCHOOSE SOIL\nMAGIC')
        .divider()
        .header('§l§aNATURE')
        .divider()
        .label('')
        .button('§l§aCHOOSE NATURE\nMAGIC')
        .show(player)
        .then(res => {
            const selection = res.selection

            if (res.canceled) joinMenu_MAGIC(player);

            if (selection == 0) {
                player.addTag(tag_fire)
                joinMenu_MAGICCONFIRM(player)
            }

            if (selection == 1) {
                player.addTag(tag_wind)
                joinMenu_MAGICCONFIRM(player)
            }

            if (selection == 2) {
                player.addTag(tag_earth)
                joinMenu_MAGICCONFIRM(player)
            }

            if (selection == 3) {
                player.addTag(tag_nature)
                joinMenu_MAGICCONFIRM(player)
            }
        })
}

export function joinMenu_MAGICCONFIRM(player) {
    const magic = getMagicTags(player);

    return new ActionFormData()
        .title(hiraethLOGO)
        .body(menuBuild)
        .divider()
        .header(`Confirm Your Magic`)
        .divider()
        .label(`Are you sure you want to select ${magic}?
    
You can always learn other types of magic, although it will be hard.`)
        .divider()
        .button('§lYES')
        .button(`§lNO`)
        .show(player)
        .then(r => {
            const selection = r.selection;

            if (selection == 0) {
                console.info('Magic Given (Selected YES)')
                join_MenuTUTORIALREQUEST(player)
            }
            if (selection == 1) {
                player.removeTag(tag_fire)
                player.removeTag(tag_wind)
                player.removeTag(tag_earth)
                player.removeTag(tag_nature)
                joinMenu_MAGIC(player)
                console.warn(`${player} canceled the Magic Response.`)
            }

        })
}

export function join_MenuTUTORIALREQUEST(player) {
    return new ActionFormData()
        .title(hiraethLOGO)
        .body(menuBuild)
        .divider()
        .header(`Tutorial`)
        .divider()
        .label(`Do you want to view small Tutorial for HiraethSMP?`)
        .button('§lYES')
        .button('§lNO')
        .show(player)
        .then(r => {
            const selection = r.selection;

            if (r.canceled) {
                player.sendMessage('Tutorial Cancelled. You can always view it in ' + hiraethLOGO + " menu by typing the command §e§o/hmenu")
            }

            if (selection == 0) {
                player.sendMessage(`Tutorial Still in Progress.`)
                tutorial_1(player)
            }

            if (selection == 1) {
                player.sendMessage('Tutorial Cancelled. You can always view it in ' + hiraethLOGO + " menu by typing the command §e§o/hmenu")

            }
        })
}



export async function cwAgreedment(player) {
    system.run(() => player.runCommand("playsound random.door_open @s ~ ~ ~ 1 0.5 1"))
    system.run(() => player.runCommand(`inputpermission set @s movement disabled`))
    system.run(() => player.runCommand(`gamemode spectator`))
    await waitTicks(40)
    player.sendMessage(`§a[ §lSYSTEM ]§r Hello there! Welcome to HiraethSMP!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(40)
    player.sendMessage(`§a[ §lSYSTEM ]§r Before you play, you need to agree to §cContent Warnings§r and §cServer Rules§r.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(40)
    player.sendMessage(`§a[ §lSYSTEM ]§r §cOtherwise you will not be able to play on the server.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    const r = await new ActionFormData()
        .title(`§l§c[ CONTENT WARNING ]`)
        .body(`${menuBuild}`)
        .label(`/!\\ §l§cWarning!§r
Server events may contain: §cBlood, Gore, Possible Triggers, Strong Language, and Mature Themes§r

By accepting this, 
§lyou acknowledge that you are joining the events 
at your own risk§r.
The server owner and staff members are §lnot responsible§r for any potential mental or emotional distress you may experience.

By clicking §eContinue§r, you confirm that you are §o§l16 years of age or older§r and that you §lwill§r be notified about specific content warnings in each event's description.
`)
        .button(`§lCONTINUE`)
        .label(`§c§l’/!\\ THIS OPTION WILL LOCK YOUR SERVER ACCESS!`)
        .button(`§l§cLEAVE THE SERVER`)
        .show(player)
    if (r.canceled || r.selection == 1) lockAccess(player);

    if (r.selection == 0) {
        rules(player)
    }
}

export async function unlockAfterTutorial(player) {
    system.run(() => player.runCommand(`inputpermission set @s movement enabled`))
    system.run(() => player.runCommand(`gamemode s`))
    system.run(() => player.runCommand(`camera @s clear`))

}

async function lockAccess(player) {
    player.sendMessage(`§c§l[ SYSTEM ]§r Your access HAS been denied. If you think that it's an missunderstanding, contact us via support ticket, by selecting [ SERVER ACCESS ].
    
This ticket category is used when: You are banned or kicked from the server.
    
What you need to do:
1) Go to HiraethSMP Discord Server;
2) Go to Support Tickets;
3) Click button to create a ticket;
4) Fill the form, give as much details as you can;
5) Wait till someone responds;`)
    await waitTicks(200)
    player.sendMessage(`§c§l[ SYSTEM ]§r You will be now kicked from the server. Thank you for joining, and see you next time!`)
    await waitTicks(200)
    system.run(() => player.runCommand(`tag @s add accessLocked`))
}

async function rules(player) {
    system.run(() => player.runCommand("playsound random.levelup @s ~ ~ ~ 1 1 1"))
    player.sendMessage(`§c§l[ SYSTEM ]§r You have accepted our Content Warning!
    
You can always check content warning agreedment by going into your menu (/hmenu) and clicking Info button.`)
    await waitTicks(60)
    player.sendMessage(`§c§l[ SYSTEM ]§r Rules are also important. You can find them on our server or typing out command /rules.
    

Please accept rules before we continue into the tutorial.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    const r = await new ActionFormData()
        .title(`§4§l[ RULES / COMMUNITY ]`)
        .body(menuBuild)
        .divider()
        .header(`Community`)
        .label(`
1. Do not spam.

2. Keep chats clean and use them for their intended purpose.

3. Do not harass or bully anyone - in public chats or DMs.

4. Respect others. Treat people how you'd like to be treated.

5. Don't ask for staff roles. We open staff applications when needed.

6. No NSFW content anywhere.

7. Slurs are not outright banned but should not be overused. Be mindful.

8. Avoid political, religious, or other sensitive topics that could cause arguments.

9. No advertising other servers, links, or social media without permission.

10. Keep drama private. If there's an issue, report it to staff instead of escalating it.

11. Don't impersonate staff or other members.

12. English is the main language. Please stick to it unless you're in a designated language-specific channel.

13. No AI content anywhere. Including Deepfakes, Ai-generated Art or any content generated fully by an AI
`)
        .button('NEXT')
        .label(`§c§l’/!\\ THIS OPTION WILL LOCK YOUR SERVER ACCESS!`)
        .button(`§l§cLEAVE THE SERVER`)
        .show(player)

    if (r.canceled || r.selection == 1) lockAccess(player);

    if (r.selection == 0) {
        const rulesVC = await new ActionFormData()
            .title(`§4§l[ RULES / VC ]`)
            .body(menuBuild)
            .divider()
            .header(`Voice Chat`)
            .label(`
14. Keep your voice at a comfortable volume. No mic torture, please.

15. Soundboards are allowed, but don't overuse them or use them to annoy others.

16. Slurs aren't banned in VC, but don't go overboard.

17. Don't blast music unless everyone in the VC agrees.

18. Don't join VC just to troll, scream, or be disruptive.

19. Do not record others in VC without their clear consent.
`)
            .button(`NEXT`)
            .label(`§c§l’/!\\ THIS OPTION WILL LOCK YOUR SERVER ACCESS!`)
            .button(`§l§cLEAVE THE SERVER`)
            .show(player)

        if (rulesVC.canceled || rulesVC.selection == 1) lockAccess(player);

        if (rulesVC.selection == 0) {
            const rulesMC = await new ActionFormData()
                .title(`§4§l[ RULES / MC ]`)
                .body(menuBuild)
                .divider()
                .header(`MC:BE (REALM RULES)`)
                .label(`
20. No griefing

21. No cheating

22. PvP Rules:

- For the first 2 weeks, a global peace pact is active – no PvP is allowed anywhere.
- After the peace period:

  - PvP is allowed in the wilderness (unclaimed/unprotected land).
  - PvP inside bases is not allowed, unless the base owner asks the intruder to leave and they refuse.
- Entering someone's base without permission may be considered provocation.

23. Faction Territories:

- Factions claim land by placing banners on stone blocks every \~30 blocks.
- Claimed areas must be visibly marked (walls, fences, etc.) to indicate territory boundaries.
- Claimed zones are treated as PvP-free bases, unless point 21 conditions are met.
- Claim banners must be purchased from faction vendors using a special item from the Discord economy system.
- Each faction starts with 128 claim banners at the start of the season.
- Abuse or bypassing of this system (e.g., fake claims, invisible boundaries) will be punished.

24. No offensive or inappropriate builds

25. Avoid lag-inducing builds

26. Don't claim large areas and leave them unused.

27. Follow staff instructions - fix, move, or remove your builds if asked.

28. Use common sense. If unsure, ask
`)
                .button(`Accept`)
                .label(`§c§l’/!\\ THIS OPTION WILL LOCK YOUR SERVER ACCESS!`)
                .button(`§l§cLEAVE THE SERVER`)

                .show(player)

            if (rulesMC.canceled || rulesMC.selection == 1) lockAccess(player);

        }

    }
}

export async function tutorial_main(player) {
    system.run(() => player.runCommand(`inputpermission set @s movement disabled`))
    system.run(() => player.runCommand(`gamemode spectator`))

    system.run(() => player.runCommand("playsound random.levelup @s ~ ~ ~ 1 1 1"))
    player.sendMessage(`§c§l[ SYSTEM ]§r You have accepted our Rules!
    
You can always check rules by going into Discord or your menu (/hmenu) and clicking Rules button.`)
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Hello §a${player.name}§r! Welcome to HiraethSMP!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r This §eTutorial§r will show you the basics of our server.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r It will be showed only once.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Let's start the adventure!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    system.run(() => player.runCommand(`camera @s set minecraft:free ease 5 in_out_sine pos 222 87 1944 rot 20 0`))
    system.run(() => player.runCommand(`tp 222 83 1944`))

    await waitTicks(100)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r This is the tavern.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r It is a heart of the server.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r If you're into exploring, or quests: You will visit it very often.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(100)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 3 in_out_sine pos 223 68 1969 rot 0 0"))
    system.run(() => player.runCommand(`tp 223 65 1969`))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r This is a quest board.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r In here you will be able to Accept Quests...`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r ...While inside the tavern, you will be able to collect rewards.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r There are 3 types of quests:`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Delivery, which offers from \$1k to \$5k.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r C&T, which offer from \$3k to \$10k.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r And H&T, offering from \$10k to even \$100k`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r There are also Admin Quest.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Special quests made by admins. Which are the most profitable quests out there!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(100)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 3 in_out_sine pos 223 68 1971 rot -20 -90"))
    await waitTicks(59)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 3 in_out_sine pos 228 71 1971 rot -20 -90"))
    await waitTicks(59)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 1 in_out_sine pos 228 71 1971 rot 0 -90"))
    await waitTicks(19)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 3 in_out_sine pos 233.5 71.5 1971 rot 0 -90"))
    await waitTicks(59)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 1 linear pos 233.5 71.5 1971 rot 0 0"))
    await waitTicks(19)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 3 linear pos 233.5 71.5 1978 rot 0 0"))
    await waitTicks(59)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 3 linear pos 233.5 71.5 1978 rot 0 90"))
    await waitTicks(59)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 3 linear pos 219.5 71.5 1978 rot 0 90"))
    await waitTicks(59)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 3 out_sine pos 216.5 71.5 1985 rot 0 90"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r This is Adam!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r You can interact him by clicking the service bell!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r With him, you will be able to:`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Collect Rewards from Quests`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Buy Alkohol Drinks`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Check newest information.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Fun Fact:`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Some drinks have historical name!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r For example: One wine has a name of an hybrid boy who`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r dicovered the continent and`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))
    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r allowed Silvi (City you're in now) to exist!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 5 in_out_sine rot 0 180"))
    await waitTicks(100)
    system.run(() => player.runCommand("camera @s set minecraft:free ease 5 in_out_back pos 208 84 1964 rot 20 180"))


    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r This is the Church.`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Here you can check your XP, Mana, Magic and Level!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

    await waitTicks(60)
    player.sendMessage(`§e[ §lTUTORIAL§r§e]§r Simply interact with a block inside of it to check your stats!`)
    system.run(() => player.runCommand("playsound random.orb @s ~ ~ ~ 1 1 1"))

}

system.runInterval(() => {
    const server = world.getDimension(`overworld`);

    for (const player of server.getPlayers()) {
        if (player.hasTag('accessLocked')) {
            return new ActionFormData()
                .title(`§l§cBANNED`)
                .body(``)
                .divider()
                .header(`You are Banned.`)
                .label(`§cYou cannot access the server as you are currently banned.§r

This may have occurred due to one of the following reasons:

1) Denying the Content Warning or Server Rules.

2) Violating our Server Rules.

If you believe this ban was a mistake or unjustified, please contact us via Discord.
If you are also banned on Discord, you can submit an appeal at: §bhttps://appeals.wickbot.com§r

Please note: every 25 seconds, our system will automatically kick you to free up player slots.

Thank you, and we hope to hear from you soon.`)
                .button(`Leave The Server`)

                .show(player)
        }
    }
}, 80)

system.runInterval(() => {
    world.getDimension(`overworld`).runCommand(`kick @a[tag=accessLocked] You have been banned from this server.`)
    console.warn(`Tried to kick players.`)
}, 500)