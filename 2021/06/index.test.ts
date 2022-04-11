import { countFish } from './index'
import input from './input'

const testInput = `3,4,3,1,2`

describe('with test input', () => {
  it.only('counts fish after x days', () => {
    expect(countFish(testInput, 1)).toEqual(5)
    expect(countFish(testInput, 2)).toEqual(6)
    expect(countFish(testInput, 3)).toEqual(7)
    expect(countFish(testInput, 4)).toEqual(9)
    expect(countFish(testInput, 5)).toEqual(10)
    expect(countFish(testInput, 6)).toEqual(10)
    expect(countFish(testInput, 7)).toEqual(10)
    expect(countFish(testInput, 8)).toEqual(10)
    expect(countFish(testInput, 9)).toEqual(11)
    expect(countFish(testInput, 10)).toEqual(12)
    expect(countFish(testInput, 11)).toEqual(15)
    expect(countFish(testInput, 12)).toEqual(17)
    expect(countFish(testInput, 13)).toEqual(19)
    expect(countFish(testInput, 14)).toEqual(20)
    expect(countFish(testInput, 15)).toEqual(20)
    expect(countFish(testInput, 16)).toEqual(21)
    expect(countFish(testInput, 17)).toEqual(22)
    expect(countFish(testInput, 18)).toEqual(26)
    expect(countFish(testInput, 80)).toEqual(5934)
    expect(countFish(testInput, 256)).toEqual(26984457539)
  })
})

describe('real input', () => {
  it('counts fish after 80 days', () => {
    expect(countFish(input, 80)).toEqual(345387)
  })
})
