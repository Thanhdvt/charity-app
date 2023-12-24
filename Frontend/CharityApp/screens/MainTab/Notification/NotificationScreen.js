import React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";

import {COLORS, images} from "../../../constants";
import {createStackNavigator} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import {useTheme} from "react-native-paper";
import {View} from "react-native-animatable";
import {MaterialIcons} from "@expo/vector-icons";

const NotificationStack = createStackNavigator();

const NotificationContent = ({ navigation }) => {

    const eventList = [
        {
            id: 1,
            name: 'Chăm sóc sức khỏe cộng đồng',
            image: 'https://redcross.org.vn/upload/18.jpg?v=1.0.2',
            status: 'Đã kết thúc',
        },
        {
            id: 2,
            name: 'Diễn tập cứu hộ cứu nạn',
            image: 'https://redcross.org.vn/upload/cham-soc-suc-khoe-2.jpg?v=1.0.2',
            status: 'Đã kết thúc',
        },
        {
            id: 3,
            name: 'Hiến máu nhân đạo',
            image: 'https://redcross.org.vn/upload/cham-soc-suc-khoe.jpg?v=1.0.2',
            status: 'Đang diễn ra',
        },
        {
            id: 4,
            name: 'Mái ấm cho em',
            image: 'https://redcross.org.vn/upload/phong-ngua-ung-pho-tham-hoa.jpg?v=1.0.2',
            status: 'Đang diễn ra',
        },
    ];

    const renderEventItem = ({ item }) => (
        <TouchableOpacity
            style={styles.eventItem}
            onPress={() => navigation.navigate('ForHelpDetail', { eventId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventStatus}>{item.status}</Text>
            </View>
            <TouchableOpacity onPress={() => handleMoreOptions(item.id)}>
                <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const handleMoreOptions = (eventId) => {
        console.log(`More options for event ${eventId}`);
    };

    return (
        <ScrollView style={styles.container}>
            {eventList.map((item) => (
                <View key={item.id}>
                    {renderEventItem({ item })}
                </View>
            ))}
        </ScrollView>
    );
};

const NotificationScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <NotificationStack.Navigator
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
            <NotificationStack.Screen
                name="NotificationStack"
                component={NotificationContent}
                options={{
                    title: "Thông báo",
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                        </View>
                    ),

                    headerRight: () => (
                        <View style={{ flexDirection: "row", marginRight: 10 }}>
                            <Icon
                                name="ios-search"
                                size={24}
                                color="#000000"
                                backgroundColor={colors.background}
                                onPress={() => navigation.navigate("SearchAll")}
                                style={{paddingVertical: 10, paddingHorizontal: 10}}
                            />
                        </View>
                    ),
                }}
            >
            </NotificationStack.Screen>
        </NotificationStack.Navigator>
    );
};

export default NotificationScreen;

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
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        padding: 12,
    },
    eventImage: {
        width: 60,
        height: 60,
        borderRadius: 4,
    },
    eventDetails: {
        flex: 1,
        marginLeft: 12,
    },
    eventName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventStatus: {
        fontSize: 14,
        color: 'gray',
    },
});
