import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../../constants";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

const ForHelpRegisterScreen = ({navigation}) => {
    const eventList = [
        {
            id: 1,
            name: 'Chăm sóc sức khỏe cộng đồng',
            image: 'https://redcross.org.vn/upload/18.jpg?v=1.0.2',
            status: 'Đã kết thúc',
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


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 20,
                    height: 60,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.black}/>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "500",
                        marginLeft: 30,
                    }}
                >
                    Yêu cầu trợ giúp
                </Text>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{marginHorizontal: 20}}
            >
                {eventList.map((item) => (
                    <View key={item.id}>
                        {renderEventItem({ item })}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForHelpRegisterScreen;

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