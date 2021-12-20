export const strToArr = (input: string): string[] => input.split('\n')

export const findGammaRate = (input: string): number => {
  const arr = strToArr(input)

  let gammaRate = ''
  const positions = arr[0].length

  for (let i = 0; i < positions; i++) {
    const numZeroes = arr.filter((n) => n[i] === '0').length
    const numOnes = arr.filter((n) => n[i] === '1').length

    if (numZeroes > numOnes) gammaRate += '0'
    else gammaRate += '1'
  }

  return parseInt(gammaRate, 2)
}

export const findEpsilonRate = (input: string): number => {
  const arr = strToArr(input)

  let epsilonRate = ''
  const positions = arr[0].length

  for (let i = 0; i < positions; i++) {
    const numZeroes = arr.filter((n) => n[i] === '0').length
    const numOnes = arr.filter((n) => n[i] === '1').length

    if (numZeroes < numOnes) epsilonRate += '0'
    else epsilonRate += '1'
  }

  return parseInt(epsilonRate, 2)
}

export const findOxygenGeneratorRating = (input: string): number => {
  const arr = strToArr(input)
  return filterValues(arr, 'MostCommon', '1')
}

export const findCO2ScrubberRating = (input: string): number => {
  const arr = strToArr(input)
  return filterValues(arr, 'LeastCommon', '0')
}

type Criteria = 'MostCommon' | 'LeastCommon'

export const filterValues = (
  arr: string[],
  criteria: Criteria,
  fallbackCriteria: '0' | '1'
) => {
  let finalValue
  let filteredValues = arr
  const positions = arr[0].length

  for (let i = 0; i < positions; i++) {
    // console.log(filteredValues)

    const numZeroes = filteredValues.filter((n) => n[i] === '0').length
    const numOnes = filteredValues.filter((n) => n[i] === '1').length

    let valueToFilterOn
    if (numZeroes === numOnes) valueToFilterOn = fallbackCriteria
    else if (numZeroes > numOnes)
      valueToFilterOn = criteria === 'MostCommon' ? '0' : '1'
    else if (numZeroes < numOnes)
      valueToFilterOn = criteria === 'LeastCommon' ? '0' : '1'

    // console.log(numZeroes, numOnes, criteria, fallbackCriteria)
    // console.log('FILTER ON', valueToFilterOn, 'in position', i)

    filteredValues = filteredValues.filter((val) => {
      const match = val[i] == valueToFilterOn
      return match
    })

    if (filteredValues.length === 1) {
      finalValue = filteredValues[0]
      break
    }
  }

  // console.log('FINAL', finalValue)

  return parseInt(finalValue, 2)
}
