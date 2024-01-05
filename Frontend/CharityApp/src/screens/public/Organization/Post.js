import React, {useContext, useEffect, useRef, useState} from "react";
import {Dimensions, Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Ionicons,} from "@expo/vector-icons";
import {COLORS, images} from "../../../constants";
import {useNavigation} from "@react-navigation/native";
import {getEventByOrganizationId} from "../../../services/Event/{organizationId}/GetEventByOrganizationId";
import Waiting from "../../../components/common/Skeleton";
import {getOrganizationById} from "../../../services/CharityOrganization/{id}/GetOrganizationById";
import {getUserById} from "../../../services/User/{id}/GetUserById";
import {AuthContext} from "../../../context/AuthContext";
import Button from "../../../components/common/Button";
import {SwiperFlatList} from "react-native-swiper-flatlist";
import FlashMessage, {hideMessage, showMessage} from "react-native-flash-message";
import {Video} from "expo-av";
import {StatusBar} from "expo-status-bar";

const {width, height} = Dimensions.get('window');

const Post = ({organizationId, userOrganizationId}) => {
    const {userToken} = useContext(AuthContext);
    const postInfo = [
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            commentPersonImage: images.avatar_default,
            postContent:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            postImage: [
                'https://img.dantocmiennui.vn/t620/uploaded/exlpvekyzsztyyrey/2022_10_24/vna_potal_tinh_nguyen_vien_israel_day_hoc_cho_tre_em_vung_cao_lao_cai_6401474.jpg',
                'https://icdn.dantri.com.vn/2018/1/29/photo-1-15172126403561551976663.jpg',
                'https://icdn.dantri.com.vn/2018/1/29/photo-3-1517212640230578351655.jpg',
                'https://www.youtube.com/watch?app=desktop&v=Q9SJeiBZJ98'
            ],
            likes: 765,
            isLiked: false,
        },
    ];

    const imageList = [
        'https://firebasestorage.googleapis.com/v0/b/charity-app-9a8ed.appspot.com/o/files%2Fb554b375-e8e3-41a4-b953-005788be9957?alt=media&token=4f34e019-fe3c-4d8e-bc0f-c96ef2de4b62',
        'https://firebasestorage.googleapis.com/v0/b/charity-app-9a8ed.appspot.com/o/files%2F937ac08b-d8d0-4fd1-bc14-3a273df9c60c?alt=media&token=51223636-0652-420e-9c2f-73bc23332e29',
        'https://firebasestorage.googleapis.com/v0/b/charity-app-9a8ed.appspot.com/o/files%2Fcdd3550a-7f4f-42b0-9871-2b2ff1ae73ea?alt=media&token=85362929-051c-4527-9658-6593a729e7ab',
        'https://firebasestorage.googleapis.com/v0/b/charity-app-9a8ed.appspot.com/o/files%2Fa60924c5-7014-42eb-bf36-3b1803f499fe?alt=media&token=551d18b1-dac7-4048-9c59-e77382f93b1c',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    ];

    const navigation = useNavigation();
    const [eventList, setEventList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [like, setLike] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [charityOrganization, setCharityOrganization] = useState();
    const [visible, setVisible] = useState(false);


    const navigateToCommentScreen = () => {
        navigation.navigate("Comment");
    };

    const toggleDescription = () => {
        setShowFullContent(!showFullContent);
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

    const calculateElapsedTime = (time) => {
        const currentTime = new Date();
        const createdAt = new Date(time);
        const timeDifference = currentTime - createdAt;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `Khoảng ${days} ngày trước`;
        } else if (hours > 0) {
            return `Khoảng ${hours} giờ trước`;
        } else if (minutes > 0) {
            return `Khoảng ${minutes} phút trước`;
        } else {
            return `Khoảng ${seconds} giây trước`;
        }
    };

    useEffect(() => {
        const fetchOrganization = async () => {
            try {
                const res = await getOrganizationById(organizationId);
                setCharityOrganization(res.data);
            } catch (error) {
                console.error('Lỗi khi lấy ảnh từ Realtime Database', error);
            }
        };

        fetchOrganization();
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getUserById(userOrganizationId);
                setUserInfo(res.data);
            } catch (error) {
                console.error('fetchUserInfo', error);
            }
        };

        fetchUserInfo();
    }, [userOrganizationId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getEventByOrganizationId(organizationId);
                setEventList(res?.data);
            } catch (error) {
                console.error("Error fetching data", error);
                setEventList([]);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        };

        fetchData();
    }, []);

    const showNotice = () => {
        showMessage({
            message: "Đăng nhập để Tham gia",
            type: "warning",
            duration: 2000,
            onPress: () => {
                hideMessage();
            },
        });
    }

    const [isPlaying, setIsPlaying] = useState(false)
    const video = useRef(null);
    const [posterStatus, setPosterStatus] = useState(true);

    const isVideo = (media) => {
        return media.toLowerCase().includes('.mp4') || media.toLowerCase().includes('youtube.com/watch');
    };

    const CustomPosterComponent = ({ style, source }) => {
        return (
            <View style={[style, styles.customPosterContainer]}>
                <Image source={source} style={styles.customPosterImage} />
            </View>
        );
    };

    const Card = ({media}) => {
        return (
            <View>
                {isVideo(media) ? (
                    <>
                            <Video
                                ref={video}
                                source={{uri: media}}
                               // posterSource={{uri: 'https://firebasestorage.googleapis.com/v0/b/charity-app-9a8ed.appspot.com/o/files%2Fb554b375-e8e3-41a4-b953-005788be9957?alt=media&token=4f34e019-fe3c-4d8e-bc0f-c96ef2de4b62'}}
                                style={{width: width, height: height / 3}}
                                //PosterComponent={CustomPosterComponent}
                                useNativeControls={true}
                               // usePoster={true}
                                // shouldPlay={isPlaying}
                            />
                    </>
                ) : (
                   <View style={{paddingBottom: 40}}>
                       <Image source={{uri: media}} style={{width: width, height: height / 3}}/>
                   </View>
                )}
            </View>
        );
    };

    return (
        <View style={{marginBottom: 10}}>
            {
                isLoading ? (<Waiting/>) : (
                    <>
                        <FlashMessage position="top"
                                      style={{borderRadius: 12, marginVertical: 20, marginHorizontal: 20}}/>
                        {eventList?.map((data, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        marginBottom: 5,
                                        borderBottomColor: "gray",
                                        borderBottomWidth: 0.1,
                                        backgroundColor: COLORS.white,
                                    }}
                                >
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                padding: 15,
                                            }}
                                        >
                                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                                <Image
                                                    source={{uri: userInfo.image}}
                                                    style={{width: 40, height: 40, borderRadius: 100}}
                                                />
                                                <View style={{paddingLeft: 5}}>
                                                    <Text style={{fontSize: 16, fontWeight: "bold"}}>
                                                        {userInfo.name}
                                                    </Text>
                                                    <Text style={{fontSize: 13, color: COLORS.sliver}}>
                                                        {calculateElapsedTime(data.modified_Date)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                                            {data.content.length > 100 && (
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
                                                            {showFullContent ? data.content : `${data.content.slice(0, 250)}...`}

                                                        </Text>
                                                        {showFullContent ? '   Thu gọn' : '   Xem thêm'}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={{flex: 1}}>
                                            <SwiperFlatList
                                                index={0}
                                                showPagination
                                                data={imageList}
                                                renderItem={({item}) => <Card media={item}/>}
                                                paginationStyleItem={{width: 8, height: 8}}
                                                paginationDefaultColor={COLORS.secondaryGray}
                                                paginationActiveColor={COLORS.primary}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                paddingHorizontal: 12,
                                                paddingTop: 0,
                                                paddingBottom: 8
                                            }}
                                        >
                                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                                <TouchableOpacity onPress={() => {
                                                    userToken ? setLike(!like) : showNotice()
                                                }}>
                                                    <AntDesign
                                                        name={like ? "heart" : "hearto"}
                                                        style={{
                                                            paddingRight: 25,
                                                            fontSize: 25,
                                                            color: like ? "red" : "black",
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={navigateToCommentScreen}>
                                                    <Ionicons
                                                        name="md-chatbubble-ellipses-outline"
                                                        style={{fontSize: 28, paddingRight: 25}}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Ionicons
                                                        name="md-share-social-outline"
                                                        style={{fontSize: 28}}
                                                        onPress={handleShare}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <Feather name="more-vertical" style={{fontSize: 25}}/>
                                        </View>
                                        <View style={{
                                            paddingHorizontal: 15,
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <View>
                                                <Text style={{fontSize: 14, fontWeight: "500"}}>
                                                    {like ? "Bạn và " : ""}
                                                    {like ? data.like_Count : data.like_Count} lượt thích{" "}
                                                    {like ? "khác" : ""}
                                                </Text>
                                                <Text
                                                    style={{
                                                        opacity: 0.5,
                                                        paddingVertical: 5,
                                                        paddingBottom: 15,
                                                        fontSize: 14,
                                                        fontWeight: "500",
                                                    }}
                                                    onPress={navigateToCommentScreen}
                                                >
                                                    View all comments
                                                </Text>
                                            </View>
                                            <View>
                                                <Button
                                                    filled
                                                    title="Tham gia"
                                                    style={{
                                                        paddingVertical: 5,
                                                        paddingBottom: 8,
                                                        paddingHorizontal: 20,
                                                        borderWidth: 1,
                                                        borderRadius: 8
                                                    }}
                                                    onPress={() => (userToken ? navigation.navigate("JoinRegister", { eventId: data.id, organizationId: data.organization_Id, organizationName: data.name}) : showNotice())}

                                                />
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            );
                        })}
                        <View style={{alignItems: "center", marginVertical: 5}}>
                            <Text style={{color: COLORS.sliver, fontSize: 17, fontWeight: "500"}}>Không có bài
                                viết</Text>
                        </View>
                    </>
                )
            }
        </View>
    );
};

export default Post;
const styles = StyleSheet.create({
    stretch: {
        width: 60,
        height: 60,
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    video: {
        flex: 1,
        alignSelf: 'stretch'
    },
    containerVideo: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        margin: 16
    },
    customPosterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0,0.3)',
    },
    customPosterImage: {
        width: width,
        height: height/6,
    },
});