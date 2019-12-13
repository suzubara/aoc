import {
  MODE_PATTERN,
  MODE_POSITION,
  MODE_IMMEDIATE,
  MODE_RELATIVE,
  OP_ADD,
  OP_ADD_PARAMS,
  OP_MULTIPLY,
  OP_MULTIPLY_PARAMS,
  OP_SET,
  OP_SET_PARAMS,
  OP_GET,
  OP_GET_PARAMS,
  OP_JUMP_IF_TRUE,
  OP_JUMP_IF_TRUE_PARAMS,
  OP_JUMP_IF_FALSE,
  OP_JUMP_IF_FALSE_PARAMS,
  OP_LESS_THAN,
  OP_LESS_THAN_PARAMS,
  OP_EQUALS,
  OP_EQUALS_PARAMS,
  OP_SET_RELATIVE_BASE,
  OP_SET_RELATIVE_BASE_PARAMS,
  OP_STOP,
} from './constants'
import { Program, ProgramOutput, ProgramState } from './types'

export const intcodeComputer = function(
  program: Program,
  inputs: number[] = []
) {
  let programStopped = false
  let programValue
  let outputs: number[] = []
  let inputCounter = 0

  const computer = runProgram(program)

  while (programStopped !== true) {
    const { value, done } = computer.next(inputs[inputCounter])
    // console.log('GET NEXT', inputs[inputCounter], value, done)

    if (done) {
      programStopped = true
      programValue = value
    } else if (value !== undefined) {
      outputs.push(value)
    }

    if (inputs.length > inputCounter + 1) inputCounter++
  }

  return {
    program: programValue,
    outputs,
  }
}

export const runProgram = function*(program: Program) {
  let index = 0
  let stopped = false
  let relativeBase = 0

  while (index < program.length && !stopped) {
    const { operation, modes } = getOperationModes(program[index])

    // console.log('run operation', operation, modes, 'at index', index)

    switch (operation) {
      case OP_ADD: {
        const params = getParams(OP_ADD_PARAMS, index, program)
        const [input1, input2, outputPos] = handleModes(
          modes,
          params,
          program,
          relativeBase,
          'rrw'
        )

        const outputValue = input1 + input2
        program = setMemoryValue(outputPos, outputValue, program)
        index += 1 + OP_ADD_PARAMS
        break
      }

      case OP_MULTIPLY: {
        const params = getParams(OP_MULTIPLY_PARAMS, index, program)

        const [input1, input2, outputPos] = handleModes(
          modes,
          params,
          program,
          relativeBase,
          'rrw'
        )

        const outputValue = input1 * input2
        program = setMemoryValue(outputPos, outputValue, program)
        index += 1 + OP_MULTIPLY_PARAMS
        break
      }

      case OP_SET: {
        const input = yield
        //console.log('got input', input)
        const params = getParams(OP_SET_PARAMS, index, program)
        const [outputPos] = handleModes(
          modes,
          params,
          program,
          relativeBase,
          'w'
        )
        program = setMemoryValue(outputPos, input, program)
        index += 1 + OP_SET_PARAMS
        break
      }

      case OP_GET: {
        const params = getParams(OP_GET_PARAMS, index, program)
        const [output] = handleModes(modes, params, program, relativeBase, 'r')
        yield output
        index += 1 + OP_GET_PARAMS
        break
      }

      case OP_JUMP_IF_TRUE: {
        const params = getParams(OP_JUMP_IF_TRUE_PARAMS, index, program)
        const [param1, param2] = handleModes(
          modes,
          params,
          program,
          relativeBase,
          'rr'
        )
        if (param1 !== 0) index = param2
        else index += 1 + OP_JUMP_IF_TRUE_PARAMS
        break
      }

      case OP_JUMP_IF_FALSE: {
        const params = getParams(OP_JUMP_IF_FALSE_PARAMS, index, program)
        const [param1, param2] = handleModes(
          modes,
          params,
          program,
          relativeBase,
          'rr'
        )
        if (param1 === 0) index = param2
        else index += 1 + OP_JUMP_IF_FALSE_PARAMS
        break
      }

      case OP_LESS_THAN: {
        const params = getParams(OP_LESS_THAN_PARAMS, index, program)
        const [param1, param2, param3] = handleModes(
          modes,
          params,
          program,
          relativeBase,
          'rrw'
        )

        const opValue = param1 < param2 ? 1 : 0
        program = setMemoryValue(param3, opValue, program)

        index += 1 + OP_LESS_THAN_PARAMS
        break
      }

      case OP_EQUALS: {
        const params = getParams(OP_EQUALS_PARAMS, index, program)
        const [param1, param2, param3] = handleModes(
          modes,
          params,
          program,
          relativeBase,
          'rrw'
        )

        const opValue = param1 === param2 ? 1 : 0
        program = setMemoryValue(param3, opValue, program)

        index += 1 + OP_EQUALS_PARAMS
        break
      }

      case OP_SET_RELATIVE_BASE: {
        const params = getParams(OP_SET_RELATIVE_BASE_PARAMS, index, program)
        const [param1] = handleModes(modes, params, program, relativeBase, 'r')
        relativeBase += param1
        index += 1 + OP_SET_RELATIVE_BASE_PARAMS
        break
      }

      case OP_STOP: {
        stopped = true
        return program
      }

      default: {
        console.error('Error, unknown operation', operation)
        return program
      }
    }
  }
}

const getOperationModes = function(
  opCode: number
): { operation: number; modes: string } {
  let modes = '000'
  let operation = opCode

  const opMatches = `${opCode}`.match(MODE_PATTERN)
  if (opMatches && opMatches.groups) {
    operation = parseInt(opMatches.groups.op)
    modes = opMatches.groups.modes.padStart(3, '0')
  }

  return {
    operation,
    modes,
  }
}

const getMemoryValue = function(index: number, program: Program) {
  if (program.length > index) return program[index]
  return 0
}

const setMemoryValue = function(
  index: number,
  value: number,
  program: Program
) {
  const newProgram = [...program]
  if (program.length > index) {
    newProgram.splice(index, 1, value)
  } else {
    // console.log('add empty memory', program.length, index)
    for (let i = program.length; i < index; i++) {
      newProgram.push(0)
    }
    newProgram.push(value)
  }

  return newProgram
}

const getParams = function(
  paramCount: number,
  index: number,
  program: Program
) {
  const params = []
  let counter = 1
  while (counter <= paramCount) {
    params.push(getMemoryValue(index + counter, program))
    counter++
  }
  return params
}

const handleModes = function(
  modes: string,
  params: number[],
  program: Program,
  relativeBase: number,
  readWrite = 'rrr'
) {
  const output: number[] = []

  const modesArr = modes.split('')
  modesArr.reverse()

  params.forEach((p, index) => {
    const mode = modesArr[index]
    switch (mode) {
      case MODE_POSITION: {
        if (readWrite[index] === 'w') output.push(p)
        else output.push(getMemoryValue(p, program))
        break
      }
      case MODE_IMMEDIATE: {
        output.push(p)
        break
      }
      case MODE_RELATIVE: {
        if (readWrite[index] === 'w') output.push(p + relativeBase)
        else output.push(getMemoryValue(p + relativeBase, program))
        break
      }
      default: {
        console.error('Warning! Unknown mode', mode)
      }
    }
  })

  return output
}
