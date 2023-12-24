import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {COLORS} from "../../constants";
import {useNavigation} from "@react-navigation/native";

const ContentManagerScreen = () => {
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

    const navigation = useNavigation();

    const renderEventItem = ({ item }) => (
        <TouchableOpacity
            style={styles.eventItem}
            onPress={() => navigation.navigate('EventDetailCensor', { eventId: item.id })}
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
                   marginVertical: 20,
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
                    Kiểm duyệt nội dung
               </Text>
           </View>
           <ScrollView style={styles.container}>
               {eventList.map((item) => (
                   <View key={item.id}>
                       {renderEventItem({ item })}
                   </View>
               ))}
           </ScrollView>
       </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default ContentManagerScreen;
