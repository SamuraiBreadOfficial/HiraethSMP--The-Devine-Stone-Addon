export function economy_BalanceInfo(source) {
    const cash = getCashScore(source, "balance")
    const bank = getBankScore(source, "bank")
    const bal = getScoreForBalance(source)

    return new ActionFormData()
        .title('§l§e' + playerName + '\'s§r Balance')
        .body('Control your Credits However you want! Deposit, withdraw or even transfer them to another player!')
        .divider()
        .header('Balance')
        .label('Cash: ' + cash)
        .label('Bank: ' + bank)
        .label('Full Balance: ' + bal)
        .divider()
        .header('Bank Control')
        .button('Deposit Amount')
        .button('Deposit All')
        .divider()
        .button('Withdraw Amount')
        .button('Withdraw All')
        .divider()
        .button('Transfer Credits')
        .divider()
        .button('Back')
}

export function balance_window(source) {
    economy_BalanceInfo(source).show(source).then((r) => {
        switch (r.selection) {
            case 0:
                depAmount(source);
                break;

            case 1:
                depAll(source);
                break;

            case 2:
                withAmount(source);
                break;

            case 3:
                withAll(source);
                break;

            case 4:
                showTransferForm(source);
                break;

            case 5:
                open_igmenu(source);
                break;
        }
    })
}
