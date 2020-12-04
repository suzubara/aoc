export const countTrees = (map: string, slope: number[] = [3, 1]): number => {
  let currentPos = [0,0]
  let treeCount = 0

  const mapRows = map.split('\n')
  const distance = mapRows.length
  const mapWidth = mapRows[0].length

  while (currentPos[1] < (distance - 1)) {
    // traverse
    currentPos[0] += slope[0]
    currentPos[1] += slope[1]

    // check tree at position
    const xCoord = currentPos[0] % mapWidth    
    const mapPosition = mapRows[currentPos[1]][xCoord]

    if (mapPosition === '#') treeCount += 1
  }

  return treeCount
}

export const getProbabilityForSlopes = (map: string, slopes: number[][]): number => {
  const output = slopes.reduce((prev, cur, i, arr) => {
    const treeCount = countTrees(map, cur)
    return prev * treeCount
  }, 1)

  return output
}