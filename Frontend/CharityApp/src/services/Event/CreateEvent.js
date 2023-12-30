import * as request from "../../utils/httpRequest";

export const createEvent = async (data) => {
    try {
        const res = await request.post(
            '/api/Event',
            data
        );
        //console.log(res.data)
        // console.log("createEvent ", res);
        return res;
    } catch (error) {
        console.log('createEvent ' + error);
    }
};