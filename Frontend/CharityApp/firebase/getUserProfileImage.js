import {firebase} from "../config";

const getUserProfileImage = async (id) => {
    try {
        const snapshot = await firebase.database()
            .ref(`users/${id}/image`)
            .once('value');

        return snapshot.val() // trả về avatarUrl
    } catch (error) {
        console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
    }
};

export default getUserProfileImage;