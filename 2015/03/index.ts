export const getUniqueLocations = function(directions: string, santas: number = 1): number {
  const start = [0,0]
  let currentLocations = []
  for (let i = santas; i > 0; i--) {
    currentLocations.push([...start])
  }

  const locations = [`${start[0]}x${start[1]}`]

  const directionsList = directions.split('')
  directionsList.forEach((d, index) => {
    const santaIndex = index % santas
    switch (d) {
      case '^':
        currentLocations[santaIndex][1] += 1
        break
      case '>':
        currentLocations[santaIndex][0] += 1
        break
      case 'v':
        currentLocations[santaIndex][1] -= 1
        break
      case '<':
        currentLocations[santaIndex][0] -= 1
        break
    }

    const locString = `${currentLocations[santaIndex][0]}x${currentLocations[santaIndex][1]}`
    if (locations.indexOf(locString) < 0) locations.push(locString)
  })

  return locations.length
}