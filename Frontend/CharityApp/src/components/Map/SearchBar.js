import {Dimensions, TextInput, View} from "react-native";
import React, {useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../../constants";
import {Ionicons} from "@expo/vector-icons";

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
                        value={searchInput}
                        onChangeText={(value) => setSearchInput(searchInput)}
                        onSubmitEditing={() => setSearchText(searchInput)}
                    />
                </View>
            </LinearGradient>
        </View>
    );
}