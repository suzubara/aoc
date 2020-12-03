export const findPair = (input: string): number => {
  const numbers = input.split('\n')

  let num1
  let num2

  for (let i = 0; i < numbers.length; i++) {
    num1 = parseInt(numbers[i])

    for (let j = 0; j < numbers.length; j++) {
      if (j !== i) {
        num2 = parseInt(numbers[j])
        if (num1 + num2 === 2020) {
          break
        }
      }
    }

    if (num1 + num2 === 2020) break
  }

  return num1 * num2
}

import { parse } from "path"

export const findThree = (input: string): number => {
  const numbers = input.split('\n')

  let num1
  let num2
  let num3

  for (let i = 0; i < numbers.length; i++) {
    num1 = parseInt(numbers[i])

    for (let j = 0; j < numbers.length; j++) {
      if (j !== i) {
        num2 = parseInt(numbers[j])

        for (let k = 0; k < numbers.length; k++) {
          if (k !== i && k !== j) {
            num3 = parseInt(numbers[k])
            if (num1 + num2 + num3 === 2020) {
              break
            }
          }
        }

        if (num1 + num2 + num3 === 2020) break
      }
    }

    if (num1 + num2 + num3 === 2020) break
  }

  return num1 * num2 * num3
}