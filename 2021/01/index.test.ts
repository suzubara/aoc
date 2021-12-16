import { convertInput, countDepthIncreases, sumWindows } from './index'
import input from './input'

const testInput = `199
200
208
210
200
207
240
269
260
263`

describe('countDepthIncreases', () => {
  it('returns the number of increases', () => {
    const nums = convertInput(testInput)
    expect(countDepthIncreases(nums)).toEqual(7)
  })

  it('returns the number of sum window increases', () => {
    const nums = convertInput(testInput)
    const sums = sumWindows(nums)
    expect(countDepthIncreases(sums)).toEqual(5)
  })

  it('with real input', () => {
    const nums = convertInput(input)
    expect(countDepthIncreases(nums)).toEqual(1502)
  })

  it('returns the number of sum window increases with real input', () => {
    const nums = convertInput(input)
    const sums = sumWindows(nums)
    expect(countDepthIncreases(sums)).toEqual(1538)
  })
})

describe('sumWindows', () => {
  it('sums up 3 measurement windows', () => {
    const nums = convertInput(testInput)
    expect(sumWindows(nums)).toEqual([607, 618, 618, 617, 647, 716, 769, 792])
  })
})
