import {Dimensions, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import OrganizationTab from "../../../components/public/Search/OrganizationTab";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {Loading} from "../../../components/common/Loading";

const Tab = createMaterialTopTabNavigator();
const {width} = Dimensions.get('screen');

const OrganizationSearchScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            {isLoading ? <Loading/> : null}
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
                            style={{ fontWeight: "500", fontSize: 16 }}
                            placeholder="Tìm kiếm"
                            onChangeText={(text) => setSearchValue(text)}
                        />
                    </View>
                    <Icon
                        name="ios-search"
                        size={24}
                        color={COLORS.secondary}
                    />
                </View>
            </View>
            <OrganizationTab searchValue={searchValue} />
        </SafeAreaView>
    );
};
export default OrganizationSearchScreen;