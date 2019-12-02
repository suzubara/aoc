const OP_ADD = 1
const OP_MULTIPLY = 2
const OP_STOP = 99

const OP_STEP = 4

export const runIntcode = function(
  input: number[],
  index: number = 0
): number[] {
  const operation = input[index]

  if (operation === OP_STOP) return input

  const inputPos1 = input[index + 1]
  const inputPos2 = input[index + 2]
  const outputPos = input[index + 3]
  const input1 = input[inputPos1]
  const input2 = input[inputPos2]

  switch (operation) {
    case OP_ADD: {
      const outputValue = input1 + input2
      input.splice(outputPos, 1, outputValue)
      return runIntcode(input, index + OP_STEP)
    }
    case OP_MULTIPLY: {
      const outputValue = input1 * input2
      input.splice(outputPos, 1, outputValue)
      return runIntcode(input, index + OP_STEP)
    }
    default:
      console.error('Error, unknown operation', operation)
      return input
  }
}
