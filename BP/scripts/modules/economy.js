import { world, system } from "@minecraft/server"

export const buyFoodPrice = {
    cooked: {
        modifier: 0,
        items: {
            cooked_chicken: 700,
            cooked_porkchop: 450,
            cooked_beef: 600,
            cooked_mutton: 605,
            cooked_rabbit: 610,
            cooked_cod: 500,
            cooked_salmon: 505
        }
    },
    miscellaneous: {
        modifier: 0,
        items: {
            bread: 200,
            mushroom_stew: 30,
            beetroot_soup: 10,
            rabbit_stew: 20,
            jacked_potato: 150,
            cookie: 100,
            pumpkin_pie: 300,
            cake: 1050,
            dried_kelp: 25
        }
    },
    extra: {
        modifier: 0,
        items: {
            golden_carrot: 5500,
            golden_apple: 11190,
            notch_apple: 250800
        }
    },
    crops: {
        modifier: 0,
        items: {
            wheat_seeds: 20,
            pumpkin_seeds: 25,
            melon_seeds: 30,
            beetroot_seeds: 10,
            torchflower_seeds: 100,
            pitcher_pod: 105
        }
    },

    crops_grown: {
        modifier: 0,
        items: {
            wheat: 400,
            pumpkin: 200,
            melon: 205,
            melon_slice: 55,
            beetroot: 50,
            torchflower: 500,
            pitcher_plant: 505
        }
    },
    mobs: {
        modifier: 0,
        items: {
            bone: 1500,
            dried_ghast: 19999990,
            sadle: 100000,
            golden_horse_armor: 9990,
            iron_horse_armor: 19990,
            diamond_horse_armor: 39990,
            white_harness: 15000
        }
    },

    mobs_limited: {
        modifier: 0,
        items: {
            dried_ghast: 19999990,
            white_harness: 15000
        }
    },

    wood: {
        modifier: 0,
        items: {
            oak_log: 400,
            spruce_log: 405,
            birch_log: 300,
            jungle_log: 305,
            acacia_log: 250,
            dark_oak_log: 450,
            mangrove_log: 455,
            cherry_log: 500,
            pale_oak_log: 600,
            crimson_stem: 5500,
            warped_stem: 4500
        }
    },

    leaves: {
        modifier: 0,
        items: {
            oak_leaves: 150,
            spruce_leaves: 160,
            birch_leaves: 130,
            jungle_leaves: 170,
            acacia_leaves: 120,
            dark_oak_leaves: 155,
            mangrove_leaves: 180,
            cherry_leaves: 200,
            pale_oak_leaves: 300,
            nether_wart_block: 4600,
            warped_wart_block: 3900

        }
    },

    nature: {
        modifier: 0,
        items: {

            dirt: 50,
            coarse_dirt: 80,
            rooted_dirt: 100,
            grass_block: 105,
            podzol: 150,
            mycelium: 200,
            sand: 30,
            red_sand: 35,
            mud: 55,
            packed_mud: 110,
            clay: 60,
            magma_block: 6600,
            soul_sand: 150000

        }
    },

    stone_blocks: {
        modifier: 0,
        items: {
            cobblestone: 350,
            stone: 500,
            granite: 300,
            diorite: 305,
            andesite: 310,
            cobbled_deepslate: 400,
            deepslate: 505,
            basalt: 5500,
            blackstone: 7500,
            obsidian: 115590,
            crying_obsidian: 305590
        }
    }
}

export const sellFoodPrice = {
    cooked: {
        modifier: -60,
        items: {
            cooked_chicken: 700,
            cooked_porkchop: 450,
            cooked_beef: 600,
            cooked_mutton: 605,
            cooked_rabbit: 610,
            cooked_cod: 500,
            cooked_salmon: 505
        }
    },
    miscellaneous: {
        modifier: -60,
        items: {
            bread: 200,
            mushroom_stew: 30,
            beetroot_soup: 10,
            rabbit_stew: 20,
            jacked_potato: 150,
            cookie: 100,
            pumpkin_pie: 300,
            cake: 1050,
            dried_kelp: 25
        }
    },
    extra: {
        modifier: -60,
        items: {
            golden_carrot: 5500,
            golden_apple: 11190,
            notch_apple: 250800
        }
    },
    crops: {
        modifier: -60,
        items: {
            wheat_seeds: 20,
            pumpkin_seeds: 25,
            melon_seeds: 30,
            beetroot_seeds: 10,
            torchflower_seeds: 100,
            pitcher_pod: 105
        }
    },

    crops_grown: {
        modifier: -60,
        items: {
            wheat: 400,
            pumpkin: 200,
            melon: 205,
            melon_slice: 55,
            beetroot: 50,
            torchflower: 500,
            pitcher_plant: 505
        }
    },
    mobs: {
        modifier: -60,
        items: {
            bone: 1500,
            dried_ghast: 19999990,
            sadle: 100000,
            golden_horse_armor: 9990,
            iron_horse_armor: 19990,
            diamond_horse_armor: 39990,
            white_harness: 15000
        }
    },

    mobs_limited: {
        modifier: -60,
        items: {
            dried_ghast: 19999990,
            white_harness: 15000
        }
    },

    wood: {
        modifier: -60,
        items: {
            oak_log: 400,
            spruce_log: 405,
            birch_log: 300,
            jungle_log: 305,
            acacia_log: 250,
            dark_oak_log: 450,
            mangrove_log: 455,
            cherry_log: 500,
            pale_oak_log: 600,
            crimson_stem: 5500,
            warped_stem: 4500
        }
    },

    leaves: {
        modifier: -60,
        items: {
            oak_leaves: 150,
            spruce_leaves: 160,
            birch_leaves: 130,
            jungle_leaves: 170,
            acacia_leaves: 120,
            dark_oak_leaves: 155,
            mangrove_leaves: 180,
            cherry_leaves: 200,
            pale_oak_leaves: 300,
            nether_wart_block: 4600,
            warped_wart_block: 3900

        }
    },

    nature: {
        modifier: -60,
        items: {

            dirt: 50,
            coarse_dirt: 80,
            rooted_dirt: 100,
            grass_block: 105,
            podzol: 150,
            mycelium: 200,
            sand: 30,
            red_sand: 35,
            mud: 55,
            packed_mud: 110,
            clay: 60,
            magma_block: 6600,
            soul_sand: 150000

        }
    },

    stone_blocks: {
        modifier: -60,
        items: {
            cobblestone: 350,
            stone: 500,
            granite: 300,
            diorite: 305,
            andesite: 310,
            cobbled_deepslate: 400,
            deepslate: 505,
            basalt: 5500,
            blackstone: 7500,
            obsidian: 115590,
            crying_obsidian: 305590
        }
    }

}

export function getBuyPrice(itemId) {
    for (const category of Object.values(buyFoodPrice)) {
        if (itemId in category.items)
    }
}