/* Modes */
const MODE_PATTERN = /(?<modes>[0-2]{0,3})0(?<op>[1-9])/
const MODE_POSITION = '0'
const MODE_IMMEDIATE = '1'
const MODE_RELATIVE = '2'

/* Operations */
const OP_ADD = 1
const OP_MULTIPLY = 2
const OP_SET = 3
const OP_GET = 4
const OP_JUMP_IF_TRUE = 5
const OP_JUMP_IF_FALSE = 6
const OP_LESS_THAN = 7
const OP_EQUALS = 8
const OP_SET_RELATIVE_BASE = 9
const OP_STOP = 99

const OP_ADD_PARAMS = 3
const OP_MULTIPLY_PARAMS = 3
const OP_SET_PARAMS = 1
const OP_GET_PARAMS = 1
const OP_JUMP_IF_FALSE_PARAMS = 2
const OP_JUMP_IF_TRUE_PARAMS = 2
const OP_LESS_THAN_PARAMS = 3
const OP_EQUALS_PARAMS = 3
const OP_SET_RELATIVE_BASE_PARAMS = 1

export {
  MODE_PATTERN,
  MODE_POSITION,
  MODE_IMMEDIATE,
  MODE_RELATIVE,
  OP_ADD,
  OP_ADD_PARAMS,
  OP_MULTIPLY,
  OP_MULTIPLY_PARAMS,
  OP_SET,
  OP_SET_PARAMS,
  OP_GET,
  OP_GET_PARAMS,
  OP_JUMP_IF_TRUE,
  OP_JUMP_IF_TRUE_PARAMS,
  OP_JUMP_IF_FALSE,
  OP_JUMP_IF_FALSE_PARAMS,
  OP_LESS_THAN,
  OP_LESS_THAN_PARAMS,
  OP_EQUALS,
  OP_EQUALS_PARAMS,
  OP_SET_RELATIVE_BASE,
  OP_SET_RELATIVE_BASE_PARAMS,
  OP_STOP,
}
