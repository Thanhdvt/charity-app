import {firebase} from "../config";

const getAllBackground = async (id) => {
    try {
        const snapshot = await firebase.database()
            .ref(`${id}/background/`)
            .once('value');

        return snapshot.val(); // return imageUrl
    } catch (error) {
        console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
    }
};

export default getAllBackground;