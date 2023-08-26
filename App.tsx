import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import Navigation from './navigation';
import useCachedResources from './hooks/useCachedResources';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
	const isLoaded = useCachedResources();
	const colorScheme = useColorScheme()
	console.log(colorScheme);
	
	if (isLoaded) {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme } />
				<StatusBar style='dark' />
			</SafeAreaProvider>
		);
	} else {
		return null
	 }	
}

