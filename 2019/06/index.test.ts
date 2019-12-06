import {
  getOrbitArray,
  countTotalOrbits,
  orbitTransfer,
  removeRedundantPaths,
} from './index'

import input from './input'

describe('removeRedundantPaths', () => {
  it('removes redundant items in an array', () => {
    expect(
      removeRedundantPaths([
        'YOU',
        'K',
        'J',
        'E',
        'F',
        'M',
        'O',
        'M',
        'F',
        'N',
        'F',
        'E',
        'D',
        'I',
      ])
    ).toEqual(['YOU', 'K', 'J', 'E', 'D', 'I'])
  })
})

describe('getOrbitArray', () => {
  it('converts a string map to an array', () => {
    const testMap = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`

    expect(getOrbitArray(testMap)).toEqual([
      ['COM', 'B'],
      ['B', 'C'],
      ['C', 'D'],
      ['D', 'E'],
      ['E', 'F'],
      ['B', 'G'],
      ['G', 'H'],
      ['D', 'I'],
      ['E', 'J'],
      ['J', 'K'],
      ['K', 'L'],
    ])
  })
})

describe('countTotalOrbits', () => {
  it('counts the number of direct and indirect orbits in a map', () => {
    const testMap = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`

    expect(countTotalOrbits(testMap)).toEqual(42)
  })
})

describe('orbitTransfer', () => {
  it('counts the number of orbital transfers to get from point A to B in a map', () => {
    const testMap = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN
F)M
F)N
M)O
O)Q
N)R`

    expect(orbitTransfer(testMap, 'YOU', 'SAN')).toEqual(4)
  })
})

/* Actual inputs */
describe('part 1', () => {
  it('counts the total number of orbits', () => {
    const result = countTotalOrbits(input)
    expect(result).toEqual(294191)
  })
})

describe('part 2', () => {
  it('counts the number of transfers to get from YOU to SAN', () => {
    const result = orbitTransfer(input, 'YOU', 'SAN')
    expect(result).toEqual(424)
  })
})
