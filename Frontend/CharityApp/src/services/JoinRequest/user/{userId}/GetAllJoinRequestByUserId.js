import * as request from "../../../../utils/httpRequest";

export const getAllJoinRequestByUserId= async (userId) => {
    try {
        const res = await request.post(
            `/api/JoinRequest/user/${userId}`,
        );
        //console.log(res.data)
        // console.log("organizationInfo ", res);
        return res;
    } catch (error) {
        console.log('getAllJoinRequestByUserId' + error);
    }
};