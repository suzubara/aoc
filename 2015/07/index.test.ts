import { runCircuit } from './index'
import input from './input'

const testCircuit = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`

describe('runCircuit', () => {
  it('runs the circuit', () => {
    expect(runCircuit(testCircuit)).toEqual({
      d: 72,
      e: 507,
      f: 492,
      g: 114,
      h: 65412,
      i: 65079,
      x: 123,
      y: 456,
    })
  })

  it('with puzzle input', () => {
    expect(runCircuit(input)?.a).toEqual(16076)
  })

  it('part 2', () => {
    expect(runCircuit(input, 'b', 16076)?.a).toEqual(2797)
  })
})