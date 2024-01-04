import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import IntroInfo from "./IntroInfo";
import Post from "./Post";
import Statistic from "./Statistic";
import Image from "./Image";
import {Loading} from "../../../components/common/Loading";
import FlashMessage from "react-native-flash-message";

const OrganizationScreen = ({route}) => {
    const organizationId = route.params.id;
    const userOrganizationId = route.params.userId;
    const [isLoading, setIsLoading] = useState(true);
    // console.log(organizationId)
    // console.log(userOrganizationId)
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            { isLoading ? <Loading/> : null}
            <StatusBar backgroundColor="white"/>
            <FlashMessage position="top" style={{marginHorizontal: 20, borderRadius: 12, marginVertical: 40}}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            >
                <IntroInfo id={organizationId}/>
                <Statistic id={organizationId}/>
                <Image userId={userOrganizationId}/>
                <Post organizationId={organizationId} userOrganizationId={userOrganizationId}/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrganizationScreen;
