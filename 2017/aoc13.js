parseFirewall = (input) => {
  input = input.split(';')

  const firewall = []

  const layers = input.map(l => parseLayer(l))

  const firewallLength = layers[layers.length - 1].depth

  for (let i = 0; i <= firewallLength; i++) {
    const firewallLayer = layers.find(l => l.depth === i)
    if (firewallLayer) {
      firewall.push(firewallLayer.range)
    } else {
      firewall.push(0)
    }
  }

  return firewall
}

parseLayer = (layer) => {
  const regex = /(\d): (\d)/g
  const results = regex.exec(layer)

  return {
    depth: parseInt(results[1]),
    range: parseInt(results[2]),
  }
}

makeTrip = (input) => {
  const firewall = parseFirewall(input)

  let state = {
    severity: 0,
    packetPosition: undefined,
    scannerPositions: firewall.map(l => 0)
  }

  console.log(firewall, state)

  for (i = 0; i < firewall.length; i++) {
    state = tick(state, firewall)
  }

  return state
}

tick = ({ severity, packetPosition, scannerPositions }, firewall) => {
  // Move scanners
  scannerPositions.forEach((s, i) => {
    if (s < firewall[i]) {
      s += 1
    } else if (s )
  })

  return {
    severity,
    packetPosition,
    scannerPositions,
  }
}
