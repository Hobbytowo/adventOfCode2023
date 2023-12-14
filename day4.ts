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

    const result = arr.reduce((sum, line) => {
        if (!line) return sum

        const cardData = line.split(':')[1]
        const winningNumbers = cardData.split('|')[0].split(' ').filter(x => x)
        const testNumbers = cardData.split('|')[1].split(' ').filter(x => x)

        let wonNumbers = 0
        testNumbers.forEach(n => {
            if (winningNumbers.includes(n)) {
                wonNumbers++
            }
        })

        const valToAdd = wonNumbers ? 2**(wonNumbers - 1) : 0
        console.log({winningNumbers, testNumbers, wonNumbers, valToAdd})

        return sum + valToAdd
    }, 0)

    console.log({result})
});
