findProgramConnections = (input, program) => {
  const programs = createPrograms(input)

  let connections = []

  console.log(programs)

  for (let p in programs) {
    console.log('look in p', programs[p])

    if (p === program || connections.indexOf(p) > -1) {
      connections = connections.concat(programs[p])
    }
  }

  connections = [...new Set(connections)]

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
