import * as request from "../../utils/httpRequest";

export const getAllUser = async () => {
    try {
        const res = await request.get(
            `/api/User`,
        );
        // console.log(res.data)
        // console.log("getOrganizationById ", res);
        return res;
    } catch (error) {
        console.log('getAllUser ' + error);
    }
};