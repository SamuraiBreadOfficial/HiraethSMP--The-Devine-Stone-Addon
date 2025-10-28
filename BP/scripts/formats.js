console.warn("§d[HIRAETH]§r Loading scripts/formats.js");
import { system } from "@minecraft/server"

export function formatCurrency(value) {
    const raw = (value / 100).toFixed(2); // np. 1000099 → "10000.99"
    const parts = raw.split(".");
    const integer = parts[0];
    const decimal = parts[1];

    // Dodaj przecinki co 3 cyfry od końca
    const withCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${withCommas}.${decimal}`;
}

export function waitTicks(ticks) {
    return new Promise(resolve => {
        system.runTimeout(resolve, ticks)
    })
}

export async function typeActionbar(player, character, text, delay = 1) {
    for (let i = 1; i <= text.length; i++) {
        const fragment = text.slice(0, i);
        system.run(() => player.runCommand(`title @s actionbar < ${character} > ${fragment}`));

        const char = text[i - 1];
        if (char === "." || char === "," || char === "?" || char === "!") {
            await waitTicks(delay + 6); // pauza rytualna
        } else {
            await waitTicks(delay);
        }
    }
}