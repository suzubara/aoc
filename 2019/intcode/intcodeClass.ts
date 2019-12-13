const fs = require('fs')

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
import { Program } from './types'

class IntcodeComputer {
  program: Program
  index: number
  stopped: boolean
  relativeBase: number
  output: Array<number | undefined>
  debug: boolean
  input?: number

  constructor(program: Program) {
    this.program = program
    this.index = 0
    this.stopped = false
    this.relativeBase = 0
    this.output = []
    this.debug = false
  }

  runProgram(input?: number): IntcodeComputer {
    if (input !== undefined) {
      this.input = input
    }
    let operation = this.getMemoryValue(this.index)
    let modes = '000'

    const opMatches = `${operation}`.match(MODE_PATTERN)
    if (opMatches && opMatches.groups) {
      operation = parseInt(opMatches.groups.op)
      modes = opMatches.groups.modes.padStart(3, '0')
    }

    if (this.debug) {
      const msg = `${this.index}: OPERATION ${modes}${operation}; INPUT: ${this.input}; RELATIVE BASE: ${this.relativeBase}; OUTPUT: ${this.output}`
      console.log(msg)
      fs.appendFile('./error.txt', `${msg}\n`, { flag: 'a+' }, () => {})
    }

    switch (operation) {
      case OP_ADD: {
        const params = this.getParams(OP_ADD_PARAMS)
        const [param1, param2, param3] = this.handleModes(modes, params, 'rrw')
        const opValue = param1 + param2
        this.setMemoryValue(param3, opValue)
        this.index = this.index + OP_ADD_PARAMS + 1
        break
      }
      case OP_MULTIPLY: {
        const params = this.getParams(OP_MULTIPLY_PARAMS)
        const [param1, param2, param3] = this.handleModes(modes, params, 'rrw')
        const opValue = param1 * param2
        this.setMemoryValue(param3, opValue)
        this.index = this.index + OP_MULTIPLY_PARAMS + 1
        break
      }
      case OP_SET: {
        if (this.input === undefined) {
          console.error('Error, no input provided to set operation')
          return this
        }

        const params = this.getParams(OP_SET_PARAMS)
        const [position] = this.handleModes(modes, params, 'w')

        this.setMemoryValue(position, this.input)
        this.index = this.index + OP_SET_PARAMS + 1
        if (this.debug) {
          console.log('SET VALUE AT', position, 'TO', this.input)
        }
        this.input = undefined
        break
      }
      case OP_GET: {
        const params = this.getParams(OP_GET_PARAMS)
        const [param1] = this.handleModes(modes, params, 'r')
        this.output.push(param1)
        if (this.debug) {
          console.log('GET VALUE AT', params[0], param1)
        }
        this.index = this.index + OP_GET_PARAMS + 1
        break
      }
      case OP_JUMP_IF_TRUE: {
        const params = this.getParams(OP_JUMP_IF_TRUE_PARAMS)
        const [param1, param2] = this.handleModes(modes, params, 'rr')
        if (this.debug) {
          console.log('JUMP IF EQUALS 0', param1, 'TO', param2)
        }
        if (param1 !== 0) {
          this.index = param2
        } else {
          this.index = this.index + OP_JUMP_IF_TRUE_PARAMS + 1
        }
        break
      }
      case OP_JUMP_IF_FALSE: {
        const params = this.getParams(OP_JUMP_IF_FALSE_PARAMS)
        const [param1, param2] = this.handleModes(modes, params, 'rr')
        if (param1 === 0) {
          this.index = param2
        } else {
          this.index = this.index + OP_JUMP_IF_FALSE_PARAMS + 1
        }
        break
      }
      case OP_LESS_THAN: {
        const params = this.getParams(OP_LESS_THAN_PARAMS)
        const [param1, param2, param3] = this.handleModes(modes, params, 'rrw')
        const opValue = param1 < param2 ? 1 : 0
        this.setMemoryValue(param3, opValue)
        this.index = this.index + OP_LESS_THAN_PARAMS + 1
        break
      }
      case OP_EQUALS: {
        const params = this.getParams(OP_EQUALS_PARAMS)
        const [param1, param2, param3] = this.handleModes(modes, params, 'rrw')
        const opValue = param1 === param2 ? 1 : 0
        this.setMemoryValue(param3, opValue)
        this.index = this.index + OP_EQUALS_PARAMS + 1
        break
      }
      case OP_SET_RELATIVE_BASE: {
        const params = this.getParams(OP_SET_RELATIVE_BASE_PARAMS)
        const [param1] = this.handleModes(modes, params, 'r')
        if (this.debug) {
          console.log('SET RELATIVE BASE TO', this.relativeBase + param1)
        }
        this.relativeBase += param1
        this.index = this.index + OP_SET_RELATIVE_BASE_PARAMS + 1
        break
      }
      case OP_STOP: {
        this.stopped = true
        return this
      }
      default: {
        console.error('Error, unknown operation', operation)
        return this
      }
    }

    return this.runProgram()
  }

  getParams(paramCount: number) {
    const params = []
    let counter = 1
    while (counter <= paramCount) {
      params.push(this.getMemoryValue(this.index + counter))
      counter++
    }
    return params
  }

  handleModes(modes: string, params: number[], readWrite = 'rrr') {
    const output: number[] = []

    const modesArr = modes.split('')
    modesArr.reverse()

    params.forEach((p, index) => {
      const mode = modesArr[index]
      switch (mode) {
        case MODE_POSITION: {
          if (readWrite[index] === 'w') output.push(p)
          else {
            output.push(this.getMemoryValue(p))
          }
          break
        }
        case MODE_IMMEDIATE: {
          output.push(p)
          break
        }
        case MODE_RELATIVE: {
          if (readWrite[index] === 'w') output.push(p + this.relativeBase)
          else {
            output.push(this.getMemoryValue(p + this.relativeBase))
          }
          break
        }
        default: {
          console.error('Warning! Unknown mode', mode)
        }
      }
    })

    return output
  }

  getMemoryValue(index: number) {
    if (this.program.length > index) return this.program[index]
    return 0
  }

  setMemoryValue(index: number, value: number) {
    if (this.program.length > index) {
      this.program.splice(index, 1, value)
    } else {
      // add to the program
      const addEmptyMemory = []
      for (let i = this.program.length; i < index; i++) {
        addEmptyMemory.push(0)
      }
      this.program = this.program.concat(addEmptyMemory)
      this.program.push(value)
    }
  }

  getProgram() {
    return this.program
  }

  getOutput() {
    return this.output
  }

  isStopped() {
    return !!this.stopped
  }

  reset(program: Program) {
    this.program = program
    this.index = 0
    this.stopped = false
    this.relativeBase = 0
    this.output = []
    return this
  }
}

export default IntcodeComputer
