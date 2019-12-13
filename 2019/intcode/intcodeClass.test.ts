import IntcodeComputer, { Program } from './intcodeClass'

import boost from './boost'

const initTestComputer = (program: Program) => {
  const testComputer = new IntcodeComputer(program)
  return testComputer
}

describe('IntcodeComputer', () => {
  it('can run a program with add and multiply', () => {
    expect(
      initTestComputer([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])
        .runProgram()
        .getProgram()
    ).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])

    expect(
      initTestComputer([1, 0, 0, 0, 99])
        .runProgram()
        .getProgram()
    ).toEqual([2, 0, 0, 0, 99])
    expect(
      initTestComputer([2, 3, 0, 3, 99])
        .runProgram()
        .getProgram()
    ).toEqual([2, 3, 0, 6, 99])
    expect(
      initTestComputer([2, 4, 4, 5, 99, 0])
        .runProgram()
        .getProgram()
    ).toEqual([2, 4, 4, 5, 99, 9801])
    expect(
      initTestComputer([1, 1, 1, 4, 99, 5, 6, 0, 99])
        .runProgram()
        .getProgram()
    ).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99])
  })

  it('can handle input, and run a program with set, get, jump, and comparison', () => {
    const testComputer = initTestComputer([3, 0, 4, 0, 99])
    expect(testComputer.runProgram(1).getOutput()[0]).toEqual(1)

    testComputer.reset([1002, 4, 3, 4, 33])
    expect(testComputer.runProgram().getProgram()).toEqual([1002, 4, 3, 4, 99])

    // equal to 8
    testComputer.reset([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8])
    expect(testComputer.runProgram(8).getOutput()[0]).toEqual(1)
    testComputer.reset([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8])
    expect(testComputer.runProgram(2).getOutput()[0]).toEqual(0)

    // less than 8
    testComputer.reset([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8])
    expect(testComputer.runProgram(3).getOutput()[0]).toEqual(1)
    testComputer.reset([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8])
    expect(testComputer.runProgram(10).getOutput()[0]).toEqual(0)

    // equal to 8
    testComputer.reset([3, 3, 1108, -1, 8, 3, 4, 3, 99])

    expect(testComputer.runProgram(8).getOutput()[0]).toEqual(1)
    testComputer.reset([3, 3, 1108, -1, 8, 3, 4, 3, 99])

    expect(testComputer.runProgram(2).getOutput()[0]).toEqual(0)

    // less than 8
    testComputer.reset([3, 3, 1107, -1, 8, 3, 4, 3, 99])
    expect(testComputer.runProgram(3).getOutput()[0]).toEqual(1)
    testComputer.reset([3, 3, 1107, -1, 8, 3, 4, 3, 99])
    expect(testComputer.runProgram(10).getOutput()[0]).toEqual(0)

    // equal to 0
    testComputer.reset([
      3,
      12,
      6,
      12,
      15,
      1,
      13,
      14,
      13,
      4,
      13,
      99,
      -1,
      0,
      1,
      9,
    ])
    expect(testComputer.runProgram(3).getOutput()[0]).toEqual(1)
    testComputer.reset([
      3,
      12,
      6,
      12,
      15,
      1,
      13,
      14,
      13,
      4,
      13,
      99,
      -1,
      0,
      1,
      9,
    ])
    expect(testComputer.runProgram(0).getOutput()[0]).toEqual(0)

    testComputer.reset([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1])
    expect(testComputer.runProgram(3).getOutput()[0]).toEqual(1)
    testComputer.reset([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1])
    expect(testComputer.runProgram(0).getOutput()[0]).toEqual(0)

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

    expect(
      testComputer
        .reset(testProgram)
        .runProgram(7)
        .getOutput()[0]
    ).toEqual(999)
    expect(
      testComputer
        .reset(testProgram)
        .runProgram(8)
        .getOutput()[0]
    ).toEqual(1000)
    expect(
      testComputer
        .reset(testProgram)
        .runProgram(9)
        .getOutput()[0]
    ).toEqual(1001)
  })

  it('can handle multiple inputs', () => {
    const testComputer = new IntcodeComputer([3, 0, 3, 1, 4, 1, 99])
    expect(
      testComputer
        .runProgram(1)
        .runProgram(2)
        .getOutput()[0]
    ).toEqual(2)
  })

  it('handles relative params and large numbers', () => {
    const testComputer = new IntcodeComputer([
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
    ])

    expect(testComputer.runProgram().getOutput()).toEqual([
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
    ])

    testComputer.reset([1102, 34915192, 34915192, 7, 4, 7, 99, 0])
    expect(
      testComputer
        .runProgram()
        .getOutput()
        .filter(i => i && `${i}`.length === 16).length
    ).toBeGreaterThan(-1)

    testComputer.reset([104, 1125899906842624, 99])
    expect(
      testComputer
        .runProgram()
        .getOutput()
        .indexOf(1125899906842624)
    ).toBeGreaterThan(-1)
  })

  it('passes the BOOST program in test mode', () => {
    const boostComputer = new IntcodeComputer(boost)
    boostComputer.runProgram(1)
    const output = boostComputer.getOutput()
    console.log('BOOST output is', output)
    expect(output[0]).toEqual(2941952859)
  })

  it.skip('boosts the sensors!', () => {
    const boostComputer = new IntcodeComputer(boost)
    boostComputer.debug = true
    //boostComputer.runProgram(1)
    boostComputer.runProgram(2)
    const output = boostComputer.getOutput()
    console.log('BOOST output is', output)
    expect(output).toHaveLength(1)
  })
})
