import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL} from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null)
    const login = (userName, password, errorCallback) => {

        setIsLoading(true);
        axios.post(`${BASE_URL}/api/login`, {
            userName,
            password
        }).then(res => {
            console.log(res.data);

            let userToken = res.data;
            setUserToken(userToken);
            AsyncStorage.setItem('userToken', userToken);
            getUserInformation();
        }).catch(e => {
            console.log(`Login error` + e.message);
            errorCallback && errorCallback(`Đăng nhập thất bại: ${e.response.data}`);
        })

        setIsLoading(false);
    }

    const getUserInformation = async () => {
        try {
            let token = await AsyncStorage.getItem('userToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`${BASE_URL}/api/User/infor`, config);
            let userInfo = response.data;
            setUserInfo(userInfo);
            console.log('userInfo', userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        } catch (error) {
            console.error("Error fetching user information:", error);
        }
    };


    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        // AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            // userInfo = JSON.parse(userInfo);

            if(userInfo) {
                // setUserInfo(userInfo);
                setUserToken(userToken);
            }

            setIsLoading(false)
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}