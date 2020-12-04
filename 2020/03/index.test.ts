import { countTrees, getProbabilityForSlopes } from './index'
import input from './input'

describe('countTrees', () => {
  it('returns the number of trees encountered', () => {
    const testMap = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

    expect(countTrees(testMap)).toEqual(7)
    expect(countTrees(testMap, [1, 1])).toEqual(2)
    expect(countTrees(testMap, [5, 1])).toEqual(3)
    expect(countTrees(testMap, [7, 1])).toEqual(4)
    expect(countTrees(testMap, [1, 2])).toEqual(2)
  })

  it('with puzzle input', () => {
    expect(countTrees(input)).toEqual(203)
  })
})

describe('getProbabilityForSlopes', () => {
  it('returns the probability of encountering trees', () => {
    const testMap = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

    const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]

    expect(getProbabilityForSlopes(testMap, slopes)).toEqual(336)
  })

  it('with puzzle input', () => {
    const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
    expect(getProbabilityForSlopes(input, slopes)).toEqual(3316272960)
  })
})

/*
Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.


*/