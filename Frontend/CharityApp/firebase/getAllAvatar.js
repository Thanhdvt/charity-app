import {firebase} from "../config";

const getAllAvatar = async (id) => {
    try {
        const snapshot = await firebase.database()
            .ref(`${id}/avatar/`)
            .once('value');

        return snapshot.val() // Return imageUrl
    } catch (error) {
        console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
    }
};

export default getAllAvatar;