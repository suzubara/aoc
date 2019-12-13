import { intcodeComputer, runProgram } from './intcodeGenerator'

import boost from './boost'

describe('runProgram generator', () => {
  it('can run a program with add and multiply', () => {
    expect(
      intcodeComputer([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]).program
    ).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])

    expect(intcodeComputer([1, 0, 0, 0, 99]).program).toEqual([2, 0, 0, 0, 99])
    expect(intcodeComputer([2, 3, 0, 3, 99]).program).toEqual([2, 3, 0, 6, 99])
    expect(intcodeComputer([2, 4, 4, 5, 99, 0]).program).toEqual([
      2,
      4,
      4,
      5,
      99,
      9801,
    ])
    expect(intcodeComputer([1, 1, 1, 4, 99, 5, 6, 0, 99]).program).toEqual([
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
    expect(intcodeComputer([3, 0, 4, 0, 99], [1]).outputs).toEqual([1])
    expect(intcodeComputer([1002, 4, 3, 4, 33]).program).toEqual([
      1002,
      4,
      3,
      4,
      99,
    ])
    expect(
      intcodeComputer([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], [8]).outputs
    ).toEqual([1])

    expect(
      intcodeComputer([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], [8]).outputs
    ).toEqual([1])
    expect(
      intcodeComputer([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], [2]).outputs
    ).toEqual([0])

    expect(
      intcodeComputer([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], [3]).outputs
    ).toEqual([1])
    expect(
      intcodeComputer([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], [10]).outputs
    ).toEqual([0])
    expect(
      intcodeComputer([3, 3, 1108, -1, 8, 3, 4, 3, 99], [8]).outputs
    ).toEqual([1])
    expect(
      intcodeComputer([3, 3, 1108, -1, 8, 3, 4, 3, 99], [2]).outputs
    ).toEqual([0])
    expect(
      intcodeComputer([3, 3, 1107, -1, 8, 3, 4, 3, 99], [3]).outputs
    ).toEqual([1])
    expect(
      intcodeComputer([3, 3, 1107, -1, 8, 3, 4, 3, 99], [10]).outputs
    ).toEqual([0])

    expect(
      intcodeComputer(
        [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
        [3]
      ).outputs
    ).toEqual([1])

    expect(
      intcodeComputer(
        [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
        [0]
      ).outputs
    ).toEqual([0])

    expect(
      intcodeComputer([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], [3])
        .outputs
    ).toEqual([1])
    expect(
      intcodeComputer([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], [0])
        .outputs
    ).toEqual([0])

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

    expect(intcodeComputer(testProgram, [7]).outputs).toEqual([999])
    expect(intcodeComputer(testProgram, [8]).outputs).toEqual([1000])
    expect(intcodeComputer(testProgram, [9]).outputs).toEqual([1001])
  })

  it('can handle multiple inputs', () => {
    expect(intcodeComputer([3, 0, 3, 1, 4, 1, 99], [1, 2]).outputs).toEqual([2])
  })

  it('handles relative params and large numbers', () => {
    const testProgram = [
      109,
      1,
      204,
      -1,
      1001,
      100,
      1,
      100,
      1008,
      100,
      16,
      101,
      1006,
      101,
      0,
      99,
    ]

    expect(intcodeComputer(testProgram).outputs).toEqual(testProgram)
    expect(
      intcodeComputer([
        1102,
        34915192,
        34915192,
        7,
        4,
        7,
        99,
        0,
      ]).outputs.filter(i => i && `${i}`.length === 16).length
    ).toBeGreaterThan(0)
    expect(intcodeComputer([104, 1125899906842624, 99]).outputs[0]).toEqual(
      1125899906842624
    )
  })

  it('passes the BOOST program in test mode', () => {
    expect(intcodeComputer(boost, [1]).outputs[0]).toEqual(2941952859)
  })

  it('boosts the sensors!', () => {
    const output = intcodeComputer(boost, [2]).outputs
    expect(output).toEqual([66113])
  })
})
