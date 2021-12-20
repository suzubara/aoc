type Coord = [number, number]

type Line = [Coord, Coord]

type Intersections = {
  [key: string]: number
}

export const parseInput = (input: string): Line[] => {
  const lineRegex = /(?<x1>\d+),(?<y1>\d+)\s->\s(?<x2>\d+),(?<y2>\d+)/

  const lines = input.split('\n').map((line): Line => {
    const groups = line.match(lineRegex).groups
    //console.log('groups', line, groups)
    const { x1, y1, x2, y2 } = groups

    return [
      [parseInt(x1), parseInt(y1)],
      [parseInt(x2), parseInt(y2)],
    ]
  })

  return lines
}

const sortFunction = (a, b) => a - b

export const mapLine = (line: Line): Coord[] => {
  const coords: Coord[] = []
  const [[x1, y1], [x2, y2]] = line

  if (x1 === x2) {
    // vertical
    const segment = [y1, y2].sort(sortFunction)
    for (let i = segment[0]; i <= segment[1]; i++) {
      coords.push([x1, i])
    }
  } else if (y1 === y2) {
    // horizontal
    const segment = [x1, x2].sort(sortFunction)
    for (let i = segment[0]; i <= segment[1]; i++) {
      coords.push([i, y1])
    }
  } else {
    // diagonal
    const xOp = x1 > x2 ? 'SUB' : 'ADD'
    const lineLength = Math.abs(x1 - x2)
    const yOp = y1 > y2 ? 'SUB' : 'ADD'

    console.log('diagonal', line, lineLength, xOp, yOp)

    for (let length = 0; length <= lineLength; length++) {
      let x = xOp === 'ADD' ? x1 + length : x1 - length
      let y = yOp === 'ADD' ? y1 + length : y1 - length
      coords.push([x, y])
    }
  }

  return coords
}

export const countIntersections = (
  lines: Line[],
  includeDiagonal?: boolean
): number => {
  const coordinates: Intersections = {}

  lines
    .filter((line) => {
      if (!includeDiagonal) {
        const [[x1, y1], [x2, y2]] = line
        return x1 === x2 || y1 === y2
      }
      return true
    })
    .forEach((line) => {
      const coords = mapLine(line)

      if (coords.length) {
        // console.log('LINE', line, coords, coords.length)

        coords.forEach((c) => {
          const coordString = `${c[0]},${c[1]}`
          if (coordinates[coordString]) {
            coordinates[coordString] += 1
          } else {
            coordinates[coordString] = 1
          }
        })
      }
    })

  // console.log(coordinates)
  // console.log(Object.keys(coordinates).length)

  const intersections = Object.keys(coordinates).filter((c) => {
    return coordinates[c] > 1
  })

  /*
  intersections.forEach((c) => {
    console.log(c, coordinates[c])
  })
  */

  // console.log('intersections', intersections, intersections.length)

  return intersections.length
}
