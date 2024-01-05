import React, {useContext, useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Image, Share, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Ionicons,} from "@expo/vector-icons";
import {COLORS, images} from "../../../constants";
import {useNavigation} from "@react-navigation/native";
import Button from "../../common/Button";
import {AuthContext} from "../../../context/AuthContext";
import {getAllEvent} from "../../../services/Event/GetAllEvent";
import {getOrganizationById} from "../../../services/CharityOrganization/{id}/GetOrganizationById";
import {getUserById} from "../../../services/User/{id}/GetUserById";
import Skeleton from "../../common/Skeleton";
import ModalPop from "../../Modal/PopModal";

const Post = ({setModalVisible, showNotice}) => {
  const postInfo = [
    {
      postPersonName: "Hội chữ thập đỏ Việt Nam",
      postPersonImage: images.profile,
      commentPersonImage: images.avatar,
      postContent:
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
      postImage: images.onboarding_2,
      likes: 765,
      isLiked: false,
    }
  ];
  const {userToken} = useContext(AuthContext);
  const navigation = useNavigation();
  const [eventList, setEventList] = useState([]);
  const [like, setLike] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedPostIndex, setExpandedPostIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const toggleDescription = (index) => {
    setExpandedPostIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const navigateToCommentScreen = () => {
    navigation.navigate("Comment");
  };

  const handleEventPress = () => {
    setModalVisible(true);
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

  const handleButtonClick = () => {
    setVisible(true);
  };

  const handleButtonLogin = () => {
    setVisible(false);
    navigation.navigate("Login");
  }

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

  const handleLoadMore = () => {
    if (!loading) {
      setPage(page + 1);
    }
  };


  const showModal = () => {
    return (
        <ModalPop visible={visible}>
          <View style={{alignItems: 'center'}}>
            <View style={{
              width: '100%',
              height: 20,
              alignItems: "flex-end",
              justifyContent: 'center',
            }}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={{fontSize: 18, fontWeight: "bold", color: COLORS.primary}}>Lúc khác</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
                source={images.landing_1}
                style={{height: 250, width: 250}}
            />
          </View>

          <Text style={{marginTop: 15, fontSize: 18, fontWeight: "500", textAlign: 'center'}}>
            Chào mừng bạn đến với nền tảng thiện nguyện minh bạch
          </Text>

          <Text style={{
            marginVertical: 20,
            fontSize: 14,
            textAlign: 'center',
            color: COLORS.secondary,
            paddingHorizontal: 25
          }}>
            Chúng tôi sẽ giúp bạn có trải nghiệm thiện nguyện thật khác biệt
          </Text>

          <Button
              title="Đăng nhập hoặc tạo tài khoản"
              filled
              style={{
                marginHorizontal: 20
              }}
              onPress={() => handleButtonLogin()}
          />
        </ModalPop>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllEvent();
        const updatedList = await Promise.all(
            res.data.map(async (item) => {
              try {
                const organization = await getOrganizationById(item.organization_Id);
                if (organization) {
                  const userResponse = await getUserById(organization.data.user_Id)
                  const { image, name, email } = userResponse.data;
                  return { ...item, image, name, email };
                }
              } catch (error) {
                console.error('Error fetching user data', error);
                return item;
              }
            })
        );
        setEventList(updatedList);
      } catch (error) {
        console.error('Error fetching data', error);
        setEventList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page])

  return (
      isLoading ? (
          <Skeleton/>
      ) : (
          <View style={{ marginBottom: 10, overflow: "hidden" }}>
            {showModal()}
            {eventList.map((event, index) => (
                    <View
                        key={event.id}
                        style={{
                          marginBottom: 5,
                          borderBottomColor: "gray",
                          borderBottomWidth: 0.1,
                          backgroundColor: COLORS.white,
                        }}
                    >
                      <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 15,
                          }}
                      >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Image
                              source={ event?.image ? {uri: event?.image} : images.avatar_default}
                              style={{ width: 40, height: 40, borderRadius: 100 }}
                          />
                          <View style={{ paddingLeft: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                              {event?.name}
                            </Text>
                            <Text style={{ fontSize: 13, color: COLORS.sliver }}>
                              {calculateElapsedTime(event?.modified_Date)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ marginHorizontal: 20 , marginBottom: 20}}>
                        {event?.content.length > 100 ? (
                            <TouchableOpacity onPress={() => toggleDescription(index)}>
                              <Text style={{
                                color: COLORS.sliver,
                                fontSize: 14,
                                paddingTop: 5,
                                textAlign: "justify",
                              }}>
                                <Text
                                    style={{
                                      fontSize: 14,
                                      color: COLORS.secondary,
                                    }}
                                >
                                  {expandedPostIndex === index
                                      ? event?.content
                                      : `${event?.content.slice(0, 250)}...`}
                                </Text>
                                {expandedPostIndex === index ? "   Thu gọn" : "   Xem thêm"}
                              </Text>
                            </TouchableOpacity>
                        )  : (
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
                      <View
                          style={{
                            position: "relative",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                      >
                        <Image
                            source={images.onboarding}
                            style={{ width: "100%", height: 400 }}
                        />
                      </View>
                      <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 12,
                            paddingVertical: 15,
                          }}
                      >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <TouchableOpacity onPress={() => { userToken ? setLike(!like) : handleButtonClick()}}>
                            <AntDesign
                                name={ like ? "heart" : "hearto"}
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
                                style={{ fontSize: 28, paddingRight: 25 }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Ionicons
                                name="md-share-social-outline"
                                style={{ fontSize: 28 }}
                                onPress={handleShare}
                            />
                          </TouchableOpacity>
                        </View>
                        <Feather name="more-vertical" style={{ fontSize: 25 }} />
                      </View>
                      <View style={{ paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                          <Text style={{ fontSize: 14, fontWeight: "500" }}>
                            {like ? "Bạn và " : ""}
                            {like ? event.like_Count : event.like_Count} lượt thích{" "}
                            {like ? "khác" : ""}
                          </Text>
                          <Text
                              style={{
                                opacity: 0.5,
                                paddingVertical: 8,
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
                                paddingVertical: 8,
                                paddingBottom: 8,
                                paddingHorizontal: 20,
                                borderWidth: 1,
                                borderRadius: 8
                              }}
                              onPress = {() => (userToken ? navigation.navigate("JoinRegister", { eventId: event.id, organizationId: event.organization_Id, organizationName: event.name}) : handleButtonClick())}
                          />
                        </View>
                      </View>
                    </View>
                )
            )}
            <View style={{alignItems: "center", marginVertical: 5}}>
              <Text style={{color: COLORS.sliver, fontSize: 17, fontWeight: "500"}}>Không có bài viết</Text>
            </View>
          </View>
      )
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
});
