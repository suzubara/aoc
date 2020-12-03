import { checkValid, countMatches, checkValidPosition, countMatchesPosition } from './index'
import input from './input'

describe('checkValid', () => {
  it('checks if the password is valid for the given policy', () => {
    expect(checkValid('1-3 a: abcde')).toEqual(true)
    expect(checkValid('1-3 a: abcdaaea')).toEqual(false)
    expect(checkValid('1-3 b: cdefg')).toEqual(false)
    expect(checkValid('2-9 c: ccccccccc')).toEqual(true)
    expect(checkValid('2-9 c: cfcacfcdc')).toEqual(true)
  })
})

describe('countMatches', () => {
  it('returns the number of valid passwords', () => {
    const testInput = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
2-9 c: cfcacfcdc`

    expect(countMatches(testInput)).toEqual(3)
  })

  it('with the puzzle input', () => {
    expect(countMatches(input)).toEqual(628)
  })
})

describe('checkValidPosition', () => {
  it('checks if the password is valid for the given policy', () => {
    expect(checkValidPosition('1-3 a: abcde')).toEqual(true)
    expect(checkValidPosition('1-3 a: abcdaaea')).toEqual(true)
    expect(checkValidPosition('1-3 b: cdefg')).toEqual(false)
    expect(checkValidPosition('2-9 c: ccccccccc')).toEqual(false)
    expect(checkValidPosition('2-9 c: cfcacfcdc')).toEqual(true)
  })
})

describe('countMatchesPosition', () => {
  it('returns the number of valid passwords', () => {
    const testInput = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
2-9 c: cfcacfcdc`

    expect(countMatchesPosition(testInput)).toEqual(2)
  })

  it('with the puzzle input', () => {
    expect(countMatchesPosition(input)).toEqual(705)
  })
})
