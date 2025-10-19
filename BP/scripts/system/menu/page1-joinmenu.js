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
    player.sendMessage(`
§l§e[ TUTORIAL ]§r
Great! Welcome to HiraethSMP!`)

    system.runTimeout(() => {
        player.sendMessage(`§l§e[ TUTORIAL ]§r
§lNote:§r The tutorial will show Menus. So no rush to read it quicker.
    
Everytime you click §e§lCONTINUE§r, new tutorial step will show up :)`)
    }, 40)

    system.runTimeout(() => {
        tutorial_1_menu(player)
    }, 160)
}

function tutorial_1_menu(player) {
    return new ActionFormData()
        .title(`§l§e[ TUTORIAL ]§r`)
        .body(`Are you ready to Continue?`)
        .divider()
        .button(`§lYES`)
        .button(`§lCANCEL`)
        .show(player)
        .then(r => {
            if (r.canceled) return;

            if (r.selection == 0) {
                player.sendMessage(`yes`)
                tutorial_2(player)
                return;
            }

            if (r.selection == 1) {
                player.sendMessage(`Canceled`)
                return;
            }
        })
}

function tutorial_2(player) {
    player.sendMessage(`
§l§e[ TUTORIAL ]§r
Alright! So First step is §a§oshowing you around!`)

    system.runTimeout(() => {
        player.sendMessage(`
§l§e[ TUTORIAL ]§r
But first, let's §cdisable your movement§r and make you §ainvincible§r so we can Continue with the §aCutscene§r ;P`)
        player.runCommand(`gamemode spectator`)
    }, 40)

    system.runTimeout(() => {
        player.sendMessage(`§l§e[ TUTORIAL ]§r
Alright! All set and ready to go!`)
    }, 80)

    system.runTimeout(() => {
        player.sendMessage(`
§c§l[ CONTENT WARNING ]§r
Server might contain: §l§cBlood, Gore, Slurs, Toxic and Mature topics§r.

Whole server is built around §e16+ Community§r. Before Events, all those §ccontent warnings§r for the event will be §llisted in the Event Description§r.
§l§cPlayer Discretion is Advised.§r`)
    }, 160)

    system.runTimeout(() => {
        tutorial_2_menu(player)
    }, 260)
}

function tutorial_2_menu(player) {
    return new ActionFormData()
        .title(`§l§c[ CONTENT WARNING ]`)
        .body(`Server might contain: §cBlood, Gore, Slurs, Toxic and Mature topics§r.

Whole server is built around §e16+ Community§r. Before Events, all those §ccontent warnings§r for the event will be listed in the §aEvent Description§r.
§lPlayer Discretion is Advised§r.`)
        .divider()
        .label(`§§cI agree that clicking §aCONTINUE§c will confirm that i'm §e16 or more years old§c and i aknowledge that server contains §4mature themes§c which i will be warned about.`)
        .button(`CONTINUE`)
        .button(`Cancel And Leave the Server.`)
        .show(player)
        .then(r => {
            if (r.canceled) {
                player.sendMessage(`§e§l[ SYSTEM ]§r
§4You disagreed with the content warning.

Your server access has been revoked.

If you believe it's a mistake, contact our staff team on our server.`)
                player.addTag(`revokedAccess`)

                system.runTimeout(() => {
                    player.runCommand('kick @s Access Revoked.')
                }, 260)
            }

            if (r.selection == 0) {
                player.sendMessage(`Yes`)
                tutorial_3(player)
            }

            if (r.selection == 1) {
                player.sendMessage(`
§e§l[ SYSTEM ]§r
§4You disagreed with the content warning.

Your server access has been revoked.

If you believe it's a mistake, contact our staff team on our server.`)
                player.addTag(`revokedAccess`)
                system.runTimeout(() => {
                    player.runCommand('kick @s Access Revoked.')
                }, 260)

            }
        })
}

function tutorial_3(player) {
    player.sendMessage(`
[ TUTORIAL ]
Alright NOW we can proceed. Tehee ^^
    `)

    system.runTimeout(() => {
        player.sendMessage(`
[ TURORIAL ]
Yeah... No. Never using "tehee" EVER again`)
    }, 160)

    system.runTimeout(() => {
        player.runCommand(`camera @s set minecraft:free ease 5 in_out_sine pos 221 85 1947 rot 30 0`)
    }, 250)

    system.runTimeout(() => {
        tutorial_tavern(player);
    }, 360)
}

function tutorial_tavern(player) {
    return new ActionFormData()
        .title(`THE TAVERN`)
        .body(`The Tavern is the Heart of the entire server.
        
Here, you can meet with your friends for an Roleplay, Buy Alkohol, Accept Quests, Collect Reward and meet with others when this place is labeled as an Event Meeting Point.`)
        .divider()
        .button(`Continue`)
        .show(player)
        .then(r => {
            if (r.canceled) {
                tutorial_tavern_2(player)
            }

            if (r.selection == 0) {
                tutorial_tavern_2(player)
            }
        })
}

function tutorial_tavern_2(player) {
    player.runCommand(`camera @s set minecraft:free ease 5 in_out_sine pos 223.90 68 1969 rot 0 0`)

    system.runTimeout(() => {
        return new ActionFormData()
            .title(`QUEST BOARD`)
            .body(`Quest board allows you to accept quests.
        
There are multiple types of quests:
1) Collect and Transport (C&T):
C&T quest require you to collect blocks, items or materials and transport them back to the tavern.
Those quests are least rewardable as the reward of those quests can wage from 200\$ to 500\$.

2) Hunt And Transport(H&T):
More rewardable Quests which require you to hunt down given amount of mobs.
The reward can wage from 899\$ to even 15k\$

3) Special Quests:
Those Quests are given by moderators, with special command. It can be a random quest, when people are online, or quest that has been prepared by an Admin.
The rewards can wage from: 5k to even 115k when done right. The more rewardable the more dangerous it is.`)
            .button(`CONTINUE`)
            .show(player)
            .then(r => {
                if (r.canceled) {
                    tuto_economy_1(player)
                }
                if (r.selection == 0) {
                    tuto_economy_1(player)
                }
            })
    }, 60)
}

function tuto_economy_1(player) {
    player.runCommand(`camera @s set minecraft:free ease 5 in_out_sine pos 193 90 1955 rot 30 0`)

    system.runTimeout(() => {
        return new ActionFormData()
            .title(`RESTARUANT`)
            .body(`Server Market from Alpha build is no more!
To make the Gameplay Immersive as much as possible, the only way you can buy stuff is now in this town's markets!

For example THE RESTAURANT.
This shop is the only way to use your money to buy food. This store has it's own unique Items which you can buy! For example:

Fire Cake which gives you Fire Immunity for 30 minutes!`)
            .button(`CONTINUE`)
            .show(player)
            .then(r => {
                if (r.canceled) {
                    tuto_economy_2(player)
                }

                if (r.selection == 0) {
                    tuto_economy_2(player)
                }
            })
    }, 60)
}

function tuto_economy_2(player) {
    player.runCommand(`camera @s set minecraft:free ease 5 in_out_sine pos 195 72.6 1972 rot 0 0`)

    system.runTimeout(() => {
        return new ActionFormData()
            .title(`ENTERING THE STORES`)
            .body(`To enter stores, you need to interact with special Blocks.

For example, this handle. Just use your interact button ( short click on mobile ) on the block to enter the store.`)
            .show(player)
            .then(r => {
                if (r.canceled) {
                    tuto_economy_3(player)
                }
                if (r.selection == 0) {
                    tuto_economy_3(player)
                }
            })
    })
}

function tuto_economy_3(player) {
    player.runCommand(`camera @s fade time 1 1 1`)

    system.runTimeout(() => {
        player.runCommand(`camera @s set minecraft:free pos 187 30 1974 rot 0 -90`)
    }, 20)

    system.runTimeout(() => {
        player.runCommand(`camera @s set minecraft:free ease 5 in_out_sine pos 204 30 1970 rot 0 180`)
    }, 30)

    system.runTimeout(() => {
        return new ActionFormData()
            .title(`BUYING THE PRODUCTS`)
            .body(`To buy a product, you need to enter the store and interact with the block.
        
Withing the Block's menu, you will have an dropdown option where you choose an item. Each item's Total Price* is described next to the item's name.
        
The normal price is the price without modifier. It is an Hard Coded price for the item which is used to count the value of the total price.

Total price is price + modifier, which allows the prices to change every day. Modifier changes every game day at 6:00.

Total Final Price is (Price + Modifier) * amount. If amount = 0, the Total Final Price is equal to Total Price.

The Items have their own Categories, and those categories have their own stores. This is the list of those stores and their open and close time:
1) Cooked Food: Restaurant 9:00 - 19:00
2) Raw food: Butcher 7:00 - 19:00 & Store 9:00 - 23:00 
3) Misc Food: Store 9:00 - 23:00
5) Stone Blocks: Stonemason 5:00 - 23:00
6) Wooden Blocks: Lumberjack 5:00 - 18:00
8) Special Block (Dimension Blocks): Witch's Tower 3:00 - 1:00
9) Spell Books: Witch's Tower 3:00 - 1:00
10) Alkohol Drinks: Tavern 24/7
11) Materials (Ores): Miner 5:00 - 20:00
12) Mob Loots: Guard Tower 24/7
13) Ores: Miner 5:00 - 20:00

Each store has it's unique open and close time, some of them are active 24/7. Use it to your advantage as every 100 buys the price is changed.`)
            .show(player)
    }, 60)
}