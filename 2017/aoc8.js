parseInstruction = (string) => {
  const instructions = string.split(' ')

  return {
    reg: instructions[0],
    operation: instructions[1],
    modifier: parseInt(instructions[2]),
    conditionReg: instructions[4],
    conditionOp: instructions[5],
    conditionCompare: parseInt(instructions[6]),
  }
}

checkCondition = ({ register, operation, comparison  }) => {
  switch (operation) {
    case '>':
      return register > comparison
    case '<':
      return register < comparison
    case '>=':
      return register >= comparison
    case '<=':
      return register <= comparison
    case '==':
      return register == comparison
    case '!=':
      return register != comparison
  }

  console.log('error: no condition found for operator:', operation)
}

execute = (instructions) => {
  const registers = {}
  let largestValue = 0

  instructions.split(';').forEach(i => {
    const parsed = parseInstruction(i)

    registers[parsed.reg] = registers[parsed.reg] || 0
    registers[parsed.conditionReg] = registers[parsed.conditionReg] || 0

    //console.log(parsed)
    
    if (checkCondition({
      register: registers[parsed.conditionReg],
      operation: parsed.conditionOp,
      comparison: parsed.conditionCompare,
    })) {
      switch (parsed.operation) {
        case 'inc':
          registers[parsed.reg] += parsed.modifier
          break
        case 'dec':
          registers[parsed.reg] -= parsed.modifier
          break
      }
    }

    // Check for largest value
    if (registers[parsed.reg] > largestValue) {
      largestValue = registers[parsed.reg]
    }
  })

  return [registers, largestValue]
}
