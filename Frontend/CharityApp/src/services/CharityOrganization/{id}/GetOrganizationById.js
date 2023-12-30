import * as request from "../../../utils/httpRequest";

export const getOrganizationById = async (organizationId) => {
    try {
        const res = await request.get(
            `/api/CharityOrganization/${organizationId}`,
        );
        // console.log(res)
        // console.log("getOrganizationById ", res);
        return res;
    } catch (error) {
        console.log('getOrganizationById ' + error);
    }
};