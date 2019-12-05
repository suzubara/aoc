const OP_ADD = 1
const OP_MULTIPLY = 2
const OP_SET = 3
const OP_GET = 4
const OP_JUMP_IF_TRUE = 5
const OP_JUMP_IF_FALSE = 6
const OP_LESS_THAN = 7
const OP_EQUALS = 8

const OP_STOP = 99

const STEP_ADD = 4
const STEP_MULTIPLY = 4
const STEP_SET = 2
const STEP_GET = 2
const STEP_JUMP = 3
const STEP_LESS_THAN = 4
const STEP_EQUALS = 4

const MODE_POSITION = '0'
const MODE_IMMEDIATE = '1'

const MODE_PATTERN = /(?<modes>[0-1]{0,3})0(?<op>[1-8])/

export const runIntcode = function(
  program: number[],
  input?: number,
  index: number = 0,
  storedOutput?: number
): number[] | number {
  let operation = program[index]
  let modes = '000'

  // handle parameter modes
  const opMatches = `${operation}`.match(MODE_PATTERN)
  if (opMatches && opMatches.groups) {
    operation = parseInt(opMatches.groups.op)
    modes = opMatches.groups.modes.padStart(3, '0')
  }

  console.log('PERFORM OPERATION', operation, modes, 'AT INDEX', index)

  switch (operation) {
    case OP_STOP: {
      return storedOutput !== undefined ? storedOutput : program
    }

    case OP_ADD: {
      const param1 =
        modes[2] === MODE_IMMEDIATE
          ? program[index + 1]
          : program[program[index + 1]]
      const param2 =
        modes[1] === MODE_IMMEDIATE
          ? program[index + 2]
          : program[program[index + 2]]
      const param3 = program[index + 3]

      const outputValue = param1 + param2

      program.splice(param3, 1, outputValue)
      return runIntcode(program, input, index + STEP_ADD, storedOutput)
    }

    case OP_MULTIPLY: {
      const param1 =
        modes[2] === MODE_IMMEDIATE
          ? program[index + 1]
          : program[program[index + 1]]
      const param2 =
        modes[1] === MODE_IMMEDIATE
          ? program[index + 2]
          : program[program[index + 2]]
      const param3 = program[index + 3]

      const outputValue = param1 * param2

      program.splice(param3, 1, outputValue)
      return runIntcode(program, input, index + STEP_MULTIPLY, storedOutput)
    }

    case OP_SET: {
      if (input === undefined) {
        console.error('Error, no input provided to set operation')
        return program
      }

      const outputPos = program[index + 1]
      program.splice(outputPos, 1, input)
      return runIntcode(program, input, index + STEP_SET, storedOutput)
    }

    case OP_GET: {
      const param1 =
        modes[2] === MODE_IMMEDIATE
          ? program[index + 1]
          : program[program[index + 1]]
      console.log('OUTPUT VALUE', param1)
      return runIntcode(program, input, index + STEP_GET, param1)
    }

    case OP_JUMP_IF_TRUE: {
      const param1 =
        modes[2] === MODE_IMMEDIATE
          ? program[index + 1]
          : program[program[index + 1]]
      const param2 =
        modes[1] === MODE_IMMEDIATE
          ? program[index + 2]
          : program[program[index + 2]]

      if (param1 !== 0) {
        return runIntcode(program, input, param2, storedOutput)
      } else {
        return runIntcode(program, input, index + STEP_JUMP, storedOutput)
      }
    }

    case OP_JUMP_IF_FALSE: {
      const param1 =
        modes[2] === MODE_IMMEDIATE
          ? program[index + 1]
          : program[program[index + 1]]
      const param2 =
        modes[1] === MODE_IMMEDIATE
          ? program[index + 2]
          : program[program[index + 2]]

      if (param1 === 0) {
        return runIntcode(program, input, param2, storedOutput)
      } else {
        return runIntcode(program, input, index + STEP_JUMP, storedOutput)
      }
    }

    case OP_LESS_THAN: {
      const param1 =
        modes[2] === MODE_IMMEDIATE
          ? program[index + 1]
          : program[program[index + 1]]
      const param2 =
        modes[1] === MODE_IMMEDIATE
          ? program[index + 2]
          : program[program[index + 2]]
      const param3 = program[index + 3]

      const outputValue = param1 < param2 ? 1 : 0
      program.splice(param3, 1, outputValue)
      return runIntcode(program, input, index + STEP_LESS_THAN, storedOutput)
    }

    case OP_EQUALS: {
      const param1 =
        modes[2] === MODE_IMMEDIATE
          ? program[index + 1]
          : program[program[index + 1]]
      const param2 =
        modes[1] === MODE_IMMEDIATE
          ? program[index + 2]
          : program[program[index + 2]]
      const param3 = program[index + 3]

      const outputValue = param1 === param2 ? 1 : 0
      program.splice(param3, 1, outputValue)
      return runIntcode(program, input, index + STEP_EQUALS, storedOutput)
    }

    default:
      console.error('Error, unknown operation', operation)
      return program
  }
}
