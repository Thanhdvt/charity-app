import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, {useContext} from "react";
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
import SearchAllScreen from "./public/Search/SearchAllScreen";
import OrganizationSearchScreen from "./public/Search/OrganizationSearchScreen";
import EventSearchScreen from "./public/Search/EventSearchScreen";
import EventDetailScreen from "./public/Event/EventDetailScreen";
import {AuthContext} from "../context/AuthContext";
import PersonInfoScreen from "./PersonInfoForm/PersonInfoForm";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();


const AppNavigator = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  if(isLoading) {
    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size={'large'}/>
        </View>
    );
  }

  return (
    <NavigationContainer>
      { userToken === null ? (
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
          <Stack.Screen name="SearchAll" component={SearchAllScreen}/>
          <Stack.Screen name="OrganizationSearch" component={OrganizationSearchScreen}/>
          <Stack.Screen name="EventSearch" component={EventSearchScreen}/>
          <Stack.Screen name="EventDetail" component={EventDetailScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Comment" component={CommentScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="MainTab"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="MainTab" component={MainTabScreen} />
          <Stack.Screen name="VolunteerTab" component={VolunteerTabScreen} />
          <Stack.Screen name="VolunteerScreen" component={VolunteerScreen}/>
          <Stack.Screen name="JoinRequestScreen" component={JoinRequestScreen}/>
          <Stack.Screen name="SearchAll" component={SearchAllScreen}/>
          <Stack.Screen name="OrganizationSearch" component={OrganizationSearchScreen}/>
          <Stack.Screen name="EventSearch" component={EventSearchScreen}/>
          <Stack.Screen name="EventDetail" component={EventDetailScreen}/>
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Comment" component={CommentScreen} />
          <Stack.Screen name="PersonInfoForm" component={PersonInfoScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
