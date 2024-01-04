import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from "../../constants"
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";
import getAllBackground from "../../../firebase/getAllBackground";
import getAllAvatar from "../../../firebase/getAllAvatar";

const {width} = Dimensions.get("screen");

const ImageScreen = ({route}) => {
    const { userInfo } = useContext(AuthContext);
    const [imageList, setImageList] = useState([]);
    const navigation = useNavigation();


    useEffect(() => {
        const fetchData = async () => {
            try {
                let id;
                if(route.params?.userId) {
                    id = route.params.userId;
                } else {
                    id = userInfo.id;
                }

                console.log(id);
                const background = await getAllBackground(id);
                const avatar = await getAllAvatar(id);

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
    }, []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: COLORS.white,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
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
                    Ảnh/Video
                </Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={imageList}
                    renderItem={({item}) => (<Image source={{uri: item}} style={styles.image}/>)}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    image: {
        width: (width - 16) / 4,
        aspectRatio: 1,
        margin: 2,
    },
});

export default ImageScreen;
