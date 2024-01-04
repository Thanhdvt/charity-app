import {Dimensions, FlatList, Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {COLORS, images, SIZES} from '../../../constants'
import {StatusBar} from 'expo-status-bar'
import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Button from "../../../components/common/Button";
import {OrangeTick} from "../../../components/common/Icon";
import {getEventById} from "../../../services/Event/{id}/GetEventById";
import {getOrganizationById} from "../../../services/CharityOrganization/{id}/GetOrganizationById";
import {getUserById} from "../../../services/User/{id}/GetUserById";
import {Loading} from "../../../components/common/Loading";
import moment from "moment";
import {AuthContext} from "../../../context/AuthContext";
import FlashMessage, {hideMessage, showMessage} from "react-native-flash-message";

const EventDetailScreen = ({ navigation, route}) => {
    const data = {
        postPersonName: "Quỹ Thiện Nguyện Sinh Viên",
        postPersonImage: {uri: "https://static.thiennguyen.app/public/user/profile/2022/7/12/58b2a0b8-f0a7-4c1d-ac7a-35ec33f66461.jpg"},
        postImage: images.onboarding_0,
        title: "Chiến dịch thiện nguyện mang Nhà vệ sinh đến trẻ em mầm non vùng cao!",
        location: "Ubnd Mèo Vạc, Thị trấn Mèo Vạc, Huyện Mèo Vạc, Tỉnh Hà Giang",
        description: "Năm 2021, sau khi nhận thấy những thiếu thốn của trẻ em mầm non tại điểm trường thôn Mã Pí Léng A, các em được đi học nhưng không có Nhà vệ sinh khi mà các em phải đi ra nương rẩy kể cả khi trời mưa to gió rét lẫn khi trời nắng. Quỹ Thiện Nguyện Sinh Viên quyết định vận động cùng các mạnh thường quân khởi công xây Nhà vệ sinh đầu tiên cùng với việc cấp điện, lắp bể chứa nước sạch, bình nước nóng giúp các em mùa đông đảm bảo sức khoẻ không phải ra ngoài trời. \n" +
        "\n" + "🥰🥰Trải qua 3 năm hoạt động, với 5 dự án cùng 4 căn Nhà vệ sinh khang trang được triển khai rất thành công và nhận được rất nhiều lời cảm ơn từ Nhà trường và địa phương. Cùng những chia sẻ những kết quả rất ý nghĩa  từ cô giáo và hiệu trưởng. Với niềm tin “Yêu thương cho đi là yêu thương còn mãi”, Quỹ Thiện Nguyện Sinh Viên luôn muốn đem đến những giá trị tốt đẹp, hỗ trợ cho các bé vùng cao trong chặng đường tiếp theo.",
        likes: 875,
        isLiked: false,
        volunteerData: [
            { id: '1', name: 'Nguyễn Văn An', image: images.avatar_1 },
            { id: '2', name: 'Trần Thị Thu Hằng', image: images.avatar_2 },
            { id: '3', name: 'Phan Đăng Khải', image: images.avatar_7 },
            { id: '4', name: 'Hoàng Thị Hải Yến', image: images.avatar_3 },
            { id: '5', name: 'Đỗ Bá Duy Mạnh', image: images.avatar_6 },
            { id: '6', name: 'Trần Thị Phương Nga', image: images.avatar_4 },
            { id: '7', name: 'Nguyễn Đăng Nhật Minh', image: images.avatar_8 },
            { id: '8', name: 'Lan Thị Thu Huệ', image: images.avatar_5 },
            { id: '9', name: 'Phan Nhật Minh', image: {uri: 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/anh-avatar-nam-buon-1.jpg'} },
            { id: '10', name: 'Nguyễn Thị Phương Thảo', image: {uri: 'https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/1675684301_441_1001-anh-avatar-dep-cho-con-gai-ngau-buon-chat-1.jpg'} },
            { id: '11', name: 'Lý Nhã Nam Phong', image: {uri: 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/avatar-nam-ca-tinh.jpg'} },
            { id: '12', name: 'Vũ Như Diệp Linh', image: {uri: 'https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/avatar-anime-cho-nu-dep-2.jpg'} },
            { id: '13', name: 'Đỗ Khắc Cường', image: {uri: 'https://kynguyenlamdep.com/wp-content/uploads/2022/08/anime-trai-dep-cuoi-de-thuong.jpg'} },
            { id: '14', name: 'Trịnh Kim Khả Ngân', image: {uri: 'https://i.pinimg.com/736x/c9/67/79/c9677971022e91c54f984b4f9d896e3d.jpg'} },
            { id: '15', name: 'Khổng Minh Tuệ', image: {uri: 'https://taytou.com/wp-content/uploads/2022/06/Anh-Avatar-cute-Nam-NGAU-my-nam-ao-hoodie-deo-khau-trang-trang.jpg'} },
            { id: '16', name: 'Trương Thị Mỹ Lan', image: {uri: 'https://i.pinimg.com/1200x/6f/1e/65/6f1e652d717da2b043b7202cf274676d.jpg'} },
        ],
    }

    const {userToken} = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [organizationUser, setOrganizationUser] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleShare = async () => {
        await Share.share({
            title: "Chia sẻ bài viết",
            message:
                "Chia sẻ bài viết" +
                "\n" +
                "https://redcross.org.vn/cau-noi-lan-toa-hoat-dong-nhan-dao-tu-thien.html",
        });
    };

    const showNotice = () => {
        showMessage({
            message: "Đăng nhập để Tham gia",
            type: "warning",
            duration: 3000,
            onPress: () => {
                hideMessage();
            },
        });
    }

    const MAX_AVATAR_WIDTH = 50;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const MAX_AVATAR_COUNT = Math.floor(SCREEN_WIDTH / MAX_AVATAR_WIDTH);

    const renderAvatarItem = ({ item }) => (
        <Image style={styles.avatar} source={item.image} />
    );

    const eventId = route.params.eventId;
    const organizationId = route.params.organizationId;

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const res = await getEventById(eventId);
                const res_1 = await getOrganizationById(organizationId);
                if(res_1) {
                    const userResponse = await getUserById(res_1.data.user_Id);
                    setOrganizationUser(userResponse.data);
                }
                setEvent(res.data);
            } catch (error) {
                console.error('Error fetching data', error);
                setEvent(null);
                setOrganizationUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            {isLoading ? <Loading/> : null}
            <StatusBar hidden={true} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white
                }}>
                <FlashMessage position="top" style={{borderRadius: 12, marginVertical: 20, marginHorizontal: 20}}/>
                <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 60}}>
                    <View style={{ marginBottom: 10}}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                position: "absolute",
                                top: 20,
                                left: 20,
                                zIndex: 1,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="arrow-left-circle"
                                size={32}
                                color={COLORS.secondary}
                            />
                        </TouchableOpacity>
                        <Image
                            source={data.postImage}
                            resizeMode='cover'
                            style={{
                                width: SIZES.width,
                                height: 240,
                                borderBottomLeftRadius: 50,
                                borderBottomRightRadius: 50,
                                zIndex: -9
                            }}
                        />
                    </View>
                    <View style={{ marginHorizontal: 20 , marginBottom: 20}}>
                        <Text style={{
                            fontSize: 21,
                            color: COLORS.black,
                            fontWeight: "bold",
                            marginVertical: 6
                        }}>{event?.title}</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Ionicons name="calendar-outline" size={28} color={COLORS.sliver} />
                                <Text style={{
                                    fontSize: 14,
                                    color: COLORS.sliver,
                                    marginTop: 5,
                                    marginRight: 20,
                                    marginLeft: 6
                                }}>{moment(event?.created_Date).format("DD/MM/YYYY HH:mm")}</Text>
                            </View>
                            <View style={{flexDirection: "row", alignItems: 'flex-start', alignSelf: "flex-end"}}>
                                <AntDesign name="heart" size={20} color={"red"} />
                                <Text style={{marginLeft: 5, color: COLORS.black}}>{event?.like_Count}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{paddingHorizontal: 20, marginBottom: 25}}>
                        <Text>Tạo bởi</Text>
                        <View style={{flexDirection: 'row', paddingTop: 5, alignItems: "center"}}>
                            <Image
                                source={ isLoading ? images.avatar_default : {uri: organizationUser?.image}}
                                resizeMode="contain"
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 50,
                                    borderColor: COLORS.primary,
                                    borderWidth: 2,
                            }}/>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{marginLeft: 5, color: COLORS.black, fontWeight: "500", fontSize: 16, paddingRight: 5}} numberOfLines={1} ellipsizeMode="tail">
                                        {organizationUser?.name}
                                    </Text>
                                    <OrangeTick/>
                                </View>
                                <Text style={{marginLeft: 5, color: COLORS.black }}>
                                    {organizationUser?.email}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <FlatList
                            horizontal
                            data={data.volunteerData.slice(0, MAX_AVATAR_COUNT)}
                            keyExtractor={(item) => item.id}
                            renderItem={renderAvatarItem}
                            showsHorizontalScrollIndicator={false}
                            ListFooterComponent={() => (
                                data.volunteerData.length > MAX_AVATAR_COUNT && (
                                    <Text style={styles.ellipsisText}>...</Text>
                                )
                            )}
                        />
                        <Text style={{paddingTop: 10}}>
                            <Text style={styles.headerText}>
                                {`${data.volunteerData[1].name}, ${data.volunteerData[2].name}`}
                            </Text>
                            {` và ${data.volunteerData.length - 2} người khác đã tham gia`}
                        </Text>
                    </View>

                    <View style={{ marginHorizontal: 20 , marginBottom: 20}}>
                        <Text style={{
                            fontSize: 18,
                            color: COLORS.black,
                            fontWeight: "500",
                            marginVertical: 6
                        }}>Câu chuyện</Text>

                        {event?.content.length > 100 ? (
                            <TouchableOpacity onPress={toggleDescription}>
                                <Text style={{
                                    color: COLORS.sliver,
                                    fontSize: 14,
                                    paddingTop: 5,
                                    textAlign: "justify",
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.secondary,
                                    }}>
                                        {showFullDescription ? event?.content : `${event?.content.slice(0, 250)}...`}

                                    </Text>
                                    {showFullDescription ? '   Thu gọn' : '   Xem thêm'}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: COLORS.secondary,
                                }}
                            >
                                {event?.content}
                            </Text>
                        )}
                    </View>

                    <View style={{paddingHorizontal: 20, marginBottom: 15}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <Text style={{
                                fontSize: 18,
                                color: COLORS.black,
                                fontWeight: "500",
                                marginVertical: 6
                            }}>Ảnh/Video</Text>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={{color: COLORS.primary}}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: SIZES.width,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    backgroundColor: COLORS.white,
                    zIndex: 999
                }}>
                    <Button
                        title="Tham gia"
                        filled
                        style={{
                            paddingVertical: 5,
                            paddingBottom: 5,
                            marginVertical: 5,
                            paddingHorizontal: 40,
                            borderRadius: 8
                        }}
                        onPress = {() =>  (userToken ? navigation.navigate("JoinRegister") : showNotice())}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingVertical: 15,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity>
                                <Ionicons
                                    name="md-share-social-outline"
                                    style={{ fontSize: 28 }}
                                    onPress={handleShare}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    featureIcon: {
        height: 48,
        width: 48,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,.1)'
    },
    featureIconImg: {
        height: 32,
        width: 32,
        tintColor: COLORS.white
    },
    featureTitle: {
        fontSize: 12,
        color: COLORS.white,
        fontFamily: 'light',
        marginTop: 8
    },
    featureSubtitle: {
        fontSize: 14,
        fontFamily: 'regular',
        color: COLORS.white
    },
    btn: {
        height: 38,
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 6,
        flexDirection: 'row',
        width: (SIZES.width - 32) / 2 - 16,
    },
    container: {
        marginBottom: 15,
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: "uppercase"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 5,
    },
    ellipsisText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
})

export default EventDetailScreen