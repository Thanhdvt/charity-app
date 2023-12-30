import * as request from "../../../utils/httpRequest";
import {createAuthHeader} from "../../../utils/createAuthHeader";

export const updateOrganizationById = async (organizationId, data, token) => {
    try {
        const headers = createAuthHeader(token);
        const res = await request.put(
            `/api/CharityOrganization/${organizationId}`,
            data,
            {headers}
        );
        //console.log(res.data)
        // console.log("updateOrganizationById ", res);
        return res;
    } catch (error) {
        console.log('updateOrganizationById ' + error);
    }
};