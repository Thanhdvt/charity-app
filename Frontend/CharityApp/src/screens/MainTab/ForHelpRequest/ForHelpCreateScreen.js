import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {COLORS, FONTS} from "../../../constants";
import {Ionicons} from "@expo/vector-icons";
import {IconButton, useTheme,} from "react-native-paper";
import {createStackNavigator} from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import {Dropdown} from 'react-native-element-dropdown';
import Button from "../../../components/common/Button";
import {AuthContext} from "../../../context/AuthContext";
import FlashMessage, {hideMessage, showMessage} from "react-native-flash-message";
import {createForHelpRequest} from "../../../services/ForHelpRequest/CreateForHelpRequest";
import {getAllOrganization} from "../../../services/CharityOrganization/GetAllOrganization";
import firebase from "firebase/compat/app";
import * as FileSystem from 'expo-file-system';
import registerNNPushToken from 'native-notify';
import {sendPushNotification} from "../../../../firebase/sendPushNotification";
import {getUserById} from "../../../services/User/{id}/GetUserById";

const MenuStack = createStackNavigator();

const ForHelpCreate = ({navigation}) => {
    const data = [
        {label: 'Xóa đói', value: '1'},
        {label: 'Trẻ em', value: '2'},
        {label: 'Người già', value: '3'},
        {label: 'Người nghèo', value: '4'},
        {label: 'Người vô gia cư', value: '5'},
        {label: 'Môi trường', value: '6'},
        {label: 'Giáo dục', value: '7'},
        {label: 'Khác', value: '8'},
    ];
    const {userInfo} = useContext(AuthContext);
    const [topic, setTopic] = useState(null);
    const [organization_Id, setOrganization_Id] = useState(null);
    const [description, setDescription] = useState("");
    const [organizationList, setOrganizationList] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const pickFiles = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsMultipleSelection: true,
                quality: 1,
            });

            if (!result.canceled && result.assets) {
                const newFiles = result.assets.map(asset => asset.uri).filter(uri => !!uri);
                setSelectedFiles([...selectedFiles, ...newFiles]);
                console.log(selectedFiles)
            }
        } catch (error) {
            console.error('Error picking files', error);
        }
    };

    // const  expoPushToken = "ExponentPushToken[xhyOSsIm-6Pp5UBGnJg_dS]"
    const  expoPushToken = "ExponentPushToken[7mhEAvLS-b5MhVKE-U_bWt]"

    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    const removeFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    useEffect(() => {
        (async () => {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access media library denied');
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getAllOrganization();
            const updatedList = await Promise.all(
                res.data.map(async (item) => {
                    try {
                        const userResponse = await getUserById(item.user_Id);
                        const { image, name } = userResponse.data;
                        return { ...item, image, name };
                    } catch (error) {
                        console.error('Error fetching user data', error);
                        return item;
                    }
                })
            );
            setOrganizationList(updatedList);
        })();
    }, []);

    const validate = () => {
        if (!topic || !description || !organization_Id) {
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
        setTopic(null);
        setOrganization_Id(null);
        setSelectedFiles([]);
        setDescription("");
    };

    const handleOnClickSave = async () => {
        if (validate()) {
            const newForHelpRequest = {
                description: description,
                date: "2023-12-06T10:45:20.548Z",
                status: 1,
                user_id: userInfo.id,
                organization_Id: organization_Id
            };

            let forHelpRequestId = await fetchData(newForHelpRequest);
            await uploadImage(forHelpRequestId);
            await sendPushNotification(message);
        }
    }

    // upload ảnh tới storage
    const uploadImage = async (forHelpRequestId) => {
        try {
            selectedFiles.map(async (selectedFile) => {
                console.log('ok');
                const {uri} = await FileSystem.getInfoAsync(selectedFile);

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

                const filename = selectedFile.substring(selectedFile.lastIndexOf('/') + 1);
                const ref = firebase.storage().ref(`files/${filename}`);
                await ref.put(blob);

                const imageURL = await ref.getDownloadURL();
                await saveImageUrlToDatabase(imageURL, forHelpRequestId);
            })
        } catch (e) {
            console.log("err" + e);
        }
    }

    // lưu ảnh vào database
    const saveImageUrlToDatabase = async (imageURL, forHelpRequestId) => {
        try {
            const databaseRef = firebase.database().ref(`${userInfo.id}/forhelprequest/${forHelpRequestId}`);
            await databaseRef.push().set(imageURL);
        } catch (error) {
            console.error("Error saving image URL to database", error);
        }
    };

    // lưu thông tin
    const fetchData = async (newForHelpRequest) => {
        try {
            const res = await createForHelpRequest(newForHelpRequest);
            const random = Math.floor(Math.random() * 1000000000) + 1; // cần fix lại sau, hiện đang coi là id yêu cầu trợ giúp
            if (res) {
                showMessage({
                    message: "Gửi thành công",
                    type: "success",
                    duration: 2000,
                    onPress: () => {
                        hideMessage();
                    },
                });
                clearForm();
                return random;
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

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
            }}
        >
            <FlashMessage position="top" style={{marginHorizontal: 20}}/>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{paddingBottom: 30}}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{...FONTS.h5}}>
                            Chủ đề <Text style={{color: "red"}}>*</Text>{" "}
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Chọn chủ đề"
                            value={topic}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setTopic(item.value);
                                // setIsFocus(false);
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{...FONTS.h5}}>
                            Tổ chức nhận yêu cầu <Text style={{color: "red"}}>*</Text>{" "}
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={organizationList}
                            maxHeight={300}
                            labelField="name"
                            valueField="id"
                            placeholder="Chọn tổ chức"
                            value={organization_Id}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setOrganization_Id(item.id);
                                // setIsFocus(false);
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{...FONTS.h5}}>
                            Họ và tên <Text style={{color: "red"}}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
                                value={userInfo.name}
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
                            Địa chỉ <Text style={{color: "red"}}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
                                value={userInfo.address}
                                // onChangeText={(value) => setCountry(value)}
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
                                value={userInfo.email}
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
                                value={userInfo.phone}
                                // onChangeText={(value) => setPhone(value)}
                                editable={false}
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
                        <Text style={{...FONTS.h5}}>Nội dung <Text style={{color: "red"}}>*</Text></Text>
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

                    <View style={{flexDirection: 'column', marginBottom: 16}}>
                        <Text style={{...FONTS.h5}}>Ảnh/ Video</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Button title="Chọn file" onPress={() => pickFiles()} style={{
                                overflow: 'hidden',
                                borderRadius: 8,
                                borderStyle: 'dashed',
                                borderWidth: 2,
                                marginRight: 5,
                                marginVertical: 5,
                                padding: 10,
                                borderColor: COLORS.secondaryGray,
                                width: 100, height: 100,
                            }}/>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {selectedFiles.map((uri, index) => (
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
                                            onPress={() => removeFile(index)}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 16,
                        }}
                    >
                        <Text style={{...FONTS.h5, color: COLORS.secondary, textAlign: "justify",}}>
                            Xin lưu ý <Text style={{color: "red"}}>*</Text>: Để chúng tôi có thể hỗ trợ bạn tốt nhất,
                            thông tin liên quan đến tài khoản sẽ được gửi kèm theo phản hồi này!</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 44,
                        borderRadius: 6,
                        marginBottom: 100,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => handleOnClickSave()}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.white,
                        }}
                    >
                        Gửi
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const ForHelpCreateScreen = ({navigation}) => {
    const {colors} = useTheme();

    const insets = useSafeAreaInsets();

    return (
        <MenuStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "white",
                    shadowColor: colors.background, // iOS
                    elevation: 0, // Android
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <MenuStack.Screen
                name="MenuStack"
                component={ForHelpCreate}
                options={{
                    title: "",
                    headerLeft: () => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 10,
                                paddingLeft: 20,
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
                    ),
                }}
            />
        </MenuStack.Navigator>
    );
};

export default ForHelpCreateScreen;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: COLORS.white,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
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
    dropdown: {
        height: 44,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
        borderColor: COLORS.secondaryGray,
        marginBottom: 12,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
