const fs = require('fs');
const thenby = require('thenby');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

const sortOrder = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

readModuleFile('./day7.txt', function (err, data) {
    const arr = data.toString()
        .split("\n")
        .filter(x => x)

    const parsedData = arr
        .map(x => {
            const [cards, bid] = x.split(" ")
            const ofKind = new Set(cards)

            const sets = Array.from(ofKind).map(letter => cards.match(new RegExp(`${letter}`, 'g')).length)
            const maxSetNumber = Math.max(...sets)

            return {cards, bid, sets, maxSetNumber,}
        })
        .sort(
            thenby.firstBy(function (v1, v2) { return v2.maxSetNumber - v1.maxSetNumber; })
                .thenBy(function (v1, v2) { return v1.sets.length - v2.sets.length; })
                .thenBy(function (v1, v2) { return sortOrder.findIndex(x => x === v1.cards[0]) - sortOrder.findIndex(x => x === v2.cards[0]) })
                .thenBy(function (v1, v2) { return sortOrder.findIndex(x => x === v1.cards[1]) - sortOrder.findIndex(x => x === v2.cards[1]) })
                .thenBy(function (v1, v2) { return sortOrder.findIndex(x => x === v1.cards[2]) - sortOrder.findIndex(x => x === v2.cards[2]) })
                .thenBy(function (v1, v2) { return sortOrder.findIndex(x => x === v1.cards[3]) - sortOrder.findIndex(x => x === v2.cards[3]) })
                .thenBy(function (v1, v2) { return sortOrder.findIndex(x => x === v1.cards[4]) - sortOrder.findIndex(x => x === v2.cards[4]) })
        )
        .map((item, idx) => ({
            ...item,
            value: (arr.length - idx) * item.bid,
        }))

    const result = parsedData.reduce((sum, item) => {
        return sum + item.value
    }, 0)

    console.log({result})
});
