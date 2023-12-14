import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./screens/AppNavigator";
import {AuthProvider} from "./context/AuthContext";

export default function App() {
	return(
		<AuthProvider>
			<AppNavigator/>
		</AuthProvider>
	) ;
}