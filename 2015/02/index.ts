export const getSmallestSide = function(l: number, w: number, h: number): number[] {
  const [dim1, dim2] = [l, w, h].sort((a, b) => a - b)
  return [dim1, dim2]
}

export const getWrappingForPresent = function(l: number, w: number, h: number): number {
  const [dim1, dim2] = getSmallestSide(l, w, h)
  const slack = dim1 * dim2
  return (2*l*w + 2*w*h + 2*h*l) + slack
}

export const getRibbonForPresent = function(l: number, w: number, h: number): number {
  const [dim1, dim2] = getSmallestSide(l, w, h)
  const volume = l * w * h
  return dim1 * 2 + dim2 * 2 + volume
}

export const parseInput = function(input: string): number[][] {
  const presents = input.split('\n')
  return presents.map(p => p.split('x').map(i => Number(i)))
}

export const getWrappingTotal = function(input: string): number {
  const presents = parseInput(input)
  let total = 0

  presents.forEach(p => {
    const [l, w, h] = p
    total += getWrappingForPresent(l, w, h)
  })

  return total
}

export const getRibbonTotal = function(input: string): number {
  const presents = parseInput(input)
  let total = 0

  presents.forEach(p => {
    const [l, w, h] = p
    total += getRibbonForPresent(l, w, h)
  })

  return total
}
