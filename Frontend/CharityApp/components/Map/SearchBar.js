import { View, Text } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import {COLORS, images} from "../../constants";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function SearchBar({setSearchText}) {
    const [searchInput,setSearchInput]=useState();
    return (
        <View>
            <LinearGradient
                // Background Linear Gradient
                colors={[COLORS.WHITE, "transparent"]}
                style={{ padding: 20, width: Dimensions.get("screen").width }}
            >
                <View
                    style={{
                        display: "flex",
                        marginTop: 20,
                        flexDirection: "row",
                        padding: 10,
                        gap: 5,
                        elevation: 0.7,
                        alignItems: "center",
                        backgroundColor: COLORS.WHITE,
                        borderRadius: 5,
                    }}
                >
                    <Ionicons name="search" size={24} color={COLORS.DARK_GRAY} />
                    <TextInput
                        placeholder="Search"
                        style={{ backgroundColor: COLORS.WHITE, width: "80%" }}
                        onChangeText={(value) => setSearchInput(value)}
                        onSubmitEditing={() => setSearchText(searchInput)}
                    />
                </View>
            </LinearGradient>
        </View>
    );
}