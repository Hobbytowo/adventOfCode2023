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
        .map(x => {
            const [start, goLeft, goRight] = x.match(/[0-9A-Z]+/g)
            return {start, goLeft, goRight,}
        })


    let step = 0
    let places = parsedData.filter(x => x.start[2] === "A").map(p => p.start)
    console.log(parsedData, places)

    while (places.some(p => p[2] !== "Z")) {
        const direction = directions[step % directions.length]
        step++

        places = places.map(p => {
            const item = parsedData.find(d => d.start === p)
            return direction === "L" ? item.goLeft : item.goRight
        })
    }

    console.log({directions, parsedData, step, places})
});
