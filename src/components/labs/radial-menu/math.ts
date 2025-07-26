export const ITEM_OFFSET = 90
export const RADIUS = 120
export const CENTER_RADIUS = 60

// Given an angle in degrees, returns an equivalent angle from 0 to 360 degrees
export function normalizeAngle(angle: number): number {
  const remainder = angle % 360
  return remainder < 0 ? remainder + 360 : remainder
}

// Given two angles in degrees, returns the smallest angle between them.
// It also accounts for direction.
export function getAngleDifference(angle1: number, angle2: number): number {
  const clockwiseDiff = normalizeAngle(angle2 - angle1)
  const counterClockwiseDiff = 360 - clockwiseDiff
  return clockwiseDiff < counterClockwiseDiff
    ? clockwiseDiff
    : -counterClockwiseDiff
}

export function getSegmentPath(
  cx: number,
  cy: number,
  r1: number,
  r2: number,
  startAngle: number,
  endAngle: number,
) {
  const rad = Math.PI / 180
  const x1 = cx + r1 * Math.cos(startAngle * rad)
  const y1 = cy + r1 * Math.sin(startAngle * rad)
  const x2 = cx + r2 * Math.cos(startAngle * rad)
  const y2 = cy + r2 * Math.sin(startAngle * rad)
  const x3 = cx + r2 * Math.cos(endAngle * rad)
  const y3 = cy + r2 * Math.sin(endAngle * rad)
  const x4 = cx + r1 * Math.cos(endAngle * rad)
  const y4 = cy + r1 * Math.sin(endAngle * rad)
  return `M${x1},${y1}L${x2},${y2}A${r2},${r2} 0 0 1 ${x3},${y3}L${x4},${y4}A${r1},${r1} 0 0 0 ${x1},${y1}Z`
}

export function getArcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const rad = Math.PI / 180
  const x1 = cx + r * Math.cos(startAngle * rad)
  const y1 = cy + r * Math.sin(startAngle * rad)
  const x2 = cx + r * Math.cos(endAngle * rad)
  const y2 = cy + r * Math.sin(endAngle * rad)
  const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0
  return `M${x1},${y1} A${r},${r} 0 ${largeArcFlag} 1 ${x2},${y2}`
}

export function getDividerPath(cx: number, cy: number, angle: number) {
  const rad = Math.PI / 180
  const x1 = cx + CENTER_RADIUS * Math.cos(angle * rad)
  const y1 = cy + CENTER_RADIUS * Math.sin(angle * rad)
  const x2 = cx + RADIUS * Math.cos(angle * rad)
  const y2 = cy + RADIUS * Math.sin(angle * rad)
  return `M${x1},${y1}L${x2},${y2}`
}
