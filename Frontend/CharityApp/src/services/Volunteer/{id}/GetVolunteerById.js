import * as request from "../../../utils/httpRequest";

export const getVolunteerById = async (id) => {
    try {
        const res = await request.get(
            `/api/Volunteer/${id}`,
        );
        // console.log(res.data)
        // console.log("getOrganizationById ", res);
        return res;
    } catch (error) {
        console.log('getVolunteerById ' + error);
    }
};