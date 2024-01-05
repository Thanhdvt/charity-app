import * as request from "../../../utils/httpRequest";

export const getForHelpRequestById = async (id) => {
    try {
        const res = await request.get(
            `/api/ForHelpRequest/${id}`,
        );
        console.log(res.data)
        // console.log("organizationInfo ", res);
        return res;
    } catch (error) {
        console.log('getForHelpRequestById' + error);
    }
};