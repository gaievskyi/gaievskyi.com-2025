const createSnowflakePath = (radius: number, complexity: number): Path2D => {
  const path = new Path2D()

  if (complexity < 0.1) {
    path.arc(0, 0, radius, 0, Math.PI * 2)
    return path
  }

  const armCount = 6
  const armLength = radius
  const branchLength = radius * 0.4
  const centerSize = radius * 0.25

  path.arc(0, 0, centerSize, 0, Math.PI * 2)

  Array.from({ length: armCount }, (_, i) => {
    const angle = (Math.PI * 2 * i) / armCount
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    path.moveTo(cos * centerSize, sin * centerSize)
    path.lineTo(cos * armLength, sin * armLength)

    if (complexity > 0.3) {
      const innerPos = 0.4
      const innerX = cos * armLength * innerPos
      const innerY = sin * armLength * innerPos
      const innerBranchLen = branchLength * 0.6

      const branch1Angle = angle - Math.PI / 4
      path.moveTo(innerX, innerY)
      path.lineTo(
        innerX + Math.cos(branch1Angle) * innerBranchLen,
        innerY + Math.sin(branch1Angle) * innerBranchLen,
      )

      const branch2Angle = angle + Math.PI / 4
      path.moveTo(innerX, innerY)
      path.lineTo(
        innerX + Math.cos(branch2Angle) * innerBranchLen,
        innerY + Math.sin(branch2Angle) * innerBranchLen,
      )
    }

    if (complexity > 0.6) {
      const outerPos = 0.75
      const outerX = cos * armLength * outerPos
      const outerY = sin * armLength * outerPos
      const outerBranchLen = branchLength * 0.4

      const branch3Angle = angle - Math.PI / 5
      path.moveTo(outerX, outerY)
      path.lineTo(
        outerX + Math.cos(branch3Angle) * outerBranchLen,
        outerY + Math.sin(branch3Angle) * outerBranchLen,
      )

      const branch4Angle = angle + Math.PI / 5
      path.moveTo(outerX, outerY)
      path.lineTo(
        outerX + Math.cos(branch4Angle) * outerBranchLen,
        outerY + Math.sin(branch4Angle) * outerBranchLen,
      )
    }
  })

  return path
}

export const getOrCreatePath = (
  cache: Map<string, Path2D>,
  radius: number,
  complexity: number,
): Path2D => {
  const key = `${Math.round(radius * 10)}-${Math.round(complexity * 10)}`
  if (!cache.has(key)) cache.set(key, createSnowflakePath(radius, complexity))
  return cache.get(key)!
}
