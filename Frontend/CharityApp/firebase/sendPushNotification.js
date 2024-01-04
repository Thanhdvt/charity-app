import * as request from "../src/utils/httpRequest";

export const sendPushNotification = async (message) => {
    // await fetch('https://exp.host/--/api/v2/push/send', {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Accept-encoding': 'gzip, deflate',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(message),
    // });
    try {
        const res = await request.post(
            'https://exp.host/--/api/v2/push/send',
            JSON.stringify(message),
            {
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
            }
        );
        return res;
    } catch (error) {
        console.log('createEvent ' + error);
    }
}