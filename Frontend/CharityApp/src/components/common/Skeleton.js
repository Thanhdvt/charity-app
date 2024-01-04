import {Image, Text, View} from "react-native";
import {COLORS} from "../../constants";
import React from "react";

const Skeleton  = () => {
    return (
        <>
            <View
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 15,
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: "#d4d4d4" }}/>
                        <View style={{ paddingLeft: 5, marginBottom: 5 }}>
                            <View style={{ width:100, height: 10, backgroundColor: "#d4d4d4", marginBottom: 5 }}></View>
                            <View style={{ width: 80, height: 10, backgroundColor: "#d4d4d4", marginBottom: 5 }}></View>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 5, height: 40, width: "90%", backgroundColor: "#d4d4d4" }}></View>
                <View
                    style={{
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View style={{ width: "100%", height: 200, backgroundColor: "#d4d4d4" }}/>
                </View>
            </View>
        </>
    )
}

export default Skeleton