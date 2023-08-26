import {
	View,
	Text,
	StyleSheet,
	Button,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useWorkoutBySlug } from '../hooks/useWorkoutBySlug';
import PressableText from '../components/styled/PressableText';
import { Modal } from '../components/styled/Modal';
import { formatSec } from '../utils/time';
import { FontAwesome } from '@expo/vector-icons';
import WorkoutItem from '../components/WorkoutItem';
import { ISequenceItem } from '../types/data';
import { useState, useEffect } from 'react';
import { useCountDown } from '../hooks/useCountDown';
type Props = NativeStackScreenProps<
	RootStackParamList,
	'WorkoutDetail'
>;
export default function WorkoutDetailScreen({
	route,
}: Props) {
	const [sequence, setSequence] = useState<ISequenceItem[]>(
		[]
	);
	const [trackerIdx, setTrackerIdx] = useState(-1);
	const workout = useWorkoutBySlug(route.params.slug);
	const startupSeq = ['Go', '1', '2', '3'];
	const { countDown, isRunning, stop, start } =
		useCountDown(trackerIdx);

	const addItemToSequence = (idx: number) => {
		let newSequence = [];
		if (idx > 0) {
			newSequence = [...sequence, workout!.sequence[idx]];
		} else {
			newSequence = [workout!.sequence[idx]];
		}
		setSequence(newSequence);
		setTrackerIdx(idx);
		start(newSequence[idx].duration + startupSeq.length);
	};

	useEffect(() => {
		if (!workout) return;
		if (trackerIdx === workout!.sequence.length - 1) {
			return;
		}
		if (countDown === 0) {
			addItemToSequence(trackerIdx + 1);
		}
	}, [countDown]);
	if (!workout) return null;
	const hasReachedEnd =
		sequence.length === workout.sequence.length &&
		countDown === 0;
	return (
		<View style={styles.container}>
			<WorkoutItem
				item={workout}
				childStyles={{ marginTop: 10 }}
			>
				<Modal
					activator={({ handleOpen }) => (
						<PressableText
							onPress={handleOpen}
							text="Check Sequence"
						></PressableText>
					)}
				>
					{() => (
						<View>
							{workout.sequence.map((si, idx) => (
								<View
									key={si.slug}
									style={styles.sequenceItem}
								>
									<Text>
										{si.name} | {si.type} | {formatSec(si.duration)}
									</Text>
									{idx !== workout.sequence.length - 1 && (
										<FontAwesome
											name="arrow-down"
											size={20}
										/>
									)}
								</View>
							))}
						</View>
					)}
				</Modal>
			</WorkoutItem>
			<View style={styles.wrapper}>
				<View style={styles.counterUI}>
					<View style={styles.counterItems}>
						{sequence.length === 0 ? (
							<FontAwesome
								name="play-circle-o"
								size={100}
								onPress={() => addItemToSequence(0)}
							/>
						) : isRunning ? (
							<FontAwesome
								name="stop-circle-o"
								size={100}
								onPress={() => stop()}
							/>
						) : (
							<FontAwesome
								name="play-circle-o"
								size={100}
								onPress={() => {
									if (hasReachedEnd) {
										addItemToSequence(0);
									} else {
										start(countDown);
									}
								}}
							/>
						)}
					</View>
					{sequence.length > 0 && countDown >= 0 && (
						<View style={styles.counterItems}>
							<Text style={{ fontSize: 55 }}>
								{countDown > sequence[trackerIdx].duration
									? startupSeq[
											countDown - sequence[trackerIdx].duration - 1
									  ]
									: countDown}
							</Text>
						</View>
					)}
				</View>
				<View style={{ alignItems: 'center' }}>
					<Text style={{ fontSize: 60, fontWeight: 'bold' }}>
						{sequence.length === 0
							? 'Prepare'
							: hasReachedEnd
							? 'Great Job!'
							: sequence[trackerIdx].name}
					</Text>
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
	},
	header: {
		fontSize: 20,
		marginBottom: 20,
		fontWeight: 'bold',
		fontFamily: 'montserrat-bold',
	},

	sequenceItem: {
		alignItems: 'center',
	},
	counterUI: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 20,
	},
	counterItems: {
		flex: 1,
		alignItems: 'center',
	},
	wrapper: {
		borderRadius: 10,
		borderColor: 'rgba(0,0,0,0.1)',
		backgroundColor: '#fff',
		borderWidth: 1,
		padding: 10,
	},
});
