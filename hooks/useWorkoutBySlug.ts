import { IWorkout } from '../types/data';
import { useEffect, useState } from 'react';
import { getWorkoutBySlug } from '../storage/workout';
export const useWorkoutBySlug = (slug:string) => {
    const [workout, setWorkout] = useState<IWorkout>();
	useEffect(() => {
        async function getData() {
            console.log('Getting data...');
            const _workout = await getWorkoutBySlug(slug);
			setWorkout(_workout);
        }

            getData()
    }, []);
    return workout
}