export const findSeatId = (boardingPass: string): number => {
  const seatRegex = /(?<row>(F|B){7})(?<col>(L|R){3})/
  const seatMatches = boardingPass.match(seatRegex)

  if (!seatMatches) {
    console.error('no matches found', boardingPass)
  }

  const { row, col } = seatMatches.groups

  const seatRow = binaryPartitionSeats(row, 128)
  const seatCol = binaryPartitionSeats(col, 8)
  const seatId = (seatRow * 8) + seatCol

  return seatId
}

export const binaryPartitionSeats = (position: string, size: number): number => {
  const partitions = position.split('')
  let range = [0, size - 1]

  partitions.forEach((p, index)=> {
    const half = (range[1] - range[0]) / 2
    switch (p) {
      case 'F':
      case 'L':
        range = [range[0], range[0] + Math.floor(half)]
        break

      case 'B':
      case 'R':
        range = [range[1] - Math.floor(half), range[1]]
        break
    }
  })

  return range[0]
}

export const findHighestSeatId = (boardingPasses: string): number => {
  let highestId = 0

  const passes = boardingPasses.split('\n')
  passes.forEach((p) => {
    const seatId = findSeatId(p)
    if (seatId > highestId) highestId = seatId
  })

  return highestId
}

export const findMissingSeatId = (boardingPasses: string): number => {
  let seatIds = []
  let missingIds = []

  const passes = boardingPasses.split('\n')
  passes.forEach((p) => {
    seatIds.push(findSeatId(p))
  })

  seatIds = seatIds.sort((a, b) => a - b)
  const min = seatIds[0]
  const max = seatIds[seatIds.length - 1]

  for (let i = min; i < max; i++) {
    if (seatIds.indexOf(i) < 0) missingIds.push(i)
  }

  return missingIds[0]
}