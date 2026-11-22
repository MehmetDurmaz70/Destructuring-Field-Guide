// Mehmet Durmaz - 2024502045
// What only TypeScript adds (topics T1 to T5). See the handout.

// T1 (worked example): `{ a: string }` inside a pattern is a RENAME, not a type.
const point = { x: 1, y: 2 }
const { x: horizontal } = point // x is renamed to horizontal; there is no variable x
// Correct way: write the type annotation after the entire pattern
const { x: typedHorizontal, y: typedVertical }: { x: number; y: number } = point
console.log('T1:', horizontal, typedHorizontal, typedVertical)

// T2: tuple return type [number, string] and `as const` on an array
function getLapRecord(): [number, string] {
  return [11.64, '100m sprint']
}
const [bestSeconds, eventLabel] = getLapRecord()
const fixedFlours = ['siyez', 'karakilcik'] as const
const [firstFlour, secondFlour] = fixedFlours // literal types 'siyez' and 'karakilcik'
console.log('T2:', bestSeconds, eventLabel, firstFlour, secondFlour)

// T3: noUncheckedIndexedAccess makes `const [first] = items` include `undefined`
const scores: number[] = [88, 92]
const [firstScore] = scores // type is `number | undefined`
const safeScore = firstScore ?? 0
console.log('T3:', firstScore, safeScore)

// T4: optional fields keep `| undefined`, whereas default values remove `undefined`
type LensOption = { focalMm?: number; aperture?: number }
const lens: LensOption = {}
const { focalMm, aperture = 2.8 } = lens
// focalMm is `number | undefined`, aperture is `number`
console.log('T4:', focalMm, aperture)

// T5: compile error caught by strict destructuring (with // @ts-expect-error)
type GearItem = { name: string; weightGrams: number }
const rope: GearItem = { name: 'Dynamic Rope', weightGrams: 3400 }
// @ts-expect-error Property 'lengthMeters' does not exist on type 'GearItem'
const { lengthMeters } = rope
console.log('T5:', rope.name, lengthMeters)