export const checkValid = (input: string): boolean => {
  let hasBadString = false
  const badStrings = ['ab', 'cd', 'pq', 'xy']
  for (let i = 0; i < badStrings.length; i++) {
    if (input.includes(badStrings[i])) {
      hasBadString = true
      break
    }
  }

  if (hasBadString) return false

  const vowelRegex = /(a|e|i|o|u)/g
  const vowelMatches = input.match(vowelRegex)
  if (!vowelMatches || vowelMatches?.length < 3) return false

  const doubleRegex = /(\w)\1/
  const doubleMatches = input.match(doubleRegex)
  if (!doubleMatches) return false

  return true
}

export const checkValidNew = (input: string): boolean => {
  const hasPairRegex = /(\w\w).*\1/
  const repeatRegex = /(\w)\w\1/

  return !!input.match(hasPairRegex) && !!input.match(repeatRegex)
}

export const countMatches = (input: string): number => {
  const strings = input.split('\n')

  let matches = 0
  strings.forEach(p => {
    if (checkValid(p)) matches += 1
  })

  return matches
}

export const countMatchesNew = (input: string): number => {
  const strings = input.split('\n')

  let matches = 0
  strings.forEach(p => {
    if (checkValidNew(p)) matches += 1
  })

  return matches
}