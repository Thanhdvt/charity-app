import * as request from "../../../utils/httpRequest";

export const getCommentByEventId = async (id) => {
    try {
        const res = await request.get(
            `/api/Comment/event/${id}`,
        );
        // console.log(res.data)
        // console.log("EventList ", res);
        return res;
    } catch (error) {
        console.log('getCommentByEventId ' + error);
    }
};