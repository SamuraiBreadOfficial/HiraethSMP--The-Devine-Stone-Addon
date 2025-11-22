import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { formatCurrency, waitTicks, typeActionbar, textFormats } from "../../formats.js"
import { questTags } from "./../../system/quests/main/core.js"

world.afterEvents.playerInteractWithEntity.subscribe(e => {
    const entity = e.target;
    const player = e.player;

    if (entity.typeId == "hsmp:weaponsmith") {
        player.sendMessage("test")
    }
})