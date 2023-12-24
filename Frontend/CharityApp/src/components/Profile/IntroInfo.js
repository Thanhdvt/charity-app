import {Ionicons, MaterialCommunityIcons, MaterialIcons,} from "@expo/vector-icons";
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {EmailIcon, OrangeTick, TikTokIcon} from "../common/Icon";
import {COLORS, FONTS, images, SIZES} from "../../constants";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const IntroInfo = () => {
  const navigation = useNavigation();

  const navigateGoBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        marginBottom: 5,
        overflow: "hidden",
        backgroundColor: COLORS.white,
      }}
    >
      <View style={{ width: "100%" }}>
        <Image
          source={images.cover}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
        <TouchableOpacity
          onPress={navigateGoBack}
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
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={images.profile}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginTop: -90,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.black,
              marginHorizontal: 10,
            }}
          >
            Hội chữ thập đỏ Việt Nam
          </Text>
          <OrangeTick />
        </View>

        <Text
          style={{
            color: COLORS.secondary,
            ...FONTS.body4,
            paddingVertical: 5,
          }}
        >
          @Chuthapdo
        </Text>
        <Text style={styles.containerText}>Tổ chức</Text>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
            <TouchableOpacity
                style={{
                width: 30,
                height: 30,
                padding: 2,
                backgroundColor: "#2ddc5a",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 6
                }}
            >
            <Icon name="phone" size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              marginHorizontal: 6
            }}
          >
            <EmailIcon/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              paddingHorizontal: 2,
              paddingTop: 8,
              backgroundColor: "#3360ff",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 6
            }}
          >
            <Icon name="facebook-f" size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              padding: 2,
              backgroundColor: "black",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 6
            }}
          >
            <TikTokIcon/>
          </TouchableOpacity>
        </View>
        
        <View style={{ paddingHorizontal: 35, paddingTop: 20 }}>
          <Text
            style={{
              color: COLORS.secondary,
              ...FONTS.body4,
              textAlign: "justify",
            }}
          >
            Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng,
            do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ
            tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô
            tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingVertical: 30,
            paddingHorizontal: 30,
          }}
        >
          <TouchableOpacity
            style={{
              width: "auto",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 12,
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Chỉnh sửa thông tin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.gray,
              borderRadius: 12,
              marginLeft: 10,
            }}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          {/* Three-Dot Icon */}
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.gray,
              borderRadius: 12,
              marginLeft: 10,
            }}
          >
            <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: SIZES.padding,
              borderRightWidth: 1,
              borderColor: COLORS.secondaryGray,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
              }}
            >
              7,2 K
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.secondary,
                paddingVertical: 5,
              }}
            >
              Người theo dõi
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: SIZES.padding,
              borderRightWidth: 1,
              borderColor: COLORS.secondaryGray,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
                marginHorizontal: 10,
              }}
            >
              6,7 K
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.secondary,
                paddingVertical: 5,
              }}
            >
              Lượt yêu thích
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
              }}
            >
              26,8 K
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.secondary,
                paddingVertical: 5,
              }}
            >
              Lượt ủng hộ
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default IntroInfo;

const styles = StyleSheet.create({
  containerText: {
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 5,
    borderRadius: 16,
    height: 27,
    borderWidth: 1,
    borderColor: "rgb(255, 165, 0)",
    color: COLORS.primary,
    backgroundColor: "rgb(255, 228, 196)",
  },
});
