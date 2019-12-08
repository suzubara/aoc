import {
  startProgram,
  runProgram,
  program,
  programState,
} from '../intcode/intcodeWithState'

export const runAmplifier = function(
  phaseSetting: number,
  inputSignal: number,
  program: program
): number | undefined {
  const output = startProgram(program, [phaseSetting, inputSignal])
  return output.output
}

class Amplifier {
  phaseSetting: number
  state: programState

  constructor(phaseSetting: number, program: program) {
    this.phaseSetting = phaseSetting
    this.state = {
      program,
      index: 0,
      stopped: false,
    }

    this.runProgram(this.phaseSetting)
  }

  runProgram(input?: number) {
    const inputArr = input || input === 0 ? [input] : undefined
    const newState = runProgram(
      {
        ...this.state,
      },
      inputArr
    )

    // console.log('Program complete, state is', newState)
    this.state = newState
  }

  getOutput() {
    return this.state.output
  }
}

export const getCombinations = function(range: string): string[] {
  function getValues(
    value: string,
    arr: string[],
    length: number,
    acc: string[] = []
  ): string[] {
    if (length > 0) {
      arr.forEach((n, i) => {
        const rest = [...arr]
        rest.splice(i, 1)
        getValues(`${value}${n}`, rest, length - 1, acc)
      })
    } else {
      acc.push(value)
    }

    return acc
  }

  const rangeArr = [...range]

  return getValues('', rangeArr, rangeArr.length)
}

export const runAndGetOutput = function(
  amp: Amplifier,
  input?: number
): number | undefined {
  amp.runProgram(input)
  return amp.getOutput()
}

export const getThrusterSignal = function(
  program: program,
  settings: string
): number {
  let currentInput: number | undefined = 0
  let output

  // init with phase settings
  const ampA = new Amplifier(parseInt(settings[0]), program)
  const ampB = new Amplifier(parseInt(settings[1]), program)
  const ampC = new Amplifier(parseInt(settings[2]), program)
  const ampD = new Amplifier(parseInt(settings[3]), program)
  const ampE = new Amplifier(parseInt(settings[4]), program)

  while (output === undefined) {
    currentInput = runAndGetOutput(ampA, currentInput)
    currentInput = runAndGetOutput(ampB, currentInput)
    currentInput = runAndGetOutput(ampC, currentInput)
    currentInput = runAndGetOutput(ampD, currentInput)
    currentInput = runAndGetOutput(ampE, currentInput)
    // console.log('OUTPUT IS', currentInput)

    if (ampE.state.stopped) {
      // console.log('AMP E halted!')
      output = currentInput
    }
  }

  return output ? output : 0
}
