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