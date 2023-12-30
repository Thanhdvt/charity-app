import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {COLORS, images} from "../../constants";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Button from "../../components/common/Button";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";
import {createEvent} from "../../services/Event/CreateEvent";
import FlashMessage, {hideMessage, showMessage} from "react-native-flash-message";

const {height} = Dimensions.get('screen');

const PostScreen = () => {
    const navigation = useNavigation();
    const {userInfo, charityOrganization} = useContext(AuthContext)
    const [event, setEvent] = useState(
        {
            "title": "",
            "content": "",
            "image": "",
            "organization_Id": "",
            "text": "",
            "status": 2,
            "time": "2023-12-25T16:28:56.939Z",
            "review": "",
            "type": 0
        });
    const [content, setContent] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [organization, setOrganization] = useState(
        {
            id: "1",
            name: "Hội chữ thập đỏ Việt Nam",
            image: images.profile
        })

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            const selectedImages = result.assets.map((asset) => asset.uri).filter((uri) => !!uri);
            setSelectedImages(selectedImages);
        }
    };

    const removeImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const validate = () => {
        if( !selectedImages.length || !content) {
            showMessage({
                message: "Nhập đầy đủ các trường bắt buộc",
                type: "danger",
                duration: 3000,
                onPress: () => {
                    hideMessage();
                },
            });
            return false;
        }
        return true;
    }

    const clearForm = () => {
        setSelectedImages([]);
        setContent("")
    };

    const handleOnClickSave = async () => {
        if (validate()) {
            const newPost = {
                title: "string",
                content: content,
                image: "string",
                organization_Id: charityOrganization.id,
                text: "",
                status: 2,
                time: "2023-12-25T16:28:56.939Z",
                review: "",
                type: 0
            };

            try {
                const res = await createEvent(newPost);
                console.log(res.status)
                if(res) {
                    showMessage({
                        message: "Gửi thành công",
                        type: "success",
                        duration: 2000,
                        onPress: () => {
                            hideMessage();
                        },
                    });
                    clearForm();
                } else {
                    showMessage({
                        message: "Đã xảy ra lỗi khi gửi yêu cầu",
                        type: "danger",
                        duration: 3000,
                        onPress: () => {
                            hideMessage();
                        },
                    });
                }
            } catch (error) {
                showMessage({
                    message: "Đã xảy ra lỗi khi gửi yêu cầu",
                    type: "danger",
                    duration: 3000,
                    onPress: () => {
                        hideMessage();
                    },
                });
            }
        }
    }

    const renderImages = () => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedImages.map((uri, index) => (
                    <View key={index} style={{margin: 5}}>
                        <Image source={{uri}} style={{width: 100, height: 100, borderRadius: 8}}/>
                        <IconButton
                            icon="close"
                            size={15}
                            style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)'
                            }}
                            onPress={() => removeImage(index)}
                        />
                    </View>
                ))}
            </ScrollView>
        );
    };

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
                    marginVertical: 20,
                    marginHorizontal: 20,
                    height: 60,
                }}
            >
                <FlashMessage position="top" />
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
                    Tạo bài viết
                </Text>
                <Button
                    title="ĐĂNG"
                    filled
                    style={{
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                        textColor: COLORS.white,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        paddingBottom: 8,
                        borderRadius: 6,
                        position: "absolute",
                        right: 4
                    }}
                    onPress = {() => handleOnClickSave()}
                />
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{height: height-130}}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 20,
                    }}
                >
                    <Image
                        source={images.profile}
                        style={{width: 50, height: 50, borderRadius: 25, marginRight: 12}}
                    />
                    <View>
                        <Text style={{fontSize: 18, fontWeight: "500"}}>
                            {userInfo.name}
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1, padding: 20}}>
                    <TextInput
                        placeholder="Nội dung bài viết..."
                        multiline
                        numberOfLines={4}
                        value={content}
                        onChangeText={(text) => setContent(text)}
                        style={{borderWidth: 0, borderColor: 'gray', marginBottom: 16, padding: 8, fontSize: 20}}
                    />
                    {selectedImages.length > 0 && renderImages()}
                    <TouchableOpacity onPress={pickImages} style={{marginTop: 10}}>
                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <MaterialCommunityIcons name="image-plus" size={36} style={{color: COLORS.primary}}/>
                            <Text style={{fontSize: 20, paddingLeft: 10, fontWeight: "500", color: COLORS.primary}}>
                                Ảnh/video
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default PostScreen;
