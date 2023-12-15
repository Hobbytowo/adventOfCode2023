const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

readModuleFile('./day8.txt', function (err, data) {
    const arr = data.toString()
        .split("\n")
        .filter(x => x)

    const directions = arr[0]

    const parsedData = arr
        .filter(l => l.includes("="))
        .reduce((obj, x) => {
            const [start, goLeft, goRight] = x.match(/[0-9A-Z]+/g)
            return {
                ...obj,
                [`${start}`]: [goLeft, goRight]
            }
        }, {})

    let step = 0
    let places = Object.keys(parsedData).filter(x => x[2] === "A")
    console.log(parsedData, places)

    while (places.some(p => !p.endsWith("Z"))) {
        const direction = directions[step % directions.length]
        step++

        places = places.map(p => {
            const item = parsedData[p]
            return item[direction === "L" ? 0 : 1]
        })
    }

    console.log({step, places})
});
