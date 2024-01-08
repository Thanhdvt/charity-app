import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {registerForPushNotificationsAsync} from "../../firebase/registerForPushNotificationsAsync";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [charityOrganization, setCharityOrganization] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = async (userName, password, errorCallback) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`http://192.168.2.13:5000/api/login`, {
                userName,
                password
            });

            if (res && res.data) {
                let userToken_1 = res.data.token;
                let userInfo_1 = JSON.stringify(res.data.user);
                let charityOrganization_1 = JSON.stringify( res.data.charityOrganization);

                // setUserToken(res.data.token);
                // setUserInfo(res.data.user);
                // setCharityOrganization(res.data.charityOrganization);

                await AsyncStorage.setItem('userToken', userToken_1);
                await AsyncStorage.setItem('userInfo', userInfo_1);
                await AsyncStorage.setItem('charityOrganization', charityOrganization_1);
                await isLoggedIn();

                // saveMessageToken(userId).catch((error) => {
                //     console.error('Error checking login status:', error);
                // });

                registerForPushNotificationsAsync(res.data.user.id).catch((error) => {
                    console.error('Error checking login status:', error);
                });
            } else {
                console.log('Unexpected response structure:', res);
            }
            return res;
        } catch (e) {
            console.log(`Login error` + e.message);
            errorCallback && errorCallback(`${e.response.data}. Vui lòng kiểm tra lại.`);
        } finally {
            setIsLoading(false);
        }
    }

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