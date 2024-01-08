import * as request from "../../../utils/httpRequest";

export const getJoinRequestByOrganizationId = async (id) => {
    try {
        const res = await request.get(
            `/api/JoinRequest/organization/${id}`,
        );
        // console.log("organozation" + res)
        // console.log("getOrganizationById ", res);
        return res;
    } catch (error) {
        console.log('getJoinRequestByOrganizationId ' + error);
    }
};