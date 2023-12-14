import axios from "axios";
import {BASE_URL} from "../config";

export const register = (userName, phone, password) => {
    axios.post(`${BASE_URL}/api/User`, {
        name:"thanh",
        userName,
        password,
        "active": 0,
        phone,
        email: "",
        "address": "string",
        "role_Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "status": 0
    }).then(res => {
        console.log(res.data);
        console.log(res.statusText);
        console.log(res.status);
    }).catch(e => {
        console.log(`Login error ${e}`);
        console.log(`Login error ${e.response.data}`);
    });
}