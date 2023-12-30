import * as request from "../../utils/httpRequest";

export const getAllEvent = async () => {
    try {
        const res = await request.get(
            '/api/Event',
        );
        //console.log(res.data)
        // console.log("EventList ", res);
        return res;
    } catch (error) {
        console.log('EventList ' + error);
    }
};