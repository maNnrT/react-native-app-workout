import { IWorkout } from '../types/data';
import { useEffect, useState } from 'react';
import { getWorkouts } from '../storage/workout';
import { useIsFocused } from '@react-navigation/native';
export const useWorkouts = () => {
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const isFocused = useIsFocused()
	useEffect(() => {
        async function getData() {
            console.log('Getting data...');
			const _workouts = await getWorkouts();
			setWorkouts(_workouts);
        }
        if (isFocused) {
            getData()
        }
    }, [isFocused]);
    return workouts
}