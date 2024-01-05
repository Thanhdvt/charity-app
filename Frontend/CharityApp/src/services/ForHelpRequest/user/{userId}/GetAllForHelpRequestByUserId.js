import * as request from "../../../../utils/httpRequest";

export const getAllForHelpRequestByUserId = async (userId) => {
    try {
        const res = await request.post(
            `/api/ForHelpRequest/user/${userId}`,
        );
        //console.log(res.data)
        // console.log("organizationInfo ", res);
        return res;
    } catch (error) {
        console.log('getAllForHelpRequestByUserId' + error);
    }
};