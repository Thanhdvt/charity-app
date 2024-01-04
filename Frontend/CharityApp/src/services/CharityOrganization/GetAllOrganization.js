import * as request from "../../utils/httpRequest";
import {createAuthHeader} from "../../utils/createAuthHeader";

export const getAllOrganization = async () => {
    try {
        const res = await request.get(
            '/api/CharityOrganization',
        );
        // console.log(res.data)
        // console.log("organizationInfo ", res);
        return res;
    } catch (error) {
        console.log('organizationInfo' + error);
    }
};