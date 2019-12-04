export const matchPassword = function(password: string): boolean {
  const passwordLength = 6
  const passwordRegex = /^\d*(\d)\1\d*$/

  return (
    password.length === passwordLength &&
    passwordRegex.test(password) &&
    noDecreasingDigits(password)
  )
}

export const matchPasswordPartTwo = function(password: string): boolean {
  return matchPassword(password) && containsTwoDigits(password)
}

export const containsTwoDigits = function(password: string): boolean {
  const digitGroupRegex = /(\d)\1+/g

  const groups = password.match(digitGroupRegex)

  // are there any groups with a length of exactly 2?
  return !!groups && groups.filter(g => g.length === 2).length > 0
}

export const noDecreasingDigits = function(value: string): boolean {
  let curValue = 0
  let decreased = false

  for (let i = 0; i < value.length; i++) {
    const numericValue = parseInt(value[i])
    if (numericValue < curValue) {
      decreased = true
      break
    }

    if (numericValue > curValue) curValue = numericValue
  }

  return !decreased
}
