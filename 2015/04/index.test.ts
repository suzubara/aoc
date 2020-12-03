import { checkHash, findLowestHash } from './index'

describe('checkHash', () => {
  it('returns true if hash starts with 5 0s', () => {
    expect(checkHash('abcdef', 609043)).toEqual(true)
    expect(checkHash('abcdef', 609042)).toEqual(false)
    expect(checkHash('pqrstuv', 1048970)).toEqual(true)
  })
})

describe('findLowestHash', () => {
  it('finds the lowest valid number', () => {
    expect(findLowestHash('abcdef')).toEqual(609043)
    expect(findLowestHash('pqrstuv')).toEqual(1048970)
  })

  it('with the puzzle input', () => {
    expect(findLowestHash('ckczppom')).toEqual(117946)
  })

  describe('checking for six 0s', () => {
    const checkSixZeros = (hash: string): boolean => `${hash}`.substring(0,6) === '000000'

    it('with the puzzle input', () => {
      expect(findLowestHash('ckczppom', checkSixZeros)).toEqual(3938038)
    })
  })
})