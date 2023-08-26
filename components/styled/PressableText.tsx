import { Pressable, Text,PressableProps, TextStyle, StyleProp } from "react-native";
export type PressableTextProps = PressableProps & { text:string, style?: StyleProp<TextStyle>}
function PressableText(props:PressableTextProps) {
	return (
		<Pressable {...props}>
			<Text style={[props.style, {textDecorationLine: 'underline'} ]}>
				{props.text}
			</Text>
		</Pressable>
	);
}

export default PressableText;
