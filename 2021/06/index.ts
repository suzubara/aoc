const DAYS = 7
const DAY_INCREASE = 2

export const countFish = (start: string, days: number): number => {
  const startFish = start.split(',').map((i) => parseInt(i))

  let fishState: number[] = [...startFish]

  for (let i = 0; i < days; i++) {
    // console.log('START DAY:', i)
    let newState = [...fishState]

    fishState.forEach((fish, index) => {
      if (fish === 0) {
        // restart
        newState[index] = DAYS - 1
        newState.push(DAYS - 1 + DAY_INCREASE)
      } else {
        newState[index] = fish - 1
      }

      // console.log('fish', fish, newState[index])
    })

    fishState = newState
  }

  console.log('final', fishState)

  return fishState.length
}
