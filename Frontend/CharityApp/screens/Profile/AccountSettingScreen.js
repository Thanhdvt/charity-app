import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useContext, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, FONTS} from "../../constants";
import {Ionicons} from "@expo/vector-icons";
import {AuthContext} from "../../context/AuthContext";

const AccountSettingScreen = ({ navigation }) => {
    const {userInfo} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                    Cài đặt tài khoản
                </Text>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingVertical: 30 }}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>
                            Tên tài khoản <Text style={{ color: "red" }}>*</Text>{" "}
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={name}
                                onChangeText={(value) => setName(value)}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>
                            Email <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>
                            Số điện thoại <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={phone}
                                onChangeText={(value) => setPhone(value)}
                                editable={true}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>
                            Mật khẩu hiện tại <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={oldPassword}
                                onChangeText={(value) => setOldPassword(value)}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>
                            Mật khẩu mới <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={newPassword}
                                onChangeText={(value) => setNewPassword(value)}
                                editable={true}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>
                            Nhập lại mật khẩu mới <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={confirmPassword}
                                onChangeText={(value) => setConfirmPassword(value)}
                                editable={true}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 44,
                        borderRadius: 6,
                        marginTop: 30,
                        marginBottom: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.white,
                        }}
                    >
                        Cập nhật
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountSettingScreen;

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
