const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

readModuleFile('./day4.txt', function (err, data) {
    const arr = data.toString().split("\n")
    arr.pop() //rm empty line

    // arr of indexes cards to win
    const copiesToWinPerCard = arr.map((card, idx) => {
        const cardData = card.split(':')[1]
        const winningNumbers = cardData.split('|')[0].split(' ').filter(x => x)
        const testNumbers = cardData.split('|')[1].split(' ').filter(x => x)

        let wonNumbers = 0
        testNumbers.forEach(n => {
            if (winningNumbers.includes(n)) {
                wonNumbers++
            }
        })

        return Array.from({length: wonNumbers}, (_, i) => i + 2 + idx)
    })

    for (let step = 0; step < copiesToWinPerCard.length; step++) {
        copiesToWinPerCard[step].forEach(cardNr => {
            copiesToWinPerCard.push(copiesToWinPerCard[cardNr - 1])
        })
    }

    console.log(copiesToWinPerCard.length)
});
