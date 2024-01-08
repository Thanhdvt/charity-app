import {firebase} from "../config";

const getAllFileByEventId = async (userId, eventId) => {
    try {
        const snapshot = await firebase.database()
            .ref(`${userId}/event/${eventId}`)
            .once('value');

        return snapshot.val(); // return imageUrl
    } catch (error) {
        console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
    }
};

export default getAllFileByEventId;