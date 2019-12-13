export type Program = number[]
export type ProgramOutput = undefined | number | Program

export type ProgramState = {
  program: Program
  index: number
  stopped: boolean
  relativeBase: number
  output: Array<number | undefined>
  debug: boolean
  input?: number
}
