const getBagKey = (bag: string) => bag.replace(/\s/, '_')

export const buildBagRules = (rules: string): object[] => {
  const rulesList = rules.split('\n')
  const containedRules = {}
  const containerRules = {}

  const parseRuleRegex = /(?<container>[\w\s]+)bags\scontain(?<contents>[\w\s,]+)\./
  const parseContentsRegex = /(?<count>\d+)\s(?<key>[\w\s]+)bags?/

  rulesList.forEach((rule) => {
    const matches = rule.match(parseRuleRegex)
    const { container, contents } = matches.groups
    const containerKey = getBagKey(container.trim())
    const contentList = contents.split(',')

    const containerBagRules = containerRules[containerKey] || []

    contentList.forEach((bag) => {
      const bagDesc = bag.match(parseContentsRegex)
      // console.log('parse bag', bag, container)

      if (!bagDesc) return

      const { count, key } = bagDesc.groups
      const bagKey = getBagKey(key.trim())
      const bagRules = containedRules[bagKey] || []

      for (let i = parseInt(count); i > 0; i--) {
        containerBagRules.push(bagKey)
      }

      bagRules.push(containerKey)
      containedRules[bagKey] = bagRules
    })

    containerRules[containerKey] = containerBagRules
  })

  // console.log(containerRules)

  return [
    containedRules,
    containerRules
  ]
}

export const countContainers = (rules: object, bag: string): number => {
  const findParents = (child: string, tree: object, list: string[], addChild: boolean = true): string[] => {
    // console.log('search for', child, tree)
    if (addChild && list.indexOf(child) < 0) list.push(child)

    let ancestors = tree[child]
    if (ancestors?.length) {
      // console.log('FOUND', ancestors)
      ancestors.forEach((a: string) => {
        list = findParents(a, tree, list)
      })
    }

    return list
  }

  const parents = findParents(bag, rules, [], false)

  // console.log(parents)

  return parents.length
}

export const countContained = (rules: object, bag: string): number => {
  const countBags = (child: string, tree: object, count: number): number => {
    const children = tree[child]
    let total = count
    // console.log('look for', child, tree)
    if (children?.length) {
      // console.log('found', children)
      children.forEach((c: string) => {
        total += 1 + countBags(c, tree, count)
      })
    }

    return total
  }

  return countBags(bag, rules, 0)
}

const containRules = {
  light_red: ['bright_white', 'muted_yellow'],
  dark_orange: ['bright_white', 'muted_yellow'],
  bright_white: ['shiny_gold'],
  muted_yellow: ['shiny_gold', 'faded_blue'],
  shiny_gold: ['dark_olive', 'vibrant_plum']
}

const containedRules = {
  bright_white: ['light_red', 'dark_orange'],

}