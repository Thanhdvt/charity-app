import * as request from "../../utils/httpRequest";

export const getAllJoinRequest = async () => {
    try {
        const res = await request.get(
            '/api/JoinRequest',
        );
        //console.log(res.data)
        // console.log("organizationInfo ", res);
        return res;
    } catch (error) {
        console.log('organizationInfo' + error);
    }
};