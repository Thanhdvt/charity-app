import axios from "axios";

export const register = (name, email, phone, password) => {
    axios.post(`http://192.168.2.13:5000/api/User`, {
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