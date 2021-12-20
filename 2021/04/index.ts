type BingoBoardRow = [number, number, number, number, number]

type BingoBoard = [
  BingoBoardRow,
  BingoBoardRow,
  BingoBoardRow,
  BingoBoardRow,
  BingoBoardRow
]

const emptyRow: BingoBoardRow = [0, 0, 0, 0, 0]

const emptyBoard: BingoBoard = [
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
]

const flatEmptyBoard = emptyBoard.flatMap((n) => n)

export const parseBoard = (input: string): BingoBoard => {
  const board = input.split('\n').map((row) =>
    row
      .trim()
      .split(/\s+/g)
      .map((n) => parseInt(n))
  ) as BingoBoard

  return board
}

export const flatParseBoard = (input: string): number[] => {
  const board = input.split('\n').map((row) =>
    row
      .trim()
      .split(/\s+/g)
      .map((n) => parseInt(n))
  )

  return board.flatMap((n) => n)
}

export const parseDrawn = (nums: string): number[] =>
  nums.split(',').map((n) => parseInt(n))

export const parseBoards = (boards: string): number[][] =>
  boards.split('\n\n').map((b) => flatParseBoard(b))

export const playBingo = (
  numbers: number[],
  boards: number[][],
  stopAtFirstWin: boolean = true
) => {
  const boardState = boards.map((b) => [...flatEmptyBoard])
  const winners = []

  const markBoard = (drawn: number, boardIndex: number) => {
    const boardHasNum = boards[boardIndex].indexOf(drawn)

    if (boardHasNum > -1) {
      // console.log('board', boardIndex, 'has it in', boardHasNum)
      boardState[boardIndex][boardHasNum] = 1
    }

    return
  }

  const hasBoardWon = (boardIndex: number): boolean => {
    const state = boardState[boardIndex]
    const BOARD_DIMENSIONS = 5

    // console.log('CHECK BOARD', boardIndex)

    // Check rows
    for (let i = 0; i < BOARD_DIMENSIONS; i++) {
      const rowStart = BOARD_DIMENSIONS * i
      const row = state.slice(rowStart, rowStart + BOARD_DIMENSIONS)
      // if (boardIndex === 0) console.log('CHECK ROW', row)
      if (row.every((v) => v === 1)) {
        return true
      }
    }

    // Check columns
    for (let i = 0; i < BOARD_DIMENSIONS; i++) {
      const colStart = i
      const col = []

      for (let j = 0; j < BOARD_DIMENSIONS; j++) {
        col.push(state[colStart + j * BOARD_DIMENSIONS])
      }

      if (col.every((v) => v === 1)) {
        return true
      }
    }

    return false
  }

  let score

  for (let n = 0; n < numbers.length; n++) {
    const num = numbers[n]
    // console.log('MARK', num)

    for (let b = 0; b < boards.length; b++) {
      if (winners.indexOf(b) === -1) {
        // Don't mark boards that have already won
        markBoard(num, b)

        if (hasBoardWon(b)) {
          // console.log('BOARD WON:', b, num)
          winners.push(b)
          score = scoreBoard(boards[b], boardState[b], num)
          if (stopAtFirstWin) {
            // console.log('FINAL', b, score)
            return score
          }
        }
      }
    }

    // console.log(boardState)
    if (winners.length === boards.length) break
  }

  // Return last board to win
  // console.log('FINAL', winners[winners.length - 1], score)
  return score
}

export const scoreBoard = (
  board: number[],
  boardState: number[],
  lastNum: number
): number => {
  let score = board.reduce((prev, cur, i, arr) => {
    if (boardState[i] === 0) return prev + cur
    return prev
  }, 0)

  score = score * lastNum

  return score
}
