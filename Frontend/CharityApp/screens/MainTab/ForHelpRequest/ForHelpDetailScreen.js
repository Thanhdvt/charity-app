import { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView, FlatList, Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, COLORS, SIZES, FONTS } from "../../../constants";
import {
    MaterialIcons,
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome,
    Entypo,
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { EmailIcon, TikTokIcon } from "../../../components/common/Icon";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";

const forHelpRequest = {
    id: 1,
    topic: "trẻ em",
    name: "Nguyễn Duy Thành",
    avatar: "https://example.com/avatar.jpg",
    skills: [
        { id: 1, name: "Quản lý dự án" },
        { id: 2, name: "Giao tiếp hiệu quả" },
        { id: 3, name: "Ngôn ngữ" },
        { id: 4, name: "Thiết kế đồ họa" },
        { id: 5, name: "Lập trình" },
    ],
    availability: "Buổi chiều thứ 5, thứ 7 và cả ngày chủ nhật",
    content: "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng do Chủ tịch Hồ Chí Minh sáng lập và là Chủ tịch danh dự đầu tiên.",
    contact: {
        email: "nguyenduythanh@example.com",
        phone: "0123 456 789",
    },
    address: {
        city: "Hà Nội",
        district: "Hoàng Mai",
        street: "123 Đường ABC",
    },
    images: [
        {
            id: "1",
            name: "Hội chữ thập đỏ Việt Nam",
            image: images.onboarding_1
        },
        {
            id: "2",
            name: "Quỹ Hoạt động Chữ Thập Đỏ",
            image: images.onboarding
        },
        {
            id: "3",
            name: "Quỹ Tony Buổi sáng",
            image: images.onboarding_0
        },
        {
            id: "4",
            name: "Quỹ Hạnh Phúc Cho Mọi Người",
            image: images.onboarding_2
        },
        {
            id: "5",
            name: "Tree Bank",
            image: images.onboarding_1
        },
        {
            id: "6",
            name: "Nhịp Cầu Nhân Ái VTV1",
            image: images.onboarding
        },
    ]
};

const {height} = Dimensions.get("screen");

const ForHelpDetail = () => {
    const navigation = useNavigation();

    const Card = ({user}) => {
        return (
            <TouchableOpacity key={user.id} style={{width: 90, padding: 3, marginRight: 10}}
                              onPress={() => {}}>
                <LinearGradient
                    colors={['#bc2a8d', '#e95950', '#fccc63']}
                    style={{padding: 2, borderRadius: 6}}
                >
                    <Image source={user.image} style={styles.userImage}/>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.containerInfo}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <MaterialCommunityIcons
                        name="card-account-details-outline"
                        size={24}
                        color="black"
                    />{" "}
                    Thông tin người gửi:
                </Text>
               <View style={{flexDirection: "row"}}>
                   <View style={{paddingRight: 10}}>
                       <Text style={{fontSize: 16, fontWeight: "500", marginBottom: 4}}>Tên:</Text>
                       <Text style={{fontSize: 16, fontWeight: "500", marginBottom: 4}}>Địa chỉ:</Text>
                       <Text style={{fontSize: 16, fontWeight: "500", marginBottom: 4}}>Email:</Text>
                       <Text style={{fontSize: 16, fontWeight: "500", marginBottom: 4}}>SĐT: </Text>
                   </View>
                   <View>
                       <Text style={styles.sectionText}>{forHelpRequest.name}</Text>
                       <Text style={styles.sectionText}>{forHelpRequest.address.city}</Text>
                       <Text style={styles.sectionText}>{forHelpRequest.contact.email}</Text>
                       <Text style={styles.sectionText}>{forHelpRequest.contact.phone}</Text>
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
                    Nội dung:
                </Text>
                <Text style={styles.sectionText}>{forHelpRequest.content}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <MaterialCommunityIcons
                        name="image-outline"
                        size={24}
                        color="black"
                    />{" "}
                    Ảnh/Video:
                </Text>
                <View style={{height: 100}}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={forHelpRequest.images}
                        renderItem={({item}) => <Card user={item}/>}
                    />
                </View>
            </View>

            <View style={styles.socialMediaSection}>
                <Text style={styles.sectionTitle}>
                    <Entypo name="network" size={24} color="black" /> Mạng xã hội:
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="facebook" size={24} color="#5c79ff" />
                    <Text style={styles.socialMediaLink}>https://www.facebook.com</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="youtube" size={24} color="#ff0000" />
                    <Text style={styles.socialMediaLink}>https://www.youtube.com</Text>
                </View>
            </View>
        </View>
    );
};

const ForHelpDetailScreen = ({ navigation }) => {
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
                        <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 16, fontWeight: "bold", marginLeft: 30}}>Yêu cầu trợ giúp</Text>
                    <TouchableOpacity onPress={() => {}} style={{position: "absolute", right: 20}}>
                        <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.screen}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                       <Text style={{fontSize: 24, fontWeight: "bold"}}> Chủ đề: </Text>
                        <Text style={{fontSize: 24, fontWeight: "500"}}>{forHelpRequest.topic}</Text>
                    </View>
                    <ForHelpDetail />
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
        height: height-110
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
        height: 80,
        width: 80,
        borderRadius: 6,
        borderWidth: 4,
    },
    userName: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10,
    },
});
