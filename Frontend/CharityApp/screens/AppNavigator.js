import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OnboardingScreen from "./public/Onboarding/OnboardingScreen";
import LandingScreen from "./public/Landing/LandingScreen";
import LoginScreen from "./public/Login/LoginScreen";
import SignupScreen from "./public/Signup/SignupScreen";
import MainTabScreen from "./MainTab/MainTabScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import EditProfileScreen from "./Profile/EditProfileScreen";
import CommentScreen from "./Comment/CommentScreen";
import VolunteerTabScreen from "./VolunteerTab/VolunteerTabScreen";
import VolunteerScreen from "./VolunteerTab/Volunteer/VolunteerScreen";
import JoinRequestScreen from "./VolunteerTab/JoinRequest/JoinRequestScreen";
import HomeScreen from "./MainTab/Home/HomeCard";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {true ? (
        // <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{ headerShown: false,}}>
        // 	<Drawer.Screen name="MainTab" component={MainTabScreen} />
        // </Drawer.Navigator>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Comment" component={CommentScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="MainTab" component={MainTabScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Comment" component={CommentScreen} />
          <Stack.Screen name="VolunteerTab" component={VolunteerTabScreen} />
          <Stack.Screen name="VolunteerScreen" component={VolunteerScreen}/>
          <Stack.Screen name="JoinRequestScreen" component={JoinRequestScreen}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
