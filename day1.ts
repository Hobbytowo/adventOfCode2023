const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

readModuleFile('./day1.txt', function (err, data) {
    const arr = data.toString().split("\n")

    const result = arr.reduce((sum, line) => {
        if (!line) return sum

        const parseDigit = digit => digit
            .replace("one", "1")
            .replace("two", "2")
            .replace("three", "3")
            .replace("four", "4")
            .replace("five", "5")
            .replace("six", "6")
            .replace("seven", "7")
            .replace("eight", "8")
            .replace("nine", "9")

        const regexpr = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
        //const digits = line.match(regexpr).map(d => parseDigit(d))
        const digits = Array.from(line.matchAll(regexpr), x => parseDigit(x[1]))

        // /\d{3}/g
        //var re = /(?=(\d{3}))/g;
        //console.log( Array.from('12345'.matchAll(re), x => x[1]) );

        const firstDigit = digits[0]
        const lastDigit = digits[digits.length - 1]

        console.log(line, digits, firstDigit, lastDigit, `${firstDigit}${lastDigit}`)
        return sum + Number(`${firstDigit}${lastDigit}`)
    }, 0)

    console.log({result})
});
