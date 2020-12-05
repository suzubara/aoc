import { findSeatId, binaryPartitionSeats, findHighestSeatId, findMissingSeatId } from './index'
import input from './input'

describe('findSeatId', () => {
  it('returns the seat ID for a given boarding pass', () => {
    expect(findSeatId('FBFBBFFRLR')).toEqual(357)
    expect(findSeatId('BFFFBBFRRR')).toEqual(567)
    expect(findSeatId('FFFBBBFRRR')).toEqual(119)
    expect(findSeatId('BBFFBBFRLL')).toEqual(820)
  })
})

describe('binaryPartitionSeats', () => {
  it('returns the binary partitioned value for a given set of positions', () => {
    expect(binaryPartitionSeats('FBFBBFF', 128)).toEqual(44)
    expect(binaryPartitionSeats('BFFFBBF', 128)).toEqual(70)
    expect(binaryPartitionSeats('FFFBBBF', 128)).toEqual(14)
    expect(binaryPartitionSeats('BBFFBBF', 128)).toEqual(102)

    expect(binaryPartitionSeats('RLR', 8)).toEqual(5)
    expect(binaryPartitionSeats('RRR', 8)).toEqual(7)
    expect(binaryPartitionSeats('RRR', 8)).toEqual(7)
    expect(binaryPartitionSeats('RLL', 8)).toEqual(4)
  })
})

describe('findHighestSeatId', () => {
  it('returns the highest seat ID', () => {
    const testPasses = `FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`

    expect(findHighestSeatId(testPasses)).toEqual(820)
  })

  it('with puzzle input', () => {
    expect(findHighestSeatId(input)).toEqual(888)
  })
})

describe('findMissingSeatId', () => {
  it('with puzzle input', () => {
    expect(findMissingSeatId(input)).toEqual(522)
  })
})