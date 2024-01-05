import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../../constants";
import {Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons,} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {getForHelpRequestById} from "../../services/ForHelpRequest/{id}/GetForHelpRequestById";
import {Video} from "expo-av";
import getForHelpRequestByUserId from "../../../firebase/GetForHelpRequestByUserId";

const {height, width} = Dimensions.get("screen");

const ForHelpDetailScreen = ({navigation, route}) => {
    const forHelpRequestId = route.params.forHelpRequestId;
    const organizationName = route.params.organizationName;
    const {userInfo} = useContext(AuthContext);
    const [forHelpRequest, setForHelpRequest] = useState();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getForHelpRequestById(forHelpRequestId);
                setForHelpRequest(res.data)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const fileUrl = await getForHelpRequestByUserId(userInfo.id, forHelpRequestId);
                if(fileUrl) {
                    let combinedImageList = [...Object.values(fileUrl)];
                    setFiles(combinedImageList)
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        getData();
    }, []);

    const isVideo = (media) => {
        return media.toLowerCase().includes('.mp4') || media.toLowerCase().includes('youtube.com/watch');
    };

    const Card = ({media}) => {
        return (
            <LinearGradient
                colors={['#bc2a8d', '#e95950', '#fccc63']}
                style={{marginRight: 10, borderRadius: 6}}
                        >
                {isVideo(media) ? (
                    <View style={{padding: 3}}>
                        <Video
                            source={{uri: media}}
                            style={styles.userImage}
                            useNativeControls={true}
                            resizeMode={"cover"}
                        />
                    </View>
                ) : (
                    <View  style={{padding: 3}}>
                        <Image source={{uri: media}} style={styles.userImage}/>
                    </View>
                )}
            </LinearGradient>
        );
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.gray,
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: 60,
                        backgroundColor: COLORS.white,
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                    }} style={{position: "absolute", right: 20}}>
                        <MaterialIcons name="more-vert" size={24} color={COLORS.primary}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.screen}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 24, fontWeight: "bold"}}> Chủ đề: </Text>
                        <Text style={{fontSize: 24, fontWeight: "500"}}>Trẻ em</Text>
                    </View>
                    <View style={styles.containerInfo}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                <MaterialCommunityIcons
                                    name="card-account-details-outline"
                                    size={24}
                                    color="black"
                                />{" "}
                                Thông tin người gửi
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <View style={{paddingRight: 10}}>
                                    <Text style={{fontSize: 16, fontWeight: "500", marginBottom: 4}}>Tên</Text>
                                    <Text style={{fontSize: 16, fontWeight: "500", marginBottom: 4}}>Địa chỉ</Text>
                                    <Text style={{fontSize: 16, fontWeight: "500", marginBottom: 4}}>Email</Text>
                                    <Text style={{fontSize: 16, fontWeight: "500", marginBottom: 4}}>SĐT</Text>
                                </View>
                                <View>
                                    <Text style={styles.sectionText}>: {userInfo.name}</Text>
                                    <Text style={styles.sectionText}>: {userInfo.address}</Text>
                                    <Text style={styles.sectionText}>: {userInfo.email}</Text>
                                    <Text style={styles.sectionText}>: {userInfo.phone}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                <MaterialCommunityIcons
                                    name="information-outline"
                                    size={24}
                                    color="black"
                                />{" "}
                                Nội dung
                            </Text>
                            <Text style={styles.sectionText}>{forHelpRequest?.description}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                <MaterialCommunityIcons
                                    name="image-outline"
                                    size={24}
                                    color="black"
                                />{" "}
                                Ảnh/Video
                            </Text>
                            <View>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={files}
                                    renderItem={({item}) => <Card media={item}/>}
                                />
                            </View>
                        </View>

                        <View style={styles.socialMediaSection}>
                            <Text style={styles.sectionTitle}>
                                <Entypo name="network" size={24} color="black"/> Mạng xã hội:
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <MaterialCommunityIcons name="facebook" size={24} color="#5c79ff"/>
                                <Text style={styles.socialMediaLink}>https://www.facebook.com</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <MaterialCommunityIcons name="youtube" size={24} color="#ff0000"/>
                                <Text style={styles.socialMediaLink}>https://www.youtube.com</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForHelpDetailScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.white,
        paddingBottom: 20,
        height: height - 110
    },
    imageContainer: {
        width: 155,
        height: 155,
        borderRadius: 200,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: 5,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    hearderText: {
        fontSize: 24,
        marginVertical: 5,
    },
    textStyle: {
        fontSize: 16,
        marginVertical: 5,
        marginHorizontal: 20,
        textAlign: "center",
    },
    container: {
        flexDirection: "row",
        marginVertical: 5,
    },
    containerInfo: {
        paddingVertical: 30,
        paddingHorizontal: 30,
        width: width
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 4,
        textAlign: "justify"
    },
    skillItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    skillItem: {
        fontSize: 16,
        marginLeft: 8,
    },
    socialMediaSection: {
        marginTop: 0,
    },
    socialMediaLink: {
        fontSize: 16,
        color: "blue",
        textDecorationLine: "underline",
        paddingHorizontal: 10
    },
    userImage: {
        height: width/2,
        width: width/2,
        borderRadius: 6,
        borderWidth: 4,
    },
    userName: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10,
    },
});
