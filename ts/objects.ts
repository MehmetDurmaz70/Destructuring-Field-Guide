// Mehmet Durmaz - 2024502045
// The same six object forms as js/objects.mjs, now typed.

type Task = { id: string; title: string; status: 'todo' | 'in-progress' | 'done' }

// Form 5 (worked example)
const task: Task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo

// Form 5 (own data)
type Course = { code: string; credits: number; campus: string }
const course: Course = { code: 'MIS 233', credits: 3, campus: 'Hisar' }
const { code, campus } = course
console.log('form 5 (course):', code, campus)

// Form 6: rename while you take it
type Book = { title: string; author: string; year: number }
const book: Book = { title: 'For Whom the Bell Tolls', author: 'Ernest Hemingway', year: 1940 }
const { title: bookTitle, year: publishedYear } = book
console.log('form 6:', bookTitle, publishedYear)

// Form 7: default values
type DoughBatch = { flour: string; hydration: number; starterRatio?: number }
const doughBatch: DoughBatch = { flour: 'Karakilcik', hydration: 78 }
const { flour, hydration, starterRatio = 20 } = doughBatch
console.log('form 7:', flour, hydration, starterRatio)

// Form 8: rest in an object
type Camera = { id: string; brand: string; model: string; megapixels: number }
const camera: Camera = { id: 'cam-70', brand: 'Canon', model: 'Digital IXUS 70', megapixels: 7.1 }
const { id, ...cameraSpecs } = camera
console.log('form 8:', id, cameraSpecs)

// Form 9: nested patterns, and arrays inside objects
type GardenBed = {
  zone: string
  soil: { ph: number; compost: string }
  crops: [string, string, ...string[]]
}
const gardenBed: GardenBed = {
  zone: 'Hisarustu Plot A',
  soil: { ph: 6.4, compost: 'vermicompost' },
  crops: ['broccoli', 'leeks', 'rosemary'],
}
const {
  soil: { compost },
  crops: [firstCrop, secondCrop],
} = gardenBed
console.log('form 9:', compost, firstCrop, secondCrop)

// Form 10: computed key
type LiftMaxes = { benchPress: number; squat: number; rdl: number }
const liftMaxes: LiftMaxes = { benchPress: 75, squat: 95, rdl: 105 }
const selectedLift: keyof LiftMaxes = 'rdl'
const { [selectedLift]: currentMax } = liftMaxes
console.log('form 10:', selectedLift, currentMax)