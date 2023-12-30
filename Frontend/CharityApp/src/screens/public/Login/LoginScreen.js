import {Image, Pressable, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useContext, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, icons, images} from '../../../constants';
import {AntDesign, EvilIcons, Ionicons} from "@expo/vector-icons";
import Button from '../../../components/common/Button';
import {AuthContext} from "../../../context/AuthContext";
import CustomModal from "../../../components/Modal/MessageModal";

const Login = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);

    const validate = (email, password) => {
        if (!email || !password) {
            return { success: false, message: "Đăng nhập thất bại" };
        }
        return { success: true, message: "Đăng nhập thành công" };
    };

    const handleLoginError = (error) => {
        setModalMessage(error);
        setModalVisible(true);
    };

    const handleLoginPress = () => {
        const validation = validate(email, password);

        if (!validation.success) {
            setModalMessage(validation.message);
            setModalVisible(true);
            return;
        }
        login(email, password, handleLoginError);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22, justifyContent: "center" }}>
                <CustomModal isVisible={modalVisible} onClose={closeModal} message={modalMessage} />
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={images.welcome}
                        style={{height: 100, width: "100%"}}
                    />
                </View>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Chào mừng quay trở lại ! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hãy đăng nhập để tiếp tục!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.sliver,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        marginVertical: 10,
                        flexDirection: "row"
                    }}>
                        <AntDesign name={"mail"} size={26} color={COLORS.sliver}/>
                        <TextInput
                            placeholder='Nhập địa chỉ email'
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

                <View style={{ marginBottom: 12 }}>
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
                        <AntDesign name="lock" size={30} color={COLORS.sliver} />
                        <TextInput
                            placeholder='Nhập mật khẩu'
                            placeholderTextColor={COLORS.sliver}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                paddingLeft: 12
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
                                    <Ionicons name="eye-off" size={24} color={COLORS.sliver} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.sliver} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6,
                    justifyContent: "flex-end"
                }}>
                    {/*<View style={{flexDirection: "row"}}>*/}
                    {/*    <Checkbox*/}
                    {/*        style={{ marginRight: 8 }}*/}
                    {/*        value={isChecked}*/}
                    {/*        onValueChange={setIsChecked}*/}
                    {/*        color={isChecked ? COLORS.primary : undefined}*/}
                    {/*    />*/}
                    {/*    <Text>Ghi nhớ tôi</Text>*/}
                    {/*</View>*/}
                    <Text style={{color: COLORS.primary, fontWeight: "bold"}}>Quên mật khẩu ?</Text>
                </View>

                <Button
                    title="Đăng nhập"
                    filled
                    style={{
                        marginTop: 20,
                        marginBottom: 4,
                    }}
                    onPress = {() => handleLoginPress()}
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
                        marginVertical: 22
                    }}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>Bạn chưa có tài khoản? </Text>
                        <Pressable
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.primary,
                                fontWeight: "bold",
                                marginLeft: 6
                            }}>Đăng ký</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login