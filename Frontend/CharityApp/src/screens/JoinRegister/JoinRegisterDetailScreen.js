import {Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import {COLORS, FONTS} from "../../constants";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {imagesDataURL} from "../../constants/data";
import DateTimePicker from "@react-native-community/datetimepicker";
import {getForHelpRequestById} from "../../services/ForHelpRequest/{id}/GetForHelpRequestById";
import {getJoinRequestById} from "../../services/JoinRequest/{id}/GetJoinRequestById";
import {AuthContext} from "../../context/AuthContext";

const JoinRegisterDetailScreen = ({navigation, route}) => {
    let organizationName = route.params.organizationName;
    let joinRegisterId = route.params.joinRegisterId;
    const {userInfo} = useContext(AuthContext);
    const [joinRegister, setJoinRegister] = useState({});


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getJoinRequestById(joinRegisterId);
                setJoinRegister(res.data)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        getData();
    }, []);

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
                    <Ionicons name="arrow-back" size={24} color={COLORS.black}/>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "500",
                        marginLeft: 30,
                    }}
                >
                    Thông tin đăng ký
                </Text>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        alignItems: "center",
                        marginVertical: 15,
                    }}
                >
                    <Image
                        source={{uri: userInfo.image}}
                        style={{
                            height: 170,
                            width: 170,
                            borderRadius: 85,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                        }}
                    />
                </View>

                <View style={{paddingVertical: 20}}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{...FONTS.h5}}>
                            Họ và tên <Text style={{color: "red"}}>*</Text>{" "}
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
                                value={userInfo.name}
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
                        <Text style={{...FONTS.h5}}>
                            Địa chỉ <Text style={{color: "red"}}>*</Text>
                        </Text>
                        <View style={styles.containerTextInput}>
                            <TextInput
                                style={{fontSize: 16}}
                                value={userInfo.address}
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
                        <Text style={{...FONTS.h5}}>Kỹ năng</Text>
                        <View style={[styles.containerTextInput, {height: 100}]}>
                            <TextInput
                                style={{fontSize: 16}}
                                multiline
                                numberOfLines={8}
                                placeholder={"Kỹ năng"}
                                value={joinRegister.skills}
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
                        <Text style={{...FONTS.h5}}>Thời gian rảnh trong tuần</Text>
                        <View style={[styles.containerTextInput, {height: 100}]}>
                            <TextInput
                                style={{fontSize: 16}}
                                multiline
                                numberOfLines={8}
                                value={joinRegister.support_Time}
                                onChangeText={(value) => setTime(value)}
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
                        <Text style={{...FONTS.h5}}>Thông tin khác</Text>
                        <View style={[styles.containerTextInput, {height: 200}]}>
                            <TextInput
                                style={{fontSize: 16}}
                                multiline
                                numberOfLines={8}
                                value={joinRegister.location}
                                editable={false}
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default JoinRegisterDetailScreen;

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
