import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [charityOrganization, setCharityOrganization] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const login = (userName, password, errorCallback) => {

        setIsLoading(true);
        axios.post(`http://10.0.2.2:153/api/login`, {
            userName,
            password
        }).then(res => {
            if (res && res.data) {
                let userInfo = res.data.user;
                let charityOrganization = res.data.charityOrganization;
                let userToken = res.data.token;
                setUserToken(userToken);
                setUserInfo(userInfo);
                setCharityOrganization(charityOrganization);
                userInfo = JSON.stringify(userInfo);
                charityOrganization = JSON.stringify(charityOrganization);
                AsyncStorage.setItem('userToken', userToken)
                    .then(() => AsyncStorage.setItem('userInfo', userInfo))
                    .then(() => AsyncStorage.setItem('charityOrganization', charityOrganization));
            } else {
                console.log('Unexpected response structure:', res);
            }
        }).catch(e => {
            console.log(`Login error` + e.message);
            errorCallback && errorCallback(`Đăng nhập thất bại: ${e.response.data}`);
        })

        setIsLoading(false);
    }

    // const getUserInformation = async () => {
    //     try {
    //         let token = await AsyncStorage.getItem('userToken');
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         };
    //         const response = await axios.get(`${BASE_URL}/api/User/infor`, config);
    //         let userInfo = response.data;
    //         setUserInfo(userInfo);
    //         console.log('userInfo', userInfo);
    //         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    //     } catch (error) {
    //         console.error("Error fetching user information:", error);
    //     }
    // };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        setCharityOrganization(null);
        AsyncStorage.removeItem('userInfo')
            .then(() => AsyncStorage.removeItem('userToken'))
            .then(() => AsyncStorage.removeItem('charityOrganization'))
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            let charityOrganization = await AsyncStorage.getItem('charityOrganization');
            userInfo = JSON.parse(userInfo);
            charityOrganization = JSON.parse(charityOrganization);

            if(userInfo) {
                setUserInfo(userInfo);
                setCharityOrganization(charityOrganization);
                setUserToken(userToken);
            }

            setIsLoading(false)
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn().catch((error) => {
                console.error('Error checking login status:', error);
            });
    }, []);


    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo, charityOrganization}}>
            {children}
        </AuthContext.Provider>
    )
}