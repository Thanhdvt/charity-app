import {Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import {COLORS, FONTS} from "../../constants";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {AuthContext} from "../../context/AuthContext";
import {getUserById} from "../../services/User/{id}/GetUserById";
import FlashMessage, {hideMessage, showMessage} from "react-native-flash-message";
import {createJoinRequest} from "../../services/JoinRequest/CreateJoinRequest";
import {getJoinRequestById} from "../../services/JoinRequest/{id}/GetJoinRequestById";
import {createVolunteer} from "../../services/Volunteer/CreateVolunteer";

const JoinRegisterScreen = ({ navigation, route }) => {
    let organizationId = route.params.organizationId;
    let eventId = route.params.eventId;
    let organizationName = route.params.organizationName;
    const {userInfo, userToken} = useContext(AuthContext);
    const [user, setUser] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [social, setSocial] = useState();
    const [skill1, setSkill1] = useState("");
    const [time, setTime] = useState();
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState();

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };
    const showMode = () => {
        setShowDatePicker(true);
    };

    const onChange = (event, selectedDate) => {
        setShowDatePicker(false);

        setDate(selectedDate);
        const formattedDate = formatDate(selectedDate);
        setSelectedStartDate(formattedDate);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
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
                    <DateTimePicker value={date} mode="date" onChange={onChange} />
                </View>
            </Modal>
        );
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getUserById(userInfo.id);
                if (res?.data) {
                    setUser(res.data)
                    setPhone(res.data.phone)
                    setAddress(res.data.address)
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        getData();
    }, []);

    const validate = () => {
        if ( !skill1 || !time || !phone) {
            showMessage({
                message: "Nhập đầy đủ các trường bắt buộc",
                type: "danger",
                duration: 3000,
                onPress: () => {
                    hideMessage();
                },
            });
            console.log("ok")
            return false;
        }
        return true;
    }

    const clearForm = () => {
        setPhone(userInfo.phone);
        setAddress(userInfo.address);
        setSkill1("");
        setTime("");
        setDescription("");
    };

    const handleOnClickSave = async () => {
        if (validate()) {
            const newJoinRequest = {
                support_Time: time,
                location: description,
                skills: skill1,
                organization_Id: organizationId
            };
            const newVolunteer = {
                support_Time: "2023-12-06T10:45:20.548Z",
                location: description,
                skills: skill1
            }
            console.log(newJoinRequest)
            await fetchData(newJoinRequest, newVolunteer);
        }
    }

    // lưu thông tin
    const fetchData = async (newJoinRequest, newVolunteer) => {
        try {
            const res = await createJoinRequest(newJoinRequest, userToken);
            const res_1 = await createVolunteer(userToken, newVolunteer);
            console.log(res);
            console.log(res_1);
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
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 0,
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
                    Đăng ký tham gia
                </Text>
            </View>

            <FlashMessage position="top" style={{marginHorizontal: 20, marginTop: 30, borderRadius: 8}}/>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        alignItems: "center",
                        marginVertical: 10,
                    }}
                >
                        <Image
                            source={{ uri: userInfo.image }}
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                            }}
                        />
                </View>

                <View style={{ paddingVertical: 20 }}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>
                            Họ và tên <Text style={{ color: "red" }}>*</Text>{" "}
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
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
                        <Text style={{ ...FONTS.h5 }}>
                            Email <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
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
                        <Text style={{ ...FONTS.h5 }}>
                            Số điện thoại <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
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
                        <Text style={{ ...FONTS.h5 }}>
                            Địa chỉ <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={address}
                                onChangeText={(value) => setAddress(value)}
                                editable={true}
                            />
                        </View>
                    </View>

                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        flexDirection: "column",*/}
                    {/*        marginBottom: 6,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Text style={{ ...FONTS.h5 }}>Ngày sinh</Text>*/}
                    {/*    <TouchableOpacity*/}
                    {/*        onPress={showMode}*/}
                    {/*        style={styles.containerTextInput}*/}
                    {/*    >*/}
                    {/*        <Text>{selectedStartDate}</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>Kỹ năng <Text style={{ color: "red" }}>*</Text></Text>
                        <View style={[styles.containerTextInput, { height: 100 }]}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                placeholder={"Nhập nội dung"}
                                multiline
                                numberOfLines={8}
                                value={skill1}
                                onChangeText={(value) => setSkill1(value)}
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
                        <Text style={{ ...FONTS.h5 }}>Thời gian rảnh trong tuần <Text style={{ color: "red" }}>*</Text></Text>
                        <View style={[styles.containerTextInput, { height: 100 }]}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                multiline
                                numberOfLines={8}
                                placeholder={"Nhập nội dung"}
                                value={time}
                                onChangeText={(value) => setTime(value)}
                                editable={true}
                            />
                        </View>
                    </View>

                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        flexDirection: "column",*/}
                    {/*        marginBottom: 6,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Text style={{ ...FONTS.h5 }}>Mạng xã hội</Text>*/}
                    {/*    <View style={styles.containerTextInput}>*/}
                    {/*        <TextInput*/}
                    {/*            style={{ fontSize: 16 }}*/}
                    {/*            value={social}*/}
                    {/*            onChangeText={(value) => setSocial(value)}*/}
                    {/*            editable={true}*/}
                    {/*        />*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>Thông tin khác</Text>
                        <View style={[styles.containerTextInput, { height: 200 }]}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                placeholder={"Nhập nội dung"}
                                multiline
                                numberOfLines={8}
                                value={description}
                                onChangeText={(value) => setDescription(value)}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            marginTop: 16,
                        }}
                    >
                       <View>
                           <Text style={{...FONTS.h5, color: COLORS.secondary, textAlign: "justify",}}>
                               Tôi mong muốn được tham gia vào tổ chức</Text>
                           <Text style={{fontWeight: "bold", color: COLORS.primary, fontSize: 16}}>{organizationName}</Text>
                       </View>
                        <Text style={{...FONTS.h5, color: COLORS.secondary, textAlign: "justify",}}>
                            Tôi xin cam kết tuân thủ và thực hiện đúng theo nội quy, quy định của tổ chức!</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 44,
                        borderRadius: 6,
                        marginTop: 50,
                        marginBottom: 10,
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
                        Đăng ký
                    </Text>
                </TouchableOpacity>

                {renderDatePicker()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default JoinRegisterScreen;

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
        paddingHorizontal: 8,
    },
});
