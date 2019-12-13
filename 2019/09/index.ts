import IntcodeComputer, { Program } from '../intcode/intcodeClass'
import boost from '../intcode/boost'

const sensorBoostInput = 2

const boostComputer = new IntcodeComputer(boost)
boostComputer.debug = true
boostComputer.runProgram(sensorBoostInput)
const output = boostComputer.getOutput()
console.log('BOOST output is', output)
