export const countUniqueAnswers = (group: string): number => {
  const answers = group.replace(/\s+/g, '').split('').filter((a, i, arr) => {
    return arr.indexOf(a) === i
  })

  return answers.length
}

export const countAllAnswers = (input: string): number => {
  const groups = input.split('\n\n')
  const total = groups.reduce((prev, cur, i, arr) => {
    return prev + countUniqueAnswers(cur)
  }, 0)

  return total
}

export const countYesAnswers = (group: string): number => {
  const people = group.split('\n')

  const answers = people[0].split('').filter((a, i, arr) => {
    // console.log('look for', a, people)
    return people.every(p => {
      // console.log('in', p, p.indexOf(a) > -1)
      return p.indexOf(a) > -1
    })
  })

  // console.log('final', answers)

  return answers.length
}

export const countAllYesAnswers = (input: string): number => {
  const groups = input.split('\n\n')
  const total = groups.reduce((prev, cur, i, arr) => {
    return prev + countYesAnswers(cur)
  }, 0)

  return total
}
