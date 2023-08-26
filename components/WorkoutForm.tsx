import {
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import PressableText from './styled/PressableText';
import { useForm, Controller } from 'react-hook-form';
export type WorkoutFormData = {
	name: string;
	duration: string;
	reps?: string;
	type: string;
};
type WorkoutProps = {
	onSubmit: (form: WorkoutFormData) => void;
};
function WorkoutForm({ onSubmit }: WorkoutProps) {
	const { control, handleSubmit } = useForm();
	return (
		<View style={styles.container}>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				name="name"
				render={({ field: { onChange, value } }) => (
					<TextInput
						onChangeText={onChange}
						value={value}
						style={styles.input}
                        placeholder="Workout name"
                        placeholderTextColor={"rgba(0,0,0,0.1)"}
					></TextInput>
				)}
            />
            <PressableText
					text="Confirm"
					style={{marginTop:15}}
					onPress={handleSubmit((data) => {
						onSubmit(data as WorkoutFormData);
					})}
				/>
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
        width:200,
		height: 30,
		margin: 2,
		borderWidth: 1,
		padding: 5,
		borderRadius: 5,
		borderColor: 'rgba(0,0,0,0.4)',
	},
});
export default WorkoutForm;
