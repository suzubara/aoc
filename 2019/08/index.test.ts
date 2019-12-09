import { buildLayers, countDigits, renderImage } from './index'
import input from './input'

describe('buildLayers', () => {
  it('sorts raw image data into array of layers', () => {
    expect(buildLayers('123456789012', 3, 2)).toEqual(['123456', '789012'])
  })
})

describe('countDigits', () => {
  it('counts the number of given digit in a string', () => {
    expect(countDigits('123456789012', 1)).toEqual(2)
  })
})

describe('renderImage', () => {
  it('returns the rendered image as 0s and 1s', () => {
    expect(renderImage('0222112222120000', 2, 2)).toEqual(['01', '10'])
  })
})

/* Actual inputs */
describe('part 1', () => {
  const imageWidth = 25
  const imageHeight = 6

  it('counts the number of 0s in each layer', () => {
    const layers = buildLayers(input, imageWidth, imageHeight)
    let fewest0Digits = -1
    let fewest0LayerIndex = -1

    layers.forEach((l, i) => {
      const count0 = countDigits(l, 0)
      if (i === 0 || count0 < fewest0Digits) {
        fewest0Digits = count0
        fewest0LayerIndex = i
      }
    })

    const count1 = countDigits(layers[fewest0LayerIndex], 1)
    const count2 = countDigits(layers[fewest0LayerIndex], 2)
    expect(count1 * count2).toEqual(1088)
  })
})

describe('part 2', () => {
  const imageWidth = 25
  const imageHeight = 6
  it('renders the image', () => {
    console.log(renderImage(input, imageWidth, imageHeight))
  })
})
