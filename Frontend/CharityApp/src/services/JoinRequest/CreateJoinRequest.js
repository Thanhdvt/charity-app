import * as request from "../../utils/httpRequest";
import {createAuthHeader} from "../../utils/createAuthHeader";

export const createJoinRequest = async (data, token) => {
    try {
        const headers = createAuthHeader(token);
        const res = await request.post(
            '/api/JoinRequest',
            data,
            {
                headers
            }
        );
        //console.log(res.data)
        // console.log("createForHelpRequest ", res.status);
        return res;
    } catch (error) {
        console.log('createJoinRequest ' + error);
    }
};