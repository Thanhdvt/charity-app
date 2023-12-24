import {ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../../constants";
import {Ionicons} from "@expo/vector-icons";
import Statistic from "../../components/Profile/Statistic";

const StatisticScreen = ({ navigation }) => {

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                    height: 60,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "500",
                        marginLeft: 30,
                    }}
                >
                    Thống kê phân tích
                </Text>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <Statistic/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StatisticScreen;

const styles = StyleSheet.create({
    containerTextInput: {
        height: 44,
        width: "100%",
        borderColor: COLORS.secondaryGray,
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 4,
        marginBottom: 12,
        justifyContent: "center",
        paddingLeft: 8,
    },
});
