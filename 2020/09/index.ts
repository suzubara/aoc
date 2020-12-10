export const numberIsValid = (sum: number, nums: number[]): boolean => {
  let foundAddends = false

  for (let i = 0; i < nums.length; i++) {
    let add1 = nums[i]
    for (let j = 0; j < nums.length; j++) {
      let add2 = nums[j]

      // console.log('TRY', add1, add2)
      
      if (add1 === add2) break
      if (add1 + add2 === sum) {
        // console.log('ADDENDS FOUND')
        foundAddends = true
        break
      }
    }

    if (foundAddends) break
  }

  return foundAddends
}

export const findFirstInvalidNumber = (data: number[], preambleLength: number): number => {
  let currentIndex = preambleLength
  let invalidNum = false

  while (invalidNum === false) {
    // console.log('check num', data[currentIndex])

    let nums = [...data].splice(currentIndex - preambleLength, preambleLength)
    const isValid = numberIsValid(data[currentIndex], nums)
    if (!isValid) {
      invalidNum = true
    } else {
      currentIndex += 1
    }
  }

  return data[currentIndex]
}

export const findContiguousAddends = (data: number[], targetSum: number): number[] => {
  let startIndex
  let length

  for (let i = 0; i < data.length; i++) {
    let index = i
    let sum = 0
    let addendsLength = 0

    while (sum < targetSum) {
      sum += data[index]
      index += 1
      addendsLength += 1
    }

    if (sum === targetSum) {
      startIndex = i
      length = addendsLength
      break
    }
  }

  return data.splice(startIndex, length)
}