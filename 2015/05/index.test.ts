import { checkValid, countMatches, checkValidNew, countMatchesNew } from './index'
import input from './input'

describe('checkValid', () => {
  it('checks if the string is naughty or nice', () => {
    expect(checkValid('ugknbfddgicrmopn')).toEqual(true)
    expect(checkValid('aaa')).toEqual(true)
    expect(checkValid('jchzalrnumimnmhp')).toEqual(false)
    expect(checkValid('haegwjzuvuyypxyu')).toEqual(false)
    expect(checkValid('dvszwmarrgswjxmb')).toEqual(false)
  })
})

describe('countMatches', () => {
  it('returns the number of nice strings', () => {
    const testInput = `ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb`

    expect(countMatches(testInput)).toEqual(2)
  })

  it('with the puzzle input', () => {
    expect(countMatches(input)).toEqual(258)
  })
})

/*
ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
jchzalrnumimnmhp is naughty because it has no double letter.
haegwjzuvuyypxyu is naughty because it contains the string xy.
dvszwmarrgswjxmb is naughty because it contains only one vowel.
*/

/*
It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
*/

describe('checkValidNew', () => {
  it('checks if the string is naughty or nice', () => {
    expect(checkValidNew('qjhvhtzxzqqjkmpb')).toEqual(true)
    expect(checkValidNew('xxyxx')).toEqual(true)
    expect(checkValidNew('uurcxstgmygtbstg')).toEqual(false)
    expect(checkValidNew('ieodomkazucvgmuy')).toEqual(false)
  })
})

describe('countMatchesNew', () => {
  it('returns the number of nice strings', () => {
    const testInput = `qjhvhtzxzqqjkmpb
xxyxx
uurcxstgmygtbstg
ieodomkazucvgmuy`

    expect(countMatchesNew(testInput)).toEqual(2)
  })

  it('with the puzzle input', () => {
    expect(countMatchesNew(input)).toEqual(53)
  })
})

/*
qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
*/

/*
It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
*/