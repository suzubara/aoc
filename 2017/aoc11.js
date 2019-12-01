const start = [0,0]

traverseHexGrid = (start, directions) => {
  directions = directions.split(',')

  let position = start

  let farthestDistance = 0

  directions.forEach(d => {
    switch (d) {
      case 'n':
        position = [position[0], position[1] + 1]
        break
      case 'ne':
        position = [position[0] + 0.5, position[1] + 0.5]
        break
      case 'se':
        position = [position[0] + 0.5, position[1] - 0.5]
        break
      case 's':
        position = [position[0], position[1] - 1]
        break
      case 'sw':
        position = [position[0] - 0.5, position[1] - 0.5]
        break
      case 'nw':
        position = [position[0] - 0.5, position[1] + 0.5]
        break
    }

    // Calculate distance from start
    const xTraveled = Math.abs(position[0])
    const yTraveled = Math.abs(position[1])
    const traveled = xTraveled + yTraveled
    if (traveled > farthestDistance) {
      farthestDistance = traveled
    }
  })

  return farthestDistance
}
