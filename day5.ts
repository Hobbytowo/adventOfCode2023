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
    const parsedData = data.toString()
        .split("\n")
        .filter(x => x)
        .join(" ")
        .split(":")
        .map(x => x.match(/\d+/g))
        .filter(x => x)

    const parseMapping = arr => arr.map((item) => ({
        min: item[1]*1,
        max: item[1]*1 + item[2]*1 - 1,
        diff: item[0] - item[1]
    }))

    const seeds = parsedData[0]
    const seedToSoilMap = parseMapping(groupBy(parsedData[1], 3))
    const soilToFertilizerMap = parseMapping(groupBy(parsedData[2], 3))
    const fertilizerToWaterMap = parseMapping(groupBy(parsedData[3], 3))
    const waterToLightMap = parseMapping(groupBy(parsedData[4], 3))
    const lightToTemperatureMap = parseMapping(groupBy(parsedData[5], 3))
    const temperatureToHumidityMap = parseMapping(groupBy(parsedData[6], 3))
    const humidityToLocationMap = parseMapping(groupBy(parsedData[7], 3))

    const groupedSeeds = groupBy(seeds, 2)
    const seedsV2 = groupedSeeds.map(s => Array.from({length: s[1]}, ((_, idx)=> Number(s[0]) + idx))).flat()

    const mapFn = (arr, mapArr) => {
        return arr.map(x => {
            let val = x
            mapArr.forEach(map => {
                if (x >= map.min && x<= map.max) {
                    val = x + map.diff
                    return
                }
            })

            return val
        })
    }

    const soil = mapFn(seedsV2, seedToSoilMap)
    const fertilizer = mapFn(soil, soilToFertilizerMap)
    const water = mapFn(fertilizer, fertilizerToWaterMap)
    const light = mapFn(water, waterToLightMap)
    const temp = mapFn(light, lightToTemperatureMap)
    const hum = mapFn(temp, temperatureToHumidityMap)
    const location = mapFn(hum, humidityToLocationMap)

    console.log(Math.min(...location))
});
