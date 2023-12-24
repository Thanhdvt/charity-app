import axios from "axios";
import {BASE_URL} from "../config";

export const register = (name, email, phone, password) => {
    axios.post(`${BASE_URL}/api/User`, {
        name,
        userName: email,
        password,
        phone,
        email,
        "address": "",
    }).then(res => {
        console.log(res.data);
        console.log(res.statusText);
        console.log(res.status);
    }).catch(e => {
        console.log(`Login error ${e}`);
        console.log(`Login error ${e.response.data}`);
    });
}