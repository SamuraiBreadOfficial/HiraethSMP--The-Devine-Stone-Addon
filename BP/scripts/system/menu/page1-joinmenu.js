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

export function tutorial_1(player) {
    player.sendMessage(`[ §b§lTUTORIAL§r ] §eGreat!`)
    player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    system.runTimeout(() => {
        player.sendMessage(`[§b§lTUTORIAL§r] §eWelcome to §d§lHiraethSMP!`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    }, 40)
    system.runTimeout(() => {
        player.sendMessage(`[ §b§lTUTORIAL§r ] §eThis §lTutorial§r§e will show you the basic §dcommands §r§eand §a§lfeautures§r§e of §dHiraethSMP`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    })
    system.runTimeout(() => {
        player.sendMessage(`[§b§lTUTORIAL§r] §eBut first, §blet's show you around! §eShall we?`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    }, 140)

    system.runTimeout(() => {
        player.runCommand('camera @s set minecraft:free ease 1 in_out_sine pos 224 89 1950 facing 223 71 1973')
        player.runCommand(`hud @s hide all`)
    }, 240)

    system.runTimeout(() => {
        player.sendMessage('[ §b§lTUTORIAL§r ] §eThis is a §l§aTavern§r§e! Here, players meet each others, gain §lQUESTS§r§e or meet before events. This place is the §dheart of entire server.')
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    }, 340)

    system.runTimeout(() => {
        player.runCommand(`camera @s set minecraft:free ease 5 in_out_sine pos 218 75 1985 facing 214 71 1985`)
    }, 440)

    system.runTimeout(() => {
        player.sendMessage(`[ §b§lTUTORIAL§r ] §eThis is §lAdam§r§e. An NPC who is here to help! Or give you a drink.
        
He sells alcohol drinks. Such as §lBeers, Vodka, Wine and simple Drinks§r§e. But he also can help you with §dnewest information about the server!`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)
    }, 540)

    system.runTimeout(() => {
        player.sendMessage(`[ §b§lTUTORIAL§r ] §eTo speak to him, simply click the §lSERVICE BELL§r§e and he will be here to help yuh!... §oOr make you drunk.`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)
    }, 640)

    system.runTimeout(() => {
        player.runCommand(`camera @s set minecraft:free ease 2 in_out_sine pos 207 100 1990 facing 207 78 1931`)
    }, 740)

    system.runTimeout(() => {
        player.sendMessage(`[ §b§lTUTORIAL§r ] §eThis is a §lchurch§r§e!

Here you can view your §amagic level§r§e, or learn new magic types!`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)
    }, 840)

    system.runTimeout(() => {
        player.runCommand(`camera @s set minecraft:free ease 2 in_out_circ pos 207 72 1908 facing 207 68 1904`)
    }, 940)

    system.runTimeout(() => {
        player.sendMessage(`[ §b§lTUTORIAL§r ] §eMagic depends fully on §lScoreboard named MAGIC_EXP§r§e.
        
To learn new spells and make them more powerfull, you need to gain special items to make your exp go up.

Items such us:
- Nether Star: 2k EXP
- Lost One Soul: 500 EXP
- Sculc ShardL 1k EXP
- Sculk Cayalyst: 2k EXP`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    }, 1040)

    system.runTimeout(() => {
        player.sendMessage(`[ §b§lTUTORIAL§r ] §e§lAll levels have their own EXP limit§r§e.

- Level 0: 0EXP
- Level 1: 1k EXP
- Level 2: 2k EXP
- Level 3: 3.5k EXP
- Level 4: 5k EXP
- Level 5: 10k EXP

Level 5 is the maximum given magic category level. §lThere are no plans to make more levels.`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    }, 1140)

    system.runTimeout(() => {
        player.sendMessage(`[§b§lTUTORIAL§r] §eYou can check your §aMagic Level§r§e by click this block. It is the only way to check or unlock your skills.`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    }, 1240)

    system.runTimeout(() => {
        player.runCommand(`camera @s set minecraft:free ease 5 in_out_sine pos 194 98 1850 rot 30 180`)
    }, 1340)

    system.runTimeout(() => {
        player.sendMessage(`[ §b§lTUTORIAL§r ] §eOn the server, we have an §lFAST TRAVEL§r§e.
You can swim out to the unknown with just a one §lclick of a button§r§e!
Sometimes, In diffrent events, this feauture is §llocked.`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    }, 1450)

    system.runTimeout(() => {
        player.runCommand('camera @s set minecraft:free ease 5 in_out_sine pos 194 98 1850 rot 40 -30')
    }, 1540)

    system.runTimeout(() => {
        player.sendMessage(`[ §b§lTUTORIAL§r ] §eYou can use §lFast Travel§r§e in builds like this!
        
To see where those builds are, you can simply type §a§o/fasttravel§r§ein your chat, and know where you are. It will give you all Fast Travel building positions in the world. §lJust go to the nearest one.`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    }, 1640)

    system.runTimeout(() => {
        player.sendMessage(`[ §b§lTUTORIAL§r ] §eThat's it for now!
You can reopen this tutorial in your menu by typing §l§a/hmenu or /hsmp:hmenu§r§e in your commands!
This tutorial will change with versions, so it's important to revisit it from time to time.
§c§l/!\ Important! To view tutorial you need to be in the town! Otherwise it will not work.§r§e 

Thanks, and Enjoy our little server! - §dSamuraiBread (Owner of HSMP)`)
        player.runCommand(`playsound random.click @s ~ ~ ~ 1 2 1000`)

    }, 1740)

    system.runTimeout(() => {
        player.runCommand(`camera @s fade time 3 5 3`)
    }, 1840)

    system.runTimeout(() => {
        player.runCommand(`camera @s clear`)
        player.runCommand(`hud @s reset`)
    }, 1920)









}