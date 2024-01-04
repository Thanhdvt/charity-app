import * as request from "../../../utils/httpRequest";

export const getUserById = async (id) => {
    try {
        const res = await request.get(
            `/api/User/${id}`,
        );
        // console.log(res.data)
        // console.log("getOrganizationById ", res);
        return res;
    } catch (error) {
        console.log('UserById ' + error);
    }
};