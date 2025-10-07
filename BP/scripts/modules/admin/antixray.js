import { world, system } from "@minecraft/server";
import { saveLogs, logBuffer, antiGriefBuffer, adminMenuPerm } from "../index.js";

world.afterEvents.playerBreakBlock.subscribe(e => {
    const player = e.player
    const playerName = e.player.name
    const brokenBlock = e.block
    const brokenBlockID = e.block.typeId
})