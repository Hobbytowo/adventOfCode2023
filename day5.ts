const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

const groupBy = (arr, number) => {
    return arr.reduce((r, e, i) => {
        return (i % number ? r[r.length - 1].push(e) : r.push([e])) && r
    }, []);
}

readModuleFile('./day5.txt', function (err, data) {
    const parsedData = data.toString().split("\n").filter(x => x).join(" ").split(":").map(x => x.match(/\d+/g)).filter(x => x);

    const seeds = parsedData[0]
    const seedToSoilMap = groupBy(parsedData[1], 3)
    const soilToFertilizerMap = groupBy(parsedData[2], 3)
    const fertilizerToWaterMap = groupBy(parsedData[3], 3)
    const waterToLightMap = groupBy(parsedData[4], 3)
    const lightToTemperatureMap = groupBy(parsedData[5], 3)
    const temperatureToHumidityMap = groupBy(parsedData[6], 3)
    const humidityToLocationMap = groupBy(parsedData[7], 3)

    const mapFn = (arr, mapArr) => {
        return arr.map(x => {
            let val = Number(x)
            mapArr.forEach(map => {
                const min = Number(map[1])
                const max = Number(map[1]) + Number(map[2]) - 1

                if (x >= min && x<= max) {
                    val = Number(x) + (map[0] - map[1])
                }
            })

            return val
        })
    }

    const soil = mapFn(seeds, seedToSoilMap)
    const fertilizer = mapFn(soil, soilToFertilizerMap)
    const water = mapFn(fertilizer, fertilizerToWaterMap)
    const light = mapFn(water, waterToLightMap)
    const temp = mapFn(light, lightToTemperatureMap)
    const hum = mapFn(temp, temperatureToHumidityMap)
    const location = mapFn(hum, humidityToLocationMap)

    console.log(Math.min(...location))
});
