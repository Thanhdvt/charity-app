import * as request from "../../utils/httpRequest";

export const createForHelpRequest = async (data) => {
    try {
        const res = await request.post(
            '/api/ForHelpRequest',
            data
        );
        //console.log(res.data)
        // console.log("createForHelpRequest ", res.status);
        return res;
    } catch (error) {
        console.log('createForHelpRequest ' + error);
    }
};