import * as request from "../../../utils/httpRequest";
import {createAuthHeader} from "../../../utils/createAuthHeader";

export const updateUserById = async (id, data, token) => {
    console.log(id)
    console.log(data)
    try {
        const headers = createAuthHeader(token);
        const res = await request.put(
            `/api/User/${id}`,
            data,
            {headers}
        );
        //console.log(res.data)
        // console.log("updateUser_1 ", res);
        return res;
    } catch (error) {
        console.log('updateUser_2 ' + error);
    }
};