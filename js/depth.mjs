// Mehmet Durmaz - 2024502045
// Bonus 2: Depth experiments (iterables, evaluation order, catch, assignment targets).

// D1: Destructuring other iterables (strings, Set, Map, custom generator)
const [firstChar, secondChar, ...restChars] = 'BOUN'
const uniqueWatches = new Set(['Orient Helios', 'Casio A159', 'Orient Helios'])
const [firstUnique, secondUnique] = uniqueWatches

function* fibGen() {
  yield 1
  yield 1
  yield 2
  yield 3
}
const [f1, f2, f3] = fibGen() // stops pulling after 3rd yield!
console.log('D1 iterables:', firstChar, secondChar, restChars.join(''), '|', firstUnique, secondUnique, '|', f1, f2, f3)

// D2: Order of evaluation & side-effect defaults + earlier binding reference
let defaultCalls = 0
function computeFallback(label) {
  defaultCalls++
  return `${label}-default`
}
const [a = computeFallback('first'), b = `${a}-derived`] = [undefined, undefined]
const [c = computeFallback('skipped')] = ['provided']
console.log('D2 eval-order:', a, b, '| skipped:', c, '| calls:', defaultCalls)

// D3: Destructuring in catch, for...in vs for...of, and object property assignment targets
try {
  JSON.parse('{bad json')
} catch ({ name, message }) {
  console.log('D3 catch:', name, '->', message.slice(0, 22))
}

const target = { a: 0, b: 0 }
;[target.a, target.b] = [10, 20]
console.log('D3 target:', target)