import {
  findGammaRate,
  findEpsilonRate,
  findOxygenGeneratorRating,
  findCO2ScrubberRating,
} from './index'
import input from './input'

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

describe('the test input', () => {
  it('can find the power consumption', () => {
    const gammaRate = findGammaRate(testInput)
    expect(gammaRate).toEqual(22)

    const epsilonRate = findEpsilonRate(testInput)
    expect(epsilonRate).toEqual(9)

    expect(gammaRate * epsilonRate).toEqual(198)
  })

  it('can find the life support rating', () => {
    const oxyGenRating = findOxygenGeneratorRating(testInput)
    expect(oxyGenRating).toEqual(23)

    const co2ScrubRating = findCO2ScrubberRating(testInput)
    expect(co2ScrubRating).toEqual(10)

    expect(oxyGenRating * co2ScrubRating).toEqual(230)
  })
})

describe('the real input', () => {
  it('can find the power consumption', () => {
    const gammaRate = findGammaRate(input)
    expect(gammaRate).toEqual(2663)

    const epsilonRate = findEpsilonRate(input)
    expect(epsilonRate).toEqual(1432)

    expect(gammaRate * epsilonRate).toEqual(3813416)
  })

  it('can find the life support rating', () => {
    const oxyGenRating = findOxygenGeneratorRating(input)
    expect(oxyGenRating).toEqual(2526)

    const co2ScrubRating = findCO2ScrubberRating(input)
    expect(co2ScrubRating).toEqual(1184)

    expect(oxyGenRating * co2ScrubRating).toEqual(2990784)
  })
})
