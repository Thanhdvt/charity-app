import React, {useContext, useEffect, useState} from "react";
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Button from "../common/Button";
import {COLORS, images} from "../../constants";
import firebase from "firebase/compat";
import {AuthContext} from "../../context/AuthContext";

const {width} = Dimensions.get('screen');
const PostCreat = () => {
    const {userInfo, charityOrganization} = useContext(AuthContext);
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        const fetchUserProfileImage = async () => {
            try {
                const snapshot = await firebase.database()
                    .ref(`users/${userInfo.id}/image`)
                    .once('value');

                const imageUrl = snapshot.val();

                if (imageUrl) {
                    setSelectedImage(imageUrl);
                }
            } catch (error) {
                console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
            }
        };

        fetchUserProfileImage();
    }, [userInfo.id]);

    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 0 }}>
                <Image
                    source={ selectedImage ? {uri: selectedImage} : images.avatar_default }
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 999,
                        borderWidth: 2,
                    }}
                />
            </TouchableOpacity>
                <Button
                    title="Bài viết hôm nay?"
                    style={{
                        paddingLeft: 20,
                        paddingBottom: 8,
                        paddingVertical: 8,
                        borderRadius: 32,
                        borderWidth: 1,
                        alignItems: "left",
                        width: width/1.5,
                    }}
                    onPress = {() => navigation.navigate("Post")}
                />
        </View>
    );
};

export default PostCreat;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.white,
        marginBottom: 2,
        paddingVertical: 15,
        paddingHorizontal: 5,
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 8,
    },
})