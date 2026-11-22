// Mehmet Durmaz - 2024502045
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

// Form 11 (worked example): an options object in the parameter list, with defaults.
function createTask({ title, status = 'todo' } = {}) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' })) // form 11: { title: 'Read', status: 'todo' }

// Form 11 (own data): brew/shake recipe builder with default object fallback
function mixShake({ oatsGrams = 80, milkMl = 300, creatineGrams = 5 } = {}) {
  return `${oatsGrams}g oats + ${milkMl}ml milk + ${creatineGrams}g creatine`
}
console.log('form 11 (custom):', mixShake({ oatsGrams: 100 }))
console.log('form 11 (empty call):', mixShake())

// Form 11b: the same idea with an array parameter, ([x, y]) => ...
const formatSplit = ([distanceMeters, seconds = 12.5]) => `${distanceMeters}m in ${seconds}s`
console.log('form 11b:', formatSplit([100, 11.8]), '|', formatSplit([60]))

// Form 12: loops over entries, for (const [key, value] of Object.entries(obj)) and a Map
const watchLugWidths = { 'Orient Helios': 20, 'Casio MTP-1302D': 20, 'Casio F-91W': 18 }
const entryPairs = []
for (const [model, lugMm] of Object.entries(watchLugWidths)) {
  entryPairs.push(`${model}:${lugMm}mm`)
}
console.log('form 12 (Object.entries):', entryPairs.join(', '))

const trailElevation = new Map([
  ['Ballikayalar', 260],
  ['Aladaglar', 3756],
])
const mapSummary = []
for (const [peak, meters] of trailElevation) {
  mapSummary.push(`${peak}=${meters}m`)
}
console.log('form 12 (Map):', mapSummary.join(', '))