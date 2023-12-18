const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

readModuleFile('./day9.txt', function (err, data) {
    const arr = data.toString()
        .split("\n")
        .filter(x => x)

    const nextValues = arr.map(line => {
        let sequence = line.split(' ').map(v => Number(v))
        let lastValueFromSequence = 0

        while (new Set(sequence).size !== 1) {
            sequence = sequence.reduce((acc, x, idx) => {
                if (sequence.length - 1 === idx) {
                    lastValueFromSequence += x
                    return acc
                }

                return [...acc, sequence[idx + 1] - x]
            }, [])
        }

        return sequence[0] + lastValueFromSequence
    })

    const result = nextValues.reduce((acc, x) => acc + x)
    console.log(result)
});
