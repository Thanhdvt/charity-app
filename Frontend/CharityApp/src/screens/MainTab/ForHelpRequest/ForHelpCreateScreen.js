import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {COLORS, FONTS} from "../../../constants";
import {Ionicons} from "@expo/vector-icons";
import {IconButton, useTheme,} from "react-native-paper";
import {createStackNavigator} from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import {Dropdown} from 'react-native-element-dropdown';
import Button from "../../../components/common/Button";

const MenuStack = createStackNavigator();

const ForHelpCreate = ({navigation}) => {
    // const [images, setImages] = useState(imagesDataURL[0]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { width } = useWindowDimensions();
    const [name, setName] = useState("Hội chữ thập đỏ Việt Nam");
    const [phone, setPhone] = useState("02838391271");
    const [email, setEmail] = useState("ctdpn@yahoo.com");
    // const [password, setPassword] = useState("randompassword");
    const [country, setCountry] = useState("Việt Nam");
    const [description, setDescription] = useState(
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng do Chủ tịch Hồ Chí Minh sáng lập và là Chủ tịch danh dự đầu tiên."
    );

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
                    <DateTimePicker value={date} mode="date" onChange={onChange}/>
                </View>
            </Modal>
        );
    }

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
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access media library denied');
            }
        })();
    }, []);

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.cancelled && result.assets) {
            const selectedImages = result.assets.map(asset => asset.uri).filter(uri => !!uri);
            setImages([...images, ...selectedImages]);
            console.log(images)
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
            }}
        >
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
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
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
                        <Text style={{...FONTS.h5}}>
                            Địa chỉ <Text style={{color: "red"}}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
                                value={country}
                                onChangeText={(value) => setCountry(value)}
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
                        <Text style={{...FONTS.h5}}>Ngày sinh</Text>
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
                        <Text style={{...FONTS.h5}}>
                            Email <Text style={{color: "red"}}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
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

                    <View style={{ flexDirection: 'column', marginBottom: 16 }}>
                        <Text style={{...FONTS.h5}}>Ảnh minh họa</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Button title="Chọn ảnh" onPress={pickImages}  style={{
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
                                {images.map((uri, index) => (
                                    <View key={index} style={{ margin: 5 }}>
                                        <Image source={{ uri }} style={{ width: 100, height: 100, borderRadius: 8 }} />
                                        <IconButton
                                            icon="close"
                                            size={15}
                                            style={{position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(255, 255, 255, 0.7)'}}
                                            onPress={() => removeImage(index)}
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
                        <Text style={{...FONTS.h5,  color: COLORS.secondary,textAlign: "justify",}}>
                            Xin lưu ý <Text style={{color: "red"}}>*</Text>: để chúng tôi có thể hỗ trợ bạn tốt nhất,
                            thông tin liên quan đến tài khoản, thiết bị ứng dụng sẽ được gửi kèm theo phản hồi này</Text>
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

                {renderDatePicker()}
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
                                <Ionicons name="arrow-back" size={24} color={COLORS.black} />
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
