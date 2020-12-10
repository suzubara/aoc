import { numberIsValid, findFirstInvalidNumber, findContiguousAddends } from './index'
import input from './input'

describe('numberIsValid', () => {
  it('tests if a number can be summed by two numbers from the options', () => {
    const testNums = []
    for (let i = 1; i < 26; i++) {
      testNums.push(i)
    }

    expect(numberIsValid(26, testNums)).toBe(true)
    expect(numberIsValid(49, testNums)).toBe(true)
    expect(numberIsValid(100, testNums)).toBe(false)
    expect(numberIsValid(50, testNums)).toBe(false)
  })
})

describe('findFirstInvalidNumber', () => {
   it('returns the first invalid number', () => {
    const testNums = []
    for (let i = 1; i < 26; i++) {
      testNums.push(i)
    }

    testNums.push(26)
    testNums.push(49)
    testNums.push(100)
    testNums.push(50)

    expect(findFirstInvalidNumber(testNums, 25)).toBe(100)

    const testNums2 = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`.split('\n').map(i => parseInt(i))

    expect(findFirstInvalidNumber(testNums2, 5)).toBe(127)
  })

  it('with puzzle input', () => {
    const puzzleInput = input.split('\n').map(i => parseInt(i))
    expect(findFirstInvalidNumber(puzzleInput, 25)).toBe(18272118)
  })
})

describe('findContiguousAddends', () => {
  it('returns the right set', () => {
    const testNums2 = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`.split('\n').map(i => parseInt(i))

    const result = findContiguousAddends(testNums2, 127)
    expect(result).toEqual([15, 25, 47, 40])

    const sorted = result.sort((a, b) => a - b)
    expect(sorted[0] + sorted[sorted.length - 1]).toEqual(62)
  })

  it('with puzzle input', () => {
    const puzzleInput = input.split('\n').map(i => parseInt(i))
    const result = findContiguousAddends(puzzleInput, 18272118)
    expect(result).toEqual([
       720149,  731033, 1466212,
      1388501, 1349179,  816228,
       923226,  973294, 1004417,
      1122441,  948607,  979730,
      1398951, 1038383, 1079070,
      1116758, 1215939
    ])

    const sorted = result.sort((a, b) => a - b)
    expect(sorted[0] + sorted[sorted.length - 1]).toEqual(2186361)
  })
})