import {firebase} from "../config";

const getAvatar = async (id) => {
    try {
        const snapshot = await firebase.database()
            .ref(`${id}/avatar/`)
            .once('value');

        // Check if there's any data
        if (snapshot.exists()) {
            const keys = Object.keys(snapshot.val());
            const lastChildKey = keys[keys.length - 1];
            const lastChildValue = snapshot.val()[lastChildKey];
            // console.log('Last child key:', lastChildKey);
            // console.log('Last child value:', lastChildValue);

            return lastChildValue; // Return imageUrl
        } else {
            console.log('No data under the specified path.');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
    }
};

export default getAvatar;