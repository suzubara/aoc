export const getFuelAmount = function(mass: number): number {
  return Math.floor(mass / 3) - 2
}

export const getTotalFuel = function(input: number[]): number {
  return input.reduce((total, i) => total + getFuelAmount(i), 0)
}

export const getRecursiveFuelAmount = function(
  mass: number,
  acc: number = 0
): number {
  const requiredFuel = getFuelAmount(mass)
  const newAcc = requiredFuel > 0 ? requiredFuel + acc : acc
  if (requiredFuel > 0) return getRecursiveFuelAmount(requiredFuel, newAcc)
  return newAcc
}

export const getTotalRecursiveFuel = function(input: number[]): number {
  return input.reduce((total, i) => total + getRecursiveFuelAmount(i), 0)
}
