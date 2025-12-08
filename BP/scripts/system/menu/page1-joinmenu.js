console.warn("§d[HIRAETH]§r Loading scripts/system/menu/page1-joinmenu.js");

import { ActionFormData } from "@minecraft/server-ui";
import { system, world, HudVisibility, InputPermissionCategory, GameMode } from "@minecraft/server";

import { questRegistry } from "./../quests/main/core.js"

export const tag_human = 'race_human';
export const tag_elf = 'race_elf';
export const tag_half_orc = 'race_half_orc';
export const tag_demon = 'race_tanarri';

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
        .header(`Hello!`)
        .divider()
        .label(`▪{ Hello §e${player.name}!§r§f }▪`)
        .label(`Welcome to §l§dHiraeth!§r And Story-Based, Game-like server with story being told via Main Quests rather than events.
▪
You can read about the server, story and what it's offering below. If you're not interested, you can skip to clicking "§2§lPLAY§r" button!`)
        .divider()
        .label(`====[ §lSTART YOUR JOURNEY!§r ]====`)
        .button(`§l§2PLAY`)
        .divider()
        .label(`=========[ §lREAD  MORE§r ]=========`)
        .divider()
        .label(`
As stated above, addon and Realm itself is based on a Story, which is being told via our Quest System!
        
▪ Important stuff you need to know:

▪▪ What are Quests?
> Quests are our way of telling a story, and profiting from exploring the world!

▪▪ How can I begin?
> Click the "§2§lPLAY§r" button.
> Setup your race, gender, skill type.
> Accept CW and Rules
> Enjoy the cutscene, next steps will always be listed under §o§8/hmenu§r -> §o§8quests§r section 

▪▪ What if i will encounter a problem/bug?
> Go into our Discord Server and 

▪▪ What is the story about?
> The story is about you. 
You woke up in the wheat fields, not remembering anything.
The world seemed fantasy, but to the point of you discovering a harsh truth,
of what it was before, and what caused something horrible. Good luck.
`)
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
        .header('▪{ Races }▪')
        .label(`▪ §lWhat are Races?§r

§eRaces§r are our way to make the story a §olittle§r more interesting.

With their §apros§r and §ccons§r you will need to adapt based on what you choose.

▪§l Story§r
Races were around the world for thousands of years. In the past living alongside Other.
Although there are still plenty of it, including Humans, Elves, Half Orcs and Tanar'ri,
Most of them were wiped out by the first §cCortex*§r.

* Cortex -> An Global catastrophe cause by an unknown element to you. You will unlock this knowledge very soon.

▪ §lLegend§r

▪▪ HP - Health Point ( 2 = Heart )
▪▪ mU - Mana Unit ( 2 = Lightning )
▪▪ HXP - Hiraeth Experience Points`)
        .divider()
        .header('§lHUMAN')
        .label(`
▪ §lStatistics

▪▪ HP: 20;
▪▪ mU - 20;
▪▪ HXP Bonus - -20%% Level Up Price; 
▪▪ Difficulty -§e Medium§r

▪ §lStory§r

Humans were the first race to appear on Hiri. Although physically weak, they survived a cataclysm that nearly erased civilization and set their progress back for millennia.

To this day, humans actively fight Darkshard*¹ to prove that life stands above death.
They do not act only for themselves, they try to prevent future disasters, even when others refuse to be saved.
However, like every race, they carry both good and evil within them.

A large group of humans fled toward the ocean in fear and discovered the Threeclover Islands, a massive landmass divided into three major islands and one smaller central island dominated by a volcano known as Mt. Ethernis.

There they built a new civilization. A single city.
For many years, the land itself kept Darkshard away.
Long enough for people to forget what had happened.
Long enough to forget their lost homeland — a world that no longer exists.

They lived in peace.
Until Dark Rain*² fell.

Most of the population was infected.

In panic, the king ordered everyone who had been outside the city walls at that moment to be burned alive.

Some escaped.

Those survivors formed a new faction: the Scrap Seekers.

In order to survive, they attack people who wander beyond the city borders, stripping them of supplies, fully aware that every death may cause another catastrophe.

Darkshard*¹ - an energy based "seed" which infects people. You will get more knowledge about this soon.
Dark rain*² - Deadly rain, which causes Darkshard Infection and rotting. You will get more knowledge about this soon.

▪ §a§lPros§r

▪▪ §lTechnical Advantage:§r Humans, naturally a race that discovers is able to create helpfull items to fight not only entities, but world itself by using collected Mroth samples.
▪▪ §lDanergy Knowledge:§r Their Knowledge Notepad's "Dark Shattering" section is written in 50%%. Although some definitions still needs to be found
▪▪ §lArtificial Artifacts:§r Artifacts are more powerfull due to technical knowledge.

▪ §c§lCons§r
▪▪ §lNon Magical:§r They cannot use Skills that require more mU.
▪▪ §lMain Target§r: Scrap seekers are more aggressive to them.
▪▪ §lMroth's Favourite Snack§r: Mroths will seek them for longer amount of time.
        `)
        .button('§lBECOME HUMAN')
        .divider()
        .header('§a§lELF')
        .divider()
        .label(`
▪ §lStatistics

▪▪ HP: 26;
▪▪ mU - 50-120 (Based on Random Chance);
▪▪ HXP Bonus - -10%% Level Up Price; 
▪▪ Difficulty - §aEasy§r

▪ §lStory§r

Elves are the second longest-living race after Humans.
They are antisocial, and this trait helped them survive the “Cataclysm 0”.
When everything went down the drain, elves were the ones who got a straight knife in their backs. Due to their mU, they were not allowed to join the Human Exodus, and this forced them to adapt to a new, darker reality.

The ruins of cities became their homes, and encounters with Seeker Mroths were a daily occurrence. Most of them died after the catastrophe, mainly due to the many later Cortexes caused by a domino effect.
Because of that, they developed a skill to be less detectable by Mroths by performing special movements when they hear nearby Mroths.

Only 50 years ago, they arrived in Threeclover, and to their surprise, they were allowed to enter the city of Sylvii. Their journey was not easy.

From the east of Threeclover’s southern land, they had to traverse the desert, which is mostly populated by Scrap Seekers. Many of them did not survive encounters with this faction.

Most of them were kidnapped or had their ears harvested by Scrap Seekers, which caused hearing loss and death by Mroths.
When they finally appeared in Sylvii, they were met with kindness, although some people were still not very kind to them.

▪ §a§lPros§r

▪▪ §lQuiet Steps:§r Mroth detecting distance is smaller.
▪▪ §lQuiet Breath:§r Mroth's Seek Area gives 1 point to mrothDangerLevel rather than 5. 
▪▪ §lEagle Eyes:§r Upon aiming a bow, their FOV is automatically set to 30.
▪▪ §lNight Seekers:§r At night, they automatically get NightVision effect

▪ §c§lCons§r
▪▪ §lAwful History:§r The presence of Mroths gives them Paranoya.
▪▪ §lValueble Ears§r: Their ears are great jewlery for Scrap Seekers (If caught by Scrap Seekers, they are deaf untill they die or respawn.).
▪▪ §lUnwanted§r: Some NPCs might not talk to them, or even ask them to leave.

        `)
        .button("§q§lBECOME ELF")
        .divider()
        .header('§v§lHALF-ORC')
        .divider()
        .label(`
▪ §lStatistics

▪▪ HP: 40;
▪▪ mU - 15 (Based on Random Chance);
▪▪ HXP Bonus - -5%% Level Up Price; 
▪▪ Difficulty - §cHard§r

▪ §lStory§r

Half Orcs although decendends of now died out race: Orcs, are the youngest race on the world.
Reaching age of nearly three thousands of years, this race is a hybrid of humans and orcs. 
Upon the beggining of the world that we live right now in, this race were backstabbed by nearly all races. Being exiled from Human Exodus, and Elve's safe spot in city ruins, They were forced to adapt a nomad style of living.
Wondering around the ruins for nearly 120 years. They arrived on the Threeclover nearly 20 years ago.

Their wanders were filled with challenges they needed to traverse. From fighting of Scrap Seekers to the point of being known as Dustmans, to nearly loosing all numbers while reaching Mroth's territory due to their weight.
But they were accepted into Sylvii instantly, as they are great people to have, when scrap seekers will try to attack an delivery.

▪ §a§lPros§r

▪▪ §lUnwanted by Trash:§r Scrap Seekers are less likely to detect them.
▪▪ §lAwful by Nature:§r Story bad pathing is less likely to happen. 
▪▪ §lGymrat:§r Is strong by nature.
▪▪ §lWeaponry Master:§r His weapons deal more damage than normal.
▪▪ §lManaless§r: Their mU makes them less likely to trigger ZAPAD upon death.).


▪ §c§lCons§r
▪▪ §lMuscle Weight:§r Thir weight makes Mroths detect them faster and for longer distance.
▪▪ §lManaless§r: They cannot use Skills that are mU based.
▪▪ §lWeak Energy§r: If too close to mroth, Danergy will rip their body apart.

`)
        .button('§v§lBECOME HALF-ORC')
        .divider()
        .header(`§m§lTANAR'RI`)
        .divider()
        .label(`
        ▪ §lStatistics

▪▪ HP: 35;
▪▪ mU - 150 (Based on Random Chance);
▪▪ HXP Bonus - 0%% Level Up Price; 
▪▪ Difficulty - §mExtremely Hard§r

▪ §lStory§r

Tanar'ri is a demonic race, created by Human Mages to be used in wars. They were created 5k years ago, and altough only as a tool, they rebelled against humans in the past.
When they got their own place in the world, they were a symphony civilazation, but was always called as "Plastic Race".
When "Catastrophe 0" happened, they were almost in the verge of dying out. From 2 millions, only 1 thousands were left, as the pure energy of Cortex, made their bodies explode even when no near the center.

After the fall, they were hiding. Too afraid to go outside, they were forced to live in the dark, cold caves, basements, left-over bunkers.
Even though strongly magical, they were no use in Sylvi, and last of their race member died. 60 years ago. Well, that's what we thought, untill you showed up.

▪ §a§lPros§r

▪▪ §lPure Mana:§r Can use skills with less mana usage.
▪▪ §lFire Nature:§r Resitant to fire. 
▪▪ §lDemonic-like:§r Skills based on Mana are more powerfull by default.
▪▪ §lPyroman:§r Scrap Seekers are afraid to approach them by their own.
▪▪ §lDanergy Resistant§r: Their energy is too powerfull for Dark Shard to infect them.


▪ §c§lCons§r
▪▪ §lSpecial Treat:§r Mroths are faster to detect them, although range is the same as for humans.
▪▪ §lScrap Seekers' Wanted§r: If detected by Scrap Seekers, more Seekers will aproach and death by them means that area where they died will be more dangerous to other races.
▪▪ §lKillfall§r: If no special Dark Rain resitant armour is worn, dark rain deals 2x damage (4hp per 5sec).

        `)
        .button(`§m§lBECOME TANAR'RI`)
        .show(player)
        .then(res => {
            const selection = res.selection

            if (res.canceled) joinMenu_START;

            if (selection == 0) {
                player.addTag(`race_human`)
                joinMenu_RACECONFIRM(player)
            }

            if (selection == 1) {
                player.addTag('race_elf')
                joinMenu_RACECONFIRM(player)
            }

            if (selection == 2) {
                player.addTag('race_half_orc')
                joinMenu_RACECONFIRM(player)
            }

            if (selection == 3) {
                player.addTag('race_tanarri')
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

            if (res.canceled || selection == 1) {
                player.removeTag(`race_human`)
                player.removeTag('race_elf')
                player.removeTag('race_half_orc')
                player.removeTag('race_tanarri')
                joinMenu_RACE(player)
            }

            if (selection == 0) genderSelection(player);


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
        .label(`/!\ §l§cWarning!§r

This Private Whitelist-only Realm contains mature themes and intense content designed for players 16+ and may be disturbing or triggering. Topics include, but are not limited to: 
▪ Infection and body corruption; 
▪ Human cruelty, persecution, and abuse; 
▪ Torture and mutilation; 
▪ Psychological horror, paranoia, and trauma; 
▪ Massive, dangerous entities (may trigger megalophobia); 
▪ Strong language and offensive content; 
▪ Suicide and self-harm references; 

By clicking Continue, you confirm that you understand and accept these themes. Requests to remove or censor such content will be ignored.`)
        .button(`§l§2CONTINUE`)
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
3) Click Help button to create a ticket;
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
        .header(`General`)
        .label(`p1.1 Follow Discord TOS, which can be found here.
p1.2 Breaking major rules will result in immediate punishment without warning.
p1.3 By joining the server, you confirm that you are 16 years old or older. If it is detected otherwise, you will be banned for the amount of time remaining until you reach the required age.
p1.4 Staff Members, regardless of their rank, are considered correct in most cases. If you believe a Staff Member is wrong, do not hesitate to speak up — you are protected under the rule below.
p1.5 Pointing out Staff Members' mistakes or inappropriate behaviour does not give them a valid reason to punish you, as long as no rule was broken.`)
        .divider()
        .header(`Community`)
        .label(`
p2.1 Do not spam or flood the channels.
p2.2 Slurs are allowed, but do not overuse them.
p2.3 Brainrot is allowed, but excessive use will not be tolerated.
p2.4 AI-generated content is not allowed on the server.
p2.5 Harassment or bullying will not be tolerated.
p2.6 Be mature and treat others how you would like to be treated. Masochists not included lol.
p2.7 Do not ask for Staff Roles.
p2.8 No NSFW content in any channels.
p2.9 Avoid political, religious, or other sensitive topics that may start arguments.
p2.10 Do not advertise your server in Server Channels or on the MC:BE Realm unless permitted.
p2.11 Do not advertise websites or projects that promote:

▪ Cheats
▪ Illegal activities
▪ Harmful behaviour
▪ Any topics harmful to communities of any kind

p2.12 Use English only on the server.
p2.13 In VC, keep your voice at a comfortable volume.
p2.14 Do not overuse the soundboard in VC.
p2.15 Do not blast music in VC unless the majority agrees.
p2.16 Trolling or recording others in VC is not allowed unless everyone has been informed.`)
        .divider()
        .header(`Minecraft`)
        .label(`
p3.1 No griefing.
p3.2 No cheating.
p3.3 No exploiting in-game bugs.
p3.4 No offensive or inappropriate builds.
p3.5 Avoid lag-inducing builds.
p3.6 Follow staff instructions.
p3.7 Use common sense; if unsure, ask.
p3.8 PvP is allowed only when both players are from PvP-focused factions.
p3.9 PvP inside bases is not allowed, unless the base owner explicitly allows it.
p3.10 Entering someone’s base without permission may be considered provocation.
p3.11 Points §3.9 and §3.10 apply to both PvP and PvE-focused factions.
p3.12 Follow all cutscenes as intended. Do not use the cutscene timeout to troll or obstruct quest progression. Violating this rule will result in permanent removal of your Realm access.
p3.13 Intentionally leaving the Realm after triggering a cutscene to block an area will be treated as a direct violation of §3.12.
p3.14 Points §3.12 and §3.13 do not apply if the reason for leaving the Realm is due to WiFi or connectivity issues. If this occurs and you are unable to rejoin, you must immediately open a ticket. Failure to do so will result in being treated as a player who violated the rules stated in this section. Within the ticket, you must provide accurate information for the following points. If the information is fabricated or clearly false, the ticket will also be treated as lying to staff members.
`)
        .button('ACCEPT')
        .label(`§c§l’/!\\ THIS OPTION WILL LOCK YOUR SERVER ACCESS!`)
        .button(`§l§cLEAVE THE SERVER`)
        .show(player)

    if (r.canceled || r.selection == 1) lockAccess(player);

    if (r.selection == 0) {
        startCutscene(player)
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
    const unknown = `§dFemale Voice§r`

    for (const player of world.getPlayers()) {
        system.run(async () => {
            player.camera.fade({
                fadeTime: {
                    fadeInTime: 5,
                    fadeOutTime: 5,
                    holdTime: 10
                }
            })
            await waitTicks(200)
            player.onScreenDisplay.setTitle(`SamuraiBread`, {
                fadeInDuration: 20,
                fadeOutDuration: 20,
                stayDuration: 150,
                subtitle: `Presents:`
            })
            player.playMusic(`hsmp_music.prologue_start`, {
                fade: 3,
                loop: false,
                volume: 1
            })
            player.teleport({ x: -1868, y: 173, z: -2833 }, { rotation: { y: -130, x: 10 } })
            // 16s
            await waitTicks(320)
            player.sendMessage(`1`)
            player.teleport({ x: -1972, y: 78.5, z: -2606 }, { rotation: { y: -110, x: -10 } })
            // 21s
            await waitTicks(100)
            player.sendMessage(`2`)
            player.onScreenDisplay.setTitle(`Story`, {
                fadeInDuration: 5,
                fadeOutDuration: 10,
                stayDuration: 100,
                subtitle: `Written by:`
            })
            // 28s
            await waitTicks(140)
            player.sendMessage(`3`)
            player.onScreenDisplay.setTitle(`SamuraiBread`, {
                fadeInDuration: 5,
                fadeOutDuration: 10,
                stayDuration: 100
            })


            // 36s
            await waitTicks(160)
            player.sendMessage(`4`)
            player.teleport({ x: -2324, y: 143, z: -2223 }, { rotation: { y: 60, x: 0 } })

            // 43s
            await waitTicks(140)
            player.sendMessage(`5`)
            player.onScreenDisplay.setTitle(`Addon`, {
                fadeInDuration: 5,
                fadeOutDuration: 10,
                stayDuration: 100,
                subtitle: `by:`
            })

            // 48s
            await waitTicks(100)
            player.sendMessage(`6`)
            player.onScreenDisplay.setTitle(`SamuraiBread`, {
                fadeInDuration: 5,
                fadeOutDuration: 10,
                stayDuration: 100
            })


            // 52s
            await waitTicks(80)
            player.sendMessage(`7`)
            player.teleport({ x: -2387, y: 112, z: -1863 }, { rotation: { y: 110, x: -30 } })

            // 56s
            await waitTicks(80)
            player.sendMessage(`8`)
            player.onScreenDisplay.setTitle(`Tested`, {
                fadeInDuration: 5,
                fadeOutDuration: 10,
                stayDuration: 100,
                subtitle: `by:`
            })


            // 63s
            await waitTicks(140)
            player.sendMessage(`9`)
            player.onScreenDisplay.setTitle(` `, {
                fadeInDuration: 5,
                fadeOutDuration: 10,
                stayDuration: 100,
                subtitle: `ShadowTheBloodWolf\nAkuCrestfallen\nSrbajlLuka`
            })


            // 65s
            await waitTicks(40)
            player.sendMessage(`10`)
            player.teleport({ x: -2376, y: 176, z: -2396 }, { rotation: { y: 140, x: 0 } })

            // 69s
            await waitTicks(80)
            player.sendMessage(`11`)

            // 75s
            await waitTicks(120)
            player.sendMessage(`12`)

            // 82s
            await waitTicks(140)
            player.sendMessage(`12`)
            player.teleport({ x: -2431, y: 163, z: -2106 }, { rotation: { y: 0, x: -20 } })

            // 90s
            await waitTicks(160)
            player.sendMessage(`12`)
            player.onScreenDisplay.setTitle(`StoreKeepers`, {
                fadeInDuration: 5,
                fadeOutDuration: 5,
                stayDuration: 100,
                subtitle: `Voice Actors:`
            })


            // 97s
            await waitTicks(140)
            player.sendMessage(`12`)
            player.onScreenDisplay.setTitle(``, {
                fadeInDuration: 5,
                fadeOutDuration: 5,
                stayDuration: 100,
                subtitle: `MINI\nSrbajlLuka\nSamuraiBread\nSkullcrusher`
            })


            // 100s
            await waitTicks(60)
            player.sendMessage(`12`)
            player.teleport({ x: -2774, y: 199, z: -2122 }, { rotation: { y: 60, x: 20 } })

            // 102s
            await waitTicks(40)
            player.sendMessage(`12`)

            // 104s
            await waitTicks(40)
            player.sendMessage(`12`)

            // 112s
            await waitTicks(160)
            player.sendMessage(`12`)

            // 116s
            await waitTicks(80)
            player.sendMessage(`12`)

            // 120s
            await waitTicks(80)
            player.sendMessage(`12`)

            // 124s
            await waitTicks(80)
            player.sendMessage(`12`)
            player.teleport({ x: 652, y: 159, z: 1788 }, { rotation: { y: 0, x: 20 } })

            // 132s
            await waitTicks(160)
            player.sendMessage(`12`)

            // 139s
            await waitTicks(140)
            player.sendMessage(`12`)

            // 144s
            await waitTicks(100)
            player.sendMessage(`12`)
            player.teleport({ x: 1231, y: 121, z: 3250 }, { rotation: { y: -120, x: -10 } })

            // 148s
            await waitTicks(80)
            player.sendMessage(`12`)

            // 151s
            await waitTicks(60)
            player.sendMessage(`12`)

            // 157s
            await waitTicks(120)
            player.sendMessage(`12`)
            player.teleport({ x: 2659, y: 196, z: 561 }, { rotation: { y: -110, x: 20 } })
            // 162s
            await waitTicks(100)
            player.sendMessage(`12`)

            // 165s
            await waitTicks(60)
            player.sendMessage(`12`)

            // 170s
            await waitTicks(100)
            player.sendMessage(`12`)
            player.runCommand(`music stop 10`)
            player.camera.fade({
                fadeTime: {
                    fadeInTime: 10,
                    holdTime: 10,
                    fadeOutTime: 10
                }
            })
            await waitTicks(200)
            await typeTitleTitle(player, `§l§dHiraethSMP`, 4, "random.click", 0.5)
            await typeTitleSubtitle(player, `§oThe Shattering`, 4, "random.click", 0.5)

            player.addTag(`blackScreen`)
            player.teleport({ x: -26, y: 64, z: 1946 })

            await waitTicks(200)
            await typeActionbar(player, unknown, `No. . .`)
            await waitTicks(60)
            await typeActionbar(player, unknown, `${me}..?`)
            await waitTicks(60)
            await typeActionbar(player, unknown, `Wake up.. Please!`)
            await waitTicks(60)
            await typeActionbar(player, unknown, `I'm begging you, ${me}!`)
            await waitTicks(60)
            await typeActionbar(player, unknown, `We can't do it without you!`)
            await waitTicks(60)
            await typeActionbar(player, unknown, `Wake up!`)
            await waitTicks(60)
            await typeTitleTitle(player, `WAKE UP!`)
            player.removeTag(`blackScreen`)
            await waitTicks(60)
            await typeActionbar(player, me, `Ughh. My head..`)
            await waitTicks(30)
            await typeActionbar(player, me, `What a weird dream. . .`)
            await waitTicks(60)
            await typeActionbar(player, me, `Wait. Where am I?`)
            await waitTicks(20)
            await typeActionbar(player, me, `. . .`)
            await waitTicks(20)

            await typeActionbar(player, me, `What the hell happened?`)
            await waitTicks(20)

            await typeActionbar(player, me, `Why i don't remember anything?`)
            await waitTicks(20)

            await typeActionbar(player, me, `. . .`)
            await waitTicks(20)

            await typeActionbar(player, me, `Ughh.. There's a city.. I should check it out\nand maybe ask someone something about this place...`)
            await waitTicks(20)

        })
    }
}


system.runInterval(async () => {
    for (const p of world.getPlayers()) {
        if (p.hasTag(`blackScreen`)) {
            p.camera.fade({
                fadeTime: {
                    holdTime: 10,
                    fadeInTime: 0,
                    fadeOutTime: 10
                }
            })
        }
    }
}, 200)
