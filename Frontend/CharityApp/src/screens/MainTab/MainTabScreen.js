import React, {useContext} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StatusBar} from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./Home/HomeCard";
import MenuScreen from "./Menu/MenuCard";
import MapScreen from "../Map/MapScreen";
import ForHelpCreateScreen from "./ForHelpRequest/ForHelpCreateScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import NotificationScreen from "./Notification/NotificationScreen";
import {AuthContext} from "../../context/AuthContext";
import VolunteerTabScreen from "../VolunteerTab/VolunteerTabScreen";
import {useTranslation} from "react-i18next";

const Tab = createBottomTabNavigator();

const screenOptions = {
    // tabBarShowLabel: false,
    headerShown: false,
    // tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        backgroundColor: "white",
    },
    tabBarActiveTintColor: "#FF6347",
};
const MainTabScreen = () => {
    const {t} = useTranslation();
    const {userInfo} = useContext(AuthContext);

    return (
        <>
            <StatusBar style="dark" backgroundColor="white"/>
            <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: t("Trang chủ"),
                        tabBarLabelStyle: {fontSize: 12, fontWeight: "400"},
                        tabBarIcon: ({color}) => (
                            <Icon name="ios-home" color={color} size={24}/>
                        ),
                    }}
                />
                {/*<Tab.Screen*/}
                {/*    name="Map"*/}
                {/*    component={MapScreen}*/}
                {/*    options={{*/}
                {/*        tabBarLabel: "Bản đồ",*/}
                {/*        tabBarLabelStyle: {fontSize: 12, fontWeight: "400"},*/}
                {/*        tabBarColor: "#d02860",*/}
                {/*        tabBarIcon: ({color}) => (*/}
                {/*            <Icon name="ios-map" color={color} size={24}/>*/}
                {/*        ),*/}
                {/*    }}*/}
                {/*/>*/}
                {
                    (userInfo.role === 1) && (
                        <Tab.Screen
                            name="VolunteerTab"
                            component={VolunteerTabScreen}
                            options={{
                                tabBarLabel: t('Hội nhóm'),
                                tabBarColor: '#694fad',
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="account-group" color={color} size={28}/>
                                ),
                            }}
                        />
                    )
                }
                {
                    (userInfo.role === 2) && (
                        <Tab.Screen
                            name="ForHelpCreate"
                            component={ForHelpCreateScreen}
                            options={{
                                tabBarLabel: t('Trợ giúp'),
                                tabBarColor: '#694fad',
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="hand-heart" color={color} size={24}/>
                                ),
                            }}
                        />
                    )
                }
                {/*<Tab.Screen*/}
                {/*    name="Notifications"*/}
                {/*    component={NotificationScreen}*/}
                {/*    options={{*/}
                {/*        tabBarLabel: "Thông báo",*/}
                {/*        tabBarLabelStyle: {fontSize: 12, fontWeight: "400"},*/}
                {/*        tabBarColor: "#1f65ff",*/}
                {/*        tabBarIcon: ({color}) => (*/}
                {/*            <Icon name="ios-notifications" color={color} size={24}/>*/}
                {/*        ),*/}
                {/*    }}*/}
                {/*/>*/}
                <Tab.Screen
                    name="Menu"
                    component={MenuScreen}
                    options={{
                        tabBarLabel: t("Khám phá"),
                        tabBarLabelStyle: {fontSize: 12, fontWeight: "400"},
                        tabBarColor: "#694fad",
                        tabBarIcon: ({color}) => (
                            <Icon name="ios-aperture" color={color} size={26}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    )
};

export default MainTabScreen;
