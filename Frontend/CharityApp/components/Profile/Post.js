import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Share,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Entypo from "react-native-vector-icons/Entypo";
import { COLORS, FONTS, SIZES, images } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Post = () => {
  const postInfo = [
    {
      postPersonName: "Hội chữ thập đỏ Việt Nam",
      postPersonImage: images.profile,
      commentPersonImage: images.avatar,
      postContent:
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
      postImage: images.onboarding_0,
      likes: 765,
      isLiked: false,
    },
    {
      postPersonName: "Hội chữ thập đỏ Việt Nam",
      postPersonImage: images.profile,
      commentPersonImage: images.avatar,
      postContent:
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
      postImage: images.onboarding_2,
      likes: 345,
      isLiked: false,
    },
    {
      postPersonName: "Hội chữ thập đỏ Việt Nam",
      postPersonImage: images.profile,
      commentPersonImage: images.avatar,
      postContent:
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
      postImage: images.onboarding_1,
      likes: 734,
      isLiked: false,
    },
    {
      postPersonName: "Hội chữ thập đỏ Việt Nam",
      postPersonImage: images.profile,
      commentPersonImage: images.avatar,
      postContent:
        "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
      postImage: images.cover,
      likes: 875,
      isLiked: false,
    },
  ];

  const navigation = useNavigation();

  const navigateToCommentScreen = () => {
    navigation.navigate("Comment");
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

  return (
    <View style={{ marginBottom: 10, overflow: "hidden" }}>
      {postInfo.map((data, index) => {
        const [like, setLike] = useState(data.isLiked);
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
                  source={data.postPersonImage}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <View style={{ paddingLeft: 5 }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {data.postPersonName}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <Text
                style={{
                  color: COLORS.secondary,
                  ...FONTS.body4,
                  textAlign: "justify",
                }}
              >
                {data.postContent}
              </Text>
            </View>
            <View
              style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={data.postImage}
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
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                {like ? "Bạn và " : ""}
                {like ? data.likes + 1 : data.likes} lượt thích{" "}
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
          </View>
        );
      })}
    </View>
  );
};

export default Post;
