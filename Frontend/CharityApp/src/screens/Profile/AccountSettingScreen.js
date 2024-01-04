import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useContext, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, FONTS} from '../../constants';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import {AuthContext} from "../../context/AuthContext";
import FlashMessage, {hideMessage, showMessage} from "react-native-flash-message";
import {updateUserById} from "../../services/User/{id}/UpdateUserById";

const AccountSettingScreen = ({ navigation }) => {
    const {userInfo, login, userToken} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);
    const [isOldPasswordShow, setIsOldPasswordShow] = useState(false);
    const [isNewPasswordShow, setIsNewPasswordShow] = useState(false);
    const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
    const [phone, setPhone] = useState(userInfo.phone);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validate = async () => {
        const verify = await login( userInfo.userName, oldPassword);
        console.log(verify)
        if(!verify) {
            showMessage({
                message: "Mật khẩu cũ không chính xác",
                type: "danger",
                duration: 3000,
                onPress: () => {
                    hideMessage();
                },
            });
            return false;
        } else if (!phone || !oldPassword || !newPassword || !confirmPassword) {
            showMessage({
                message: "Nhập đầy đủ các trường bắt buộc",
                type: "danger",
                duration: 3000,
                onPress: () => {
                    hideMessage();
                },
            });
            return false;
        } else if (oldPassword === newPassword) {
            showMessage({
                message: "Mật khẩu mới phải khác mật khẩu cũ",
                type: "danger",
                duration: 3000,
                onPress: () => {
                    hideMessage();
                },
            });
            return false;
        } else if (confirmPassword !== newPassword) {
            showMessage({
                message: "Mật khẩu mới và xác nhận mật khẩu không trùng khớp",
                type: "danger",
                duration: 3000,
                onPress: () => {
                    hideMessage();
                },
            });
            return false;
        }
        return true;
    }

    // thực hiện khi ấn Cập nhật
    const handleOnClickSave = async () => {
        setIsLoading(true);
        if (await validate()) {
            const newUser = {
                name: userInfo.name,
                userName: userInfo.userName,
                password: newPassword,
                phone: phone,
                email: userInfo.email,
                address: userInfo.address,
                image: userInfo.image,
            };

            await fetchData(newUser);
        } else {
            setIsLoading(false);
        }
    }

    // lưu thông tin
    const fetchData = async (newUser) => {
        try {
            const res = await updateUserById(userInfo.id, newUser, userToken);
            if(res) {
                showMessage({
                    message: "Gửi thành công",
                    type: "success",
                    duration: 2000,
                    onPress: () => {
                        hideMessage();
                    },
                });
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                showMessage({
                    message: "Đã xảy ra lỗi khi gửi yêu cầu",
                    type: "danger",
                    duration: 3000,
                    onPress: () => {
                        hideMessage();
                    },
                });
            }
        } catch (error) {
            showMessage({
                message: "Đã xảy ra lỗi khi gửi yêu cầu",
                type: "danger",
                duration: 3000,
                onPress: () => {
                    hideMessage();
                },
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 }}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <FlashMessage position="top" />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
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
                <View style={{ flex: 1, justifyContent: "center", paddingVertical: 20}}>
                    <View style={{ marginBottom: 10, marginVertical: 10 }}>
                        <View style={{marginBottom: 5}}>
                            <Text style={{ ...FONTS.h5 }}>
                                Email <Text style={{ color: "red" }}>*</Text>{" "}
                            </Text>
                        </View>
                        <View style={styles.containerTextInput}>
                            <AntDesign name={"mail"} size={24} color={COLORS.sliver} />
                            <TextInput
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                style={{
                                    width: "100%",
                                    paddingLeft: 12,
                                    fontSize: 16
                                }}
                                value={userInfo.email}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 10, marginVertical: 10 }}>
                        <View style={{marginBottom: 5}}>
                            <Text style={{ ...FONTS.h5 }}>
                                Số điện thoại <Text style={{ color: "red" }}>*</Text>{" "}
                            </Text>
                        </View>
                        <View style={styles.containerTextInput}>
                            <Feather name="phone" size={24} color={COLORS.sliver}/>
                            <TextInput
                                placeholder='Nhập số điện thoại'
                                placeholderTextColor={COLORS.sliver}
                                keyboardType='numeric'
                                style={{
                                    width: "100%",
                                    paddingLeft: 12,
                                    fontSize: 16
                                }}
                                value={userInfo.phone}
                                onChangeText={text => setPhone(text)}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 10, marginVertical: 10 }}>
                        <View style={{marginBottom: 5}}>
                            <Text style={{ ...FONTS.h5 }}>
                                Mật khẩu hiện tại <Text style={{ color: "red" }}>*</Text>{" "}
                            </Text>
                        </View>
                        <View style={styles.containerTextInput}>
                            <AntDesign name="lock" size={30} color={COLORS.sliver} />
                            <TextInput
                                placeholderTextColor={COLORS.sliver}
                                secureTextEntry={!isOldPasswordShow}
                                style={{
                                    width: "100%",
                                    paddingLeft: 12,
                                    fontSize: 16
                                }}
                                value={oldPassword}
                                onChangeText={text => setOldPassword(text)}
                            />

                            <TouchableOpacity
                                onPress={() => setIsOldPasswordShow(!isOldPasswordShow)}
                                style={{
                                    position: "absolute",
                                    right: 12,
                                }}
                            >
                                {
                                    isOldPasswordShow === true ? (
                                        <Ionicons name="eye" size={24} color={COLORS.sliver} />
                                    ) : (
                                        <Ionicons name="eye-off" size={24} color={COLORS.sliver} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginBottom: 10, marginVertical: 10 }}>
                        <View style={{marginBottom: 5}}>
                            <Text style={{ ...FONTS.h5 }}>
                                Mật khẩu mới <Text style={{ color: "red" }}>*</Text>{" "}
                            </Text>
                        </View>
                        <View style={styles.containerTextInput}>
                            <AntDesign name="lock" size={30} color={COLORS.sliver} />
                            <TextInput
                                placeholderTextColor={COLORS.sliver}
                                secureTextEntry={!isNewPasswordShow}
                                style={{
                                    width: "100%",
                                    paddingHorizontal: 12,
                                    paddingRight: 12,
                                    fontSize: 16
                                }}
                                value={newPassword}
                                onChangeText={text => setNewPassword(text)}
                            />

                            <TouchableOpacity
                                onPress={() => setIsNewPasswordShow(!isNewPasswordShow)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isNewPasswordShow === true ? (
                                        <Ionicons name="eye" size={24} color={COLORS.sliver} />
                                    ) : (
                                        <Ionicons name="eye-off" size={24} color={COLORS.sliver} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginBottom: 10, marginVertical: 10 }}>
                        <View style={{marginBottom: 5}}>
                            <Text style={{ ...FONTS.h5 }}>
                                Nhập lại mật khẩu mới <Text style={{ color: "red" }}>*</Text>{" "}
                            </Text>
                        </View>
                        <View style={styles.containerTextInput}>
                            <AntDesign name="lock" size={30} color={COLORS.sliver} />
                            <TextInput
                                placeholderTextColor={COLORS.sliver}
                                secureTextEntry={!isConfirmPasswordShow}
                                style={{
                                    width: "100%",
                                    paddingLeft: 12,
                                    fontSize: 16
                                }}
                                value={confirmPassword}
                                onChangeText={text => setConfirmPassword(text)}
                            />

                            <TouchableOpacity
                                onPress={() => setIsConfirmPasswordShow(!isConfirmPasswordShow)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isConfirmPasswordShow === true ? (
                                        <Ionicons name="eye" size={24} color={COLORS.sliver} />
                                    ) : (
                                        <Ionicons name="eye-off" size={24} color={COLORS.sliver} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 44,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 100,
                    }}
                    onPress={() => handleOnClickSave()}
                >
                    { !isLoading ? (
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.white,
                            }}
                        >
                            Cập nhật
                        </Text>
                    ) : (
                        <ActivityIndicator color={COLORS.white} size={30}/>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerTextInput: {
        width: "100%",
        height: 44,
        borderColor: COLORS.sliver,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22,
        flexDirection: "row"
    },
    icons: {
      color: COLORS.sliver
    }
})

export default AccountSettingScreen