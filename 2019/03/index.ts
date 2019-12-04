const UP = 'U'
const DOWN = 'D'
const RIGHT = 'R'
const LEFT = 'L'

type coords = [number, number]
type coordSet = coords[]

export const getAllCoords = function(directions: string): coordSet {
  const dirArray = directions.split(',')

  const position: coords = [0, 0]
  const coordinates: coordSet = []

  dirArray.forEach(dir => {
    const direction = dir.slice(0, 1)
    const distance = parseInt(dir.slice(1, dir.length))

    for (let i = 1; i <= distance; i += 1) {
      switch (direction) {
        case UP:
          position[1]++
          break
        case DOWN:
          position[1]--
          break
        case LEFT:
          position[0]--
          break
        case RIGHT:
          position[0]++
      }

      const currentPosition: coords = [position[0], position[1]]
      coordinates.push(currentPosition)
    }
  })

  return coordinates
}

export const findCommonCoords = function(
  coordsA: coordSet,
  coordsB: coordSet
): coordSet {
  const results: coordSet = coordsA.filter(
    c => coordsB.findIndex(d => d[0] === c[0] && d[1] === c[1]) > -1
  )

  return results
}

export const findFastestDistance = function(
  coordsA: coordSet,
  coordsB: coordSet
): number {
  let closestSteps: number = -1

  coordsA.forEach((c, i) => {
    const intersects = coordsB.findIndex(d => d[0] === c[0] && d[1] === c[1])
    if (intersects > -1) {
      const distance = i + 1 + intersects + 1
      if (closestSteps === -1 || distance < closestSteps)
        closestSteps = distance
    }
  })

  return closestSteps
}

export const getManhattanDistance = function(coords: coords): number {
  return Math.abs(coords[0]) + Math.abs(coords[1])
}

export const findSmallestDistance = function(coords: coordSet): number {
  let smallestDistance: number = -1
  coords.forEach((c, i) => {
    const distance = getManhattanDistance(c)
    if (i === 0 || distance < smallestDistance) smallestDistance = distance
  })

  return smallestDistance
}

export const findClosestIntersection = function(
  directions1: string,
  directions2: string
): number {
  const coords1 = getAllCoords(directions1)
  const coords2 = getAllCoords(directions2)
  const commonCoords = findCommonCoords(coords1, coords2)
  const closestDistance = findSmallestDistance(commonCoords)
  return closestDistance
}

export const findClosestIntersectionSteps = function(
  directions1: string,
  directions2: string
): number {
  const coords1 = getAllCoords(directions1)
  const coords2 = getAllCoords(directions2)
  const fastestDistance = findFastestDistance(coords1, coords2)
  return fastestDistance
}
