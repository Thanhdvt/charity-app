import {firebase} from "../config";

const getBackgroundByEventId = async (userId, eventId) => {
    try {
        const snapshot = await firebase.database()
            .ref(`${userId}/event/${eventId}`)
            .once('value');

        // Check if there's any data
        if (snapshot.exists()) {
            const values = Object.values(snapshot.val());

            // Find the first image URL (if any)
            const imageUrl = values.find(value => value.toLowerCase().includes('.jpeg'));

            if (imageUrl) {
                return imageUrl;  // Return the first image URL
            } else {
                console.log('No JPEG image found in the data.');
                return null;
            }
        } else {
            console.log('No data under the specified path.');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
        return null;
    }
};

export default getBackgroundByEventId;
