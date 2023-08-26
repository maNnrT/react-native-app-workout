import {
	View,
	Modal as DefaultModal,
	Text,
	StyleSheet,
} from 'react-native';
import PressableText from './PressableText';
import { useState, FunctionComponent } from 'react';

type ModalProps = {
	activator?: FunctionComponent<{
		handleOpen: () => void;
	}>;
	children: FunctionComponent<{
		handleOpen: () => void;
		handleClose: () => void;
	}>;
};
export function Modal({
	activator: Activator,
	children,
}: ModalProps) {
	const [isModalVisible, setIsModalVisible] =
		useState(false);
	const handleOpen =()=> setIsModalVisible(true);
	const handleClose =()=> setIsModalVisible(false);
	return (
		<>
			<DefaultModal
				visible={isModalVisible}
				transparent={false}
				animationType="fade"
			>
				<View style={styles.centerView}>
					<View style={styles.contentView}>{children({handleOpen,handleClose})}</View>
					<PressableText
						text="Close"
						onPress={handleClose}
					/>
				</View>
			</DefaultModal>
			{Activator ? (
				<Activator handleOpen={handleOpen} />
			) : (
				<PressableText
					onPress={handleOpen}
					text="Check Sequence"
				></PressableText>
			)}
		</>
	);
}
const styles = StyleSheet.create({
	centerView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    },
    contentView: {
        marginBottom: 20
      }
});
