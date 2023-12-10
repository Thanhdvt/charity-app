import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../../../constants";
import {useNavigation} from '@react-navigation/native';

const OrganizationList = () => {
    const users = [
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
    ];

    const navigation = useNavigation();

    const Card = ({user}) => {
        return (
            <TouchableOpacity key={user.id} style={{width: 74, padding: 5, marginRight: 10}}
                              onPress={() => navigation.navigate("Profile")}>
                <LinearGradient
                    colors={['#bc2a8d', '#e95950', '#fccc63']}
                    style={{padding: 2, borderRadius: 50}}
                >
                    <Image source={user.image} style={styles.userImage}/>
                </LinearGradient>
                <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                    {user.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: COLORS.white, marginBottom: 1, paddingTop: 25, paddingBottom: 15}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sectionTitle}>
                    <Text style={{fontSize: 18, fontWeight: "500"}}>Hội thiện nguyện</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("OrganizationSearch")}>
                        <Text style={{color: COLORS.primary}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={users}
                        renderItem={({item}) => <Card user={item}/>}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default OrganizationList;

const styles = StyleSheet.create({
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 4,
    },
    userName: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10,
    },
    sectionTitle: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10
    },
})