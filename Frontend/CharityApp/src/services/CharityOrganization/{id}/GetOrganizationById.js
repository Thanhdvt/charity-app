import * as request from "../../../utils/httpRequest";

export const getOrganizationById = async (id) => {
    try {
        const res = await request.get(
            `/api/CharityOrganization/${id}`,
        );
        // console.log("organozation" + res)
        // console.log("getOrganizationById ", res);
        return res;
    } catch (error) {
        console.log('getOrganizationById ' + error);
    }
};