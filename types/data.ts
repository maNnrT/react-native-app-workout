

export type Difficulty = "easy" | "normal" | "hard"
export type SequenceType = "exercise" | "stretch" | "break"

export interface IWorkout {
  slug: string,
  name: string,
  duration: number,
  difficulty: Difficulty,
  sequence: ISequenceItem[]
}

export interface ISequenceItem {
  slug: string,
  name: string,
  type: SequenceType,
  duration: number,
  reps?: number
}