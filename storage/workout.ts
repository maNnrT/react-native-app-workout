import { containsKey, getData, removeItem, storeData } from ".";
import data from '../data.json'
import { IWorkout } from "../types/data";

export const getWorkouts = async ():Promise<IWorkout[]> => {
    const workouts = await getData("workout-data")
    return workouts
};
export const getWorkoutBySlug = async (slug: string): Promise<IWorkout> => {
    const workouts = await getWorkouts();
    const workout = workouts.filter(w =>w.slug === slug)[0]
    return workout;
}
export const initWorkouts = async ():Promise<boolean> => {
	const hasWorkout = await containsKey('workout-data');
	if (!hasWorkout) {
        await storeData('workout-data', data);
        return true
    }
    return false;
};
export const storeWorkout = async (newWorkout: IWorkout): Promise<boolean> => {
    const workouts = await getWorkouts()
    await storeData('workout-data', [newWorkout,...workouts])
    return true
}
export const clearWorkout = async () => {
    await removeItem('workout-data');
}