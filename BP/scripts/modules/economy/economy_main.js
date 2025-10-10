import { world, system } from "@minecraft/server";

world.afterEvents.entityDie.subscribe((event) => {
    const entity = event.deadEntity;


    if (!entity || entity.typeId !== "minecraft:player") return;

    const balanceObjective = world.scoreboard.getObjective("balance");
    if (!balanceObjective) return;

    balanceObjective.setScore(entity, 0);
    entity.sendMessage("§m/!\\ Your balance has been cleared due to your death.\n\nTo avoid this kind of situation, make sure to deposit your balance to the bank with your Main Menu Item!");
    console.warn('[ DEATH ]' + entity.nameTag + 'Lost his Balance!')
});

export function cashFunction(source, amount) {
    const cashObjective = world.scoreboard.getObjective("balance");
    const bankObjective = world.scoreboard.getObjective("bank");

    if (!cashObjective || !bankObjective) {
        source.sendMessage("§cBank Error Detected. Couldn't proceed.");
        return;
    }

    const currentCash = cashObjective.getScore(source) ?? 0;

    if (currentCash < amount) {
        source.sendMessage("§eYou don't have enough Credits to deposit.");
        return;
    }

    const currentBank = bankObjective.getScore(source) ?? 0;

    // Aktualizacja wyników
    cashObjective.setScore(source, currentCash - amount);
    bankObjective.setScore(source, currentBank + amount);

    // Komunikat zwrotny
    source.sendMessage("§aDeposited §e" + amount + "§a Credits.");
}

export function withdrawFunction(source, amount) {
    const cashObjective = world.scoreboard.getObjective("balance");
    const bankObjective = world.scoreboard.getObjective("bank");

    if (!cashObjective || !bankObjective) {
        source.sendMessage("§cBank Error Detected. Couldn't proceed.");
        return;
    }

    const currentBank = bankObjective.getScore(source) ?? 0;

    if (currentBank < amount) {
        source.sendMessage("§eYou don't have enough credits at Bank.");
        return;
    }

    const currentCash = cashObjective.getScore(source) ?? 0;

    bankObjective.setScore(source, currentBank - amount);
    cashObjective.setScore(source, currentCash + amount);

    source.sendMessage("§aWithdrawed §e" + amount + "§a Credits.");
}


export function depAmount(source) {
    new ModalFormData()
        .title('Deposit To Bank')
        .textField('How much you wish to deposit?', 'Example: 50')
        .show(source)
        .then(response => {
            if (response.canceled) return;

            const input = response.formValues[0];
            const amount = parseInt(input);
            if (isNaN(amount) || amount < 0) {
                source.sendMessage('Error');
                return;
            }

            cashFunction(source, amount);

        })
}

export function depAll(source) {
    const cashObjective = world.scoreboard.getObjective("balance");
    const cash = cashObjective?.getScore(source) ?? 0;
    cashFunction(source, cash);
}

export function withAmount(source) {
    new ModalFormData()
        .title('Withdraw From Bank')
        .textField('How much you wish to withdraw?', 'Example: 50')
        .show(source)
        .then(response => {
            if (response.canceled) return;

            const input = response.formValues[0];
            const amount = parseInt(input);

            if (isNaN(amount) || amount < 0) {
                source.sendMessage('§cInvalid amount. Withdrawal failed.');
                return;
            }

            withdrawFunction(source, amount);
        });
}

export function withAll(source) {
    const bankObjective = world.scoreboard.getObjective("bank");
    const bank = bankObjective?.getScore(source) ?? 0;
    withdrawFunction(source, bank);
}

export function showTransferForm(source) {
    const senderName = source.name;
    const onlinePlayers = world.getPlayers();
    const playerNames = [];

    for (const p of onlinePlayers) {
        try {
            const name = p.name;
            if (typeof name === "string" && name !== senderName) {
                playerNames.push(name.trim());
            }
        } catch (err) {
            console.warn("Could not find any players:", err);
        }
    }

    if (playerNames.length === 0) {
        source.sendMessage("§cNo one else is Online.");
        return;
    }

    new ModalFormData()
        .title("Credits Transfer")
        .dropdown("Choose a player you want to Transfer your Credits to", playerNames)
        .textField("Credits amount", "Example. 100")
        .show(source)
        .then(response => {
            if (response.canceled) return;

            const selectedIndex = response.formValues[0];
            const recipientName = playerNames[selectedIndex];
            const amount = parseInt(response.formValues[1]);

            if (isNaN(amount) || amount < 0) {
                source.sendMessage("§cIncorrect Amount. Minium amount is 1.");
                return;
            }
            console.warn(source.name + ' Tried to send' + amount)

            // Komendy do aktualizacji scoreboardu
            source.runCommand(`scoreboard players remove @s balance ${amount}`);
            source.runCommand(`scoreboard players add "${recipientName}" balance ${amount}`);

            source.sendMessage(`§aTransfered §e${amount}§a Credits to §b${recipientName}§a.`);
            source.runCommand(`tellraw ${recipientName} {"rawtext":[{"text":"§aReceived §e${amount}§a Credits from §b${source.name}§a."}]}`)
        });
}
