import { countUniqueAnswers, countAllAnswers, countYesAnswers, countAllYesAnswers } from './index'
import input from './input'

describe('countUniqueAnswers', () => {
  it('returns the number of unique answers', () => {
    expect(countUniqueAnswers('abc')).toEqual(3)
    expect(countUniqueAnswers(`a
b
c`)).toEqual(3)
    expect(countUniqueAnswers(`ab
ac`)).toEqual(3)
    expect(countUniqueAnswers(`a
a
a
a`)).toEqual(1)
    expect(countUniqueAnswers('b')).toEqual(1)
  })
})

describe('countAllAnswers', () => {
  it('returns the total count', () => {
    expect(countAllAnswers(`abc

a
b
c

ab
ac

a
a
a
a

b`)).toEqual(11)
  })

  it('with puzzle input', () => {
    expect(countAllAnswers(input)).toEqual(6291)
  })
})

describe('countYesAnswers', () => {
  it('returns the number of yes answers', () => {
    expect(countYesAnswers('abc')).toEqual(3)
    expect(countYesAnswers(`a
b
c`)).toEqual(0)
    expect(countYesAnswers(`ab
ac`)).toEqual(1)
    expect(countYesAnswers(`a
a
a
a`)).toEqual(1)
    expect(countYesAnswers('b')).toEqual(1)
  })
})

describe('countAllYesAnswers', () => {
  it('returns the total count', () => {
    expect(countAllYesAnswers(`abc

a
b
c

ab
ac

a
a
a
a

b`)).toEqual(6)
  })

  it('with puzzle input', () => {
    expect(countAllYesAnswers(input)).toEqual(3052)
  })
})