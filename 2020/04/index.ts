export const validateField = (key: string, value: string): boolean => {
  switch (key) {
    case 'byr': {
      const intValue = parseInt(value)
      return intValue >= 1920 && intValue <= 2002
    }
    case 'iyr': {
      const intValue = parseInt(value)
      return intValue >= 2010 && intValue <= 2020
    }
    case 'eyr': {
      const intValue = parseInt(value)
      return intValue >= 2020 && intValue <= 2030
    }
    case 'hgt': {
      const heightRegex = /(?<num>\d+)(?<unit>cm|in)/
      const heightMatches = value.match(heightRegex)

      if (!heightMatches) return false

      const { num, unit } = heightMatches.groups
      const heightInt = parseInt(num)
      
      if (unit === 'in') return heightInt >= 59 && heightInt <= 76
      else if (unit === 'cm') return heightInt >= 150 && heightInt <= 193

      return false
    }
    case 'hcl': {
      const hclRegex = /#([0-9a-f]{6})/
      const hclMatches = value.match(hclRegex)

      return !!hclMatches
    }
    case 'ecl': {
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(c => value === c)
    }
    case 'pid': {
      const pidRegex = /\d{9}/
      const pidMatches = value.match(pidRegex)

      return pidMatches && pidMatches[0].length === value.length
    }
    default:
      return !!value
  }
}

export const passportIsValid = (passport: string, validateFields: boolean = false): boolean => {
  const requiredFields = [
    'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid',
  ]

  if (validateFields) {
    const passportFields = passport.split(/\s+/)

    return requiredFields.every(f => {
      const field = passportFields.find(p => p.indexOf(`${f}:`) === 0)
      if (!field) return false

      const [key, value] = field.split(':')
      return validateField(key.trim(), value.trim())
    })
  }

  return requiredFields.every(f => passport.indexOf(`${f}:`) > -1)
}

export const countValidPassports = (passports: string, validateFields: boolean = false): number => {
  const passportsList = passports.split('\n\n')

  const validPassports = passportsList.reduce((prev, cur, arr, i) => {
    if (passportIsValid(cur, validateFields)) prev += 1
    return prev
  }, 0)

  return validPassports
}