import { runBootCode, fixBootCode, testForLoop } from './index'
import input from './input'

describe('runBootCode', () => {
  it('gets output from the generator', () => {
    const testProgram = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

    expect(runBootCode(testProgram)).toEqual(5)
  })

  it('with puzzle input', () => {
    expect(runBootCode(input)).toEqual(1337)
  })
})

describe('testForLoop', () => {
  it('returns true if the instructions result in a loop', () => {
    const testProgram = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`.split('\n')

    expect(testForLoop(testProgram)).toEqual(true)

    let testProgram2 = [...testProgram]
    testProgram2[0] = 'jmp +0'
    expect(testForLoop(testProgram2)).toEqual(true)

    let testProgram3 = [...testProgram]
    testProgram3[7] = 'nop -4'
    expect(testForLoop(testProgram3)).toEqual(8)
  })
})

describe('fixBootCode', () => {
  it('runs the generator until no infinite loop occurs', () => {
    const testProgram = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

    expect(fixBootCode(testProgram)).toEqual(8)
  })

  it('with puzzle input', () => {
    expect(fixBootCode(input)).toEqual(1358)
  })
})