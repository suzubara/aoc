import { getWrappingForPresent, parseInput, getWrappingTotal, getRibbonForPresent, getRibbonTotal } from './index'
import input from './input'

describe('getWrappingForPresent', () => {
  it('calculates the necessary wrapping paper for one set of dimensions', () => {
    expect(getWrappingForPresent(2, 3, 4)).toEqual(58)
    expect(getWrappingForPresent(1, 1, 10)).toEqual(43)
  })
})

describe('parseInput', () => {
  it('converts the dimensions to an array of numbers', () => {
    expect(parseInput('2x3x4')).toEqual([[2, 3, 4]])
    expect(parseInput('1x1x10')).toEqual([[1, 1, 10]])
  })
})

describe('getWrappingTotal', () => {
  it('gets the total wrapping paper', () => {
    const testInput = `2x3x4
1x1x10`
    expect(getWrappingTotal(testInput)).toEqual(101)
  })

  it('with the puzzle input', () => {
    expect(getWrappingTotal(input)).toEqual(1606483)
  })
})

describe('getRibbonForPresent', () => {
  it('calculates the necessary ribbon for one set of dimensions', () => {
    expect(getRibbonForPresent(2, 3, 4)).toEqual(34)
    expect(getRibbonForPresent(1, 1, 10)).toEqual(14)
  })
})

describe('getRibbonTotal', () => {
  it('gets the total ribbon', () => {
    const testInput = `2x3x4
1x1x10`
    expect(getRibbonTotal(testInput)).toEqual(48)
  })

  it('with the puzzle input', () => {
    expect(getRibbonTotal(input)).toEqual(3842356)
  })
})
