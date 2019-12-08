type program = number[]
type programOutput = program | number

/* Modes */
const MODE_PATTERN = /(?<modes>[0-1]{0,3})0(?<op>[1-8])/
const MODE_POSITION = '0'
const MODE_IMMEDIATE = '1'

/* Operations */
const OP_ADD = 1
const OP_MULTIPLY = 2
const OP_SET = 3
const OP_GET = 4
const OP_JUMP_IF_TRUE = 5
const OP_JUMP_IF_FALSE = 6
const OP_LESS_THAN = 7
const OP_EQUALS = 8
const OP_STOP = 99

/* Steps (# of instructions in operation) */
const STEP_ADD = 4
const STEP_MULTIPLY = 4
const STEP_SET = 2
const STEP_GET = 2
const STEP_JUMP = 3
const STEP_LESS_THAN = 4
const STEP_EQUALS = 4

export const runProgram = function(
  program: program,
  input?: number,
  index: number = 0,
  output?: programOutput
): programOutput {
  let operation = program[index]
  let modes = '000'
  let newProgram = [...program]
  let newOutput = output
  let step = 0

  // handle parameter modes
  const opMatches = `${operation}`.match(MODE_PATTERN)
  if (opMatches && opMatches.groups) {
    operation = parseInt(opMatches.groups.op)
    modes = opMatches.groups.modes.padStart(3, '0')
  }

  //console.log('PROGRAM', program)
  /*console.log(
    'PERFORM OPERATION',
    operation,
    modes,
    'AT INDEX',
    index,
    'WITH INPUT',
    input
  )*/

  switch (operation) {
    case OP_ADD:
    case OP_MULTIPLY: {
      const [param1, param2] = handleMode(modes, program, [
        index + 1,
        index + 2,
      ])
      const param3 = program[index + 3] // Write params are always position mode

      if (operation === OP_ADD) {
        newProgram = opAdd(newProgram, param1, param2, param3)
        step = index + STEP_ADD
      } else {
        newProgram = opMultiply(newProgram, param1, param2, param3)
        step = index + STEP_MULTIPLY
      }
      break
    }
    case OP_SET: {
      if (input === undefined) {
        console.error('Error, no input provided to set operation')
        return newProgram
      }

      const position = program[index + 1]
      newProgram = opSet(newProgram, input, position)
      step = index + STEP_SET
      break
    }
    case OP_GET: {
      const [param1] = handleMode(modes, program, [index + 1])
      newOutput = param1
      // TODO - set output?
      step = index + STEP_GET
      break
    }
    case OP_JUMP_IF_TRUE:
    case OP_JUMP_IF_FALSE: {
      const [param1, param2] = handleMode(modes, program, [
        index + 1,
        index + 2,
      ])

      if (operation === OP_JUMP_IF_TRUE && param1 !== 0) {
        step = param2
      } else if (operation === OP_JUMP_IF_FALSE && param1 === 0) {
        step = param2
      } else {
        step = index + STEP_JUMP
      }
      break
    }
    case OP_LESS_THAN:
    case OP_EQUALS: {
      const [param1, param2] = handleMode(modes, program, [
        index + 1,
        index + 2,
      ])
      const param3 = program[index + 3] // Write params are always position mode

      if (operation === OP_LESS_THAN) {
        const outputValue = param1 < param2 ? 1 : 0
        newProgram.splice(param3, 1, outputValue)
        step = index + STEP_LESS_THAN
      } else if (operation === OP_EQUALS) {
        const outputValue = param1 === param2 ? 1 : 0
        newProgram.splice(param3, 1, outputValue)
        step = index + STEP_EQUALS
      }
      break
    }
    case OP_STOP: {
      return newOutput !== undefined ? newOutput : newProgram
    }
    default: {
      console.error('Error, unknown operation', operation)
      return newProgram
    }
  }

  return runProgram(newProgram, input, step, newOutput)
}

export const handleMode = function(
  modes: string,
  program: program,
  params: number[]
): number[] {
  const output: number[] = []

  const modesArr = modes.split('')
  modesArr.reverse()

  params.forEach((p, index) => {
    const paramValue = program[p]
    const mode = modesArr[index]
    switch (mode) {
      case MODE_POSITION: {
        output.push(program[paramValue])
        break
      }
      case MODE_IMMEDIATE: {
        output.push(paramValue)
        break
      }
    }
  })

  return output
}

export const opAdd = function(
  program: program,
  param1: number,
  param2: number,
  position: number
): program {
  // console.log('ADD', param1, param2, position)
  const opValue = param1 + param2
  program.splice(position, 1, opValue)
  return program
}

export const opMultiply = function(
  program: program,
  param1: number,
  param2: number,
  position: number
): program {
  // console.log('MULTIPLY', param1, param2, position)
  const opValue = param1 * param2
  program.splice(position, 1, opValue)
  return program
}

export const opSet = function(
  program: program,
  input: number,
  position: number
): program {
  program.splice(position, 1, input)
  return program
}

export const opGet = function(
  program: program,
  position: number,
  output?: programOutput
): number {
  return program[position]
}
