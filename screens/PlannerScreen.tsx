import {
	View,
	StyleSheet,
	FlatList,
	Text,
} from 'react-native';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import ExerciseForm, {
	ExerciseFormData,
} from '../components/ExerciseForm';
import { ISequenceItem, IWorkout } from '../types/data';
import { SequenceType } from '../types/data';
import slugify from 'slugify';
import ExerciseItem from '../components/ExerciseItem';
import PressableText from '../components/styled/PressableText';
import { Modal } from '../components/styled/Modal';
import WorkoutForm, {
	WorkoutFormData,
} from '../components/WorkoutForm';
import { storeWorkout } from '../storage/workout';
import { PressableThemeText } from '../components/styled/PressableThemeText';
type Props = NativeStackScreenProps<
	RootStackParamList,
	'Planner'
>;

export default function PlannerScreen({
	navigation,
}: Props) {
	const [seqItems, setSeqItems] = useState<ISequenceItem[]>(
		[]
	);
	const handleExerciseSubmit = (form: ExerciseFormData) => {
		const sequenceItem: ISequenceItem = {
			slug: slugify(form.name + ' ' + Date.now(), {
				lower: true,
			}),
			name: form.name,
			type: form.type as SequenceType,
			duration: Number(form.duration),
		};
		if (form.reps) {
			sequenceItem.reps = Number(form.reps);
		}
		setSeqItems([...seqItems, sequenceItem]);
	};
	const computeDiff = (
		exercisesCount: number,
		workoutDuration: number
	) => {
		const intensity = workoutDuration / exercisesCount;
		if (intensity <= 60) {
			return 'hard';
		} else if (intensity <= 100) {
			return 'normal';
		} else {
			return 'easy';
		}
	};
	const handleWorkoutSubmit = async (form: WorkoutFormData) => {
		if (seqItems.length > 0) {
			const duration = seqItems.reduce((acc, seqItem) => {
				return acc + seqItem.duration;
			}, 0);
			const workout: IWorkout = {
				name: form.name,
				slug: slugify(form.name + ' ' + Date.now(), {
					lower: true,
				}),
				difficulty: computeDiff(seqItems.length, duration),
				sequence: [...seqItems],
				duration,
			};
			console.log(workout);
			await storeWorkout(workout);
		}
	};

	return (
		<View style={styles.container}>
			<ExerciseForm
				onSubmit={handleExerciseSubmit}
			></ExerciseForm>
			<View>
				<Modal
					activator={({ handleOpen }) => (
						<PressableThemeText
							style={{ marginTop: 15, marginBottom:15 }}
							text="Create workout"
							onPress={handleOpen}
						/>
					)}
				>
					{({ handleClose }) => (
						<View>
							<WorkoutForm
								onSubmit={ async (data) => {
									await handleWorkoutSubmit(data);
									handleClose();
									
									navigation.navigate("Home")

								}}
							/>
						</View>
					)}
				</Modal>
			</View>
			<FlatList
				data={seqItems}
				keyExtractor={(item) => item.slug}
				renderItem={({ item, index }) => (
					<ExerciseItem item={item}>
						<PressableText
							text="Remove"
							onPressIn={() => {
								const items = [...seqItems];
								items.splice(index, 1);
								setSeqItems(items);
							}}
						/>
					</ExerciseItem>
				)}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});
