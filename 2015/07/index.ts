import { exec } from "child_process"
import { parse } from "path"

export const runCircuit = (instructions: string, overrideKey?: string, overrideValue?: number): object => {
  const lines = instructions.split('\n')
  const output = {}

  const operationRegex = /((?<opLeft>[\w\d]+)\s)?(?<op>AND|OR|LSHIFT|RSHIFT|NOT)?\s?(?<opRight>[\w\d]+)/

  const getValue = (value: string): number|undefined => {
    if (output[value] !== undefined) return output[value]
    return isNaN(parseInt(value)) ? undefined : parseInt(value)
  }

  const execLines = (program: string[]): string[] => {
    return program.filter((l) => {
      const [operation, assignee] = l.split(' -> ')

      if (assignee === overrideKey) {
        output[assignee] = overrideValue
        return false
      }

      const opMatches = operation.match(operationRegex)
      const { opLeft, op, opRight } = opMatches.groups

      // console.log(opLeft, op, opRight)

      if (op !== undefined) {
        const valLeft = getValue(opLeft)
        const valRight = getValue(opRight)
        if (valLeft === undefined || valRight === undefined) return true
        
        switch(op) {
          case 'AND':
            output[assignee] = valLeft & valRight
            break
          case 'OR':
            output[assignee] = valLeft | valRight
            break
          case 'LSHIFT':
            output[assignee] = valLeft << valRight
            break
          case 'RSHIFT':
            output[assignee] = valLeft >> valRight
            break
        }
      } else if (opLeft === 'NOT') {
        // bitwise NOT
        const valRight = getValue(opRight)
        if (valRight === undefined) return true
        output[assignee] = 65535 - valRight

      } else if (opLeft === undefined && op === undefined) {
        // assignment
        const valRight = getValue(opRight)
        if (valRight === undefined) return true
        output[assignee] = valRight
      }
    })
  }

  let remainingLines = execLines(lines)
  while (remainingLines.length > 0) {
    remainingLines = execLines(lines)
  }

  return output
}
