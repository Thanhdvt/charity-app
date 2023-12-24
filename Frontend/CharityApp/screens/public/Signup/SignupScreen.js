import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS, icons} from '../../../constants';
import {AntDesign, EvilIcons, Ionicons} from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../../components/common/Button';
import Modal from 'react-native-modal';
import {register} from "../../../services/Signup";
import CustomModal from "../../../components/Modal/MessageModal";

const SignupScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validate = (name, email, phone, password, confirmPassword) => {
        if (!name || !email || !phone || !password || !confirmPassword) {
            return { success: false, message: "Vui lòng nhập đầy đủ thông tin" };
        }
        if (password !== confirmPassword) {
            return {
                success: false,
                message: "Mật khẩu và xác nhận mật khẩu không trùng khớp",
            };
        }
        return { success: true, message: "Đăng ký thành công" };
    };

    const handleRegisterPress = () => {
        const validation = validate(name, email, phone, password, confirmPassword);

        if (!validation.success) {
            setModalMessage(validation.message);
            setModalVisible(true);
            return;
        }
        register(name, email, phone, password);
        navigation.navigate('Login');
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleTermsPress = () => {
        const termsUrl = 'https://thiennguyen.app/terms';
        Linking.openURL(termsUrl);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22, justifyContent: "center" }}>
                <CustomModal isVisible={modalVisible} onClose={closeModal} message={modalMessage} />
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Đăng ký
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Cùng nhau tạo tài khoản nào!</Text>
                </View>

                <View style={{ marginBottom: 12, marginVertical: 10 }}>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection: "row"
                    }}>
                        <AntDesign name={"user"} size={22}/>
                        <TextInput
                            placeholder='Nhập tên của bạn'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%",
                                paddingLeft: 12
                            }}
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12, marginVertical: 10 }}>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection: "row"
                    }}>
                        <AntDesign name={"mail"} size={22}/>
                        <TextInput
                            placeholder='Nhập email của bạn'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%",
                                paddingLeft: 12
                            }}
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12, marginVertical: 10 }}>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='+91'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: "100%"
                            }}
                        />

                        <TextInput
                            placeholder='Nhập số điện thoại'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12, marginVertical: 10 }}>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection: "row"
                    }}>
                        <EvilIcons name={"lock"} size={40}/>
                        <TextInput
                            placeholder='Nhập mật khẩu'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                paddingLeft: 3
                            }}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown === true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginBottom: 12, marginVertical: 10 }}>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection: "row"
                    }}>
                        <EvilIcons name={"lock"} size={40}/>
                        <TextInput
                            placeholder='Nhập lại mật khẩu'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                paddingLeft: 3
                            }}
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown === true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <View style={{flexDirection: 'row',}}>
                        <Text style={{paddingTop: 3}}>
                            Tôi đồng ý với{' '}
                        </Text>
                        <TouchableOpacity onPress={handleTermsPress}>
                            <Text style={{ color: COLORS.primary, fontWeight: 'bold', lineHeight: 24 }}>
                                điều khoản sử dụng
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                    title="Đăng ký"
                    filled
                    style={{
                        marginTop: 20,
                        marginBottom: 4,
                    }}
                    onPress = {() => handleRegisterPress()}
                />

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                        <Text style={{ fontSize: 14 }}>Hoặc tiếp tục với</Text>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => console.log("Pressed")}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 52,
                                borderWidth: 1,
                                borderColor: COLORS.grey,
                                marginRight: 4,
                                borderRadius: 10
                            }}
                        >
                            <Image
                                source={icons.icon_1}
                                style={{
                                    height: 36,
                                    width: 36,
                                    marginRight: 8
                                }}
                                resizeMode='contain'
                            />

                            <Text>Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => console.log("Pressed")}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 52,
                                borderWidth: 1,
                                borderColor: COLORS.grey,
                                marginRight: 4,
                                borderRadius: 10
                            }}
                        >
                            <Image
                                source={icons.icon_2}
                                style={{
                                    height: 36,
                                    width: 36,
                                    marginRight: 8
                                }}
                                resizeMode='contain'
                            />

                            <Text>Google</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginVertical: 22,
                    }}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>Bạn đã có tài khoản?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.primary,
                                fontWeight: "bold",
                                marginLeft: 6
                            }}>Đăng nhập</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignupScreen