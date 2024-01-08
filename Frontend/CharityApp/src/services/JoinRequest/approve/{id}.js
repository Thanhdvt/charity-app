import * as request from "../../../utils/httpRequest";

export const createApprove = async (id) => {
    try {
        const res = await request.post(
            `/api/JoinRequest/approve/${id}`
        );
        // console.log(res.data)
        // console.log("EventList ", res);
        return res;
    } catch (error) {
        console.log('createApprove ' + error);
    }
};