import * as request from "../../utils/httpRequest";

export const login = async (data) => {
    try {
        const res = await request.post(
            '/api/Login',
            data
        );
        console.log(res.status)
        // console.log("createEvent ", res);
        return res;
    } catch (error) {
        console.log('login ' + error);
    }
};