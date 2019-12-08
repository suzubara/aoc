import { runAmplifier, getCombinations, getThrusterSignal } from './index'
import input from './input'

describe('runAmplifier', () => {
  it('runs the program with the provided inputs', () => {
    expect(
      runAmplifier(4, 0, [
        3,
        15,
        3,
        16,
        1002,
        16,
        10,
        16,
        1,
        16,
        15,
        15,
        4,
        15,
        99,
        0,
        0,
      ])
    ).toEqual(4)

    expect(
      runAmplifier(0, 5, [
        3,
        23,
        3,
        24,
        1002,
        24,
        10,
        24,
        1002,
        23,
        -1,
        23,
        101,
        5,
        23,
        23,
        1,
        24,
        23,
        23,
        4,
        23,
        99,
        0,
        0,
      ])
    ).toEqual(55)

    expect(
      runAmplifier(1, 3, [
        3,
        31,
        3,
        32,
        1002,
        32,
        10,
        32,
        1001,
        31,
        -2,
        31,
        1007,
        31,
        0,
        33,
        1002,
        33,
        7,
        33,
        1,
        33,
        31,
        31,
        1,
        32,
        31,
        31,
        4,
        31,
        99,
        0,
        0,
        0,
      ])
    ).toEqual(36)
  })
})

describe('getCombinations', () => {
  it('returns all possible number combinations', () => {
    expect(getCombinations('123')).toEqual([
      '123',
      '132',
      '213',
      '231',
      '312',
      '321',
    ])
  })
})

describe('getThrusterSignal', () => {
  it('returns the output given a program and settings', () => {
    expect(
      getThrusterSignal(
        [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0],
        '43210'
      )
    ).toEqual(43210)
    expect(
      getThrusterSignal(
        [
          3,
          23,
          3,
          24,
          1002,
          24,
          10,
          24,
          1002,
          23,
          -1,
          23,
          101,
          5,
          23,
          23,
          1,
          24,
          23,
          23,
          4,
          23,
          99,
          0,
          0,
        ],
        '01234'
      )
    ).toEqual(54321)
    expect(
      getThrusterSignal(
        [
          3,
          31,
          3,
          32,
          1002,
          32,
          10,
          32,
          1001,
          31,
          -2,
          31,
          1007,
          31,
          0,
          33,
          1002,
          33,
          7,
          33,
          1,
          33,
          31,
          31,
          1,
          32,
          31,
          31,
          4,
          31,
          99,
          0,
          0,
          0,
        ],
        '10432'
      )
    ).toEqual(65210)
  })

  it('handles feedback loop mode', () => {
    expect(
      getThrusterSignal(
        [
          3,
          26,
          1001,
          26,
          -4,
          26,
          3,
          27,
          1002,
          27,
          2,
          27,
          1,
          27,
          26,
          27,
          4,
          27,
          1001,
          28,
          -1,
          28,
          1005,
          28,
          6,
          99,
          0,
          0,
          5,
        ],
        '98765'
      )
    ).toEqual(139629729)

    expect(
      getThrusterSignal(
        [
          3,
          52,
          1001,
          52,
          -5,
          52,
          3,
          53,
          1,
          52,
          56,
          54,
          1007,
          54,
          5,
          55,
          1005,
          55,
          26,
          1001,
          54,
          -5,
          54,
          1105,
          1,
          12,
          1,
          53,
          54,
          53,
          1008,
          54,
          0,
          55,
          1001,
          55,
          1,
          55,
          2,
          53,
          55,
          53,
          4,
          53,
          1001,
          56,
          -1,
          56,
          1005,
          56,
          6,
          99,
          0,
          0,
          0,
          0,
          10,
        ],
        '97856'
      )
    ).toEqual(18216)
  })
})

/* Actual inputs */
describe('part 1', () => {
  const phaseSettingRange = '01234'

  it('finds all of the possible thruster signals', () => {
    const thrusterSignals: number[] = []
    const combinations = getCombinations(phaseSettingRange)
    combinations.forEach(settings => {
      thrusterSignals.push(getThrusterSignal(input, settings))
    })
    const sortedSignals = thrusterSignals.sort((a, b) => a - b)
    expect(sortedSignals[sortedSignals.length - 1]).toEqual(30940)
  })
})

describe('part 2', () => {
  const phaseSettingRange = '56789'

  it('finds all possible thruster signals', () => {
    const thrusterSignals: number[] = []
    const combinations = getCombinations(phaseSettingRange)
    combinations.forEach(settings => {
      thrusterSignals.push(getThrusterSignal(input, settings))
    })
    const sortedSignals = thrusterSignals.sort((a, b) => a - b)
    expect(sortedSignals[sortedSignals.length - 1]).toEqual(76211147)
  })
})
