import * as request from "../../../utils/httpRequest";

export const getEventById = async (id) => {
    try {
        const res = await request.get(
            `/api/Event/${id}`,
        );
        // console.log(res.data)
        // console.log("EventList ", res);
        return res;
    } catch (error) {
        console.log('EventBYId ' + error);
    }
};