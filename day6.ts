const races = [
    { time: 47, distance: 207 },
    { time: 84, distance: 1394 },
    { time: 74, distance: 1209 },
    { time: 67, distance: 1014 },
]
const racesPart2 = [{time: 47847467, distance: 207139412091014}]

const winRaces = racesPart2.map(race => {
    let winNumber = 0

    for (let accTime = 0; accTime <= race.time; accTime++) {
        const speed = accTime
        const dist = (race.time - accTime) * speed

        if (dist > race.distance) winNumber++
    }

    return winNumber
})

const result = winRaces.reduce((acc, val) => (acc * val), 1)
console.log(winRaces, result)
