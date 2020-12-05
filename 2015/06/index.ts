export const generateGrid = (x: number = 999, y: number = 999): number[][] => {
  const grid = []
  
  for (let i = 0; i <= y; i++) {
    const row = []
    for (let j = 0; j <= x; j++) {
      row.push(0)
    }
    grid.push(row)
  }

  return grid
}

export const applyDirections = (grid: number[][], directions: string): number[][] => {
  const dirRegex = /(?<cmd>turn on|turn off|toggle)\s(?<x0>\d+),(?<y0>\d+)\sthrough\s(?<x1>\d+),(?<y1>\d+)/
  const dirMatches = directions.match(dirRegex)
  if (!dirMatches) return grid

  const { cmd, x0, y0, x1, y1 } = dirMatches.groups

  for (let i = parseInt(y0); i <= parseInt(y1); i++) {
    for (let j = parseInt(x0); j <= parseInt(x1); j++) {
      switch (cmd) {
        case 'turn on':
          grid[i][j] = 1
          break
        case 'turn off':
          grid[i][j] = 0
          break
        case 'toggle':
          grid[i][j] = grid[i][j] === 1 ? 0 : 1
          break
      }
    }
  }

  return grid
}

export const applyAllDirections = (directions: string): number[][] => {
  let grid = generateGrid()

  const dirList = directions.split('\n')
  dirList.forEach((d) => {
    grid = applyDirections(grid, d)
  })

  return grid
}

export const countLights = (grid: number[][]): number => {
  return grid.reduce((prev, cur, i, arr) => {
    if (Array.isArray(cur)) {
      return cur.reduce((p, c) => {
        return c === 1 ? p + 1 : p
      }, prev)
    } else if (cur === 1) {
      prev += 1
    }

    return prev
  }, 0)
}

export const applyDirectionsBrightness = (grid: number[][], directions: string): number[][] => {
  const dirRegex = /(?<cmd>turn on|turn off|toggle)\s(?<x0>\d+),(?<y0>\d+)\sthrough\s(?<x1>\d+),(?<y1>\d+)/
  const dirMatches = directions.match(dirRegex)
  if (!dirMatches) return grid

  const { cmd, x0, y0, x1, y1 } = dirMatches.groups

  for (let i = parseInt(y0); i <= parseInt(y1); i++) {
    for (let j = parseInt(x0); j <= parseInt(x1); j++) {
      switch (cmd) {
        case 'turn on':
          grid[i][j] = grid[i][j] + 1
          break
        case 'turn off':
          grid[i][j] = grid[i][j] - 1
          if (grid[i][j] < 0) grid[i][j] = 0
          break
        case 'toggle':
          grid[i][j] = grid[i][j] + 2
          break
      }
    }
  }

  return grid
}

export const applyAllDirectionsBrightness = (directions: string): number[][] => {
  let grid = generateGrid()

  const dirList = directions.split('\n')
  dirList.forEach((d) => {
    grid = applyDirectionsBrightness(grid, d)
  })

  return grid
}

export const countLightsBrightness = (grid: number[][]): number => {
  return grid.reduce((prev, cur, i, arr) => {
    if (Array.isArray(cur)) {
      return cur.reduce((p, c) => {
        return p + c
      }, prev)
    }

    return prev + cur
  }, 0)
}

export const printGrid = (grid: number[][]): void => {
  let stringGrid = grid.map(row => {
    return row.join('')
  })

  console.log(stringGrid.join('\n'))
}