import { startProgram } from './intcodeWithState'

describe('startProgram', () => {
  it('can run a program with add and multiply', () => {
    expect(
      startProgram([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]).program
    ).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])
    expect(startProgram([1, 0, 0, 0, 99]).program).toEqual([2, 0, 0, 0, 99])
    expect(startProgram([2, 3, 0, 3, 99]).program).toEqual([2, 3, 0, 6, 99])
    expect(startProgram([2, 4, 4, 5, 99, 0]).program).toEqual([
      2,
      4,
      4,
      5,
      99,
      9801,
    ])
    expect(startProgram([1, 1, 1, 4, 99, 5, 6, 0, 99]).program).toEqual([
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

  it('can handle input, and run a program with set, get, jump, and comparison', () => {
    expect(startProgram([3, 0, 4, 0, 99], 1).output).toEqual(1)
    expect(startProgram([1002, 4, 3, 4, 33]).program).toEqual([
      1002,
      4,
      3,
      4,
      99,
    ])

    // equal to 8
    expect(
      startProgram([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 8).output
    ).toEqual(1)
    expect(
      startProgram([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 2).output
    ).toEqual(0)

    // less than 8
    expect(
      startProgram([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 3).output
    ).toEqual(1)
    expect(
      startProgram([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 10).output
    ).toEqual(0)

    // equal to 8
    expect(startProgram([3, 3, 1108, -1, 8, 3, 4, 3, 99], 8).output).toEqual(1)
    expect(startProgram([3, 3, 1108, -1, 8, 3, 4, 3, 99], 2).output).toEqual(0)

    // less than 8
    expect(startProgram([3, 3, 1107, -1, 8, 3, 4, 3, 99], 3).output).toEqual(1)
    expect(startProgram([3, 3, 1107, -1, 8, 3, 4, 3, 99], 10).output).toEqual(0)

    // equal to 0
    expect(
      startProgram([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], 3)
        .output
    ).toEqual(1)

    expect(
      startProgram([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], 0)
        .output
    ).toEqual(0)
    expect(
      startProgram([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 3).output
    ).toEqual(1)
    expect(
      startProgram([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 0).output
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
    expect(startProgram(testProgram, 7).output).toEqual(999)
    expect(startProgram(testProgram, 8).output).toEqual(1000)
    expect(startProgram(testProgram, 9).output).toEqual(1001)
  })

  it('can handle multiple inputs', () => {
    expect(startProgram([3, 0, 3, 1, 4, 1, 99], [1, 2]).output).toEqual(2)
  })
})
