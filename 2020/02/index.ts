import { parse } from "path"

export const checkValid = (input: string): boolean => {
  const [policy, password] = input.split(': ')

  const policyRegex = /(?<min>\d+)-(?<max>\d+)\s(?<char>\w+)/
  const policyGroups = policy.match(policyRegex).groups
  const { min, max, char } = policyGroups
  const passwordRegex = new RegExp(char, 'g')
  const charMatches = password.match(passwordRegex)

  return charMatches?.length >= parseInt(min) && charMatches?.length <= parseInt(max)
}

export const countMatches = (input: string): number => {
  const passwords = input.split('\n')

  let matches = 0
  passwords.forEach(p => {
    if (checkValid(p)) matches += 1
  })

  return matches
}

export const checkValidPosition = (input: string): boolean => {
  const [policy, password] = input.split(': ')

  const policyRegex = /(?<pos1>\d+)-(?<pos2>\d+)\s(?<char>\w+)/
  const policyGroups = policy.match(policyRegex).groups
  const { pos1, pos2, char } = policyGroups
  const pos1Matches = password[parseInt(pos1) - 1] === char
  const pos2Matches = password[parseInt(pos2) - 1] === char

  if (pos1Matches && pos2Matches) return false
  if (pos1Matches || pos2Matches) return true
  return false
}

export const countMatchesPosition = (input: string): number => {
  const passwords = input.split('\n')

  let matches = 0
  passwords.forEach(p => {
    if (checkValidPosition(p)) matches += 1
  })

  return matches
}