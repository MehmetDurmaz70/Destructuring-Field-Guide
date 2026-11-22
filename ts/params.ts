// Mehmet Durmaz - 2024502045
// Forms 11 and 12 in TypeScript, and the typing rules for patterns in parameters.

type TaskInput = { title: string; status?: 'todo' | 'done' }

// Form 11 (worked example): the type goes after the whole pattern.
function createTask({ title, status = 'todo' }: TaskInput) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' })) // form 11: { title: 'Read', status: 'todo' }

// Form 11 (own data): optional properties + default object parameter
type ShakeRecipe = { oatsGrams?: number; milkMl?: number; creatineGrams?: number }
function mixShake({ oatsGrams = 80, milkMl = 300, creatineGrams = 5 }: ShakeRecipe = {}): string {
  return `${oatsGrams}g oats + ${milkMl}ml milk + ${creatineGrams}g creatine`
}
console.log('form 11 (custom):', mixShake({ oatsGrams: 100 }))
console.log('form 11 (empty call):', mixShake())

// Form 11b: typed tuple parameter with optional second slot
const formatSplit = ([distanceMeters, seconds = 12.5]: [number, number?]): string =>
  `${distanceMeters}m in ${seconds}s`
console.log('form 11b:', formatSplit([100, 11.8]), '|', formatSplit([60]))

// Form 12: loops over Object.entries and Map entries
const watchLugWidths: Record<string, number> = {
  'Orient Helios': 20,
  'Casio MTP-1302D': 20,
  'Casio F-91W': 18,
}
const entryPairs: string[] = []
for (const [model, lugMm] of Object.entries(watchLugWidths)) {
  entryPairs.push(`${model}:${lugMm}mm`)
}
console.log('form 12 (Object.entries):', entryPairs.join(', '))

const trailElevation = new Map<string, number>([
  ['Ballikayalar', 260],
  ['Aladaglar', 3756],
])
const mapSummary: string[] = []
for (const [peak, meters] of trailElevation) {
  mapSummary.push(`${peak}=${meters}m`)
}
console.log('form 12 (Map):', mapSummary.join(', '))