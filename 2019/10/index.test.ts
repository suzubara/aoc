import { getAsteroidPositions, countAsteroidsFromPosition } from './index'

describe('getAsteroidPositions', () => {
  it('returns an array of coordinates for each asteroid', () => {
    const map = `
.#..#
.....
#####
....#
...##`

    expect(getAsteroidPositions(map)).toEqual([
      [1, 0],
      [4, 0],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [4, 3],
      [3, 4],
      [4, 4],
    ])
  })
})

describe('countAsteroidsFromPosition', () => {
  it('returns the number of asteroids you can see from each position', () => {
    const map = `.#..#
.....
#####
....#
...##`

    expect(countAsteroidsFromPosition(map, [1, 0])).toEqual(7)
  })
})
