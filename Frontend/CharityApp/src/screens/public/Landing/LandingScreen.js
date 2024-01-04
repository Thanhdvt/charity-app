import React, {useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {COLORS, icons, images} from "../../../constants";
import {createStackNavigator} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import {useTheme} from "react-native-paper";
import {View} from "react-native-animatable";
import Button from "../../../components/common/Button"
import Post from "../../../components/public/Landing/Post";
import OrganizationList from "../../../components/public/Landing/OrganizationList";
import EventList from "../../../components/public/Landing/EventList";
import ModalPop from "../../../components/Modal/PopModal";
import FlashMessage, {hideMessage, showMessage} from "react-native-flash-message";

const LandingStack = createStackNavigator();

const LandingContent = ({navigation, visible, setVisible}) => {
    const theme = useTheme();

    // useFocusEffect(
    //     React.useCallback(() => {
    //         setVisible(true);
    //         return () => {
    //             setVisible(false);
    //         };
    //     }, [])
    // );
    return (
            <ScrollView showsVerticalScrollIndicator={false}>
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

                <OrganizationList/>
                <EventList/>
                <Post/>

            </ScrollView>
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
                            <Icon
                                name="ios-search"
                                size={24}
                                color="#000000"
                                backgroundColor={colors.background}
                                onPress={() => navigation.navigate("SearchAll")}
                                style={{paddingVertical: 10, paddingHorizontal: 10}}
                            />
                            <TouchableOpacity style={{paddingHorizontal: 10, marginTop: 0}}
                                              onPress={() => setVisible(true)}>
                                <Image
                                    source={icons.account}
                                    style={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: 999,
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
