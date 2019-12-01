parseStream = (input) => {
  const arr = input.split('')

  let groups = 0
  let currentGroupScore = 0
  let totalGroupScore = 0
  let garbageRemoved = 0

  let skipNext = false
  let inGarbage = false

  arr.forEach(i => {
    //console.log('parse', i)
    if (skipNext) {
      console.log('Skip', i)
      skipNext = false
    } else {
      switch (i) {
        case '!':
          if (inGarbage) {
            skipNext = true
          }
          break
        case '{':
          if (!inGarbage) {
            // Start a new group
            currentGroupScore += 1
          } else {
            garbageRemoved += 1            
          }
          break
        case '}':
          if (!inGarbage) {
            // End the current group
            groups += 1
            totalGroupScore += currentGroupScore
            currentGroupScore -= 1
          } else {
            garbageRemoved += 1            
          }
          break
        case '<':
          if (!inGarbage) {
            // Start garbage
            inGarbage = true
          } else {
            garbageRemoved += 1            
          }
          break
        case '>':
          if (inGarbage) {
            // End garbage
            inGarbage = false
          }
          break
        default:
          if (inGarbage) {
            garbageRemoved += 1
          }
      }
    }
  })

  return {
    garbageRemoved,
    groups,
    totalGroupScore,
    currentGroupScore,
  }

}
