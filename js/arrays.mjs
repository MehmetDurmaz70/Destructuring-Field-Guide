// Mehmet Durmaz - 2024502045
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.

// Form 1 (worked example): take values out of an array by position.
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

// Form 1 (own data): bake temperatures for sourdough loaf stages
function ovenRange(temps) {
  return [Math.min(...temps), Math.max(...temps)]
}
const [steamTemp, crustTemp] = ovenRange([215, 250, 230])
console.log('form 1 (bake):', steamTemp, crustTemp)

// Form 2: skip an item and collect the rest, [, second, ...others]
const readingQueue = ['Anayurt Oteli', 'The Gambler', 'For Whom the Bell Tolls', 'The Tartar Steppe']
const [, secondBook, ...remainingBooks] = readingQueue
console.log('form 2:', secondBook, remainingBooks)

// Form 3: swap two variables without a temporary, [a, b] = [b, a]
let primaryWatch = 'Orient Helios'
let dailyWatch = 'Casio A159'
;[primaryWatch, dailyWatch] = [dailyWatch, primaryWatch]
console.log('form 3:', primaryWatch, dailyWatch)

// Form 4: default values, const [a = 1, b = 2] = []
const harvestWeights = [420]
const [broccoliGrams = 100, leekGrams = 250, celeryGrams = undefined] = harvestWeights
console.log('form 4:', broccoliGrams, leekGrams, celeryGrams)