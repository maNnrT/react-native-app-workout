import {
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { useState } from 'react';
import PressableText from './styled/PressableText';
import { useForm, Controller } from 'react-hook-form';
export type ExerciseFormData = {
	name: string;
	duration: string;
	reps?: string;
	type: string;
};
type WorkoutProps = {
	onSubmit: (form: ExerciseFormData) => void;
};
const selectionItems = ['exercise', 'break', 'stretch'];
function ExerciseForm({ onSubmit }: WorkoutProps) {
	const { control, handleSubmit } = useForm();
	const [isSelection, setIsSelection] = useState(false);
	return (
		<View style={styles.container}>
			<View>
				<View style={styles.rowContainer}>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						name="name"
						render={({ field: { onChange, value } }) => (
							<TextInput
								onChangeText={onChange}
								placeholderTextColor={"rgba(0,0,0,0.1)"}
								value={value}
								style={styles.input}
								placeholder="Name"
							></TextInput>
						)}
					/>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						name="duration"
						render={({ field: { onChange, value } }) => (
							<TextInput
								onChangeText={onChange}
								placeholderTextColor={"rgba(0,0,0,0.1)"}
								value={value}
								style={styles.input}
								placeholder="Duration"
							></TextInput>
						)}
					/>
				</View>
				<View style={styles.rowContainer}>
					<Controller
						control={control}
						rules={{
							required: false,
						}}
						name="reps"
						render={({ field: { onChange, value } }) => (
							<TextInput
								onChangeText={onChange}
								placeholderTextColor={"rgba(0,0,0,0.1)"}
								value={value}
								style={styles.input}
								placeholder="Repitation"
							></TextInput>
						)}
					/>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						name="type"
						render={({ field: { onChange, value } }) => (
							<View style={{ flex: 1 }}>
								{isSelection ? (
									<View>
										{selectionItems.map((selection, idx) => (
											<PressableText
												text={selection}
												onPressIn={() => {
													onChange(selection);
													setIsSelection(false);
												}}
												key={idx}
												style={styles.selection}
											/>
										))}
									</View>
								) : (
									<TextInput
										onPressIn={() => setIsSelection(true)}
										placeholderTextColor={'rgba(0,0,0,0.1)'}
										style={styles.input}
										placeholder="Type"
										value={value}
									></TextInput>
								)}
							</View>
						)}
					/>
				</View>
				<PressableText
					text="Add Exercise"
					style={{ marginTop: 15 }}
					onPress={handleSubmit((data) => {
						onSubmit(data as ExerciseFormData);
					})}
				/>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 10,
	},
	input: {
		flex: 1,
		height: 30,
		margin: 2,
		borderWidth: 1,
		padding: 5,
		borderRadius: 5,
		borderColor: 'rgba(0,0,0,0.4)',
	},
	rowContainer: {
		flexDirection: 'row',
	},
	selection: {
		margin: 2,
		padding: 3,
		alignSelf: 'center',
	},
});
export default ExerciseForm;
