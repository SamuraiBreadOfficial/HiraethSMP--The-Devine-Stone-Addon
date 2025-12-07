console.warn("§d[HIRAETH]§r Loading scripts/modules/playerinfo/registered-tags.js");

import {
    tag_demon, tag_elf, tag_half_orc, tag_human,
    tag_fire, tag_wind, tag_earth, tag_nature
} from "../../system/system-index.js"

export function getRaceTags(player) {
    if (player.hasTag(tag_human)) return `§lHUMAN§r`;
    if (player.hasTag(tag_elf)) return `§l§qELF§r`;
    if (player.hasTag(tag_half_orc)) return `§v§lHALF ORC§r`;
    if (player.hasTag(tag_demon)) return `§l§mTANAR'RI§r`;
    return `No Race Found.`
}


export function getMagicTags(player) {
    if (player.hasTag(tag_fire)) return "Crimsoning Flames"
    if (player.hasTag(tag_wind)) return "Titan's Breath"
    if (player.hasTag(tag_earth)) return "Earth's Will"
    if (player.hasTag(tag_nature)) return "Flowering Blessing"
    return `No skills found.`
}