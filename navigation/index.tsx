import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import PlannerScreen from '../screens/PlannerScreen';
import { ColorSchemeName } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
export type RootStackParamList = {
	Root: undefined;
	Welcome: undefined;
	Home: undefined;
	Planner: undefined;
	WorkoutDetail: {slug: string};
};

export default function Navigation({colorScheme}: {colorScheme:ColorSchemeName}) {
	return (
		<NavigationContainer theme={colorScheme==='light'? DefaultTheme: DarkTheme}>
			<RootNavigator />
		</NavigationContainer>
	);
}
const Stack =
	createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="WorkoutDetail"
				component={WorkoutDetailScreen}
				options={{title:'Workout Information'}}
			/>
		</Stack.Navigator>
	);
}

const BottomTab =
	createBottomTabNavigator<RootStackParamList>();
function BottomTabNavigator() {
	return (
		<BottomTab.Navigator initialRouteName="Home">
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({color,size }) => (
						<Foundation
							name="home"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="Planner"
				component={PlannerScreen}
				options={{
					unmountOnBlur: true,
					tabBarIcon: ({color,size }) => (
						<Entypo name="add-to-list" size={size} color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}
