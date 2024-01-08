import React, {useEffect, useState} from "react";
import {Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, images} from "../../../constants";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import {EmailIcon, TikTokIcon} from "../../../components/common/Icon";
import Tabs from "../../../components/VolunteerTab/Volunteer/Tabs";
import DetailInfo from "../../../components/VolunteerTab/Volunteer/DetailInfo";
import AttendEvent from "../../../components/VolunteerTab/Volunteer/AttendEvent";
import {getVolunteerByOrganizationId} from "../../../services/Volunteer/organization/GetVolunteerByOrganizationId";
import {getUserById} from "../../../services/User/{id}/GetUserById";
import FlashMessage, {hideMessage, showMessage} from "react-native-flash-message";

const tabs = ["Chi tiết", "Sự kiện tham gia"];

const VolunteerScreen = ({navigation, route}) => {
    let userId = route.params.userId;
    let id = route.params.id;
    const [user, setUser] = useState({});
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleClickIcon = () => {
        showMessage({
            message: "Tài khoản chưa thiết lập thông tin này",
            type: "warning",
            duration: 3000,
            onPress: () => {
                hideMessage();
            },
        });
    }

    const displayTabContent = () => {
        switch (activeTab) {
            case "Chi tiết":
                return <DetailInfo volunteerId={id} userId={userId}/>;

            case "Sự kiện tham gia":
                return <AttendEvent volunteerId={id}/>;
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserById(userId);
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching data', error);
                setUser({});
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.gray,
            }}
        >
            <FlashMessage position="top" style={{marginHorizontal: 20, marginTop: 40, borderRadius: 12}}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: 60,
                        backgroundColor: COLORS.white,
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleMoreOptions(item.id)}>
                        <MaterialIcons name="more-vert" size={24} color={COLORS.primary}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.screen}>
                    {
                        user?.image && (
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{uri: user?.image}}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            </View>
                        )
                    }
                    <View>
                        <Text style={styles.hearderText}>{user?.name}</Text>
                    </View>
                    {
                        user?.description && (
                            <View>
                                <Text style={styles.textStyle}>
                                    {user?.description}
                                </Text>
                            </View>
                        )
                    }
                    <View style={{flexDirection: "row", marginTop: 15}}>
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                padding: 2,
                                backgroundColor: "#2ddc5a",
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 8,
                            }}
                            onPress={() => {
                                user.phone ? Linking.openURL(`tel:${user.phone}`) : handleClickIcon()
                            }}
                        >
                            <Icon name="phone" size={24} color={"white"}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "white",
                                marginHorizontal: 8,
                            }}
                            onPress={() => {
                                user.email ? Linking.openURL(`mailto:${user.email}`) : handleClickIcon()
                            }}
                        >
                            <EmailIcon/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                paddingHorizontal: 2,
                                paddingTop: 8,
                                backgroundColor: "#3360ff",
                                borderRadius: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 8,
                            }}
                            onPress={() => {
                                user?.website ? Linking.openURL(user?.website) : handleClickIcon()
                            }}
                        >
                            <Icon name="facebook-f" size={24} color={"white"}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                padding: 2,
                                backgroundColor: "black",
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 8,
                            }}
                            onPress={() => {
                                user?.website ? Linking.openURL(user?.website) : handleClickIcon()
                            }}
                        >
                            <TikTokIcon/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor: COLORS.white}}>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            paddingHorizontal: 20,
                            borderBottomColor: COLORS.secondaryGray,
                        }}
                    >
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </View>
                    <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                        {displayTabContent()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default VolunteerScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.white,
        paddingBottom: 20,
        marginBottom: 5,
    },
    imageContainer: {
        width: 155,
        height: 155,
        borderRadius: 200,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: 5,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    hearderText: {
        fontSize: 24,
        marginVertical: 5,
    },
    textStyle: {
        fontSize: 16,
        marginVertical: 5,
        marginHorizontal: 20,
        textAlign: "center",
    },
    container: {
        flexDirection: "row",
        marginVertical: 5,
    },
});
