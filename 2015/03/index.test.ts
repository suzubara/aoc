import { getUniqueLocations } from './index'
import input from './input'

describe('getUniqueLocations', () => {
  it('returns the number of unique coordinates visited', () => {
    expect(getUniqueLocations('>')).toEqual(2)
    expect(getUniqueLocations('^>v<')).toEqual(4)
    expect(getUniqueLocations('^v^v^v^v^v')).toEqual(2)
  })

  it('with puzzle input', () => {
    expect(getUniqueLocations(input)).toEqual(2081)
  })

  describe('with two santas', () => {
    it('returns the number of unique coordinates visited', () => {
      expect(getUniqueLocations('^v', 2)).toEqual(3)
      expect(getUniqueLocations('^>v<', 2)).toEqual(3)
      expect(getUniqueLocations('^v^v^v^v^v', 2)).toEqual(11)
    })

    it('with puzzle input', () => {
      expect(getUniqueLocations(input, 2)).toEqual(2341)
    })
  })
})