// Mehmet Durmaz - 2024502045
// The same four array forms as js/arrays.mjs, now typed. Run with `npx tsx ts/arrays.ts`.

// Form 1 (worked example): the return type of the function is a tuple.
function minMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

// Form 1 (own data): typed tuple for sourdough bake stages
function ovenRange(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)]
}
const [steamTemp, crustTemp] = ovenRange([215, 250, 230])
console.log('form 1 (bake):', steamTemp, crustTemp)

// Form 2: skip an item and collect the rest, [, second, ...others]
const readingQueue: readonly string[] = [
  'Anayurt Oteli',
  'The Gambler',
  'For Whom the Bell Tolls',
  'The Tartar Steppe',
]
const [, secondBook, ...remainingBooks] = readingQueue
console.log('form 2:', secondBook, remainingBooks)

// Form 3: swap two variables without a temporary, [a, b] = [b, a]
let primaryWatch: string = 'Orient Helios'
let dailyWatch: string = 'Casio A159'
;[primaryWatch, dailyWatch] = [dailyWatch, primaryWatch]
console.log('form 3:', primaryWatch, dailyWatch)

// Form 4: default values, const [a = 1, b = 2] = []
const harvestWeights: number[] = [420]
const [broccoliGrams = 100, leekGrams = 250, celeryGrams = 90] = harvestWeights
console.log('form 4:', broccoliGrams, leekGrams, celeryGrams)