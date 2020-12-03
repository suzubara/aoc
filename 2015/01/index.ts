export const getResultingFloor = function(directions: string): number {
  const directionsList = directions.split('')
  let currentFloor = 0

  directionsList.forEach((dir) => {
    if (dir === '(') currentFloor += 1
    else if (dir === ')') currentFloor -= 1
  })

  return currentFloor
}

export const breakAtFloor = function(directions: string, breakFloor: number = -1): number {
  const directionsList = directions.split('')
  let currentFloor = 0
  let i = 0

  for (i; i < directionsList.length; i++) {
    const dir = directionsList[i]
    if (dir === '(') currentFloor += 1
    else if (dir === ')') currentFloor -= 1
    if (currentFloor === breakFloor) break
  }

  return i + 1
}