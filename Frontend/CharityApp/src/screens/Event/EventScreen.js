import React from "react";
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View,} from "react-native";
import {Ionicons,} from "@expo/vector-icons";
import {COLORS} from "../../constants";
import Post from "../../components/Profile/Post";
import PostCreat from "../../components/Profile/PostCreat";
import {useNavigation} from "@react-navigation/native";
import Image from "../../components/Profile/Image";

const EventScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    marginHorizontal: 20,
                    height: 60,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.black}/>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "500",
                        marginLeft: 30,
                    }}
                >
                    Bảng tin sự kiện
                </Text>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{backgroundColor: COLORS.gray}}
            >
                <PostCreat/>
                <Image/>
                <Post/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EventScreen;
