import {firebase} from "../config";

const getForHelpRequestByUserId = async (userId, forHelpId) => {
    try {
        const snapshot = await firebase.database()
            .ref(`${userId}/forhelprequest/${forHelpId}`)
            .once('value');
        //console.log(snapshot.val())

        return snapshot.val() // Return fileUrl
    } catch (error) {
        console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
    }
};

export default getForHelpRequestByUserId;