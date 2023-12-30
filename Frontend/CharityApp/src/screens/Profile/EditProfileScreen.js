import {
    ActivityIndicator,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import {COLORS, FONTS, images} from "../../constants";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {AuthContext} from "../../context/AuthContext";
import FlashMessage, {hideMessage, showMessage} from "react-native-flash-message";
import {updateOrganizationById} from "../../services/CharityOrganization/{id}/UpdateOrganizationById";
import {getOrganizationById} from "../../services/CharityOrganization/{id}/GetOrganizationById";
import firebase from "firebase/compat/app";
import * as FileSystem from 'expo-file-system';
import getUserProfileImage from "../../../firebase/getUserProfileImage";

const EditProfileScreen = ({navigation}) => {
    const {userInfo, charityOrganization, userToken} = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState();
    const [phone, setPhone] = useState(userInfo.phone);
    const [address, setAddress] = useState(userInfo.address);
    const [fax, setFax] = useState();
    const [website, setWebsite] = useState();
    const [description, setDescription] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const showMode = () => {
        setShowDatePicker(true);
    };

    const onChange = (event, date) => {
        setShowDatePicker(false);
        setDate(date);
        formatDate(date);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        setSelectedDate(`${formattedDay}/${formattedMonth}/${year}`);
        return selectedDate;
    };

    function renderDatePicker() {
        return (
            <Modal animationType="slide" transparent={true} visible={showDatePicker}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <DateTimePicker value={date} mode="date" onChange={onChange}/>
                </View>
            </Modal>
        );
    }

    useEffect(() => {
        const getProfileImage = async () => {
            try {
                const imageUrl = await getUserProfileImage(userInfo.id);
                if (imageUrl) {
                    setSelectedImage(imageUrl);
                }
            } catch (error) {
                console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
            }
        };

        getProfileImage();
    }, [userInfo.id]);

    useEffect(() => {
        const getData = async () => {
            if(charityOrganization) {
                try {
                    const res = await getOrganizationById(charityOrganization?.id);
                    if (res?.data) {
                        formatDate(new Date(res.data.establish_Date));
                        setFax(res.data.fax);
                        setWebsite(res.data.website);
                        setDescription(res.data.description);
                    }
                } catch (error) {
                    console.error("Error fetching data", error);
                }
            }
        };

        getData();
    }, []);

    const validate = () => {
        if (!phone || !address) {
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

    // thực hiện khi ấn Cập nhật
    const handleOnClickSave = async () => {
        setIsLoading(true);
        if (validate()) {
            if (charityOrganization) {
                const newOrganization = {
                    establish_Date: date.toISOString(),
                    fax: fax,
                    website: website,
                    description: description
                };

                await fetchData(newOrganization);
            }
            await uploadImage();
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    // upload ảnh tới storage
    const uploadImage = async () => {
        try {
                const {uri} = await FileSystem.getInfoAsync(selectedImage);

                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = (e) => {
                        reject(new TypeError('Network request failed'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', uri, true);
                    xhr.send(null);
                });

                const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
                const ref = firebase.storage().ref(`/files/${filename}`);
                await ref.put(blob);

                const imageURL = await ref.getDownloadURL();
                if(imageURL){
                    showMessage({
                        message: "Gửi thành công",
                        type: "success",
                        duration: 3000,
                        onPress: () => {
                            hideMessage();
                        },
                    });
                    await saveImageUrlToDatabase(imageURL);
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
        } catch (e) {
            console.log("cc")
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

    // lưu ảnh vào database
    const saveImageUrlToDatabase = async (imageURL) => {
        try {
            const userId = userInfo.id;
            const databaseRef = firebase.database().ref(`users/${userId}/image`);

            await databaseRef.set(imageURL);
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
    };


    // lưu thông tin
    const fetchData = async (newOrganization) => {
        try {
            const res = await updateOrganizationById(charityOrganization?.id, newOrganization, userToken);
            if(!res){
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
                    marginVertical: 0,
                    height: 60,
                }}
            >
                <FlashMessage position="top"/>
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
                    Chỉnh sửa thông tin
                </Text>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        alignItems: "center",
                        marginVertical: 20,
                    }}
                >
                    <TouchableOpacity onPress={handleImageSelection}>
                        <Image
                            source={selectedImage ? {uri: selectedImage} : images.avatar_default}
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                            }}
                        />

                        <View
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 10,
                                zIndex: 9999,
                            }}
                        >
                            <MaterialIcons
                                name="photo-camera"
                                size={32}
                                color={COLORS.primary}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{paddingVertical: 30}}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{...FONTS.h5}}>
                            Tên tài khoản <Text style={{color: "red"}}>*</Text>{" "}
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
                                value={userInfo?.name}
                                // onChangeText={(value) => setName(value)}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{...FONTS.h5}}>
                            Email <Text style={{color: "red"}}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
                                value={userInfo?.email}
                                // onChangeText={(value) => setEmail(value)}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{...FONTS.h5}}>
                            Số điện thoại <Text style={{color: "red"}}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
                                value={phone}
                                onChangeText={(value) => setPhone(value)}
                                editable={true}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{...FONTS.h5}}>
                            Địa chỉ <Text style={{color: "red"}}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
                                value={address}
                                onChangeText={(value) => setAddress(value)}
                                editable={true}
                            />
                        </View>
                    </View>

                    {
                        charityOrganization && (
                            <>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        marginBottom: 6,
                                    }}
                                >
                                    <Text style={{...FONTS.h5}}>Ngày thành lập</Text>
                                    <TouchableOpacity
                                        onPress={showMode}
                                        style={styles.containerTextInput}
                                    >
                                        <Text>{selectedDate}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        marginBottom: 6,
                                    }}
                                >
                                    <Text style={{...FONTS.h5}}>Số fax</Text>
                                    <View style={styles.containerTextInput}>
                                        <TextInput
                                            style={{fontSize: 16}}
                                            value={fax}
                                            onChangeText={(value) => setFax(value)}
                                            editable={true}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "column",
                                        marginBottom: 6,
                                    }}
                                >
                                    <Text style={{...FONTS.h5}}>Website</Text>
                                    <View style={styles.containerTextInput}>
                                        <TextInput
                                            style={{fontSize: 16}}
                                            value={website}
                                            onChangeText={(value) => setWebsite(value)}
                                            editable={true}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "column",
                                        marginBottom: 6,
                                    }}
                                >
                                    <Text style={{...FONTS.h5}}>Mô tả chung</Text>
                                    <View style={[styles.containerTextInput, {height: 200}]}>
                                        <TextInput
                                            style={{fontSize: 16}}
                                            multiline
                                            numberOfLines={8}
                                            value={description}
                                            onChangeText={(value) => setDescription(value)}
                                            editable={true}
                                        />
                                    </View>
                                </View>
                            </>
                        )
                    }
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 44,
                        borderRadius: 6,
                        marginTop: 10,
                        marginBottom: 15,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    activeOpacity={0.8}
                    onPress={() => handleOnClickSave()}
                >
                    {!isLoading ? (
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.white,
                            }}
                        >
                            Cập nhật
                        </Text>
                    ) : (
                        <ActivityIndicator color={COLORS.white} size={30}/>
                    )}
                </TouchableOpacity>

                {renderDatePicker()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    containerTextInput: {
        height: 44,
        width: "100%",
        borderColor: COLORS.secondaryGray,
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 4,
        marginBottom: 12,
        justifyContent: "center",
        paddingLeft: 8,
    },
});
