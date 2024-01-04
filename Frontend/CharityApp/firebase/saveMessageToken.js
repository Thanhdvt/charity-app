import messaging from '@react-native-firebase/messaging';
import {firebase} from "../config";

async function saveMessageToken(id) {
    try {
        // Register the device with FCM
        await messaging().registerDeviceForRemoteMessages();

        // Get the token
        const token = await messaging().getToken();

        // Save the token to the database
        if (token) {
            await firebase.database().ref(`/users/messageToken/${id}`).set(token);
            console.log('Token saved successfully:', token);
        } else {
            console.error('Failed to get token');
        }
    } catch (error) {
        console.error('Error during onAppBootstrap:', error);
    }
}

export { saveMessageToken };
