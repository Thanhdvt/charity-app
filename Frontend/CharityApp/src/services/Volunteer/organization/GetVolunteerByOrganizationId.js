import * as request from "../../../utils/httpRequest";

export const getVolunteerByOrganizationId = async (id) => {
    try {
        const res = await request.get(
            `/api/Volunteer/organization/${id}`,
        );
        // console.log("organozation" + res)
        // console.log("getOrganizationById ", res);
        return res;
    } catch (error) {
        console.log('getVolunteerByOrganizationId ' + error);
    }
};