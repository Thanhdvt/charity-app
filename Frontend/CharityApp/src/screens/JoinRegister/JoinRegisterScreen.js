import {Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import {COLORS, FONTS} from "../../constants";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {imagesDataURL} from "../../constants/data";
import DateTimePicker from "@react-native-community/datetimepicker";

const JoinRegisterScreen = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
    const [name, setName] = useState("Hội chữ thập đỏ Việt Nam");
    const [phone, setPhone] = useState("02838391271");
    const [email, setEmail] = useState("ctdpn@yahoo.com");
    const [address, setAddress] = useState("Việt Nam");
    const [social, setSocial] = useState();
    const [skill1, setSkill1] = useState();
    const [skill2, setSkill2] = useState();
    const [skill3, setSkill3] = useState();
    const [time, setTime] = useState();
    const [description, setDescription] = useState(
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng do Chủ tịch Hồ Chí Minh sáng lập và là Chủ tịch danh dự đầu tiên."
    );

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

    const [date, setDate] = useState(new Date("1946-11-23"));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState("23/11/1946");

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
                    marginVertical: 10,
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

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        alignItems: "center",
                        marginVertical: 22,
                    }}
                >
                    <TouchableOpacity onPress={handleImageSelection}>
                        <Image
                            source={{ uri: selectedImage }}
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

                <View style={{ paddingVertical: 30 }}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>
                            Tên tài khoản <Text style={{ color: "red" }}>*</Text>{" "}
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={name}
                                onChangeText={(value) => setName(value)}
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

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h5 }}>Ngày sinh</Text>
                        <TouchableOpacity
                            onPress={showMode}
                            style={styles.containerTextInput}
                        >
                            <Text>{selectedStartDate}</Text>
                        </TouchableOpacity>
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
                                value={email}
                                onChangeText={(value) => setEmail(value)}
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
                        <Text style={{ ...FONTS.h5 }}>Mạng xã hội</Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                value={social}
                                onChangeText={(value) => setSocial(value)}
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
                        <Text style={{ ...FONTS.h5 }}>Kỹ năng</Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                placeholder={"Kỹ năng 1"}
                                value={skill1}
                                onChangeText={(value) => setSkill1(value)}
                                editable={true}
                            />
                        </View>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                placeholder={"Kỹ năng 2"}
                                value={skill2}
                                onChangeText={(value) => setSkill2(value)}
                                editable={true}
                            />
                        </View>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                placeholder={"Kỹ năng 3"}
                                value={skill3}
                                onChangeText={(value) => setSkill3(value)}
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
                        <Text style={{ ...FONTS.h5 }}>Thời gian rảnh trong tuần</Text>
                        <View style={[styles.containerTextInput, { height: 100 }]}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                multiline
                                numberOfLines={8}
                                value={time}
                                onChangeText={(value) => setTime(value)}
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
                        <Text style={{ ...FONTS.h5 }}>Thông tin khác</Text>
                        <View style={[styles.containerTextInput, { height: 200 }]}>
                            <TextInput
                                style={{ fontSize: 16 }}
                                multiline
                                numberOfLines={8}
                                value={description}
                                onChangeText={(value) => setDescription(value)}
                                editable={true}
                            />
                        </View>
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
        paddingLeft: 8,
    },
});
