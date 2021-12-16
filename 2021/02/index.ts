export const driveSub = (input: string): [number, number] => {
  const directions = input.split('\n')

  const pos: [number, number] = [0, 0]

  directions.forEach((dir) => {
    const [direction, val] = dir.split(' ')

    const numVal = parseInt(val)

    switch (direction) {
      case 'forward':
        pos[0] += numVal
        return
      case 'up':
        pos[1] -= numVal
        return
      case 'down':
        pos[1] += numVal
        return
    }
  })

  return pos
}

export const driveSubWithAim = (input: string): [number, number] => {
  const directions = input.split('\n')

  let aim = 0
  const pos: [number, number] = [0, 0]

  directions.forEach((dir) => {
    const [direction, val] = dir.split(' ')

    const numVal = parseInt(val)

    switch (direction) {
      case 'forward':
        pos[0] += numVal
        pos[1] += numVal * aim
        return
      case 'up':
        aim -= numVal
        return
      case 'down':
        aim += numVal
        return
    }
  })

  return pos
}
