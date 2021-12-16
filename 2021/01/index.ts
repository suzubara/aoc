export const convertInput = (input: string): number[] => {
  return input.split('\n').map((s) => parseInt(s))
}

export const countDepthIncreases = (arr: number[]): number => {
  let numIncreases = 0

  arr.forEach((n, index) => {
    if (index === 0) return
    if (n > arr[index - 1]) numIncreases += 1
    return
  })

  return numIncreases
}

export const sumWindows = (arr: number[]): number[] => {
  const sums = []

  arr.forEach((n, index) => {
    if (index + 2 > arr.length - 1) return

    sums.push(n + arr[index + 1] + arr[index + 2])
  })

  return sums
}
