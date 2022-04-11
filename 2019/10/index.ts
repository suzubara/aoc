type Coordinates = [number, number]

const SPACE = '.'
const ASTEROID = '#'

export const getAsteroidPositions = function(data: string): Coordinates[] {
  const coords: Coordinates[] = []

  const rows = data.split('\n')
  rows.forEach((r, i) => {
    let lastIndex = 0
    while (lastIndex !== -1) {
      lastIndex = r.indexOf(ASTEROID, lastIndex)
      if (lastIndex !== -1) {
        coords.push([lastIndex, i])
        lastIndex++
      }
    }
  })

  return coords
}

function moveDir(
  rows: string[],
  origin: Coordinates,
  distance: number,
  direction: 'up' | 'left' | 'down' | 'right'
): Coordinates[] {
  const [x, y] = origin
  const coordinatesTouched: Coordinates[] = []

  let traveled = 0
  let newY = y
  let newX = x

  while (traveled <= distance) {
    if (direction === 'up') newY = newY - 1
    else if (direction === 'down') newY = newY + 1
    else if (direction === 'left') newX = newX - 1
    else if (direction === 'right') newX = newX + 1

    // validate coordinate
    if (newX > 0 && newX < rows[0].length && newY > 0 && newY < rows.length) {
      coordinatesTouched.push([newX, newY])
    } else {
      break
    }

    traveled++
  }

  return coordinatesTouched
}

export const countAsteroidsFromPosition = function(
  map: string,
  origin: Coordinates
): number {
  let count = 0
  const [x, y] = origin

  const rows = map.split('\n')
  const asteroids = getAsteroidPositions(map)

  let directions = ['up', 'right', 'down', 'left']
  let distance = 1
  let direction = 0
  const coordinatesTouched = []

  while (distance < 5) {
    console.log('MOVE', distance, directions[direction])
    coordinatesTouched.push(
      ...moveDir(rows, origin, distance, directions[direction])
    )
    if (direction === 1 || direction === 3) distance++
    direction = (direction + 1) % 4
  }

  console.log(coordinatesTouched)

  /*
  for (let distance = 1; distance < 5; distance++) {
    const up = y - distance
    const down = y + distance
    const left = x - distance
    const right = x + distance
    const upValid = up > -1
    const downValid = down < rows.length
    const leftValid = left > -1
    const rightValid = right < rows.length
    let asteroidCoords

    if (upValid) {
      // nw, n, ne
      count += [rows[up][left], rows[up][x], rows[up][right]].filter(
        i => i === ASTEROID
      ).length
    }

    if (downValid) {
      // sw, s, se
      count += [rows[down][left], rows[down][x], rows[down][right]].filter(
        i => i === ASTEROID
      ).length
    }

    /*
    if (up > -1 && rows[up][originX] === ASTEROID) {
      
      count++
    }
    if (down < rows.length && rows[down] === ASTEROID) {
      count++
    }
    if (left > -1 && rows[originY][left] === ASTEROID) {
      count++
    }
    if (right < rows[0].length && rows[originY][right] === ASTEROID) {
      count++
    }
  }*/

  return count
}
