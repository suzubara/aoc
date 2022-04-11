import { parseInput, mapLine, countIntersections } from './index'
import input from './input'

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

describe('with test input', () => {
  it('converts input into coords', () => {
    expect(parseInput(testInput)).toEqual([
      [
        [0, 9],
        [5, 9],
      ],
      [
        [8, 0],
        [0, 8],
      ],
      [
        [9, 4],
        [3, 4],
      ],
      [
        [2, 2],
        [2, 1],
      ],
      [
        [7, 0],
        [7, 4],
      ],
      [
        [6, 4],
        [2, 0],
      ],
      [
        [0, 9],
        [2, 9],
      ],
      [
        [3, 4],
        [1, 4],
      ],
      [
        [0, 0],
        [8, 8],
      ],
      [
        [5, 5],
        [8, 2],
      ],
    ])
  })

  it('returns coordinates a line crosses', () => {
    expect(
      mapLine([
        [1, 1],
        [1, 3],
      ])
    ).toEqual([
      [1, 1],
      [1, 2],
      [1, 3],
    ])

    expect(
      mapLine([
        [9, 7],
        [7, 7],
      ])
    ).toEqual([
      [7, 7],
      [8, 7],
      [9, 7],
    ])

    expect(
      mapLine([
        [1, 1],
        [3, 3],
      ])
    ).toEqual([
      [1, 1],
      [2, 2],
      [3, 3],
    ])

    expect(
      mapLine([
        [9, 7],
        [7, 9],
      ])
    ).toEqual([
      [9, 7],
      [8, 8],
      [7, 9],
    ])
  })

  it('returns number of intersections', () => {
    expect(countIntersections(parseInput(testInput))).toEqual(5)
  })

  it('returns number of intersections with diagonal lines', () => {
    expect(countIntersections(parseInput(testInput), true)).toEqual(12)
  })
})

describe('with real input', () => {
  it('returns number of intersections', () => {
    const parsed = parseInput(input)
    expect(countIntersections(parsed)).toEqual(6113)
  })

  it('returns number of intersections with diagonal lines', () => {
    const parsed = parseInput(input)
    expect(countIntersections(parsed, true)).toEqual(20373)
  })
})
