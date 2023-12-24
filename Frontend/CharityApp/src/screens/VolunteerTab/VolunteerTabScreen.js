import {Dimensions, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import JoinRequestListScreen from "./JoinRequest/JoinRequestListScreen";
import VolunteerListScreen from "./Volunteer/VolunteerListScreen";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const {width} = Dimensions.get('screen');

const VolunteerTabScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar style="dark" backgroundColor="white" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          height: 60,
          backgroundColor: COLORS.primary
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={{flexDirection: "row", backgroundColor: COLORS.white, paddingVertical: 3, paddingHorizontal: 15, borderRadius: 24,}}>
            <View style={{justifyContent: "center", alignContent: "center", paddingHorizontal: 10, width: width/1.7}}>
                <TextInput
                    style={{fontWeight: "400", fontSize: 16}}
                    placeholder="Tìm kiếm"
                />
            </View>
            <Icon
                name="ios-search"
                size={24}
                color={COLORS.secondary}
            />
        </View>
      </View>
      <Tab.Navigator
        initialRouteName="Volunteer"
        screenOptions={{
          tabBarActiveTintColor: COLORS.black,
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold", textTransform: "none", },
          tabBarStyle: { backgroundColor: COLORS.white,  },
          tabBarIndicatorStyle: { backgroundColor: COLORS.primary},
          tabBarAndroidRipple: { borderless: false },
          tabBarPressColor: COLORS.secondaryGray,
        }}    
      >
        <Tab.Screen
          name="Volunteer"
          component={VolunteerListScreen}
          options={{ tabBarLabel: "Thành viên" }}
        />
        <Tab.Screen
          name="JoinRequest"
          component={JoinRequestListScreen}
          options={{ tabBarLabel: "Chờ duyệt" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
export default VolunteerTabScreen;