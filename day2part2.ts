const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

readModuleFile('./day2.txt', function (err, data) {
    const arr = data.toString().split("\n")

    const RED_MAX_NUMBER = 12
    const GREEN_MAX_NUMBER = 13
    const BLUE_MAX_NUMBER = 14

    const result = arr.reduce((sum, line, idx) => {
        if (!line) return sum

        const colors = line.split(':')[1]
        const colorsSets = colors.split(';')

        const gameIdx = Number(line.split(' ')[1].split(":")[0])

        let red = []
        let green = []
        let blue = []
        colorsSets.forEach(set => {
            // fe  ' 3 red, 2 blue, 9 green'
            set.split(',').forEach(colorStr => {
                // fe ' 6 red
                const test = colorStr.split(' ')
                const digit = Number(test[1])
                const colorName = test[2]

                if (colorName === 'red') red.push(digit)
                if (colorName === 'green') green.push(digit)
                if (colorName === 'blue') blue.push(digit)
            })
        })

        const redMax = Math.max(...red)
        const greenMax = Math.max(...green)
        const blueMax = Math.max(...blue)

        return sum + (redMax * greenMax * blueMax)
    }, 0)

    console.log({result})
});

// 4811 too high
