import AppNavigator from "./src/screens/AppNavigator";
import {AuthProvider} from "./src/context/AuthContext";

export default function App() {

    return (
        <AuthProvider>
            <AppNavigator/>
        </AuthProvider>
    );
}