import {Dimensions, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import EventTab from "../../../components/public/Search/EventTab";
import OrganizationTab from "../../../components/public/Search/OrganizationTab";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";

const Tab = createMaterialTopTabNavigator();
const {width} = Dimensions.get('screen');

const SearchAllScreen = ({ navigation }) => {
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
                            style={{fontWeight: "500", fontSize: 16}}
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
                initialRouteName="Organizatiom"
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
                    name="Organizatiom"
                    component={OrganizationTab}
                    options={{ tabBarLabel: "Hội thiện nguyện" }}
                />
                <Tab.Screen
                    name="Event"
                    component={EventTab}
                    options={{ tabBarLabel: "Sự kiện" }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};
export default SearchAllScreen;