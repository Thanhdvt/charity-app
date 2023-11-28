import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

import Icon from "react-native-vector-icons/Ionicons";

import { COLORS, images } from "../../../constants";

import HomeScreen from "../../MainTab/Home/HomeCard";

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

const LandingScreen = () => (
  <>
    <StatusBar style="dark" backgroundColor={COLORS.gray} />
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          tabBarLabel: "Bản đồ",
          tabBarColor: "#d02860",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-map" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={HomeScreen}
        options={{
          tabBarLabel: "Thông báo",
          tabBarColor: "#1f65ff",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={24} />
          ),
        }}
      />
      {/* <Tab.Screen
      name="Profile"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Cá nhân',
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={24} />
        ),
      }}
    /> */}
      <Tab.Screen
        name="Menu"
        component={HomeScreen}
        options={{
          tabBarLabel: "Hội nhóm",
          tabBarColor: "#694fad",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-people" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  </>
);

export default LandingScreen;
