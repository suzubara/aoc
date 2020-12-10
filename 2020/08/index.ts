export const runBootCode = (instructions: string) => {
  const instructionList = instructions.split('\n')
  const instructionsCompleted = instructionList.map(i => false)

  const bootGenerator = bootCode()

  let instrIndex = 0
  let ranSecondTime = false
  let output

  while (!ranSecondTime) {
    bootGenerator.next() // go back to instruction yield

    if (instructionsCompleted[instrIndex] === true) {
      ranSecondTime = true
      const finalResult = bootGenerator.next('stp +0')
      // console.log(finalResult)
      output = finalResult.value
      break
    }

    let { value, done } = bootGenerator.next(instructionList[instrIndex])
    // console.log('RESULT', value, done)
    output = value
    instructionsCompleted[instrIndex] = true
    instrIndex = instrIndex + value
  }

  return output
}

export const fixBootCode = (instructions: string) => {
  const instructionList = instructions.split('\n')
  const programFixed = false
  let output

  instructionList.forEach((instruction, index) => {
    // console.log('check', index, instruction)
    if (instruction.includes('jmp') || instruction.includes('nop')) {
      const modified = [...instructionList]
      if (instruction.includes('jmp')) {
        modified[index] = modified[index].replace('jmp', 'nop')
      } else {
        modified[index] = modified[index].replace('nop', 'jmp')
      }

      const modifiedHasLoop = testForLoop(modified)
      if (modifiedHasLoop !== true) {
        output = modifiedHasLoop
      }
    } else {
      return
    }
  })

  return output
}

export const testForLoop = function (instructionList: string[]) {
  const instructionsCompleted = instructionList.map(i => false)
  const bootGenerator = bootCode()

  let instrIndex = 0
  let encounteredLoop = false
  let programStopped = false
  let output

  while (!encounteredLoop && !programStopped) {
    // console.log('start of loop')
    bootGenerator.next() // go back to instruction yield

    if (instructionsCompleted[instrIndex] === undefined) {
      const finalResult = bootGenerator.next('stp +0')
      // console.log('PROGRAM FINISHED', instrIndex, finalResult)
      output = finalResult.value
      programStopped = true
      break
    }

    if (instructionsCompleted[instrIndex] === true) {
      // console.log('ENCOUNTERED LOOP', instrIndex)
      encounteredLoop = true
      break
    }

    let { value, done } = bootGenerator.next(instructionList[instrIndex])
    // console.log('RESULT', value, done)
    instructionsCompleted[instrIndex] = true
    instrIndex = instrIndex + value
  }

  // console.log('encountered loop?', instructionList, encounteredLoop)

  return encounteredLoop === true ? encounteredLoop : output
}

const instructionRegex = /(?<op>\w{3})\s(?<sign>[+-])(?<val>\d+)/

export const bootCode = function*() {
  let acc = 0
  let stopped = false

  while (!stopped) {
    const instruction = yield
    // console.log('got instruction', instruction)

    if (!instruction) {
      stopped = true
      break
    }

    const { op, sign, val } = instruction.match(instructionRegex).groups
    const value = sign === '-' ? parseInt(val) * -1 : parseInt(val)

    // console.log('RUN INSTRUCTION', instruction, op, value)
    
    switch (op) {
      case 'nop':
        yield 1
        break

      case 'acc':
        acc += value
        yield 1
        break

      case 'jmp':
        yield value
        break

      case 'stp':
        stopped = true
        break

      default:
        console.error('No operation found!', instruction)
    }

    // console.log('generator stopped?', stopped)
  }

  // console.log('END OF GENERATOR', acc)

  return acc
}