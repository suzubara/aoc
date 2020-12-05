/**
 * turn on 0,0 through 999,999 would turn on (or leave on) every light.
toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
 */

import { generateGrid, applyDirections, countLights, applyAllDirections, applyDirectionsBrightness, applyAllDirectionsBrightness, countLightsBrightness, printGrid } from './index'
import input from './input'

describe('applyDirections', () => {
  it('applies directions to the grid', () => {
    let grid1 = generateGrid()
    expect(countLights(grid1)).toEqual(0)
    grid1 = applyDirections(grid1, 'turn on 0,0 through 999,999')
    expect(countLights(grid1)).toEqual(1000000)
    grid1 = applyDirections(grid1, 'toggle 0,0 through 999,0')
    expect(countLights(grid1)).toEqual(999000)
    grid1 = applyDirections(grid1, 'turn off 499,499 through 500,500')
    expect(countLights(grid1)).toEqual(998996)
  })
})

describe('applyAllDirections', () => {
  it('applies all directions to the grid', () => {
    const testDirections = `turn on 0,0 through 999,999
toggle 0,0 through 999,0
turn off 499,499 through 500,500
`
    const testGrid = applyAllDirections(testDirections)
    expect(countLights(testGrid)).toEqual(998996)
  })

  it('with puzzle input', () => {
    const grid = applyAllDirections(input)
    expect(countLights(grid)).toEqual(569999)
  })
})

/**
 * turn on 0,0 through 0,0 would increase the total brightness by 1.
toggle 0,0 through 999,999 would increase the total brightness by 2000000.
 */

describe('applyDirectionsBrightness', () => {
  it('applies directions to the grid', () => {
    let grid1 = generateGrid()
    expect(countLightsBrightness(grid1)).toEqual(0)
    grid1 = applyDirectionsBrightness(grid1, 'turn on 0,0 through 0,0')
    expect(countLightsBrightness(grid1)).toEqual(1)

    let grid2 = generateGrid()
    grid2 = applyDirectionsBrightness(grid2, 'toggle 0,0 through 999,999')
       // printGrid(grid2)

    expect(countLightsBrightness(grid2)).toEqual(2000000)
  })
})

describe('applyAllDirectionsBrightness', () => {
  it('applies all directions to the grid', () => {
    const testDirections = `turn on 0,0 through 0,0
toggle 0,0 through 999,999
`
    const testGrid = applyAllDirectionsBrightness(testDirections)
    expect(countLightsBrightness(testGrid)).toEqual(2000001)
  })

  it('with puzzle input', () => {
    const grid = applyAllDirectionsBrightness(input)
    expect(countLightsBrightness(grid)).toEqual(17836115)
  })
})
