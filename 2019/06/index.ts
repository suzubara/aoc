type orbit = [string, string]

interface orbitTree {
  [index: string]: string[]
}

export const countOrbits = function(
  root: string,
  orbitTree: orbitTree
): number {
  let orbitSum = 0

  if (orbitTree[root]) {
    const orbiters = orbitTree[root]
    orbiters.forEach(i => {
      orbitSum += 1 + countOrbits(i, orbitTree)
    })
  }

  return orbitSum
}

export const getOrbitTree = function(orbits: orbit[]): orbitTree {
  const orbitTree: orbitTree = {}

  orbits.forEach(o => {
    const [orbitee, orbiter] = o
    if (orbitTree[orbitee]) {
      orbitTree[orbitee].push(orbiter)
    } else {
      orbitTree[orbitee] = [orbiter]
    }
  })

  return orbitTree
}

export const getOrbitArray = function(map: string): orbit[] {
  return map.split('\n').map(i => {
    const objects = i.split(')')
    return [objects[0], objects[1]]
  })
}

export const countTotalOrbits = function(map: string): number {
  const orbitMap = getOrbitArray(map)
  const orbitTree = getOrbitTree(orbitMap)

  let orbitSum = 0
  Object.keys(orbitTree).forEach(o => {
    orbitSum += countOrbits(o, orbitTree)
  })

  return orbitSum
}

export const orbitTransfer = function(
  map: string,
  pointA: string,
  pointB: string
): number | false {
  const orbitMap = getOrbitArray(map)
  const orbitTree = getOrbitTree(orbitMap)

  const path = crawlTree(pointA, pointB, orbitMap, orbitTree)
  if (path) return path.length - 2
  return false // something has gone wrong
}

export const crawlTree = function(
  start: string,
  match: string,
  orbitMap: orbit[],
  orbitTree: orbitTree,
  completedNodes: string[] = [],
  path: string[] = []
): string[] | false {
  path.push(start)

  if (orbitTree[start]) {
    // only crawl to orbiters we have never been to
    const orbiters = orbitTree[start].filter(
      o => completedNodes.indexOf(o) === -1
    )

    if (orbiters.indexOf(match) > -1) {
      // match found, return the distance traversed
      return removeRedundantPaths(path)
    }

    // crawl up
    for (let i = 0; i < orbiters.length; i++) {
      const objName = orbiters[i]
      if (orbitTree[objName]) {
        const result = crawlTree(
          objName,
          match,
          orbitMap,
          orbitTree,
          completedNodes,
          path
        )

        if (result) return result
      }
    }
  }

  // crawl down - reached end of node
  completedNodes.push(start)
  const nextUp = orbitMap.find(i => i[1] === start)
  const result = nextUp
    ? crawlTree(nextUp[0], match, orbitMap, orbitTree, completedNodes, path)
    : false

  return result
}

export const removeRedundantPaths = function(arr: string[]): string[] {
  for (let i = 0; i < arr.length; i++) {
    const lastIndex = arr.lastIndexOf(arr[i])
    if (lastIndex !== i) {
      arr.splice(i, lastIndex - i)
    }
  }

  return arr
}
