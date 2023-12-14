const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

readModuleFile('./day3.txt', function (err, data) {
    const arr = data.toString().split("\n")

    const digitsToAdd = [] // { value: number; starCoords: [] }

    arr.forEach((line, rowIdx) => {
        if (!line) return

        const regexp = /\d+/g

        const matches = Array.from(line.matchAll(regexp), x => {
            const value = x[0]
            const startIdx = x.index

            const isFirstCol = startIdx === 0
            const isLastCol = (startIdx + value.length) === line.length - 1

            const cols = Array.from({length: value.length}, (_, i) => i + startIdx)
            if (!isFirstCol) cols.push(startIdx - 1)
            if (!isLastCol) cols.push(startIdx + value.length)

            const topCoordsToSearchSymbol = rowIdx === 0
                ? []
                : cols.map(c => [rowIdx - 1, c])
            const leftCoordsToSearchSymbol = isFirstCol ? [] : [rowIdx, startIdx - 1]
            const rightCoordsToSearchSymbol = isLastCol ? [] : [rowIdx, startIdx + value.length]
            const bottomCoordsToSearchSymbol = rowIdx === arr.length - 1
                ? []
                : cols.map(c => [rowIdx + 1, c])

            const allCoords = [...topCoordsToSearchSymbol, leftCoordsToSearchSymbol, rightCoordsToSearchSymbol, ...bottomCoordsToSearchSymbol]

            allCoords.forEach(coordsTest => {
                const valOnCoords = arr[coordsTest[0]] ? arr[coordsTest[0]][coordsTest[1]] : null

                if (valOnCoords && valOnCoords === "*") {
                    digitsToAdd.push({
                        value: value,
                        starCoords: coordsTest
                    })
                }
            })
        })
    })

    // console.log({digitsToAdd})

    // starCoords: [], digits: []

    const sortedByStar = digitsToAdd.reduce((arr, item) => {
        const starItem = arr.find(x => x.starCoords[0] === item.starCoords[0] && x.starCoords[1] === item.starCoords[1])

        if (starItem) {
            return [
                ...arr,
                {
                    ...starItem,
                    digits: [...starItem.digits, item.value]
                }
            ]
        }

        return [
            ...arr,
            {
                starCoords: item.starCoords,
                digits: [item.value]
            }
        ]
    }, [])

    console.log({sortedByStar})

    const result = sortedByStar
        .filter(x => x.digits.length === 2)
        .reduce((sum, item) => {
            return sum + (Number(item.digits[0]) * Number(item.digits[1]))
        }, 0)

    console.log({result})
});
