import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS, images} from "../../constants";
import {useNavigation} from '@react-navigation/native';

const OrganizationList = () => {
    const users = [
        {
            id: "1",
            name: "Hội chữ thập đỏ Việt Nam",
            image: images.onboarding_1
        },
        {
            id: "2",
            name: "Quỹ Hoạt động Chữ Thập Đỏ",
            image: images.onboarding
        },
        {
            id: "3",
            name: "Quỹ Tony Buổi sáng",
            image: images.onboarding_0
        },
        {
            id: "4",
            name: "Quỹ Hạnh Phúc Cho Mọi Người",
            image: images.onboarding_2
        },
        {
            id: "5",
            name: "Tree Bank",
            image: images.onboarding_1
        },
        {
            id: "6",
            name: "Nhịp Cầu Nhân Ái VTV1",
            image: images.onboarding
        },
    ];

    const navigation = useNavigation();

    const Card = ({user}) => {
        return (
            <TouchableOpacity key={user.id} style={{width: 90, padding: 3, marginRight: 10}}
                              onPress={() => navigation.navigate("Profile")}>
                <LinearGradient
                    colors={['#bc2a8d', '#e95950', '#fccc63']}
                    style={{padding: 2, borderRadius: 6}}
                >
                    <Image source={user.image} style={styles.userImage}/>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: COLORS.white, marginBottom: 5, paddingTop: 25, paddingBottom: 15}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sectionTitle}>
                    <Text style={{fontSize: 18, fontWeight: "500"}}>Ảnh/Video</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Image")}>
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
        height: 80,
        width: 80,
        borderRadius: 6,
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