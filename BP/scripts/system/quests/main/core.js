console.warn("§d[HIRAETH]§r Loading scripts/system/quests/main/core.js");
import { world, system } from "@minecraft/server";
import { formatCurrency, textFormats, waitTicks, typeActionbar, typeTitleTitle, typeTitleSubtitle } from "../../../formats.js"

export const questRegistry = {

    questInfo: {
        sample: {
            // Name of the quest:
            name: `Test Quest`,
            // Tag name of the quest given if the quest is active 
            tag: "test",
            // Description of the quest
            description: `Test`,

            difficulty: `Test`,

            // Goal of the quest
            goal: `Test`,

            // Tag given when quest is finished
            finishTag: `none`,

            // Cash reward. REMEMBER! WE USE BIGGER NUMBERS DUE TO CASH FORMATTING! ex. 1234567890 -> 12,345,678.90$ 
            rewardCash: 0,

            // If true, the completion of the quest will give an achievement, REMEMBER TO REGISTER THE ACHIEVEMENT IN "scripts/system/achievements/core.js"!!!
            achivReward: true,

            // Name of the Achievement
            achivRewardName: `Test`,

            // If true, rewards from specialRewards.cat[nameFromSpecialType] will be give to the player.
            isSpecial: true,

            // Special type. [ safe | semisafe | moderate | hard | ehard | nightmare ]
            specialType: "safe",

            // If true, items registered in this.itemTable will be given to the player
            itemRewards: true, // False/True 

            // Object with item id and it's amount that is given to the player when finishing the quest. !!! LEAVE EMPTY IF NO ITEMS WILL BE GIVEN!
            itemTable: [
                { name: "TEST", id: "test", count: "1" },
                { name: "TEST", id: "test", count: "2" },
                { name: "TEST", id: "test", count: "3" },
                { name: "TEST", id: "test", count: "4" }
            ],

            // Do not touch
            allRewards() {
                const lines = [];

                // 💰 Cash reward
                if (this.rewardCash > 0) {
                    lines.push(`§aCash: §e${formatCurrency(this.rewardCash)}`);
                }

                // 🏆 Achievement
                if (this.achivReward === true && this.achivRewardName) {
                    lines.push(`\n§aAchievement: §e${this.achivRewardName}`);
                }

                // 📦 Normal items
                if (this.itemRewards === true && Array.isArray(this.itemTable)) {
                    const validItems = this.itemTable.filter(item => item?.id && item?.count);
                    if (validItems.length > 0) {
                        lines.push(`\n§6Items:`);
                        for (const item of validItems) {
                            lines.push(`§f- ${item.name} x${item.count}`);
                        }
                    }
                }

                // 🎁 Special items with chance
                const special = specialRewards[this.specialType];
                if (this.isSpecial === true && special?.itemTable?.length > 0) {
                    lines.push(`\n§l§eThis is a Special Quest ranked as: 
§f[ §r${this.specialType} §l]§e!§r

These types of quests offers:`);

                    // 🎲 Bonus chance
                    if (special.bonusChance > 0) {
                        lines.push(`\n§dBonus Cash Chance: §f${special.bonusChance}%%`);
                    }

                    // 💸 Bonus cash
                    if (special.bonusCash > 0) {
                        lines.push(`\n§dBonus Cash: §e${formatCurrency(special.bonusCash)}`);
                    }
                    lines.push(`\n§dItems:\n`)
                    for (const item of special.itemTable) {
                        if (item?.id && item?.count) {
                            const chance = item.chance ?? 100;
                            lines.push(`§f- ${item.id} x${item.count} §7(${chance}%%)`);
                        }
                    }

                }

                return lines.length > 0 ? lines.join("\n") : "§7No rewards available.";
            },
            // Also do not touch, it's fully modular and automatic.
            async onComplete(player) {
                await typeTitleTitle(player, `QUEST COMPLETED`)
                await typeTitleSubtitle(player, this.name)
                player.removeTag(this.tag)

                if (this.rewardCash > 0) {
                    world.scoreboard.getObjective(`cash`).addScore(player, this.rewardCash)
                    player.sendMessage(`[ QUEST ] Added ${formatCurrency(this.rewardCash)} to your cahs balance.`)
                }
                if (this.achivReward == true) {
                    player.setDynamicProperty(this.tag + "_date", Date.now());
                    player.addTag(this.finishTag)
                    world.sendMessage(`[ ACHIEVEMENT ] ${player.name} completed ${this.name} quest and got ${this.achivRewardName} achievement!`)

                }
                if (this.itemRewards == true) {
                    if (this.itemTable.length > 0) {
                        for (const itemID of this.itemTable) {
                            await player.runCommand(`give @s ${itemID.id} ${itemID.count}`)
                            await player.sendMessage(`[ §a§lQUEST§r ] §aYou've recieved §e${itemID.id} x${itemID.count}`)
                        }
                    }
                }

                if (this.isSpecial == true) {
                    if (specialRewards[this.specialType]?.itemTable.length > 0) {
                        for (const itemID of specialRewards[this.specialType]?.itemTable) {
                            await player.runCommand(`give @s ${itemID.id} ${itemID.count}`)
                            await player.sendMessage(`[ §a§lQUEST§r ] §aYou've recieved §e${itemID.id} x${itemID.count}`)
                        }
                    }

                }
            }

        },
        fawoken: {
            // Name of the quest:
            name: `PROLOGUE: Finally Awoken`,
            // Tag name of the quest given if the quest is active 
            tag: "quest_fawoken",
            // Description of the quest
            description: `You have awoken in the city which name you don't know. You don't even know how you got here. The only thing you rememver is your name and race. Weird thing huh?`,

            difficulty: `Safe`,

            // Goal of the quest
            goal: `Go to the local §eLocal Tavern§r§f and ask a storekeeper about this place.`,

            // Tag given when quest is finished
            finishTag: `achiv_fawoken`,
            // If true, the completion of the quest will give an achievement, REMEMBER TO REGISTER THE ACHIEVEMENT IN "scripts/system/achievements/core.js"!!!
            achivReward: true,

            // Name of the Achievement
            achivRewardName: `Finally Awoken!`,

            // Cash reward. REMEMBER! WE USE BIGGER NUMBERS DUE TO CASH FORMATTING! ex. 1234567890 -> 12,345,678.90$ 
            rewardCash: 500000,

            // If true, rewards from specialRewards.cat[nameFromSpecialType] will be give to the player.
            isSpecial: false,

            // Special type. [ safe | semisafe | moderate | hard | ehard | nightmare ]
            specialType: null,

            // If true, items registered in this.itemTable will be given to the player
            itemRewards: true, // False/True 

            // Object with item id and it's amount that is given to the player when finishing the quest. !!! LEAVE EMPTY IF NO ITEMS WILL BE GIVEN!
            itemTable: [
                { name: "Cooked Chicken", id: "minecraft:cooked_chicken", count: 5 }
            ],

            // Do not touch
            allRewards() {
                const lines = [];

                // 💰 Cash reward
                if (this.rewardCash > 0) {
                    lines.push(`§aCash: §e${formatCurrency(this.rewardCash)}`);
                }

                // 🏆 Achievement
                if (this.achivReward === true && this.achivRewardName) {
                    lines.push(`\n§aAchievement: §e${this.achivRewardName}`);
                }

                // 📦 Normal items
                if (this.itemRewards === true && Array.isArray(this.itemTable)) {
                    const validItems = this.itemTable.filter(item => item?.id && item?.count);
                    if (validItems.length > 0) {
                        lines.push(`\n§6Items:`);
                        for (const item of validItems) {
                            lines.push(`§f- ${item.name} x${item.count}`);
                        }
                    }
                }

                // 🎁 Special items with chance
                const special = specialRewards[this.specialType];
                if (this.isSpecial === true && special?.itemTable?.length > 0) {
                    lines.push(`\n§l§eThis is a Special Quest ranked as: 
§f[ §r${this.specialType} §l]§e!§r

These types of quests offers:`);

                    // 🎲 Bonus chance
                    if (special.bonusChance > 0) {
                        lines.push(`\n§dBonus Cash Chance: §f${special.bonusChance}%%`);
                    }

                    // 💸 Bonus cash
                    if (special.bonusCash > 0) {
                        lines.push(`\n§dBonus Cash: §e${formatCurrency(special.bonusCash)}`);
                    }
                    lines.push(`\n§dItems:\n`)
                    for (const item of special.itemTable) {
                        if (item?.id && item?.count) {
                            const chance = item.chance ?? 100;
                            lines.push(`§f- ${item.id} x${item.count} §7(${chance}%%)`);
                        }
                    }

                }

                return lines.length > 0 ? lines.join("\n") : "§7No rewards available.";
            },

            // Also do not touch, it's fully modular and automatic.
            async onComplete(player) {
                await typeTitleTitle(player, `§eQUEST COMPLETED`)
                await typeTitleSubtitle(player, this.name)
                player.removeTag(this.tag)

                if (this.rewardCash > 0) {
                    world.scoreboard.getObjective(`balance`).addScore(player, this.rewardCash)
                    player.sendMessage(`[ QUEST ] Added ${formatCurrency(this.rewardCash)} to your cahs balance.`)
                }
                if (this.achivReward == true) {
                    player.setDynamicProperty(this.tag + "_date", Date.now());
                    player.addTag(this.finishTag)
                    world.sendMessage(`[ ACHIEVEMENT ] ${player.name} completed ${this.name} quest and got ${this.achivRewardName} achievement!`)

                }
                if (this.itemRewards == true) {
                    if (this.itemTable.length > 0) {
                        for (const itemID of this.itemTable) {
                            await player.runCommand(`give @s ${itemID.id} ${itemID.count}`)
                            await player.sendMessage(`[ §a§lQUEST§r ] §aYou've recieved §e${itemID.id} x${itemID.count}`)
                        }
                    }
                }

                if (this.isSpecial == true) {
                    if (specialRewards[this.specialType]?.itemTable.length > 0) {
                        for (const itemID of specialRewards[this.specialType]?.itemTable) {
                            await player.runCommand(`give @s ${itemID.id} ${itemID.count}`)
                            await player.sendMessage(`[ §a§lQUEST§r ] §aYou've recieved §e${itemID.id} x${itemID.count}`)
                        }
                    }
                }
            }
        },
        arm_yourself: {
            // Name of the quest:
            name: `PROLOGUE: Arm Yourself`,
            // Tag name of the quest given if the quest is active 
            tag: "quest_ayourself",
            // Description of the quest
            description: `Why i don't remember anything? Who was that girl? Why was she acting like i was so important to her? WHO EVEN AM I?
Someone will hunt me down? WHat?!

What is going on?

What is going on?!

WHAT IS GOING ON?!

WHAT IS GOING ON!!

WHAT IS GOING ON!!!

WHAT IS GOING ON!!!

WHAT IS GOING ON!!!!


`,

            difficulty: `Safe`,

            // Goal of the quest
            goal: `Visit Weaponsmith, buy yourself a weapon and armour. Ask the weaponsmith if he has something for the headache of yours`,

            // Tag given when quest is finished
            finishTag: `fquest_ayourself`,

            // Cash reward. REMEMBER! WE USE BIGGER NUMBERS DUE TO CASH FORMATTING! ex. 1234567890 -> 12,345,678.90$ 
            rewardCash: 200000,

            // If true, the completion of the quest will give an achievement, REMEMBER TO REGISTER THE ACHIEVEMENT IN "scripts/system/achievements/core.js"!!!
            achivReward: true,

            // Name of the Achievement
            achivRewardName: `Test`,

            // If true, rewards from specialRewards.cat[nameFromSpecialType] will be give to the player.
            isSpecial: false,

            // Special type. [ safe | semisafe | moderate | hard | ehard | nightmare ]
            specialType: "safe",

            // If true, items registered in this.itemTable will be given to the player
            itemRewards: true, // False/True 

            // Object with item id and it's amount that is given to the player when finishing the quest. !!! LEAVE EMPTY IF NO ITEMS WILL BE GIVEN!
            itemTable: [
                { name: "Stone Sword", id: "stone_sword", count: "1" },
                { name: "Stone Axe", id: "stone_axe", count: "1" },
                { name: "Stone Shovel", id: "stone_shovel", count: "1" },
                { name: "Stone Pickaxe", id: "stone_pickaxe", count: "1" },
                { name: "Leather Helmet", id: "leather_helmet", count: "1" },
                { name: "Leather Chestplate", id: "leather_chestplate", count: "1" },
                { name: "Leather Leggings ", id: "leather_leggings", count: "1" },
                { name: "Leather Boots", id: "leather_boots", count: "1" }



            ],

            // Do not touch
            allRewards() {
                const lines = [];

                // 💰 Cash reward
                if (this.rewardCash > 0) {
                    lines.push(`§aCash: §e${formatCurrency(this.rewardCash)}`);
                }

                // 🏆 Achievement
                if (this.achivReward === true && this.achivRewardName) {
                    lines.push(`\n§aAchievement: §e${this.achivRewardName}`);
                }

                // 📦 Normal items
                if (this.itemRewards === true && Array.isArray(this.itemTable)) {
                    const validItems = this.itemTable.filter(item => item?.id && item?.count);
                    if (validItems.length > 0) {
                        lines.push(`\n§6Items:`);
                        for (const item of validItems) {
                            lines.push(`§f- ${item.name} x${item.count}`);
                        }
                    }
                }

                // 🎁 Special items with chance
                const special = specialRewards[this.specialType];
                if (this.isSpecial === true && special?.itemTable?.length > 0) {
                    lines.push(`\n§l§eThis is a Special Quest ranked as: 
§f[ §r${this.specialType} §l]§e!§r

These types of quests offers:`);

                    // 🎲 Bonus chance
                    if (special.bonusChance > 0) {
                        lines.push(`\n§dBonus Cash Chance: §f${special.bonusChance}%%`);
                    }

                    // 💸 Bonus cash
                    if (special.bonusCash > 0) {
                        lines.push(`\n§dBonus Cash: §e${formatCurrency(special.bonusCash)}`);
                    }
                    lines.push(`\n§dItems:\n`)
                    for (const item of special.itemTable) {
                        if (item?.id && item?.count) {
                            const chance = item.chance ?? 100;
                            lines.push(`§f- ${item.id} x${item.count} §7(${chance}%%)`);
                        }
                    }

                }

                return lines.length > 0 ? lines.join("\n") : "§7No rewards available.";
            },
            // Also do not touch, it's fully modular and automatic.
            async onComplete(player) {
                await typeTitleTitle(player, `QUEST COMPLETED`)
                await typeTitleSubtitle(player, this.name)
                player.removeTag(this.tag)

                if (this.rewardCash > 0) {
                    world.scoreboard.getObjective(`cash`).addScore(player, this.rewardCash)
                    player.sendMessage(`[ QUEST ] Added ${formatCurrency(this.rewardCash)} to your cahs balance.`)
                }
                if (this.achivReward == true) {
                    player.setDynamicProperty(this.tag + "_date", Date.now());
                    player.addTag(this.finishTag)
                    world.sendMessage(`[ ACHIEVEMENT ] ${player.name} completed ${this.name} quest and got ${this.achivRewardName} achievement!`)

                }
                if (this.itemRewards == true) {
                    if (this.itemTable.length > 0) {
                        for (const itemID of this.itemTable) {
                            await player.runCommand(`give @s ${itemID.id} ${itemID.count}`)
                            await player.sendMessage(`[ §a§lQUEST§r ] §aYou've recieved §e${itemID.id} x${itemID.count}`)
                        }
                    }
                }

                if (this.isSpecial == true) {
                    if (specialRewards[this.specialType]?.itemTable.length > 0) {
                        for (const itemID of specialRewards[this.specialType]?.itemTable) {
                            await player.runCommand(`give @s ${itemID.id} ${itemID.count}`)
                            await player.sendMessage(`[ §a§lQUEST§r ] §aYou've recieved §e${itemID.id} x${itemID.count}`)
                        }
                    }

                }
            }

        }
    },
    questTable: [
        "quest_fawoken"
    ]
}

export const specialRewards = {
    safe: {
        itemTable: [
            { name: "Test", id: "test", count: "test", chance: 50 },
            { name: "Test", id: "test", count: "test", chance: 100 },
            { name: "Test", id: "test", count: "test", chance: 13 },
            { name: "Test", id: "test", count: "test", chance: 80 }
        ],
        bonusChance: 20,
        bonusCash: 50000,
        storeModifier: false,
        questCooldown: false,
        notifierUponCompletion: false
    },
    semisafe: {
        itemTable: [],
        bonusChance: 20,
        bonusCash: 100000,
        storeModifier: false,
        questCooldown: false,
        notifierUponCompletion: false
    },

    moderate: {
        itemTable: [],
        bonusChance: 20,
        bonusCash: 200000,
        storeModifier: false,
        questCooldown: 7000,
        notifierUponCompletion(player, quest) {
            world.sendMessage(`${player.name} completed ${quest} on Moderate Difficulty!`)
        }
    },

    hard: {
        itemTable: [],
        bonusChance: 20,
        bonusCash: 350000,
        storeModifier: false,
        questCooldown: 24000,
        notifierUponCompletion(player, quest) {
            world.sendMessage(`${player.name} completed ${quest} on Hard Difficulty!`)
        }
    },

    exthard: {
        itemTable: [],
        bonusChance: 20,
        bonusCash: 500000,
        storeModifier: false,
        questCooldown: 48000,
        notifierUponCompletion(player, quest) {
            world.sendMessage(`${player.name} completed ${quest} on Extremely Hard Difficulty!`)
        }
    },

    nightmare: {
        itemTable: [],
        bonusChance: 20,
        bonusCash: 1000000,
        storeModifier: -90,
        questCooldown: 7000,
        notifierUponCompletion(player, quest) {
            world.sendMessage(`${player.name} completed ${quest} on Nightmare Difficulty!
            
[EFFECT]
Store's modifier has been set to -90. Type /prices to view all modifiers!`)
        }

    }
}

export const questTags = {
    freshly_awoken: {
        tag: "hsmp_quest_freshly_awoken",
        name: '§eFreshly Awoken.§r',
        description: 'Go to the local §etavern§r and ask a worker there about this place.',
        cashReward: 500000,
        achievementReward: `§aAnd thus, it begins.§r`,
        achievementID: "achiv_fawoken",
        allRewards() {
            return `§e${formatCurrency(this.cashReward)}\$§r + Achievement: §a${this.achievementReward}§r`
        }
    },
    intense_preparations: {
        tag: "hsmp_quest_i_p",
        name: `§eIntense Preparations... Kinda`,
        description: `Go to the local §eWeaponsmith§r and buy yourself a weapon and an armor.`,
        cashReward: 200000,
        achievementReward: `§eIntense Preparation!`,
        achievementID: `achiv_i_p`

    },
    potionless_witch: {
        tag: "hsmp_whitch_quest_accepted",
        name: "§l§ePotionless Witch§r",
        description: `§rCollect Glow Berries which grows in the jungle and bring them back to §eWitch Evangeline§r
    
§aRewards:
- 5x Health Potions
- 5,000.00\$
- Unlocks Witch Hut
- +5 Reputation.
`,
        cashReward: 500000,
        achievementReward: null,
        achievementID: null,
        allRewards() {
            return `§e${formatCurrency(this.cashReward)}\$§r + Achievement: §a${this.achievementReward}§r`
        }

    }
}

export async function registeredQuestNames(player) {
    for (const quest of Object.values(questRegistry.questInfo)) {
        if (typeof quest.tag === "string" && player.hasTag(quest.tag)) return quest;
    }
    return {
        name: '§oNo quests Activated.',
        description: `It's so quiet here...`,
        goal: `...... Still quiet`,
        allRewards() {
            return "May your wallet rest in peace... Lazy."
        }
    }
}