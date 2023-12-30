import * as request from "../../../utils/httpRequest";

export const getEventByOrganizationId = async (organizationId) => {
    try {
        const res = await request.get(
            `/api/Event/organization/${organizationId}`,
        );
        // console.log(res)
        // console.log("EventByOrganization ", res);
        return res;
    } catch (error) {
        console.log('EventByOrganization ' + error);
    }
};