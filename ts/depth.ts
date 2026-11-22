// Mehmet Durmaz - 2024502045
// Bonus 2: Type-level destructuring with conditional types, `infer`, `Parameters<F>`, and generic React props.

type First<T extends readonly unknown[]> = T extends readonly [infer Head, ...unknown[]] ? Head : never
type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer Rest] ? Rest : []

type SampleTuple = [string, number, boolean]
type HeadItem = First<SampleTuple> // string
type TailItems = Tail<SampleTuple> // [number, boolean]

function scheduleWorkout(day: string, sets: number, rpe: number): string {
  return `${day}: ${sets} sets @ RPE ${rpe}`
}
type WorkoutArgs = Parameters<typeof scheduleWorkout> // [day: string, sets: number, rpe: number]
const args: WorkoutArgs = ['Leg Day', 4, 8.5]
const [dayName, setCount, targetRpe] = args

const sampleHead: HeadItem = 'Squat'
const sampleTail: TailItems = [95, true]
console.log('D4 type-level:', sampleHead, sampleTail, '|', scheduleWorkout(dayName, setCount, targetRpe))