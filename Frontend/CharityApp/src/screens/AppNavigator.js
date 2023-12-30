import {ActivityIndicator, StyleSheet, View} from "react-native";
import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";

import OnboardingScreen from "./public/Onboarding/OnboardingScreen";
import LandingScreen from "./public/Landing/LandingScreen";
import LoginScreen from "./public/Login/LoginScreen";
import SignupScreen from "./public/Signup/SignupScreen";
import MainTabScreen from "./MainTab/MainTabScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import EditProfileScreen from "./Profile/EditProfileScreen";
import CommentScreen from "./Event/CommentScreen";
import VolunteerTabScreen from "./VolunteerTab/VolunteerTabScreen";
import VolunteerScreen from "./VolunteerTab/Volunteer/VolunteerScreen";
import JoinRequestScreen from "./VolunteerTab/JoinRequest/JoinRequestScreen";
import SearchAllScreen from "./public/Search/SearchAllScreen";
import OrganizationSearchScreen from "./public/Search/OrganizationSearchScreen";
import EventSearchScreen from "./public/Search/EventSearchScreen";
import EventDetailScreen from "./public/Event/EventDetailScreen";
import ForHelpCreateScreen from "./MainTab/ForHelpRequest/ForHelpCreateScreen";
import JoinRegisterScreen from "./JoinRegister/JoinRegisterScreen";
import EventScreen from "./Event/EventScreen";
import NotificationScreen from "./MainTab/Notification/NotificationScreen";
import MapScreen from "./Map/MapScreen";
import PostScreen from "./Event/PostScreen";
import StatsScreen from "./Event/StatisticScreen";
import ImageScreen from "./Event/ImageScreen";
import ForHelpDetailScreen from "./MainTab/ForHelpRequest/ForHelpDetailScreen";
import AccountSettingScreen from "./Profile/AccountSettingScreen";
import ContentManagerScreen from "./Manager/ContentManagerScreen";
import {AuthContext} from "../context/AuthContext";
import EventDetailCensorScreen from "./Manager/EventDetailCensorScreen";
import AccountManagerScreen from "./Manager/AccountManagerScreen";
import AccountDetailCensorScreen from "./Manager/AccountDetailCensorScreen";
import GenericSetupScreen from "./GenericSetup/GenericSetupScreen";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();


const AppNavigator = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  // if(isLoading) {
  //   return (
  //       <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
  //         <ActivityIndicator size={'large'}/>
  //       </View>
  //   );
  // }
  // console.log(userToken)

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
          <Stack.Screen name="JoinRegister" component={JoinRegisterScreen} />
          <Stack.Screen name="ForHelpCreate" component={ForHelpCreateScreen} />
          <Stack.Screen name="Event" component={EventScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen}/>
          <Stack.Screen name="Map" component={MapScreen}/>
          <Stack.Screen name="Post" component={PostScreen}/>
          <Stack.Screen name="Statistic" component={StatsScreen}/>
          <Stack.Screen name="Image" component={ImageScreen}/>
          <Stack.Screen name="ForHelpDetail" component={ForHelpDetailScreen}/>
          <Stack.Screen name="AccountSetting" component={AccountSettingScreen}/>
          <Stack.Screen name="ContentManager" component={ContentManagerScreen}/>
          <Stack.Screen name="EventDetailCensor" component={EventDetailCensorScreen}/>
          <Stack.Screen name="AccountManager" component={AccountManagerScreen}/>
          <Stack.Screen name="AccountDetailCensor" component={AccountDetailCensorScreen}/>
          <Stack.Screen name="GenericSetup" component={GenericSetupScreen}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
