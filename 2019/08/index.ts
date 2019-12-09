export const buildLayers = function(
  imageData: string,
  w: number,
  h: number
): string[] {
  const layers = []
  const layerLength = w * h
  const layerCount = imageData.length / layerLength

  for (let i = 1; i <= layerCount; i++) {
    const begin = (i - 1) * layerLength
    const end = i * layerLength
    layers.push(imageData.slice(begin, end))
  }

  return layers
}

export const countDigits = function(data: string, match: number): number {
  const intArray = data.split('').map(i => parseInt(i))
  return intArray.filter(i => i === match).length
}

const BLACK = '0'
const WHITE = '1'
const TRANSPARENT = '2'

export const renderImage = function(
  imageData: string,
  w: number,
  h: number
): string[] {
  const rendered: string[] = []
  const layers = buildLayers(imageData, w, h)
  const layerLength = w * h

  layers.forEach((layer, i) => {
    for (let j = 0; j < h; j++) {
      const begin = j * w
      const end = (j + 1) * w
      const layerRow = layer.slice(begin, end)

      if (i === 0) {
        rendered.push(layerRow)
      } else {
        const row = rendered[j].split('')
        for (let k = 0; k < w; k++) {
          const curValue = row[k]
          const newValue = layerRow[k]
          if (curValue === TRANSPARENT) {
            row.splice(k, 1, newValue)
          }
        }
        rendered[j] = row.join('')
      }
    }
  })

  return rendered
}
