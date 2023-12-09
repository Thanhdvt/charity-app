import React from "react";
import {Text, Image, StyleSheet, Modal, Animated, TouchableOpacity, ScrollView} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {COLORS, icons, images} from "../../../constants";
// import { DrawerContent } from "../../Drawer/DrawerContent";
import {createStackNavigator} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import {useTheme, Avatar} from "react-native-paper";
import {View} from "react-native-animatable";
import Button from "../../../components/common/Button"
import Post from "../../../components/Profile/Post";
import OrganizationList from "../../../components/public/Landing/OrganizationList";
import EventList from "../../../components/public/Landing/EventList";

const LandingStack = createStackNavigator();

const LandingContent = ({navigation, visible, setVisible}) => {
    const theme = useTheme();

    useFocusEffect(
        React.useCallback(() => {
            setVisible(true);
            return () => {
                setVisible(false);
            };
        }, [])
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <OrganizationList/>
            <EventList/>
            <Post/>

            <ModalPop visible={visible}>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: COLORS.primary}}>Lúc khác</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={images.landing_1}
                        style={{height: 250, width: 250}}
                    />
                </View>

                <Text style={{marginTop: 15, fontSize: 18, fontWeight: "500", textAlign: 'center'}}>
                    Chào mừng bạn đến với nền tảng thiện nguyện minh bạch
                </Text>

                <Text style={{
                    marginVertical: 20,
                    fontSize: 14,
                    textAlign: 'center',
                    color: COLORS.secondary,
                    paddingHorizontal: 25
                }}>
                    Chúng tôi sẽ giúp bạn có trải nghiệm thiện nguyện thật khác biệt
                </Text>

                <Button
                    title="Đăng nhập hoặc tạo tài khoản"
                    filled
                    style={{
                        marginHorizontal: 20
                    }}
                    onPress={() => navigation.navigate("Login")}
                />
            </ModalPop>
        </ScrollView>
    );
};

const ModalPop = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);

    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                    style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

const LandingScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [visible, setVisible] = React.useState(true);

    return (
        <LandingStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                    shadowColor: colors.background, // iOS
                    elevation: 0, // Android
                },
                headerTintColor: COLORS.secondary,
                headerTitleStyle: {
                    fontWeight: "500",
                    fontSize: 18,
                },
            }}
        >
            <LandingStack.Screen
                name="HomeStack"
                options={{
                    title: "Thiện nguyện",
                    headerLeft: () => (
                        <View style={{marginLeft: 10}}>
                            <Image style={styles.stretch} source={images.logo_app}/>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{flexDirection: "row", marginRight: 10}}>
                            <Icon.Button
                                name="ios-search"
                                size={24}
                                color="#000"
                                backgroundColor={colors.background}
                                onPress={() => {
                                }}
                            />
                            <TouchableOpacity style={{paddingHorizontal: 10, marginTop: 0}}
                                              onPress={() => setVisible(true)}>
                                <Image
                                    source={icons.account}
                                    // resizeMode="contain"
                                    style={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: 999,
                                        // borderColor: COLORS.primary,
                                        borderWidth: 2,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            >
                {() => <LandingContent navigation={navigation} visible={visible} setVisible={setVisible}/>}
            </LandingStack.Screen>
        </LandingStack.Navigator>
    );
};

export default LandingScreen;

const styles = StyleSheet.create({
    stretch: {
        width: 60,
        height: 60,
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
