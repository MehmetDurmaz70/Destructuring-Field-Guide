// Mehmet Durmaz - 2024502045
// Object destructuring (forms 5 to 10). Run with `node js/objects.mjs`.

// Form 5 (worked example): take properties out of an object by name.
const task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo

// Form 5 (own data): a course record
let course = { code: 'MIS 233', credits: 3, campus: 'Hisar' }
let { code, campus } = course
console.log('form 5 (course):', code, campus)

// Form 6: rename while you take it, { title: heading }
const book = { title: 'For Whom the Bell Tolls', author: 'Ernest Hemingway', year: 1940 }
const { title: bookTitle, year: publishedYear } = book
console.log('form 6:', bookTitle, publishedYear)

// Form 7: default values, { priority = 'normal' }
const doughBatch = { flour: 'Karakilcik', hydration: 78 }
const { flour, hydration, starterRatio = 20 } = doughBatch
console.log('form 7:', flour, hydration, starterRatio)

// Form 8: rest, { id, ...others }
const camera = { id: 'cam-70', brand: 'Canon', model: 'Digital IXUS 70', megapixels: 7.1 }
const { id, ...cameraSpecs } = camera
console.log('form 8:', id, cameraSpecs)

// Form 9: nested patterns, { owner: { name } } and arrays inside objects
const gardenBed = {
  zone: 'Hisarustu Plot A',
  soil: { ph: 6.4, compost: 'vermicompost' },
  crops: ['broccoli', 'leeks', 'rosemary'],
}
const {
  soil: { compost },
  crops: [firstCrop, secondCrop],
} = gardenBed
console.log('form 9:', compost, firstCrop, secondCrop)

// Form 10: computed key, { [key]: value }
const liftMaxes = { benchPress: 75, squat: 95, rdl: 105 }
const selectedLift = 'rdl'
const { [selectedLift]: currentMax } = liftMaxes
console.log('form 10:', selectedLift, currentMax)