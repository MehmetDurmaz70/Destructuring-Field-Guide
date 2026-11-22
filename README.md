# Destructuring Field Guide

Name: Mehmet Durmaz  
Student number: 2024502045

Bonuses claimed: **Bonus 1: LaTeX**, **Bonus 2: Depth**, **Bonus 3: Real code**, **Bonus 4: Git repository**

## Run

```bash
npm install
npm run all      # runs the JS and TS examples (including Bonus 2 depth experiments)
npm run check    # type-checks in strict mode
```

All outputs below come directly from running `npm run all > output.txt` on my machine.

---

## Field guide

> **Note on `...` (Rest vs. Spread):** Three dots (`...`) do opposite jobs depending on which side of the assignment they appear on. On the **left** side inside a destructuring pattern (`const [first, ...others] = list` or `const { id, ...specs } = item`), `...` is **rest**: it gathers remaining elements or properties into a new array or object. On the **right** side inside an expression (`[...list]` or `<section {...rest}>`), `...` is **spread**: it expands an existing array or object into individual elements or props.

### Form 1: array destructuring by position, `const [x, y] = f()`

**Syntax:** `const [steamTemp, crustTemp] = ovenRange([215, 250, 230])`

**Plain assignment equivalent:**
```js
const _range = ovenRange([215, 250, 230])
const steamTemp = _range[0]
const crustTemp = _range[1]
```

**Example** (from `js/arrays.mjs` and `ts/arrays.ts`):

```ts
function ovenRange(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)]
}
const [steamTemp, crustTemp] = ovenRange([215, 250, 230])
console.log('form 1 (bake):', steamTemp, crustTemp)
```

**Output:** `form 1 (bake): 215 250`

**Use it when:** a function returns two or three related values in a fixed positional order (such as a `[min, max]` pair or `[state, dispatch]`).

**Watch out:** position is the only contract—swapping variable names silently swaps the values, and reading past the end yields `undefined` (or `T | undefined` in strict TS with `noUncheckedIndexedAccess` if the return type is `T[]` instead of a fixed tuple).

---

### Form 2: skip an item and collect the rest, `const [, second, ...others] = list`

**Syntax:** `const [, secondBook, ...remainingBooks] = readingQueue`

**Plain assignment equivalent:**
```js
const secondBook = readingQueue[1]
const remainingBooks = readingQueue.slice(2)
```

**Example** (from `js/arrays.mjs` and `ts/arrays.ts`):

```ts
const readingQueue: readonly string[] = [
  'Anayurt Oteli',
  'The Gambler',
  'For Whom the Bell Tolls',
  'The Tartar Steppe',
]
const [, secondBook, ...remainingBooks] = readingQueue
console.log('form 2:', secondBook, remainingBooks)
```

**Output:** `form 2: The Gambler [ 'For Whom the Bell Tolls', 'The Tartar Steppe' ]`

**Use it when:** you need to ignore leading header/sentinel elements and process the second item alongside the tail of a list.

**Watch out:** the rest element (`...remainingBooks`) must always be the **last** item in the array pattern; placing a comma or another binding after `...rest` throws a `SyntaxError`.

---

### Form 3: swap two variables, `[a, b] = [b, a]`

**Syntax:** `[primaryWatch, dailyWatch] = [dailyWatch, primaryWatch]`

**Plain assignment equivalent:**
```js
const _tmp0 = dailyWatch
const _tmp1 = primaryWatch
primaryWatch = _tmp0
dailyWatch = _tmp1
```

**Example** (from `js/arrays.mjs` and `ts/arrays.ts`):

```ts
let primaryWatch: string = 'Orient Helios'
let dailyWatch: string = 'Casio A159'
;[primaryWatch, dailyWatch] = [dailyWatch, primaryWatch]
console.log('form 3:', primaryWatch, dailyWatch)
```

**Output:** `form 3: Casio A159 Orient Helios`

**Use it when:** exchanging two mutable `let` variables or reordering two array slots in place without introducing a `temp` variable.

**Watch out:** both variables must be declared with `let` (not `const`), and without semicolons a line starting with `[` will attach to the previous expression as property indexing (`dailyWatch[primaryWatch, dailyWatch]`), causing a runtime crash unless prefixed with `;`.

---

### Form 4: default values in array patterns, `const [a = 1, b = 2] = []`

**Syntax:** `const [broccoliGrams = 100, leekGrams = 250, celeryGrams = undefined] = harvestWeights`

**Plain assignment equivalent:**
```js
const broccoliGrams = harvestWeights[0] === undefined ? 100 : harvestWeights[0]
const leekGrams = harvestWeights[1] === undefined ? 250 : harvestWeights[1]
const celeryGrams = harvestWeights[2] === undefined ? undefined : harvestWeights[2]
```

**Example** (from `js/arrays.mjs` and `ts/arrays.ts`):

```js
const harvestWeights = [420]
const [broccoliGrams = 100, leekGrams = 250, celeryGrams = undefined] = harvestWeights
console.log('form 4:', broccoliGrams, leekGrams, celeryGrams)
```

**Output:** `form 4: 420 250 undefined`

**Use it when:** unpacking short or partially populated arrays where missing trailing positions should fall back to safe defaults.

**Watch out:** defaults only trigger when the slot value is strictly `undefined` (or out of bounds); if the array contains `[420, null]`, the second variable becomes `null`, not `250`.

---

### Form 5: properties by name, `let { a, b } = t`

**Syntax:** `let { code, campus } = course`

**Plain assignment equivalent:**
```js
let code = course.code
let campus = course.campus
```

**Example** (from `js/objects.mjs` and `ts/objects.ts`):

```ts
type Course = { code: string; credits: number; campus: string }
const course: Course = { code: 'MIS 233', credits: 3, campus: 'Hisar' }
const { code, campus } = course
console.log('form 5 (course):', code, campus)
```

**Output:** `form 5 (course): MIS 233 Hisar`

**Use it when:** extracting multiple fields from a record or configuration object without repeating `obj.` on every line.

**Watch out:** variable names must match the object's property keys exactly; a typo silently produces `undefined` in JavaScript and a compile-time property error in TypeScript.

---

### Form 6: rename while you take it, `const { a: alpha } = t`

**Syntax:** `const { title: bookTitle, year: publishedYear } = book`

**Plain assignment equivalent:**
```js
const bookTitle = book.title
const publishedYear = book.year
```

**Example** (from `js/objects.mjs` and `ts/objects.ts`):

```ts
type Book = { title: string; author: string; year: number }
const book: Book = { title: 'For Whom the Bell Tolls', author: 'Ernest Hemingway', year: 1940 }
const { title: bookTitle, year: publishedYear } = book
console.log('form 6:', bookTitle, publishedYear)
```

**Output:** `form 6: For Whom the Bell Tolls 1940`

**Use it when:** the source property name is too generic (`title`, `id`, `data`) or collides with an existing local variable in the same scope.

**Watch out:** the original key (`title`) is **not** bound as a variable—referencing `title` throws `ReferenceError: title is not defined`. Also, in TypeScript, the colon inside `{ title: bookTitle }` is always a rename, never a type annotation.

---

### Form 7: default values in object patterns, `const { a = 1 } = t`

**Syntax:** `const { flour, hydration, starterRatio = 20 } = doughBatch`

**Plain assignment equivalent:**
```js
const flour = doughBatch.flour
const hydration = doughBatch.hydration
const starterRatio = doughBatch.starterRatio === undefined ? 20 : doughBatch.starterRatio
```

**Example** (from `js/objects.mjs` and `ts/objects.ts`):

```ts
type DoughBatch = { flour: string; hydration: number; starterRatio?: number }
const doughBatch: DoughBatch = { flour: 'Karakilcik', hydration: 78 }
const { flour, hydration, starterRatio = 20 } = doughBatch
console.log('form 7:', flour, hydration, starterRatio)
```

**Output:** `form 7: Karakilcik 78 20`

**Use it when:** reading optional settings where an omitted or `undefined` property should assume a standard baseline value.

**Watch out:** just like array defaults, `null` bypasses the default (`{ starterRatio: null }` leaves `starterRatio` as `null`).

---

### Form 8: rest in an object, `const { a, ...others } = t`

**Syntax:** `const { id, ...cameraSpecs } = camera`

**Plain assignment equivalent:**
```js
const id = camera.id
const cameraSpecs = { brand: camera.brand, model: camera.model, megapixels: camera.megapixels }
```

**Example** (from `js/objects.mjs` and `ts/objects.ts`):

```ts
type Camera = { id: string; brand: string; model: string; megapixels: number }
const camera: Camera = { id: 'cam-70', brand: 'Canon', model: 'Digital IXUS 70', megapixels: 7.1 }
const { id, ...cameraSpecs } = camera
console.log('form 8:', id, cameraSpecs)
```

**Output:** `form 8: cam-70 { brand: 'Canon', model: 'Digital IXUS 70', megapixels: 7.1 }`

**Use it when:** peeling off one or two wrapper/control fields (like `id` or `children`) and forwarding the remaining attributes cleanly.

**Watch out:** object rest creates a **shallow** copy of enumerable own properties—nested objects inside `cameraSpecs` still point to the same references in memory.

---

### Form 9: nested patterns and arrays inside objects, `const { p: { x }, list: [first] } = t`

**Syntax:** `const { soil: { compost }, crops: [firstCrop, secondCrop] } = gardenBed`

**Plain assignment equivalent:**
```js
const compost = gardenBed.soil.compost
const firstCrop = gardenBed.crops[0]
const secondCrop = gardenBed.crops[1]
```

**Example** (from `js/objects.mjs` and `ts/objects.ts`):

```ts
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
```

**Output:** `form 9: vermicompost broccoli leeks`

**Use it when:** drilling two levels deep into structured API payloads or configuration objects in one concise declaration.

**Watch out:** `soil` and `crops` themselves are **not** bound as variables here—only the leaf targets (`compost`, `firstCrop`, `secondCrop`) are created. If an intermediate object (`soil`) is `undefined`, destructuring throws a `TypeError` immediately.

---

### Form 10: computed property key, `const { [key]: value } = t`

**Syntax:** `const { [selectedLift]: currentMax } = liftMaxes`

**Plain assignment equivalent:**
```js
const currentMax = liftMaxes[selectedLift]
```

**Example** (from `js/objects.mjs` and `ts/objects.ts`):

```ts
type LiftMaxes = { benchPress: number; squat: number; rdl: number }
const liftMaxes: LiftMaxes = { benchPress: 75, squat: 95, rdl: 105 }
const selectedLift: keyof LiftMaxes = 'rdl'
const { [selectedLift]: currentMax } = liftMaxes
console.log('form 10:', selectedLift, currentMax)
```

**Output:** `form 10: rdl 105`

**Use it when:** the property name to extract is stored in a dynamic variable or parameter rather than known statically at write time.

**Watch out:** you must always provide a target variable name after the colon (`: currentMax`); writing `{ [selectedLift] }` alone is a `SyntaxError`. In TypeScript, type `selectedLift` as `keyof T` so the compiler knows the indexed property exists.

---

### Form 11: patterns in function parameters with defaults, `function f({ a = 1, b }: Options = {})`

**Syntax:** `function mixShake({ oatsGrams = 80, milkMl = 300, creatineGrams = 5 }: ShakeRecipe = {}): string`

**Plain assignment equivalent:**
```js
function mixShake(_opts) {
  const opts = _opts === undefined ? {} : _opts
  const oatsGrams = opts.oatsGrams === undefined ? 80 : opts.oatsGrams
  const milkMl = opts.milkMl === undefined ? 300 : opts.milkMl
  const creatineGrams = opts.creatineGrams === undefined ? 5 : opts.creatineGrams
  return `${oatsGrams}g oats + ${milkMl}ml milk + ${creatineGrams}g creatine`
}
```

**Example** (from `js/params.mjs` and `ts/params.ts`):

```ts
type ShakeRecipe = { oatsGrams?: number; milkMl?: number; creatineGrams?: number }
function mixShake({ oatsGrams = 80, milkMl = 300, creatineGrams = 5 }: ShakeRecipe = {}): string {
  return `${oatsGrams}g oats + ${milkMl}ml milk + ${creatineGrams}g creatine`
}
console.log('form 11 (custom):', mixShake({ oatsGrams: 100 }))
console.log('form 11 (empty call):', mixShake())

const formatSplit = ([distanceMeters, seconds = 12.5]: [number, number?]): string =>
  `${distanceMeters}m in ${seconds}s`
console.log('form 11b:', formatSplit([100, 11.8]), '|', formatSplit([60]))
```

**Output:**
```text
form 11 (custom): 100g oats + 300ml milk + 5g creatine
form 11 (empty call): 80g oats + 300ml milk + 5g creatine
form 11b: 100m in 11.8s | 60m in 12.5s
```

**Use it when:** designing functions or React components that accept named options where callers can omit individual keys or omit the entire argument object.

**Watch out:** you need **two** levels of defaults if `mixShake()` can be called with zero arguments: defaults inside `{ ... }` handle missing properties, while `= {}` after the pattern prevents `TypeError: Cannot destructure property 'oatsGrams' of 'undefined'` when no argument is passed.

---

### Form 12: patterns in loops, `for (const [k, v] of Object.entries(o))` and `Map` entries

**Syntax:** `for (const [model, lugMm] of Object.entries(watchLugWidths))`

**Plain assignment equivalent:**
```js
for (const entry of Object.entries(watchLugWidths)) {
  const model = entry[0]
  const lugMm = entry[1]
  entryPairs.push(`${model}:${lugMm}mm`)
}
```

**Example** (from `js/params.mjs` and `ts/params.ts`):

```ts
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
```

**Output:**
```text
form 12 (Object.entries): Orient Helios:20mm, Casio MTP-1302D:20mm, Casio F-91W:18mm
form 12 (Map): Ballikayalar=260m, Aladaglar=3756m
```

**Use it when:** iterating over `Object.entries(...)`, `Map` instances, or `.entries()` on arrays where each iteration yields a `[key, value]` pair.

**Watch out:** use `for...of` (which iterates iterable entries), not `for...in` (which iterates string property keys—destructuring `[k, v]` over a string key splits the first two characters of the key name instead of key and value).

---

## Pitfalls

All five pitfalls are implemented in `js/pitfalls.mjs` and verified against real output:

1. **Destructuring `undefined` or `null` throws a `TypeError`**
   - **Code:**
     ```js
     try {
       const { a } = undefined
       console.log(a)
     } catch (error) {
       console.log('pitfall 1:', error.constructor.name)
     }
     ```
   - **Output:** `pitfall 1: TypeError`
   - **Why it happens:** Object destructuring calls internal `RequireObjectCoercible` on the right-hand side before reading any property, and `undefined` and `null` are the only JavaScript values that cannot be converted to an object.

2. **Default values apply only to `undefined`, never to `null`**
   - **Code:**
     ```js
     const settings = { theme: undefined, accent: null }
     const { theme = 'light', accent = 'blue' } = settings
     console.log('pitfall 2:', theme, accent)
     ```
   - **Output:** `pitfall 2: light null`
   - **Why it happens:** The ECMAScript destructuring specification checks `value === undefined` (not truthiness or nullishness), so an explicit `null` is treated as a deliberate value and bypasses the default initializer.

3. **Reassigning existing variables without `const`/`let` requires parentheses**
   - **Code:**
     ```js
     let title = 'Old title'
     const updated = { title: 'New title' }
     ;({ title } = updated)
     console.log('pitfall 3:', title)
     ```
   - **Output:** `pitfall 3: New title`
   - **Why it happens:** When a statement begins with `{`, the JavaScript parser interprets `{ title }` as a standalone block statement rather than an object destructuring pattern, triggering a `SyntaxError` unless wrapped in parentheses `(...)`.

4. **Destructuring copies references, not deep clones**
   - **Code:**
     ```js
     const originalBed = { name: 'Bed 1', soil: { moisture: 40 } }
     const { soil } = originalBed
     soil.moisture = 65
     console.log('pitfall 4:', originalBed.soil.moisture, soil.moisture)
     ```
   - **Output:** `pitfall 4: 65 65`
   - **Why it happens:** `const { soil } = originalBed` copies the object reference stored in `originalBed.soil`, so mutating `soil.moisture` mutates the exact same nested object seen through `originalBed`.

5. **Object destructuring matches by property name (order-independent); array destructuring matches by index (order-dependent)**
   - **Code:**
     ```js
     const car = { model: 'Corsa', year: 1997 }
     const { year, model } = car
     const tuple = ['Corsa', 1997]
     const [firstItem, secondItem] = tuple
     console.log('pitfall 5:', year, model, '|', firstItem, secondItem)
     ```
   - **Output:** `pitfall 5: 1997 Corsa | Corsa 1997`
   - **Why it happens:** Object patterns look up keys by property identifier regardless of declaration order, whereas array patterns invoke the iterator protocol position-by-position (`0`, `1`, ...).

---

## TypeScript Topics (T1 to T5)

Implemented in `ts/types.ts` and verified with `tsc --noEmit` (`strict: true`, `noUncheckedIndexedAccess: true`):

- **T1 (`{ a: string }` is a rename, not a type):** Writing `const { x: number } = point` creates a variable named `number` instead of typing `x` as `number`. The type annotation belongs after the entire pattern: `const { x: typedHorizontal, y: typedVertical }: { x: number; y: number } = point` -> `T1: 1 1 2`.
- **T2 (Tuple return types and `as const`):** Returning `[number, string]` from `getLapRecord()` tells TypeScript that index `0` is `number` and index `1` is `string` (neither is `undefined`). Applying `as const` to `['siyez', 'karakilcik']` narrows the array to a readonly tuple of literal types `readonly ["siyez", "karakilcik"]`, so `[firstFlour, secondFlour]` get literal types `'siyez'` and `'karakilcik'` -> `T2: 11.64 100m sprint siyez karakilcik`.
- **T3 (`noUncheckedIndexedAccess`):** For `const scores: number[] = [88, 92]`, TypeScript cannot guarantee at compile time that index `0` exists, so `const [firstScore] = scores` has type `number | undefined`. Narrowing with nullish coalescing (`firstScore ?? 0`) produces a guaranteed `number` -> `T3: 88 88`.
- **T4 (Optional fields vs. defaults):** Given `type LensOption = { focalMm?: number; aperture?: number }`, destructuring `{ focalMm, aperture = 2.8 }` gives `focalMm` the type `number | undefined`, whereas `aperture` is narrowed to `number` because the default eliminates `undefined` -> `T4: undefined 2.8`.
- **T5 (Compile error caught by destructuring):** Destructuring a nonexistent property `{ lengthMeters }` from `GearItem` fails type-checking with `TS2339: Property 'lengthMeters' does not exist on type 'GearItem'`. Marking that line with `// @ts-expect-error` confirms the compiler catches the typo -> `T5: Dynamic Rope undefined`.

---

## Props and children

Every React component is a plain JavaScript function that receives **one** argument: a single `props` object. Attributes written on the JSX tag become properties of that object, and anything nested between the opening and closing tags becomes the `children` property on that exact same object. Code is in `js/props.jsx` and `ts/props.tsx`.

### P1: Props is one object (`CardA` vs `CardB`)

`CardA(props)` receives the whole object and accesses `props.title` and `props.children`. `CardB({ title, children })` uses **Form 11** (destructuring in a function parameter list) combined with **Form 5** (extracting properties by name) to unpack those two fields immediately in the signature. Both produce identical markup:

```text
P1 A: <section><h2>Hi</h2>text</section>
P1 B: <section><h2>Hi</h2>text</section>
```

### P2: `children` is only a prop

JSX tag bodies are syntactic sugar for passing a `children` prop. Writing `<CardB title="Note">text</CardB>` and `<CardB title="Note" children="text" />` compiles to the same `jsx(CardB, { title: "Note", children: "text" })` call:

```text
P2 body: <section><h2>Note</h2>text</section>
P2 attr: <section><h2>Note</h2>text</section>
```

### P3: What `children` can be

Rendering every legal React child type inside `<Box>` (`js/props.jsx` / `ts/props.tsx`):

```text
P3 string: <div data-label="str">Sourdough</div>
P3 number: <div data-label="num">42</div>
P3 one-el: <div data-label="one"><span>Leaf</span></div>
P3 multi-el: <div data-label="multi"><span>Broccoli</span><span>Leek</span></div>
P3 undefined: <div data-label="undef"></div>
P3 null: <div data-label="null"></div>
P3 false: <div data-label="false"></div>
P3 fn: <div data-label="fn"><em>MIS 233</em></div>
```

- **Appears in HTML:** strings (`"Sourdough"`), numbers (`42` renders as `"42"`, including `0`), single JSX elements (`<span>Leaf</span>`), and multiple sibling JSX elements (passed as an array of elements).
- **Produces nothing in HTML:** `undefined`, `null`, and booleans (`false` / `true`) are intentionally ignored by React so conditional expressions like `{isOpen && <Modal />}` render nothing when falsy.
- **Functions (`render props`):** React does not render a raw function directly; the component must explicitly detect `typeof children === 'function'` and invoke `children('MIS 233')` to get a `ReactNode`.

### P4: Separating `children` from the rest (`{ title, children, ...rest }`) and spread order

Using **Form 8** (`...rest`) in component parameters isolates wrapper-specific props (`title`, `children`) so remaining HTML attributes (`id`, `data-role`, `aria-*`) can be forwarded onto `<section>` without leaking `title` onto the DOM node. In JSX, **later props overwrite earlier props**, so the position of `{...rest}` decides precedence:

```text
P4 spread-first: <section id="p1" data-role="panel"><h3>Log</h3>Entry</section>
P4 spread-last: <section data-role="custom" id="p1"><h3>Log</h3>Entry</section>
```

When `{...rest}` comes first (`<section {...rest} data-role="panel">`), the component's hardcoded `data-role="panel"` wins. When `{...rest}` comes last (`<section data-role="panel" {...rest}>`), the caller's `data-role="custom"` overrides the default.

### P5: Props or `children`?

```text
P5 named-props: <article><header><h1>Garden</h1></header><main><p>Bed A</p></main><footer><small>2026</small></footer></article>
P5 children-only: <article><h1>Garden</h1><p>Bed A</p><small>2026</small></article>
```

- **Choose named props (`header`, `footer`)** when the component enforces a fixed structural layout with distinct semantic wrappers (`<header>`, `<main>`, `<footer>`) or styling slots where order and placement must be guaranteed by the component itself.
- **Choose `children` only** when the container is a generic wrapper (card, panel, surface) and the caller needs full freedom over internal element order, count, and structure.

### P6: Defaults in props (Form 7)

```text
P6 omitted: <span>Default Label: 0</span>
P6 undefined: <span>Default Label: 0</span>
P6 null: <span>: null</span>
```

When `label` and `count` are omitted or explicitly passed as `undefined`, Form 7 triggers the defaults (`'Default Label'` and `0`). When `null` is passed, defaults do **not** run: React renders `null` as empty text for `{label}` and `String(null)` renders the literal word `"null"` for `{String(count)}`.

### P7: Typing `children` and rest props in TypeScript

- **`children?: ReactNode`**: Explicitly opts a component into accepting any valid renderable child (`string`, `number`, JSX elements, arrays, `null`, `undefined`, `boolean`). Without listing `children` in the props type (like `StrictTitleOnly`), React 19 + TypeScript rejects `<HeaderOnly>Oops</HeaderOnly>` at compile time (`Property 'children' does not exist on type 'StrictTitleOnly'`).
- **`PropsWithChildren<P>`**: A built-in React utility type equal to `P & { children?: ReactNode }`, useful for layout wrappers like `SplitLayout` and `Alert`.
- **`ComponentProps<'button'>`**: Extracts all valid native `<button>` attributes (`disabled`, `type`, `onClick`, `children`, etc.) so wrapper components like `ActionButton` can type `...rest` accurately and reject invalid attributes (such as `href` on a `<button>`).

```text
P7 Alert: <div class="info">Saved</div>
P7 Button: <button type="button" data-variant="primary" disabled="">Submit</button>
```

---

## JavaScript vs TypeScript

| Form / Pattern | What stays the same in TS | What you must add in TS | Error when done wrong |
| :--- | :--- | :--- | :--- |
| **1. Tuple position**<br>`const [x, y] = f()` | Destructuring syntax on the left-hand side is identical. | Explicit tuple return type (`[number, number]`) on `f()` so TS knows fixed length and exact element types. | `TS2488` / `TS2322` if `f()` returns a plain `number[]` and you assign elements to non-optional `number` without checking `undefined`. |
| **2. Skip & rest**<br>`const [, second, ...others] = list` | Leading comma skip and `...others` rest collection work identically. | Element type on `list` (e.g., `readonly string[]`); with `noUncheckedIndexedAccess`, `second` is `string \| undefined`. | `TS18048: 'second' is possibly 'undefined'` if used directly where `string` is required. |
| **3. Swap variables**<br>`[a, b] = [b, a]` | In-place swap syntax without temporary variables is unchanged. | Both `a` and `b` must share compatible mutable types (`let a: string; let b: string`). | `TS2322: Type 'number' is not assignable to type 'string'` if swapping incompatible types. |
| **4. Array defaults**<br>`const [a = 1, b = 2] = arr` | Default initializer `= value` syntax inside `[...]` is identical. | Ensure the default value's type is assignable to the array's element type (or widens cleanly). | `TS2322: Type 'string' is not assignable to type 'number'` if default value conflicts with typed array elements. |
| **5. Object properties**<br>`const { a, b } = obj` | Property extraction by exact key name is identical. | Object type or `interface` on `obj` declaring properties `a` and `b`. | `TS2339: Property 'x' does not exist on type '...'` when destructuring a misspelled property. |
| **6. Rename property**<br>`const { a: alpha } = obj` | `{ sourceKey: localAlias }` syntax is identical. | Put the type annotation **after** the whole pattern (`: ObjType`), never inside `{ a: string }`. | `TS2304: Cannot find name 'a'` (if referencing old name) or accidental variable named `string` (if type put inside pattern). |
| **7. Object defaults**<br>`const { a = 1 } = obj` | Default fallback syntax `= 1` is identical; removes `\| undefined` from the inferred local variable. | Mark `a?: number` as optional in the source type so callers can omit it. | `TS2741: Property 'a' is missing in type '...'` at the call site if `a` was not marked optional (`?`). |
| **8. Object rest**<br>`const { a, ...others } = obj` | `...others` gathers all unextracted properties identically. | Type on `obj` so TS computes `Omit<Obj, 'a'>` automatically for `others`. | `TS2700: Rest types may only be created from object types` if attempting rest on a primitive or generic unconstrained `T`. |
| **9. Nested patterns**<br>`const { p: { x }, list: [first] } = t` | Multi-level object/array pattern syntax is identical. | Nested shape in type `T`; if intermediate `p` is optional (`p?: ...`), it cannot be nested-destructured directly. | `TS2339: Property 'x' does not exist on type '{ x: number } \| undefined'` unless default `p = { x: 0 }` is given. |
| **10. Computed key**<br>`const { [key]: val } = obj` | Computed bracket key `[key]: val` syntax is identical. | Annotate `key` as `keyof ObjType` (or a specific literal union) instead of plain `string`. | `TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '...'`. |
| **11. Parameter pattern**<br>`function f({ a = 1 }: Opts = {})` | Parameter destructuring and `= {}` fallback work identically. | Place `: Opts` after the pattern and before `= {}`, with optional properties in `Opts`. | `TS2554: Expected 1 arguments, but got 0` if `: Opts` is written without `= {}`. |

---

## My own log

1. **Forgetting the semicolon before `[primaryWatch, dailyWatch] = [dailyWatch, primaryWatch]` (Form 3):**
   When I first wrote the swap right after `let dailyWatch = 'Casio A159'` without a semicolon, Node tried to parse `[primaryWatch, dailyWatch]` as bracket indexing on the string `'Casio A159'`, throwing `TypeError: Cannot set properties of undefined (setting 'Orient Helios')`. Adding a leading `;` before `[` fixed it immediately and taught me why ASI (Automatic Semicolon Insertion) does not insert a semicolon when the next line starts with `[` or `(`.

2. **Confusing rename syntax with type annotations in TypeScript (Topic T1):**
   Coming from function parameter syntax, I initially tried writing `const { x: number } = point` expecting `x` to be typed as `number`. Instead, TypeScript created a variable called `number` with value `1` and complained `Cannot find name 'x'`. Seeing that `{ key: alias }` is always a rename in both JS and TS—and that the type must come after the entire pattern (`const { x }: { x: number } = point`)—cleared up the rule permanently.

3. **`noUncheckedIndexedAccess` turning `const [first] = items` into `number | undefined` (Topic T3):**
   In plain JavaScript I assumed destructuring the first item of a `number[]` gives a `number`. Under this project's `tsconfig.json` (`"noUncheckedIndexedAccess": true`), `const [firstScore] = scores` gave `number | undefined`, triggering `TS18048: 'firstScore' is possibly 'undefined'` until I either added a nullish coalescing fallback (`firstScore ?? 0`) or typed the source as a fixed tuple (`[number, number]`).

4. **Passing `null` vs `undefined` into a prop with a default value (Topic P6):**
   In `Badge({ label = 'Default Label', count = 0 })`, I expected `<Badge label={null} count={null} />` to fall back to `'Default Label'` and `0`. Instead, `renderToStaticMarkup` output `<span>: null</span>` because destructuring defaults check strictly for `undefined`, not `null`, and React renders `null` as empty text while `String(null)` prints `"null"`.

5. **Passing both a `children` attribute and JSX tag body at the same time:**
   While experimenting with P2, I tested `<CardB title="Note" children="attr">body</CardB>` to see which one wins. TypeScript immediately blocked it with `TS2783: 'children' is specified more than once, so this usage will be overwritten`, and in plain JSX the inner tag body overwrites the `children` attribute because the JSX transform appends tag children after explicit props.

6. **Attempting to destructure `key` inside a component's props:**
   When testing special React props, I wrote `function Item({ key, title })` and passed `<Item key="k1" title="Task" />`. At runtime `key` inside the component was `undefined` and React logged a warning (`Item: 'key' is not a prop. Trying to access it will result in 'undefined' being returned`), confirming that React strips `key` and `ref` before building the `props` object passed to the component.

---

## Bonus 1: LaTeX

The complete field guide is also written in LaTeX in `guide.tex` and compiled to `guide.pdf` (included in the project root and submission zip).

- **Source file:** `guide.tex`
- **Compiled PDF:** `guide.pdf`
- **Compilation commands used:**
  ```bash
  pdflatex -interaction=nonstopmode guide.tex
  pdflatex -interaction=nonstopmode guide.tex
  ```
  *(Run twice so the clickable `\tableofcontents` and section cross-references resolve cleanly with zero overfull boxes.)*

---

## Bonus 2: Depth

To investigate destructuring beyond standard arrays and objects, I added runnable experiments in `js/depth.mjs` and `ts/depth.ts` (included in `npm run all` and `output.txt`):

### 1. Destructuring any iterable (`String`, `Set`, `Generator`) and the Iterator Protocol
Array destructuring `[a, b, ...rest]` is not restricted to `Array` instances—under the hood, ECMAScript invokes `[Symbol.iterator]()` on the right-hand side and pulls values step-by-step via `.next()`. Crucially, destructuring is **lazy**: if a pattern only asks for 3 items (`const [f1, f2, f3] = fibGen()`), the engine stops calling `.next()` and closes the iterator after the 3rd `yield`, so even infinite generators can be destructured safely.

- **Code (`js/depth.mjs`):**
  ```js
  const [firstChar, secondChar, ...restChars] = 'BOUN'
  const uniqueWatches = new Set(['Orient Helios', 'Casio A159', 'Orient Helios'])
  const [firstUnique, secondUnique] = uniqueWatches

  function* fibGen() {
    yield 1; yield 1; yield 2; yield 3
  }
  const [f1, f2, f3] = fibGen()
  console.log('D1 iterables:', firstChar, secondChar, restChars.join(''), '|', firstUnique, secondUnique, '|', f1, f2, f3)
  ```
- **Real Output:** `D1 iterables: B O UN | Orient Helios Casio A159 | 1 1 2`

### 2. Order of evaluation, side-effect defaults, and referencing earlier bindings
Default initializers in a destructuring pattern are evaluated **lazily left-to-right** and **only** when the corresponding slot evaluates to `undefined`. Because evaluation happens sequentially in the same scope, a later default expression can reference a variable bound earlier in the exact same pattern (`b = `${a}-derived``), whereas referencing a later variable triggers a `ReferenceError` (Temporal Dead Zone).

- **Code (`js/depth.mjs`):**
  ```js
  let defaultCalls = 0
  function computeFallback(label) {
    defaultCalls++
    return `${label}-default`
  }
  const [a = computeFallback('first'), b = `${a}-derived`] = [undefined, undefined]
  const [c = computeFallback('skipped')] = ['provided']
  console.log('D2 eval-order:', a, b, '| skipped:', c, '| calls:', defaultCalls)
  ```
- **Real Output:** `D2 eval-order: first-default first-default-derived | skipped: provided | calls: 1` (proving `computeFallback('skipped')` was never called).

### 3. Destructuring in `catch` clauses and object property assignment targets
Destructuring works anywhere a binding or assignment target is legal: `catch ({ name, message })` unpacks thrown `Error` instances directly in the catch header, and `[target.a, target.b] = [10, 20]` assigns directly into existing object properties without declaring new variables.

- **Code (`js/depth.mjs`):**
  ```js
  try {
    JSON.parse('{bad json')
  } catch ({ name, message }) {
    console.log('D3 catch:', name, '->', message.slice(0, 22))
  }
  const target = { a: 0, b: 0 }
  ;[target.a, target.b] = [10, 20]
  console.log('D3 target:', target)
  ```
- **Real Output:**
  ```text
  D3 catch: SyntaxError -> Expected property name
  D3 target: { a: 10, b: 20 }
  ```

### 4. Type-level destructuring in TypeScript (`infer` and `Parameters<F>`)
TypeScript's conditional types mirror runtime array destructuring at the type level using `infer`: `First<T>` extracts the head element of a tuple type, `Tail<T>` extracts the rest tuple, and `Parameters<typeof scheduleWorkout>` unpacks a function's parameter list into a labeled tuple type `[day: string, sets: number, rpe: number]`.

- **Code (`ts/depth.ts`):**
  ```ts
  type First<T extends readonly unknown[]> = T extends readonly [infer Head, ...unknown[]] ? Head : never
  type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer Rest] ? Rest : []
  type WorkoutArgs = Parameters<typeof scheduleWorkout>
  ```
- **Real Output:** `D4 type-level: Squat [ 95, true ] | Leg Day: 4 sets @ RPE 8.5`

### 5. When destructuring hurts readability (and how to refactor)
Deeply nested patterns with multiple renames (e.g., `const { data: { user: { profile: { displayName: name } } } } = response`) force readers to track four levels of braces and obscure which intermediate object might be `undefined`. Refactoring into two flat steps (`const profile = response.data?.user?.profile; const { displayName: name = 'Guest' } = profile ?? {}`) preserves null-safety and keeps each pattern readable at a glance.

---

## Bonus 3: Real code

Below are five real-world destructuring examples examined from my Assignment 3 Task Manager codebase (`MehmetDurmaz70/Task-Manager`) and installed `node_modules` packages:

1. **Assignment 3 — `src/App.tsx` (line 13): `const [state, dispatch] = useReducer(taskReducer, initialState)`**
   - **Form:** **Form 1** (array destructuring by position on a tuple returned by a hook).
   - **Without destructuring:**
     ```ts
     const reducerTuple = useReducer(taskReducer, initialState)
     const state = reducerTuple[0]
     const dispatch = reducerTuple[1]
     ```

2. **Assignment 3 — `src/components/TaskRow.tsx` (line 9): `export function TaskRow({ task, onAdvance, onRemove }: TaskRowProps)`**
   - **Form:** **Form 11** + **Form 5** (parameter object destructuring by property name).
   - **React props vs. children analysis:** `task`, `onAdvance`, and `onRemove` are all **explicit JSX props** passed as attributes (`<TaskRow task={t} onAdvance={...} onRemove={...} />`). `TaskRow` is a self-closing leaf component that renders its own `<li>` structure from `task` fields and does **not** accept or render `children`.
   - **Without destructuring:**
     ```tsx
     export function TaskRow(props: TaskRowProps) {
       return <li>{props.task.title} <button onClick={() => props.onAdvance(props.task.id)}>...</button></li>
     }
     ```

3. **Assignment 3 — `src/taskReducer.ts` (line 26): `const { tasks, filter, past } = state`**
   - **Form:** **Form 5** (extracting multiple state fields by property name).
   - **Without destructuring:**
     ```ts
     const tasks = state.tasks
     const filter = state.filter
     const past = state.past
     ```

4. **Assignment 3 — `src/taskReducer.ts` (line 53): `const previousTasks = past[past.length - 1]` & `past.slice(0, -1)` (and `const [first, ...rest]` pattern)**
   - **Form:** **Form 2** / **Form 8** (`...rest` object spread/rest when cloning state `{ ...state, tasks: nextTasks, past: [...past, tasks] }`).
   - **Without destructuring/rest:** `Object.assign({}, state, { tasks: nextTasks, past: past.concat([tasks]) })`.

5. **Installed Library (`node_modules/react-dom/cjs/react-dom-server.node.development.js`, `renderToStaticMarkup` options unpacking): `const { identifierPrefix, onError } = options || {}`**
   - **Form:** **Form 5** + **Form 11** (extracting configuration keys with an empty-object fallback).
   - **Why destructuring can hurt here:** In internal library code with 10+ destructured options in a single statement (`const { a, b, c, d, e, f, g, h } = options`), it becomes hard to see which options are actually used 80 lines later in a long function compared to reading `options.onError` at the single call site where an error is handled.

---

## Bonus 4: Git repository

https://github.com/MehmetDurmaz70/Destructuring-Field-Guide