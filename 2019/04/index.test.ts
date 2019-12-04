import {
  matchPassword,
  noDecreasingDigits,
  matchPasswordPartTwo,
  containsTwoDigits,
} from './index'

describe('matchPassword', () => {
  it('tests the value against the password requirements', () => {
    expect(matchPassword('11111')).toEqual(false)
    expect(matchPassword('1111111')).toEqual(false)
    expect(matchPassword('111111')).toEqual(true)
    expect(matchPassword('223450')).toEqual(false)
    expect(matchPassword('123789')).toEqual(false)
  })
})

describe('matchPasswordPartTwo', () => {
  it('tests the value against the password requirements', () => {
    expect(matchPasswordPartTwo('11111')).toEqual(false)
    expect(matchPasswordPartTwo('1111111')).toEqual(false)
    expect(matchPasswordPartTwo('112233')).toEqual(true)
    expect(matchPasswordPartTwo('111122')).toEqual(true)

    expect(matchPasswordPartTwo('123444')).toEqual(false)
  })
})

describe('noDecreasingDigits', () => {
  it('returns whether digits in a string never decrease', () => {
    expect(noDecreasingDigits('11111')).toEqual(true)
    expect(noDecreasingDigits('1111111')).toEqual(true)
    expect(noDecreasingDigits('111111')).toEqual(true)
    expect(noDecreasingDigits('223450')).toEqual(false)
    expect(noDecreasingDigits('123789')).toEqual(true)
  })
})

/* Actual input */

describe('part 1', () => {
  const min = 124075
  const max = 580769
  let matchCount = 0

  for (let i = min; i <= max; i++) {
    const meetsRequirements = matchPassword(`${i}`)
    if (meetsRequirements) {
      matchCount++
    }
  }

  console.log('MATCH COUNT IS', matchCount)
})

describe('part 2', () => {
  const min = 124075
  const max = 580769
  let matchCount = 0

  for (let i = min; i <= max; i++) {
    const meetsRequirements = matchPasswordPartTwo(`${i}`)
    if (meetsRequirements) {
      matchCount++
    }
  }

  console.log('MATCH COUNT PART TWO IS', matchCount)
})
