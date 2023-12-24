import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from "../../../constants";
import {LinearGradient} from "expo-linear-gradient";

const OrganizationTab = ({ navigation }) => {
    const organizations = [
        {
            id: "1",
            name: "Hội chữ thập đỏ Việt Nam",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/2/21/db3d0518-e681-4720-a582-73817b58e4c1.jpg",
            },
        },
        {
            id: "2",
            name: "Quỹ Hoạt động Chữ Thập Đỏ",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/7/1/5edd036f-3dcb-4b8a-bd97-db67de73e2e8.jpg",
            },
        },
        {
            id: "3",
            name: "Quỹ Tony Buổi sáng",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/10/2/5962958b-9b29-4a41-999c-3633f4eb44b9.jpg",
            },
        },
        {
            id: "4",
            name: "Quỹ Hạnh Phúc Cho Mọi Người",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/2/24/649fb301-da9c-4d4b-be74-bca32ece39ae.jpg",
            },
        },
        {
            id: "5",
            name: "Tree Bank",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2022/6/7/3388e3cc-85dc-4dbf-a3a0-67469111624c.jpg",
            },
        },
        {
            id: "6",
            name: "Nhịp Cầu Nhân Ái VTV1",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/9/28/5ebeb7ab-72b1-4352-9c8c-909de18b7422.jpg",
            },
        },
        {
            id: "7",
            name: "Hội Chữ Thập Đỏ Healthcare City",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/11/2/506be44e-ba77-4aa9-b7bd-03cce4562b81.jpg",
            },
        },
        {
            id: "8",
            name: "Hội chữ thập đỏ Việt Nam",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/2/21/db3d0518-e681-4720-a582-73817b58e4c1.jpg",
            },
        },
        {
            id: "9",
            name: "Quỹ Hoạt động Chữ Thập Đỏ",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/7/1/5edd036f-3dcb-4b8a-bd97-db67de73e2e8.jpg",
            },
        },
        {
            id: "10",
            name: "Quỹ Tony Buổi sáng",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/10/2/5962958b-9b29-4a41-999c-3633f4eb44b9.jpg",
            },
        },
        {
            id: "11",
            name: "Quỹ Hạnh Phúc Cho Mọi Người",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/2/24/649fb301-da9c-4d4b-be74-bca32ece39ae.jpg",
            },
        },
        {
            id: "12",
            name: "Tree Bank",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2022/6/7/3388e3cc-85dc-4dbf-a3a0-67469111624c.jpg",
            },
        },
        {
            id: "13",
            name: "Nhịp Cầu Nhân Ái VTV1",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/9/28/5ebeb7ab-72b1-4352-9c8c-909de18b7422.jpg",
            },
        },
        {
            id: "14",
            name: "Hội Chữ Thập Đỏ Healthcare City",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/11/2/506be44e-ba77-4aa9-b7bd-03cce4562b81.jpg",
            },
        },
        {
            id: "15",
            name: "Hội chữ thập đỏ Việt Nam",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/2/21/db3d0518-e681-4720-a582-73817b58e4c1.jpg",
            },
        },
        {
            id: "16",
            name: "Quỹ Hoạt động Chữ Thập Đỏ",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/7/1/5edd036f-3dcb-4b8a-bd97-db67de73e2e8.jpg",
            },
        },
        {
            id: "17",
            name: "Quỹ Tony Buổi sáng",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/10/2/5962958b-9b29-4a41-999c-3633f4eb44b9.jpg",
            },
        },
        {
            id: "18",
            name: "Quỹ Hạnh Phúc Cho Mọi Người",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/2/24/649fb301-da9c-4d4b-be74-bca32ece39ae.jpg",
            },
        },
        {
            id: "19",
            name: "Tree Bank",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2022/6/7/3388e3cc-85dc-4dbf-a3a0-67469111624c.jpg",
            },
        },
        {
            id: "20",
            name: "Nhịp Cầu Nhân Ái VTV1",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/9/28/5ebeb7ab-72b1-4352-9c8c-909de18b7422.jpg",
            },
        },
        {
            id: "21",
            name: "Hội Chữ Thập Đỏ Healthcare City",
            image: {
                uri: "https://static.thiennguyen.app/public/user/profile/2023/11/2/506be44e-ba77-4aa9-b7bd-03cce4562b81.jpg",
            },
        },
    ];

    const handleMoreOptions = (eventId) => {
        console.log(`More options for event ${eventId}`);
    };

    const renderOrganizationItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={{ width: 74, padding: 5, marginHorizontal: 10, marginBottom: 20}}
            onPress={() => navigation.navigate("Profile")}
        >
            <LinearGradient
                colors={['#bc2a8d', '#e95950', '#fccc63']}
                style={{ padding: 2, borderRadius: 50 }}
            >
                <Image source={item.image} style={styles.userImage} />
            </LinearGradient>
            <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderOrganizationRow = (start, end) => (
        <View style={{ flexDirection: 'row'}}>
            {organizations.slice(start, end).map((item) => (
                <View key={item.id} style={{ flex: 1 }}>
                    {renderOrganizationItem({ item })}
                </View>
            ))}
        </View>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {Array.from({ length: Math.ceil(organizations.length / 3) }).map((_, index) => (
                <View key={index}>
                    {renderOrganizationRow(index * 3, (index + 1) * 3)}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 4,
    },
    userName: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 5,
    },
});

export default OrganizationTab;
