// Mehmet Durmaz - 2024502045
// Things that surprise people. Run with `node js/pitfalls.mjs`.

// Pitfall 1 (worked example): destructuring undefined or null throws a TypeError.
try {
  const { a } = undefined
  console.log(a)
} catch (error) {
  console.log('pitfall 1:', error.constructor.name) // pitfall 1: TypeError
}

// Pitfall 2: a default only applies to undefined, not to null
const settings = { theme: undefined, accent: null }
const { theme = 'light', accent = 'blue' } = settings
console.log('pitfall 2:', theme, accent)

// Pitfall 3: assigning without const/let needs parentheses, ({ a } = obj)
let title = 'Old title'
const updated = { title: 'New title' }
;({ title } = updated)
console.log('pitfall 3:', title)

// Pitfall 4: it copies references, not deep copies (nested objects are shared)
const originalBed = { name: 'Bed 1', soil: { moisture: 40 } }
const { soil } = originalBed
soil.moisture = 65
console.log('pitfall 4:', originalBed.soil.moisture, soil.moisture)

// Pitfall 5: in objects the order does not matter, in arrays it does
const car = { model: 'Corsa', year: 1997 }
const { year, model } = car
const tuple = ['Corsa', 1997]
const [firstItem, secondItem] = tuple
console.log('pitfall 5:', year, model, '|', firstItem, secondItem)