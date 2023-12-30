import * as request from "../../../utils/httpRequest";

export const updateUserById = async (userId, data) => {
    console.log(userId)
    console.log(data)
    try {
        const res = await request.put(
            `/api/User/${userId}`,
            data,
        );
        //console.log(res.data)
        // console.log("updateUser_1 ", res);
        return res;
    } catch (error) {
        console.log('updateUser_2 ' + error);
    }
};