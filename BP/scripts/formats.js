console.warn("§d[HIRAETH]§r Loading scripts/formats.js");
import { system } from "@minecraft/server"


// Curency Format (123456 -> 1,234.56$)
export function formatCurrency(value) {
    const raw = (value / 100).toFixed(2);
    const parts = raw.split(".");
    const integer = parts[0];
    const decimal = parts[1];

    const withCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${withCommas}.${decimal}\$`;
}

// Delay for async functions
export function waitTicks(ticks) {
    return new Promise(resolve => {
        system.runTimeout(resolve, ticks)
    })
}

// Dialogue actionbar with sounds
export async function typeActionbar(player, character, text, delay = 1, pitch = 1, sound = "random.click", color = textFormats.colors.yellow) {
    for (let i = 1; i <= text.length; i++) {
        const fragment = text.slice(0, i);


        system.run(() => {
            player.runCommand(`titleraw @s actionbar {"rawtext":[
                {"text":"< ${color}${character}${textFormats.resetWithColor} > "},
                {"text":"${fragment}"}
            ]}`);

            if (character == player.name) {
                const pitchValue = player.hasTag(`hsmp_female`) ? 1.5 : 0.5;
                player.runCommand(`playsound ${sound} @s ~ ~ ~ 1 ${pitchValue} 1`);
            } else {
                player.runCommand(`playsound ${sound} @s ~ ~ ~ 1 ${pitch} 1`);
            }
        });

        const char = text[i - 1];
        const pause = [".", ",", "?", "!"].includes(char) ? delay + 6 : delay;
        await waitTicks(pause);
    }
}

export const textFormats = {
    colors: {
        black: "§0",
        dark_blue: "§1",
        dark_green: "§2",
        dark_aqua: "§3",
        dark_red: "§4",
        dark_purple: "§5",
        gold: "§6",
        gray: "§7",
        dark_gray: "§8",
        blue: "§9",
        green: "§a",
        aqua: "§b",
        red: "§c",
        light_purple: "§d",
        yellow: "§e",
        white: "§f",
        minecoin: "§g",
        quartz: "§h",
        iron: "§i",
        netherite: "§j",
        redstone: "§m",
        copper: "§n",
        gold: "§p",
        emerald: "§q",
        diamond: "§s",
        lapis: "§t",
        amethyst: "§u"

    },
    deco: {

        obfuscated: "§k",
        bold: "§l",
        italic: "§o"
    },
    reset: "§r",
    resetWithColor: "§r§f"
}

export async function typeTitleTitle(player, text, delay = 1, sound = "random.click", pitch = 1) {
    player.runCommand(`title @s times 0 100 10`)
    for (let i = 1; i <= text.length; i++) {
        const fragment = text.slice(0, i);
        system.run(() => {
            player.runCommand(`title @s title ${fragment}`)
            player.runCommand(`playsound ${sound} @s ~ ~ ~ 1 ${pitch} 1`)
        });

        const char = text[i - 1];
        if (char === "." || char === " ") {
            await waitTicks(delay + 6)
        } else {
            await waitTicks(delay)
        }
    }
}
export async function typeTitleSubtitle(player, text, delay = 1, sound = "random.click", pitch = 1) {
    for (let i = 1; i <= text.length; i++) {
        const fragment = text.slice(0, i);
        system.run(() => {
            player.runCommand(`title @s subtitle ${fragment}`)
            player.runCommand(`playsound ${sound} @s ~ ~ ~ 1 ${pitch} 1`)
        });

        const char = text[i - 1];
        if (char === "." || char === " ") {
            await waitTicks(delay + 6)
        } else {
            await waitTicks(delay)
        }
    }
}

export const specialLang = {
    i: "Va",
    you: "Vu",
    he: "Ve",
    she: "Ver",
    it: "Vo",
    we: "Vi",
    they: "Vyr",

    my: "U'va",
    your: "U'vu",
    his: "U've",
    her: "U'ver",
    its: "U'vo",
    our: "U'var",
    their: "U'vyr",

    mine: "U'vara",
    yours: "U'vur",
    hers: "U'veri",
    ours: "U'vari",
    theirs: "U'vyri",

    is: "Sin",
    are: "San",
    was: "Sir",
    were: "Sire",
    be: "Se",
    being: "Sev",
    been: "Sevi",
    am: "Sera",
    do: "Sut",
    does: "Suta",
    did: "Sutas",
    have: "Sara",
    has: "Sare",
    had: "Saren",
    will: "Niv",
    would: "Niva",
    shall: "Niva'tash",
    should: "Neva",
    can: "Ne",
    could: "Nev",
    may: "Ter",
    might: "Tera",
    must: "Terro",
    ought: "Tesso",
    need: "Belva",
    dare: "Berri",

    in: "Yt",
    out: "Ot",


    so: "Uk",
    and: "Gel",

    what: "He",

    upon: "Her",

    darkness: "Vaidos",

    hidden: "Gaeilo",

    underneath: "Hakerikia",

    another: "Umader",
    more: "Misa",
    never: "Naina",

    day: "Sola",

    see: "Visia",

    higher: "Java",

    the: "Ke",

    truth: "Outa",

    goddess: "Davia",
    god: "Davi",
    gods: "Davos",

    heal: "Sano",

    live: "Hashi",
    heart: "Hasho",
    soul: "Si'Sila",

    yes: "Yi",

    no: "Ne",

    oh: "Eek",
    ah: "Eee",

    please: "Gieva Vu",

    thank: "Pradiash",
    not: "Nei",

    fix: "Rea",

    fire: "Crim",
    flame: "Crimo",

    pain: "Cra'ri",
    die: "Cra",

    shield: "Berk",

    than: "Kan",
    as: "Ki",
    like: "Re",

    for: "Ko",
    because: "Kuha'tash",
    since: "Min",

    if: "Ik",
    when: "Kien",

    with: "Zin",
    without: "Zina",

    at: "Re",
    on: "Ro",
    by: "Ra",
    from: "Katosh",
    to: "Ru",

    all: "Hailvo",
    each: "Desa",
    every: "Desa'vo",
    some: "Desi",
    many: "Desu",

    who: "Ze",
    which: "Zir",
    that: "Har",

    just: "Ek",
    already: "Usatrav",
    still: "Beilo",
    yet: "Pailo",

    come: "Filia",

    go: "Fili",

    say: "Vois",

    speak: "Vais",

    tell: "Veis",

    know: "Lumi",

    think: "Seni",

    want: "Devilo",

    give: "Heishe",

    take: "Shtelo",

    look: "Visio",
    watch: "Visiona",

    now: "Ba",

    then: "Jeish",

    this: "Kela",

    today: "Yt Kela Ke Sola",

    tomorrow: "Yt Umader Ke Sola",

    yesterday: "Yt Hakerikia Kela Ke Sola",

    always: "Avoni",

    often: "Havoni",

    big: "Grandi",
    large: "Grandes",

    small: "Tinis",
    little: "Tiandes",

    good: "Hai",

    bad: "Kei",

    hot: "Yarva",

    cold: "Cialra",

    dark: "Vaid",

    light: "Salas",

    high: "Jav",

    low: "Vaj",

    these: "Harie",

    those: "Haria",

    much: 'Desas',

    or: "Ar",

    but: "Kek",

    toward: "Ruwi",
    by: "Sai"


}

export function translate(text) {
    return text
        .split(" ")
        .map(word => {
            const clean = word.toLowerCase().replace(/[^a-z]/gi, ""); // usuń interpunkcję
            const translated = specialLang[clean];
            return translated ? word.replace(clean, translated) : word;
        })
        .join(" ");
}

export const gender = {
    getGender(player) {
        if (player.hasTag('male')) return 'Man';
        if (player.hasTag('female')) return 'Girl';
        return '???';
    },
    getPronounce(player) {
        if (player.hasTag('male')) return 'He';
        if (player.hasTag('female')) return 'She';
        return 'They';
    },
    getObjectPronounce(player) {
        if (player.hasTag('male')) return 'Him';
        if (player.hasTag('female')) return 'Her';
        return 'Them';
    },
    getPossessivePronounce(player) {
        if (player.hasTag('male')) return 'His';
        if (player.hasTag('female')) return 'Hers';
        return 'Theirs';
    }
}