countGroups = (input) => {
  const programs = createPrograms(input)

  let groups = []

  for (const p in programs) {
    let inAGroup = false
    // If not already in a group
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i]
      if (group.indexOf(p) > -1) {
        inAGroup = true
        break
      }
    }

    if (!inAGroup) {
      // Start new group
      groups.push(findProgramConnections(programs, p))
    }
  }

  return groups
}

findProgramConnections = (programs, program) => {
  let connections = [program]
  let lengthIncreasing = true

  while (lengthIncreasing) {
    let newConnections = addConnections(connections, programs)
    console.log('Increase from ', connections.length, 'to', newConnections.length)    
    lengthIncreasing = newConnections.length !== connections.length
    connections = newConnections
  }

  return connections
}

addConnections = (connections, programs) => {
  connections.forEach(c => {
    connections = [...new Set(connections.concat(programs[c]))]
  })

  return connections
}

createPrograms = (input) => {
  input = input.split(';')

  const programs = {}
  input.forEach(i => {
    const parsed = parseInput(i)
    programs[parsed.program] = parsed.connections
  })

  return programs
}

parseInput = (input) => {
  input = input.split(' <-> ')

  let connections = input[1].split(',')
  connections = connections.map(c => c.trim())

  return {
    program: input[0],
    connections,
  }
}
