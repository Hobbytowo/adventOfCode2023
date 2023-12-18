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

    const nextValues = arr.map((line, lineIdx) => {
        let sequence = line.split(' ').map(v => Number(v))
        let firstValueFromSequence = []

        while (new Set(sequence).size !== 1) {
            sequence = sequence.reduce((acc, x, idx) => {
                if (idx === 0) firstValueFromSequence.push(x)

                if (sequence.length - 1 === idx) {
                    return acc
                }

                return [...acc, sequence[idx + 1] - x]
            }, [])
        }

        firstValueFromSequence.push(sequence[0])

        return firstValueFromSequence.reverse().reduce((acc, x) =>  x - acc, 0)
    })

    const result = nextValues.reduce((acc, x) => acc + x)
    console.log({result})
});
