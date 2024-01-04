import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants";
import { useNavigation } from '@react-navigation/native';
import getAllBackground from "../../../firebase/getAllBackground";
import getAllAvatar from "../../../firebase/getAllAvatar";
import { AuthContext } from "../../context/AuthContext";

const Images = () => {
    const { userInfo } = useContext(AuthContext);
    const [imageList, setImageList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const background = await getAllBackground(userInfo.id);
                const avatar = await getAllAvatar(userInfo.id);

                let combinedImageList = [];
                if (avatar && background) {
                    combinedImageList = [...Object.values(avatar), ...Object.values(background)];
                } else if(avatar) {
                    combinedImageList = [...Object.values(avatar)];
                } else if(background) {
                    combinedImageList = [...Object.values(background)];
                }
                setImageList(combinedImageList.filter(image => image)); // Remove undefined entries
            } catch (error) {
                console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
            }
        };

        fetchData();
    }, [userInfo.id]);

    const Card = ({ image }) => {
        return (
            <TouchableOpacity
                style={{ width: 90, padding: 3, marginRight: 10 }}
                onPress={() => navigation.navigate("Profile")}
            >
                <LinearGradient
                    colors={['#bc2a8d', '#e95950', '#fccc63']}
                    style={{ padding: 2, borderRadius: 6 }}
                >
                    <Image source={{ uri: image }} style={styles.userImage} />
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white, marginBottom: 5, paddingTop: 25, paddingBottom: 15 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sectionTitle}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>Ảnh/Video</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Image")}>
                        <Text style={{ color: COLORS.primary }}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={imageList}
                        renderItem={({ item }) => <Card image={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default Images;

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
});
