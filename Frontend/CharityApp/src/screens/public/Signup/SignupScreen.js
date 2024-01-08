import {Image, Linking, Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, FONTS, icons} from '../../../constants';
import {AntDesign, EvilIcons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../../components/common/Button';
import {register} from "../../../services/User/CreateUser";
import CustomModal from "../../../components/Modal/MessageModal";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";

const SignupScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [name, setName] = useState('');
    const [account, setAccount] = useState('')
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validate = (name, account, email, phone, password, confirmPassword) => {
        if (!name || !account || !email || !phone || !password || !confirmPassword) {
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
        const validation = validate(name, account, email, phone, password, confirmPassword);

        if (!validation.success) {
            setModalMessage(validation.message);
            setModalVisible(true);
            return;
        }
        register(name, account, email, phone, password);
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
            <View style={{ flex: 1, marginHorizontal: 22, justifyContent: "center", marginVertical: 10 }}>
                <CustomModal isVisible={modalVisible} onClose={closeModal} message={modalMessage} />
                <View style={{ marginBottom: 30 }}>
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
                    <View style={styles.containerText}>
                        <AntDesign name={"user"} size={24} color={COLORS.sliver}/>
                        <TextInput
                            placeholder='Nhập tên của bạn'
                            placeholderTextColor={COLORS.sliver}
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
                    <View style={styles.containerText}>
                        <Ionicons name="person-circle-outline" size={30} color='#A9A9A9' />
                        <TextInput
                            placeholder='Nhập tên đăng nhập'
                            placeholderTextColor={COLORS.sliver}
                            style={{
                                width: "100%",
                                paddingLeft: 10
                            }}
                            value={account}
                            onChangeText={text => setAccount(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12, marginVertical: 10 }}>
                    <View style={styles.containerText}>
                        <AntDesign name={"mail"} size={24} color={COLORS.sliver}/>
                        <TextInput
                            placeholder='Nhập email của bạn'
                            placeholderTextColor={COLORS.sliver}
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
                    <View style={styles.containerText}>
                        <Feather name="phone" size={22} color={COLORS.sliver}/>
                        <TextInput
                            placeholder='Nhập số điện thoại'
                            placeholderTextColor={COLORS.sliver}
                            keyboardType='numeric'
                            style={{
                                width: "100%",
                                paddingLeft: 12
                            }}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12, marginVertical: 10 }}>
                    <View style={styles.containerText}>
                        <AntDesign name="lock" size={28} color={COLORS.sliver} />
                        <TextInput
                            placeholder='Nhập mật khẩu'
                            placeholderTextColor={COLORS.sliver}
                            secureTextEntry={!isPasswordShown}
                            style={{
                                width: "100%",
                                paddingLeft: 8
                            }}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown !== true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.sliver} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.sliver} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginBottom: 12, marginVertical: 10 }}>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.sliver,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection: "row"
                    }}>
                        <AntDesign name="lock" size={28} color={COLORS.sliver} />
                        <TextInput
                            placeholder='Nhập lại mật khẩu'
                            placeholderTextColor={COLORS.sliver}
                            secureTextEntry={!isPasswordShown}
                            style={{
                                width: "100%",
                                paddingLeft: 8
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
                                    <Ionicons name="eye" size={24} color={COLORS.sliver} />
                                ) : (
                                    <Ionicons name="eye-off" size={24} color={COLORS.sliver} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    marginVertical: 6,
                }}>
                    <View style={{ paddingRight: 10}}>
                        <Text style={{marginTop: 3}}>
                            <Text>Bằng việc nhấn đăng ký bạn đã xác nhận đồng ý với{' '}</Text>
                            <Pressable onPress={() => handleTermsPress()}>

                            </Pressable>
                            <Text style={{ color: COLORS.primary, fontWeight: "500"}}>
                                điều khoản sử dụng
                            </Text>
                        </Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.primary,
                            height: 44,
                            borderRadius: 10,
                            marginTop: 10,
                            marginBottom: 15,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        activeOpacity={0.8}
                        onPress={() => handleRegisterPress()}
                    >

                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.white,
                            }}
                        >
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
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

const styles = StyleSheet.create({
    containerText: {
        width: "100%",
        height: 48,
        borderColor: COLORS.sliver,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingLeft: 22
    }
})

export default SignupScreen