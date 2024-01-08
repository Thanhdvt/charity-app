import * as request from "../../utils/httpRequest";
import {createAuthHeader} from "../../utils/createAuthHeader";

export const createVolunteer = async (token, data) => {
    try {
        const headers = createAuthHeader(token);
        const res = await request.post(
            `/api/Volunteer`,
            data,
            {
                headers
            }
        );
        // console.log(res.data)
        // console.log("EventList ", res);
        return res;
    } catch (error) {
        console.log('createVolunteer ' + error);
    }
};