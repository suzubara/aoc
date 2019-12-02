import { runIntcode } from './index'

describe('runIntcode', () => {
  it('performs the correct operations', () => {
    expect(runIntcode([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])).toEqual([
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
    expect(runIntcode([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99])
    expect(runIntcode([2, 3, 0, 3, 99])).toEqual([2, 3, 0, 6, 99])
    expect(runIntcode([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801])
    expect(runIntcode([1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual([
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
})

/* Actual inputs */
const inputs = [
  1,
  0,
  0,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  1,
  10,
  19,
  1,
  19,
  5,
  23,
  2,
  23,
  6,
  27,
  1,
  27,
  5,
  31,
  2,
  6,
  31,
  35,
  1,
  5,
  35,
  39,
  2,
  39,
  9,
  43,
  1,
  43,
  5,
  47,
  1,
  10,
  47,
  51,
  1,
  51,
  6,
  55,
  1,
  55,
  10,
  59,
  1,
  59,
  6,
  63,
  2,
  13,
  63,
  67,
  1,
  9,
  67,
  71,
  2,
  6,
  71,
  75,
  1,
  5,
  75,
  79,
  1,
  9,
  79,
  83,
  2,
  6,
  83,
  87,
  1,
  5,
  87,
  91,
  2,
  6,
  91,
  95,
  2,
  95,
  9,
  99,
  1,
  99,
  6,
  103,
  1,
  103,
  13,
  107,
  2,
  13,
  107,
  111,
  2,
  111,
  10,
  115,
  1,
  115,
  6,
  119,
  1,
  6,
  119,
  123,
  2,
  6,
  123,
  127,
  1,
  127,
  5,
  131,
  2,
  131,
  6,
  135,
  1,
  135,
  2,
  139,
  1,
  139,
  9,
  0,
  99,
  2,
  14,
  0,
  0,
]

describe('part 1', () => {
  it('returns the value at position 0', () => {
    // 1202 program alarm
    const resetInput = [...inputs]
    resetInput.splice(1, 1, 12)
    resetInput.splice(2, 1, 2)

    const result = runIntcode(resetInput)
    console.log(result[0])
  })
})

describe('part 2', () => {
  const expectedOutput = 19690720

  // test code for finding the correct inputs
  /*
  for (let i = 0; i <= 99; i++) {
    const noun = i
    for (let j = 0; j <= 99; j++) {
      const verb = j
      it('returns the correct output', () => {
        const resetInput = [...inputs]
        resetInput.splice(1, 1, noun)
        resetInput.splice(2, 1, verb)
        const outputValue = runIntcode(resetInput)
        expect(outputValue[0]).toEqual(expectedOutput)

        if (outputValue[0] === expectedOutput) {
          console.log('INPUTS PASSED', noun, verb)
          return
        }
      })
    }
  }
  */

  it('returns the correct output', () => {
    const NOUN = 42
    const VERB = 59
    const resetInput = [...inputs]
    resetInput.splice(1, 1, NOUN)
    resetInput.splice(2, 1, VERB)
    expect(runIntcode(resetInput)[0]).toEqual(expectedOutput)
  })
})
