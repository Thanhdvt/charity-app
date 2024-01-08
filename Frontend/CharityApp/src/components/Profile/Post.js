import React, {useContext, useEffect, useState} from "react";
import {Dimensions, Image, Share, Text, TouchableOpacity, View,} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Ionicons,} from "@expo/vector-icons";
import {COLORS, images} from "../../constants";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";
import {getEventByOrganizationId} from "../../services/Event/{organizationId}/GetEventByOrganizationId";
import Waiting from "../common/Skeleton";
import {getOrganizationById} from "../../services/CharityOrganization/{id}/GetOrganizationById";
import {getUserById} from "../../services/User/{id}/GetUserById";
import getAllFileByEventId from "../../../firebase/GetAllFileByEventId";
import {Video} from "expo-av";
import {SwiperFlatList} from "react-native-swiper-flatlist";


const {width, height} = Dimensions.get("screen");

const Post = () => {
  const postInfo = [
    {
      postPersonName: "Hội chữ thập đỏ Việt Nam",
      postPersonImage: images.profile,
      commentPersonImage: images.avatar_default,
      postContent:
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
      postImage: images.onboarding_0,
      likes: 765,
      isLiked: false,
    },
    {
      postPersonName: "Hội chữ thập đỏ Việt Nam",
      postPersonImage: images.profile,
      commentPersonImage: images.avatar_default,
      postContent:
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
      postImage: images.onboarding_2,
      likes: 345,
      isLiked: false,
    },
    {
      postPersonName: "Hội chữ thập đỏ Việt Nam",
      postPersonImage: images.profile,
      commentPersonImage: images.avatar_default,
      postContent:
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
      postImage: images.onboarding_1,
      likes: 734,
      isLiked: false,
    },
    {
      postPersonName: "Hội chữ thập đỏ Việt Nam",
      postPersonImage: images.profile,
      commentPersonImage: images.avatar_default,
      postContent:
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
      postImage: images.cover,
      likes: 875,
      isLiked: false,
    },
  ];

  const navigation = useNavigation();
  const {userInfo, charityOrganization} = useContext(AuthContext);
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const navigateToCommentScreen = (id) => {
    console.log(id)
    navigation.navigate("Comment", {eventId: id});
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

  const isVideo = (media) => {
    return media.toLowerCase().includes('.mp4') || media.toLowerCase().includes('youtube.com/watch');
  };

  const Card = ({media}) => {
    return (
        <View>
          {isVideo(media) ? (
              <>
                <Video
                    // ref={video}
                    source={{uri: media}}
                    useNativeControls={true}
                    style={{width: width, height: height / 3}}
                    resizeMode={"cover"}
                    // posterSource={{uri: 'https://firebasestorage.googleapis.com/v0/b/charity-app-9a8ed.appspot.com/o/files%2Fb554b375-e8e3-41a4-b953-005788be9957?alt=media&token=4f34e019-fe3c-4d8e-bc0f-c96ef2de4b62'}}
                    //PosterComponent={CustomPosterComponent}
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

  useFocusEffect(
      React.useCallback(() => {
        const fetchData = async () => {
          try {
            const res = await getEventByOrganizationId(charityOrganization?.id);
            const updatedList = await Promise.all(
                res.data.map(async (item) => {
                  try {
                    const organization = await getOrganizationById(item.organization_Id);
                    if (organization) {
                      const userResponse = await getUserById(organization.data.user_Id)
                      const urlFiles = await getAllFileByEventId(organization.data.user_Id, item.id);
                      const files = [...Object.values(urlFiles)].filter(item => item);
                      const { image, name, email } = userResponse.data;
                      return { ...item, image, name, email, files };
                    }
                  } catch (error) {
                    console.error('Error fetching user data', error);
                    return item;
                  }
                })
            );
            setEventList(updatedList);
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
      }, [charityOrganization?.id])
  );

  return (
    <View style={{ marginBottom: 10, overflow: "hidden" }}>
      {
        isLoading ? (<Waiting/>) : (
            <>
              {eventList?.map((data, index) => {
                return (
                    <View
                        key={data.id}
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
                              source={postInfo[0].postPersonImage}
                              style={{ width: 40, height: 40, borderRadius: 100 }}
                          />
                          <View style={{ paddingLeft: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                              {userInfo.name}
                            </Text>
                            <Text style={{ fontSize: 13, color: COLORS.sliver }}>
                              {calculateElapsedTime(data.modified_Date)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
                        {data.content.length > 100 ? (
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
                        ): (
                            <Text
                                style={{
                                  fontSize: 14,
                                  color: COLORS.secondary,
                                }}
                            >
                              {data?.content}
                            </Text>
                        )}
                      </View>
                      <View style={{flex: 1}}>
                        <SwiperFlatList
                            index={0}
                            showPagination
                            data={data?.files}
                            renderItem={({item}) => <Card media={item}/>}
                            paginationStyleItem={{width: 8, height: 8}}
                            paginationDefaultColor={COLORS.secondaryGray}
                            paginationActiveColor={COLORS.primary}
                        />
                      </View>
                      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{ paddingHorizontal: 15 }}>
                          <Text style={{ fontSize: 14, fontWeight: "500" }}>
                            {/*{like ? "Bạn và " : ""}*/}
                            {like ? data.like_Count + 1  : data.like_Count} lượt thích{" "}
                            {/*{like ? "khác" : ""}*/}
                          </Text>
                          <Text
                              style={{
                                opacity: 0.5,
                                paddingVertical: 8,
                                paddingBottom: 15,
                                fontSize: 14,
                                fontWeight: "500",
                              }}
                              onPress={() => navigateToCommentScreen(data.id)}
                          >
                            View all comments
                          </Text>
                        </View>
                        <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              paddingHorizontal: 15,
                              paddingBottom: 15,
                            }}
                        >
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => setLike(!like)}>
                              <AntDesign
                                  name={like ? "heart" : "hearto"}
                                  style={{
                                    paddingRight: 25,
                                    fontSize: 25,
                                    color: like ? "red" : "black",
                                  }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigateToCommentScreen(data.id)}>
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
                          {/*<Feather name="more-vertical" style={{ fontSize: 25 }} />*/}
                        </View>
                      </View>
                    </View>
                );
              })}
              <View style={{alignItems: "center", marginVertical: 5}}>
                <Text style={{color: COLORS.sliver, fontSize: 17, fontWeight: "500"}}>Không có bài viết</Text>
              </View>
            </>
        )
      }
    </View>
  );
};

export default Post;
