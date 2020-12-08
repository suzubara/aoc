import { buildBagRules, countContainers, countContained } from './index'
import input from './input'

const my_bag = 'shiny_gold'

const testRules = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

describe('countContainers', () => {
  it('returns the number of containers for a bag', () => {
    const [rules] = buildBagRules(testRules)
    expect(countContainers(rules, my_bag)).toEqual(4)
  })

  it('with the puzzle input', () => {
    const [rules] = buildBagRules(input)
    expect(countContainers(rules, my_bag)).toEqual(164)
  })
})

describe('countContained', () => {
  it('returns the number of bags contained in a bag', () => {
    const [_, rules] = buildBagRules(testRules)
    expect(countContained(rules, my_bag)).toEqual(32)

    const [_2, rules2] = buildBagRules(`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`)
    expect(countContained(rules2, my_bag)).toEqual(126)
  })

  it('with the puzzle input', () => {
    const [_, rules] = buildBagRules(input)
    expect(countContained(rules, my_bag)).toEqual(7872)
  })
})