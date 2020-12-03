import { findPair, findThree } from './index'
import input from './input'

describe('findPair', () => {
  it('returns the product of the two numbers that sum to 2020', () => {
    const testInput = `1721
979
366
299
675
1456`

    expect(findPair(testInput)).toEqual(514579)
  })

  it('with puzzle input', () => {
    expect(findPair(input)).toEqual(1009899)
  })
})

describe('findThree', () => {
  it('returns the product of the two numbers that sum to 2020', () => {
    const testInput = `1721
979
366
299
675
1456`

    expect(findThree(testInput)).toEqual(241861950)
  })

  it('with puzzle input', () => {
    expect(findThree(input)).toEqual(44211152)
  })
})