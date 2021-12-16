import { driveSub, driveSubWithAim } from './index'
import input from './input'

const testInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`

describe('driveSub', () => {
  it('returns position', () => {
    const expected = [15, 10]
    expect(driveSub(testInput)).toEqual(expected)
    expect(expected[0] * expected[1]).toEqual(150)
  })

  it('with real input', () => {
    const expected = [1967, 1031]
    expect(driveSub(input)).toEqual(expected)
    expect(expected[0] * expected[1]).toEqual(2027977)
  })
})

describe('driveSubWithAim', () => {
  it('returns position', () => {
    const expected = [15, 60]
    expect(driveSubWithAim(testInput)).toEqual(expected)
    expect(expected[0] * expected[1]).toEqual(900)
  })

  it('returns position', () => {
    const expected = [1967, 967791]
    expect(driveSubWithAim(input)).toEqual(expected)
    expect(expected[0] * expected[1]).toEqual(1903644897)
  })
})
