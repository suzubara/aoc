import {
  opAdd,
  opMultiply,
  opSet,
  opGet,
  runProgram,
  handleMode,
} from './index'

describe('opAdd', () => {
  it('handles add operations', () => {
    const testInput = [1, 1, 1, 1]
    expect(opAdd(testInput, 1, 2, 3)).toEqual([1, 1, 1, 3])
  })
})

describe('opMultiply', () => {
  it('handles multiply operations', () => {
    const testInput = [1, 1, 1, 1]
    expect(opMultiply(testInput, 1, 2, 3)).toEqual([1, 1, 1, 2])
  })
})

describe('opSet', () => {
  it('handles set operations', () => {
    const testInput = [1, 1, 1, 1]
    expect(opSet(testInput, 5, 2)).toEqual([1, 1, 5, 1])
  })
})

describe('opGet', () => {
  it('handles get operations', () => {
    const testInput = [1, 2, 3, 4]
    expect(opGet(testInput, 1)).toEqual(2)
  })
})

describe('handleMode', () => {
  const testInput = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 4, 50]

  it('finds the value at a given position if the mode is "position"', () => {
    const mode = '000'
    expect(handleMode(mode, testInput, [1, 2, 3])).toEqual([30, 4, 3])
    expect(handleMode(mode, testInput, [4, 5, 6])).toEqual([10, 3, 50])
  })

  it('returns the value if the position is "immediate"', () => {
    const mode = '111'
    expect(handleMode(mode, testInput, [0, 1, 2])).toEqual([1, 9, 10])
    expect(handleMode(mode, testInput, [4, 5, 6])).toEqual([2, 3, 11])
  })

  it('handles mixed modes', () => {
    expect(handleMode('001', testInput, [1, 7, 10])).toEqual([9, 1, 2])
    expect(handleMode('110', testInput, [3, 2, 1])).toEqual([3, 10, 9])
    expect(handleMode('011', testInput, [0, 1, 2])).toEqual([1, 9, 4])
    expect(handleMode('101', testInput, [3, 2, 1])).toEqual([3, 4, 9])
  })

  it('handles fewer than 3 params', () => {
    expect(handleMode('010', testInput, [1, 2])).toEqual([30, 10])
  })
})

describe('runProgram', () => {
  it('can run a program with add and multiply', () => {
    expect(runProgram([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])).toEqual([
      3500,
      9,
      10,
      70,
      2,
      3,
      11,
      0,
      99,
      30,
      40,
      50,
    ])
    expect(runProgram([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99])
    expect(runProgram([2, 3, 0, 3, 99])).toEqual([2, 3, 0, 6, 99])
    expect(runProgram([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801])
    expect(runProgram([1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual([
      30,
      1,
      1,
      4,
      2,
      5,
      6,
      0,
      99,
    ])
  })

  it('can run a program with set, get, jump, and comparison', () => {
    expect(runProgram([3, 0, 4, 0, 99], 1)).toEqual(1)
    expect(runProgram([1002, 4, 3, 4, 33])).toEqual([1002, 4, 3, 4, 99])

    // equal to 8
    expect(runProgram([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 8)).toEqual(1)
    expect(runProgram([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 2)).toEqual(0)

    // less than 8
    expect(runProgram([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 3)).toEqual(1)
    expect(runProgram([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 10)).toEqual(0)

    // equal to 8
    expect(runProgram([3, 3, 1108, -1, 8, 3, 4, 3, 99], 8)).toEqual(1)
    expect(runProgram([3, 3, 1108, -1, 8, 3, 4, 3, 99], 2)).toEqual(0)

    // less than 8
    expect(runProgram([3, 3, 1107, -1, 8, 3, 4, 3, 99], 3)).toEqual(1)
    expect(runProgram([3, 3, 1107, -1, 8, 3, 4, 3, 99], 10)).toEqual(0)

    // equal to 0
    expect(
      runProgram([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], 3)
    ).toEqual(1)

    expect(
      runProgram([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], 0)
    ).toEqual(0)
    expect(
      runProgram([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 3)
    ).toEqual(1)
    expect(
      runProgram([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 0)
    ).toEqual(0)

    // long example
    const testProgram = [
      3,
      21,
      1008,
      21,
      8,
      20,
      1005,
      20,
      22,
      107,
      8,
      21,
      20,
      1006,
      20,
      31,
      1106,
      0,
      36,
      98,
      0,
      0,
      1002,
      21,
      125,
      20,
      4,
      20,
      1105,
      1,
      46,
      104,
      999,
      1105,
      1,
      46,
      1101,
      1000,
      1,
      20,
      4,
      20,
      1105,
      1,
      46,
      98,
      99,
    ]
    expect(runProgram(testProgram, 7)).toEqual(999)
    expect(runProgram(testProgram, 8)).toEqual(1000)
    expect(runProgram(testProgram, 9)).toEqual(1001)
  })
})
