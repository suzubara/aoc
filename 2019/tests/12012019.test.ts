import {
  getFuelAmount,
  getTotalFuel,
  getRecursiveFuelAmount,
  getTotalRecursiveFuel,
} from '../12012019'

describe('getFuelAmount', () => {
  it('returns the right amount', () => {
    expect(getFuelAmount(2)).toEqual(-2)
    expect(getFuelAmount(12)).toEqual(2)
    expect(getFuelAmount(14)).toEqual(2)
    expect(getFuelAmount(1969)).toEqual(654)
    expect(getFuelAmount(100756)).toEqual(33583)
  })
})

describe('getTotalFuel', () => {
  it('totals the fuel amounts', () => {
    const testInputs = [12, 14, 1969, 100756]
    expect(getTotalFuel(testInputs)).toEqual(34241)
  })
})

describe('getRecursiveFuelAmount', () => {
  it('returns the right amount', () => {
    expect(getRecursiveFuelAmount(14)).toEqual(2)
    expect(getRecursiveFuelAmount(1969)).toEqual(966)
    expect(getRecursiveFuelAmount(100756)).toEqual(50346)
  })
})

describe('getTotalRecursiveFuel', () => {
  it('totals the fuel amounts recursively', () => {
    const testInputs = [14, 1969, 100756]
    expect(getTotalRecursiveFuel(testInputs)).toEqual(51314)
  })
})

/** Actual inputs */
const inputs = [
  51753,
  53456,
  128133,
  118219,
  136490,
  113318,
  134001,
  99775,
  84746,
  68712,
  104274,
  72530,
  101517,
  65533,
  98719,
  100215,
  144296,
  114166,
  62930,
  118494,
  144800,
  97604,
  112836,
  73074,
  62591,
  99278,
  94544,
  73035,
  146631,
  148331,
  144573,
  121956,
  94088,
  60092,
  126397,
  117285,
  122292,
  77413,
  145860,
  76968,
  64790,
  58479,
  94035,
  148441,
  78999,
  74329,
  145182,
  129497,
  106765,
  67046,
  58702,
  123344,
  63866,
  121123,
  126808,
  115190,
  86467,
  136359,
  148718,
  88225,
  126185,
  82745,
  142546,
  149788,
  137524,
  114690,
  68075,
  60244,
  127157,
  123719,
  87843,
  107714,
  51281,
  92123,
  146495,
  50761,
  130708,
  53103,
  75289,
  121675,
  61726,
  70674,
  101755,
  97736,
  100141,
  81085,
  55493,
  73071,
  85321,
  119965,
  147313,
  105201,
  107107,
  130007,
  67834,
  137614,
  140848,
  64038,
  106078,
  71447,
]

describe('part 1', () => {
  console.log(getTotalFuel(inputs))
})

describe('part 2', () => {
  console.log(getTotalRecursiveFuel(inputs))
})
