console.warn("§d[HIRAETH]§r Loading scripts/system/menu/page1-joinmenu.js");

import { ActionFormData } from "@minecraft/server-ui";
import { system, world } from "@minecraft/server";

import { questRegistry } from "./../quests/main/core.js"

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

import { waitTicks, formatCurrency, typeActionbar, typeTitleSubtitle, typeTitleTitle } from "../../formats.js"

const menuBuild = `Main Menu v2 || Build v1.4 (WIP)`

export async function joinMenu_START(player) {

    const start = await new ActionFormData()
        .title("§lHIRAETHSMP || START")
        .body(menuBuild)
        .divider()
        .header(`Welcome to:
        
${hiraethLOGO}  §l§d!`)
        .divider()
        .label(`Hello §e${player.name}!§r§f

Welcome to §dHiraethSMP§r! A server, which grows your Creativity and Roleplay Minds!

§o§7You can keep reading this if you scroll down.
To §aStart§7 simply click "§e§lPLAY§r§7§o" button.`)
        .divider()
        .label(`====[ §lSTART YOUR JOURNEY!§r ]====`)
        .button(`§l§2PLAY`)
        .divider()
        .label(`=========[ §lREAD  MORE§r ]=========`)
        .divider()
        .label(`As said above, with this server, you can wake up your creativity or roleplaying skills while also exploring a beatifull continent called "Threeclover"!
        
In this server you will be able to:`)
        .label(`• Play with your friends, and create your own faction together!

• Learn new Skills!

• Learn Magic!

• Complete Quests!

• Compete within the economy! Gain more cash than others!

• Roleplay with Others!

• Contribute to the story while taking part in Lore Events!

• Contribute to Server's Activity while hosting your own Community Event!`)
        .label(`
This server, is not like any others. It takes you mindset, and puts it on top of the ladder.
Your choices matters here, quest dialogues you choose will have effect on you and future quests too.
This is not an ordinary server, it's a living project, designed to give you more, that you could have ever expected.

Welcome to:

${hiraethLOGO}

A server made with passion, for passion.

~ SamuraiBread
Owner of HiraethSMP.`)
        .show(player)

    const selection = start.selection;

    if (start.canceled) {
        joinMenu_START(player)
    }

    if (selection == 0) {
        joinMenu_RACE(player);
    }


}

export function joinMenu_RACE(player) {
    return new ActionFormData()
        .title("§lHIRAETHSMP || RACE")
        .body(menuBuild)
        .divider()
        .header('Races')
        .label(`This season offers race selection. 
        
All races have their own unique boosts and debuffs.
Check the statistics before confirming.`)
        .divider()
        .header('§lHUMAN')
        .label(`
Statistics:
HP: 20
MP: 20

Buffs: 
- None

Debuffs: 
- None`)
        .button('§lBECOME HUMAN')
        .divider()
        .header('§a§lELF')
        .divider()
        .label(`
Statistics:
HP: 20
MP: 60

Buffs:
- Night Creature
    
    > When time hits 20:00
      your character will
      gain nightvision effect
      for the night.

- Sniper's Eye
    
    > When Aiming a bow,
      your FOV will 
      automatically 
      be set to 30.

- Archer's Craft

    > When the bow is 
      crafted, it has 
      an 80% chance 
      of becoming a 
      special rare 
      bow, which deals 
      more damage and 
      shoots with 
      more power.

- Skills:
    > Double Jump
        > Click on the block while
          in air and when Your main 
          hand is empty to gain 
          extra 3 blocks of height.
          It uses up 5MP.
          
    > Handy Craft
        > Quickly craft arrows by
          LShifting and holding
          an stick or flint to
          craft an arrow. This
          have extra 20% chance
          to give you extra 5
          arrows when used.
          It deacreses your
          hungerbar.
          
    > Emergency Choice
        > Quickly manifest yourself
          an one-use bow with
          Punch V and Flame
          enchantments. It also
          gives you 1 poisonous arrow.
          It uses up 15MP per use.
    
    > Dragon's Bow
        / ! \\ Fire Magic needed 
                for this skill!

        > Quickly manifest falming bow
          of many uses. It gives you an
          Flaming Bow with Infinity
          and Unbreaking V 
          enchantment.
          If not in the main hand, it
          dissapears untill skill used
          again. Each use 
          consumes 50MP.

    > Sharp Rain
        / ! \\ Wind Magic Needed 
                for this skill!
        
        > Blow your arrows into the
          air and make them fall on
          your nearest target. It
          consumes 32 arrows and
          20MP.
          
    > Sharp-Eared' Blessing
        / ! \\ Nature Magic Needed
                 for this skill!
        
        > Quickly heal your whole HP
          level at the cost of
          nearest's entitie's health.
          Each heal takes 
          10 hearts from
          nearest entity and 
          20MP from you
          and 10 MP from 
          the nearest entity.
          
Debuffs: 
    
    - Weak Bones  
      > Can't wear armor 
        stronger than iron
        
    - LoL Players
      > Weak at day
        Normal at night
        
    - Freedom Lover  
      > If in small spaces
        for too long
        they get
        uncomftorable.
        
    - Nature Lover
      > If not near
        foliage for too
        long, their MP
        drops below 20.`)
        .button("§q§lBECOME ELF")
        .divider()
        .header('§v§lHALF ORC')
        .divider()
        .label(`Statistics:
HP: 70
MP: 10

Buffs:

- Strong
    > Half orc has infinite strenght boost.
    
- Heavy
    > Resistant to arrow and melee extra damage
    
- Fear
    > Mobs such as:
        - Creepers
        - Zombies
        - Spiders
    Avoids this race.
    
Skills:
    - Fury
        > When HP is smaller than 20,
          Half orc gains speed boost,
          strenghth II, Night Vision,
          Haste III and absorbsion I.
          The fury will also scare away
          most of the mobs that are
          20 blocks away from person.
          
    - Heavy Jump
        > Sneak, and right click on the block
          Below you to trigger
          Heavy jump Skill.
          It launches you 10 blocks up,
          and when you fall,
          you crash everything which stands in
          your way.
          
Debuffs:

- Magical Pain
    > Magic hurts 2x more than for Humans, Elves and Demons.
    
- Spelless
    > Can't use spells that are not for healing themselves
    
- Brutal Fire
    > Fire magic deals 3x more damage than normally.
    
- Nature's Exile
    > Nature's Magic Heal Spells doesn't work on them.`)
        .button('§v§lBECOME HALF ORC')
        .divider()
        .header(`§m§lDEMON`)
        .divider()
        .label(`Statistics:
HP: 80
MP: 60

Buffs:
- Demonic Freedom
    > Can fly.
    
- Hell's Power
    > Gains +2 levels to fire magic (If Chosen.)
    
- Hard Skin
    > Resistant to fire
    
- Withering Touch
    > Every hit has 20% chance of giving hi entity withering effect.
    
Skills:

- Demonic Heart
    > If entity is killed, 10HP is instantly healed.
      Demon will also gain small boost which lasts 10sec
      
- Half Orc Devouer
    > Demon is an enemy of Half Orcs by the lore.
      If skill is trigerred, when there is a
      Half Orc Nearby, Demon will be notified of
      it's position, current health,
      valuable items in his inventory and
      half orc will get stuck for 10 seconds.
      
- Human Meat
    > When killing a human, Demon gains raw porkchop and boosts called "DEMONIC HUNGER"
      An custom effect which will make your hunger bar stuck on full
      for whole duration of the effect.
      
Debuffs:
- Cat&Water
    > Water gives Demons 1hp of damage each second.
    
- Nature's Exile
    > Nature's Magic Heal Spells doesn't work on them.
    
- Daylight's Enemy
    > Gets blind on daylight.`)
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

            if (selection == 0) genderSelection(player);

            if (selection == 1) {
                player.removeTag(`hsmp_race_human`)
                player.removeTag('hsmp_race_elf')
                player.removeTag('hsmp_race_half_orc')
                player.removeTag('hsmp_race_demon')
                joinMenu_RACE(player)

            }
        })

}

export async function genderSelection(player) {
    const genderMenu = await new ActionFormData()
        .title(`§lGENDER`)
        .body(menuBuild)
        .divider()
        .header(`Select Your Gender`)
        .label(`Gender will only make your character sound diffrent. If you choose male, your voice will be pitched down, while when choosing female it will be pitched up. If skipped, you voice will be pitched down anyway.`)
        .divider()
        .button(`§lMALE`)
        .button(`§lFEMALE`)
        .button(`§lSKIP`)
        .show(player)

    if (genderMenu.canceled || genderMenu.selection == 2) {
        const genderCancel = await new ActionFormData()
            .title(`§lGENDER || §cCANCELED`)
            .body(menuBuild)
            .divider()
            .header(`§lAre you Sure?`)
            .label(`Are you sure you want to cancel? Your voice will be pitched down like male's voice.`)
            .button(`§l§cYES`)
            .button(`§lNO`)
            .show(player)
        if (genderCancel.canceled || genderCancel.selection == 1) genderMenu;
    }

    if (genderMenu.selection == 0) {
        const genderMenu0 = await new ActionFormData()
            .title(`§lGENDER || MALE`)
            .body(menuBuild)
            .divider()
            .header(`Are you sure?`)
            .label(`You sure you want to choose "Male"?

Sometimes NPCs will say about you as "he/him" and your voice will be pitched down.`)
            .button(`§lCHOOSE`)
            .button("§lRETURN")
            .show(player)

        if (genderMenu0.canceled || genderMenu0.selection == 1) genderMenu;


        if (genderMenu0.selection == 0) {
            player.addTag(`male`)
            joinMenu_MAGIC(player)
        }
    }

    if (genderMenu.selection == 1) {
        const genderMenu1 = await new ActionFormData()
            .title(`§lGENDER || FEMALE`)
            .body(menuBuild)
            .divider()
            .header(`Are you sure?`)
            .label(`You sure you want to choose "Female"?

Sometimes NPCs will say about you as "she/her" and your voice will be pitched up.`)
            .button(`§lCHOOSE`)
            .button("§lRETURN")
            .show(player)

        if (genderMenu1.canceled || genderMenu1.selection == 1) genderMenu;

        if (genderMenu1.selection == 0) {
            player.addTag(`female`)
            joinMenu_MAGIC(player)
        }
    }
}

export function joinMenu_MAGIC(player) {
    return new ActionFormData()
        .title('')
        .body(menuBuild + ` || Still Under Development.`)
        .divider()
        .header('Magic Selection')
        .divider()
        .label('Choose your Magic Type and begin your adventure with powerfull spells.')
        .divider()
        .header('§l§cFIRE')
        .divider()
        .label(`Fire Magic is the most powerfull magic, it offers fire and thunder spells.
        
Spells included in this Magic Type:

1) Fireball - Deals damage + sets player which was hit on fire.

Levels: 5
HSMP Levels to unlock: 0
HSMP Levels to upgrade:
Level 1: 5LVL (+20%% Damage)
Level 2: 10LVL (+40%% Damage)
Level 3: 20LVL ( Less Mana Use )
Level 4: 40LVL ( +50%% Damage + Less Mana Use )
Level 5: 60LVL ( +80%% Damage + -90% Mana Use )

2) Area Fire - Sets the area on fire for 30seconds

Levels: 3
HSMP Levels to Unlock: 20
HSMP Levels to Upgrade:
Level 1: 15LVL (+20%% DAMAGE)
Level 2: 30LVL ( +5s + +5 block of range (20) )
Level 3: 80LVL ( +15s + +50%% )

[...] More spells in Church.`)
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
        .header(`§lPLAY`)
        .divider()
        .label(`Everything is setted up and ready to proceed.
        
Click Play button to begin your adventure <3`)
        .button('§lPLAY')
        .show(player)
        .then(r => {
            const selection = r.selection;

            if (r.canceled || selection == 0) {
                cwAgreedment(player)
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
    system.run(() => player.runCommand(`/hud @s reset all`))

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

            if (rulesMC.selection == 0) {
                startCutscene(player)
            }

        }

    }
}

async function tutorialSay(player, text) {
    await waitTicks(40)
    await typeActionbar(player, `§l§eTutorial§r`, text)
    await player.sendMessage(`[ §l§eTutorial§r ] ${text}`)
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
                .then(r => {
                    if (r.canceled || r.selection == 0) player.runCommand(`kick @s You're Banned`)
                })
        }
    }
}, 80)

system.runInterval(() => {
    world.getDimension(`overworld`).runCommand(`kick @a[tag=accessLocked] You have been banned from this server.`)
    console.warn(`Tried to kick players.`)
}, 500)

export async function startCutscene(player) {
    const me = player.name
    for (const player of world.getAllPlayers()) {

        system.run(() => player.runCommand('camera @s fade time 10 10 10'))
        system.run(() => player.runCommand(`title @s times 20 100 50`))
        system.run(() => player.runCommand(`hud @s hide all`))
        system.run(() => player.runCommand(`gamemode spectator`))
        system.run(() => player.runCommand(`inputpermission set @s movement disabled`))


        await waitTicks(400)
        system.run(() => {
            player.runCommand(`camera @s set minecraft:free pos -26 64.1 1946 rot -60 -30`)
            player.runCommand(`tp -26 64 1946`)
        })

        await typeTitleTitle(player, `SamuraiBread`, 3)
        await waitTicks(40)
        await typeTitleSubtitle(player, `presents:`, 3)
        await waitTicks(200)
        await typeActionbar(player, me, `Huh... My head hurts...`)
        system.run(() => {
            player.runCommand('camera @s fade time 5 5 5')
        })
        await waitTicks(100)
        await typeActionbar(player, '§d???', `Wake up..`)
        await waitTicks(20)
        await typeActionbar(player, me, `Huh..? A female voice...?`)
        await waitTicks(20)
        await typeActionbar(player, me, `Who was she... I dont remember..`)
        system.run(() => {
            player.runCommand('camera @s fade time 5 5 5')
        })
        await waitTicks(100)
        await typeActionbar(player, '§d???', `Wake up, please...`)
        await waitTicks(40)
        await typeActionbar(player, me, `Her voice.. It was filled with grief...?`)
        system.run(() => {
            player.runCommand('camera @s fade time 5 5 5')
            player.runCommand(`playsound hsmp_music.prologue_start @s ~ ~ ~ 0.5 1 1`)
        })
        await waitTicks(100)
        await typeActionbar(player, '§d???', `I'm begging you, i can't do it without you...`)
        await waitTicks(40)
        await typeActionbar(player, me, `I'm sorry, but i can't remember...`)
        system.run(() => {
            player.runCommand('camera @s fade time 5 5 5')
        })
        await waitTicks(100)
        await typeActionbar(player, "§d???", `We were meant to escape together... PLASE!`)
        await waitTicks(20)
        await typeActionbar(player, me, `Escape... Together...? Who was she? Where am I?`)
        await waitTicks(20)
        await typeActionbar(player, me, `Why i can't remember anything..?`)
        system.run(() => {
            player.runCommand('camera @s set minecraft:free ease 5 in_out_sine pos ~ ~1.75 ~ rot ~ ~')
        })

        await waitTicks(100)
        system.run(() => {
            player.runCommand('camera @s clear')
            player.runCommand(`gamemode s`)
            player.runCommand(`inputpermission set @s movement enabled`)

        })

        await waitTicks(40)
        await typeActionbar(player, me, `City?`)
        await waitTicks(20)
        await typeActionbar(player, me, `I need to ask someone where even am i..`)
        await waitTicks(20)
        await typeActionbar(player, me, `Who even am i..? Ah.. right. ${player.name}.`)
        await waitTicks(20)
        await typeActionbar(player, me, `Why have i come to remember only my name?
What is going on..?`)
        await waitTicks(20)
        await typeActionbar(player, me, `Focus ${player.name}, focus. Maybe there is a tavern somewhere in the city?`)
        await typeTitleTitle(player, hiraethLOGO, 3)

        system.run(() => {
            player.sendMessage(`
[ §eQUEST§r ]
§a§lFinally Awoken§r

Find the §etavern§r, and ask the §dtavern keeper§r about the §acity§r.

Rewards:
- 5,000.00\$
- "Finally Awoken" Achievement
- HUD Unlock`)
            player.addTag(questRegistry.questInfo.fawoken.tag)
        })

        await waitTicks(100)
        system.run(() => {
            player.sendMessage(`[ TIP ] You can check your quests anytime you want!

Simply open your menu with /hmenu or withing quick action menu /qa with selecting HSMP Menu, then click on QUESTS button.

You will see the goal, description and rewards upon completion.`)
            player.runCommand(`playsound random.orb @s`)
        })
        await waitTicks(60)
        await typeActionbar(player, me, `Ugh... My head hurts so much.`)
        await waitTicks(100)
        await typeActionbar(player, me, `It will be a good idea to also ask someone to heal my headache.`)



    }
}
