const test = [0, 1, 2, 3, 4]
const testLengths = '3,4,1,5'

getSegment = (list, start, length) => {
  let segment = []
  let indexes = []
  let pos = start

  for (i = 0; i < length; i++) {
    segment.push(list[pos])
    indexes.push(pos)

    pos += 1
    if (pos >= list.length) {
      pos = 0
    }
  }

  return {
    segment,
    indexes,
  }
}

processLengths = (input) => {
  let output = []

  input = input.split('')

  input.forEach((l, i) => {
    output.push(`${l}`.charCodeAt())
  })

  output = output.concat([17,31,73,47,23])

  return output
}

hashList = (list, lengths) => {
  let currentPos = 0
  let skipSize = 0

  lengths = processLengths(lengths)

  const numRounds = 64
  for (let j = 0; j < numRounds; j++) {
    console.log(`Hash Round ${j + 1}. Position: ${currentPos}, Skip Size: ${skipSize}, Lengths: [${lengths.join(', ')}]`)

    lengths.forEach(l => {
      const segment = getSegment(list, currentPos, l)
      segment.segment.reverse()
      
      // console.log(segment)
  
      segment.indexes.forEach((index, i) => {
        //console.log(index, 'is', segment.segment[i])
        list[index] = segment.segment[i]
      })
  
      //console.log('updated list', list)
      
      currentPos += (l + skipSize)
      currentPos = currentPos % list.length
      skipSize += 1
    })
  }

  // Sparse hash
  console.log('Sparse hash', list)

  list = createDenseHash(list)
  
  let knotHash = ''
  list.forEach(i => {
    knotHash = `${knotHash}${convertToHex(i)}`
  })

  return knotHash
}

createDenseHash = (sparseHash) => {
  let denseHash = []

  // 16 x 16
  for (let i = 0; i < (sparseHash.length / 16); i++) {
    let num = 0

    for (let j = 0; j < 16; j++) {
      const index = (i * 16) + j
      console.log(`Round ${i}`, j, index)
      num = num ^ sparseHash[index]
    }

    denseHash.push(num)
  }

  return denseHash
}

convertToHex = (char) => {
  char = char.toString(16)
  if (char.length < 2) {
    char = `0${char}`
  }

  return char
}

const input = []
for (i = 0; i < 256; i++) {
  input.push(i)
}
