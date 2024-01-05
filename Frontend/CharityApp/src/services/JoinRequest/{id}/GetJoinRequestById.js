import * as request from "../../../utils/httpRequest";

export const getJoinRequestById = async (id) => {
    try {
        const res = await request.get(
            `/api/JoinRequest/${id}`,
        );
        //console.log(res.data)
        // console.log("organizationInfo ", res);
        return res;
    } catch (error) {
        console.log('getJoinRequestById' + error);
    }
};