import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React, {useContext} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {COLORS, FONTS, images} from "../../../constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Caption, Title, useTheme,} from "react-native-paper";
import {createStackNavigator} from "@react-navigation/stack";
import {AuthContext} from "../../../context/AuthContext";
import {useTranslation} from "react-i18next";

const MenuStack = createStackNavigator();

const MenuContent = ({ navigation }) => {
  const {t} = useTranslation();
  const {userInfo} = useContext(AuthContext)
  const {logout} = useContext(AuthContext);
  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const navigateToEditAccount = () => {
    navigation.navigate("AccountSetting")
  };

  const navigateToVolunteerTab = () => {
    navigation.navigate("VolunteerTab");
  };

  const navigatorToEventList = () => {
    navigation.navigate("Event");
  };
  const navigateToStatistic = () => {
    navigation.navigate("Statistic")
  };

  const navigateToJoinRegisterList = () => {
    navigation.navigate("JoinRegisterList");
  };

  const navigatorToForHelpList= () => {
    navigation.navigate("ForHelpList");
  };

  const navigatorToMap = () => {
    navigation.navigate("Map")
  };

  const navigateToNotifications = () => {
    navigation.navigate("Notification")
  };

  const navigatorToMessage= () => {
    console.log("Tin nhắn");
  };

  const navigateToAccountManager = () => {
    navigation.navigate("AccountManager")
  }

  const navigateToContentManager = () => {
    navigation.navigate("ContentManager")
  }

  const navigateToGenericSetup = () => {
    navigation.navigate("GenericSetup")
  };

  const exit = () => {
    logout();
  };

  const accountItems = [
    {
      icon: "view-dashboard-outline",
      text: "Trang tổng quan",
      action: navigateToProfile,
    },
    {
      icon: "square-edit-outline",
      text: "Chỉnh sửa thông tin",
      action: navigateToEditProfile,
    },
    {
      icon: "account-wrench-outline",
      text: "Cài đặt tài khoản",
      action: navigateToEditAccount,
    },
  ];

  let actionsItems = []
  if(userInfo.role === 0) {

    actionsItems = [
      {
        icon: "account-box-multiple-outline",
        text: "Quản lý tài khoản",
        action: navigateToAccountManager,
      },
      {
        icon: "play-protected-content",
        text: "Kiểm duyệt nội dung",
        action: navigateToContentManager,
      },
    ];
  }
  if(userInfo.role === 1) {
    actionsItems = [
      {
        icon: "account-group-outline",
        text: "Hội nhóm",
        action: navigateToVolunteerTab,
      },
      {
        icon: "newspaper",
        text: "Bảng tin sự kiện",
        action: navigatorToEventList,
      },
      {
        icon: "chart-box-outline",
        text: "Báo cáo & Thống kê",
        action: navigateToStatistic
      },

    ];
  }

  if(userInfo.role === 2) {
    actionsItems = [
      {
        icon: "book-account-outline",
        text: "Đăng ký tham gia",
        action: navigateToJoinRegisterList,
      },
      {
        icon: "home-assistant",
        text: "Yêu cầu trợ giúp",
        action: navigatorToForHelpList,
      },
    ];
  }

  const OptionsItems = [
    {
      icon: "map-outline",
      text: "Bản đồ",
      action: navigatorToMap,
    },
    {
      icon: "bell-outline",
      text: "Thông báo",
      action: navigateToNotifications,
    },
    {
      icon: "message-text-outline",
      text: "Tin nhắn",
      action: navigatorToMessage,
    },
  ];

  const supportItems = [
    {
      icon: "alpha-a-box-outline",
      text: "Ngôn ngữ",
      action: navigateToGenericSetup,
    },
    {
      icon: "information-outline",
      text: "Chính sách và điều khoản",
    },
    {
      icon: "logout",
      text: "Đăng xuất",
      action:exit
    },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <View>
      <TouchableOpacity
        onPress={action}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 5,
          margin: 5,
          paddingHorizontal: 20,
          backgroundColor: COLORS.white,
        }}
      >
        <MaterialCommunityIcons name={icon} size={24} color="#696969" />
        <Text
          style={{
            marginLeft: 36,
            // ...FONTS.semiBold,
            // fontWeight: 500,
            fontSize: 15,
          }}
        >
          {t(text)}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );

  let menuSections = [];

  if(userInfo.role === 0) {
    menuSections = [
      { title: "Hồ sơ", items: accountItems },
      { title: "Hoạt động", items: actionsItems },
      // { title: "Tùy chọn", items: OptionsItems },
      { title: "Khác", items: supportItems },
    ];
  }
  if(userInfo.role === 1) {
    menuSections = [
      { title: "Hồ sơ", items: accountItems },
      { title: "Hoạt động", items: actionsItems },
      // { title: "Tùy chọn", items: OptionsItems },
      { title: "Khác", items: supportItems },
    ];
  }
  if(userInfo.role === 2) {
    menuSections = [
      { title: "Hồ sơ", items: accountItems },
      { title: "Hoạt động", items: actionsItems },
      // { title: "Tùy chọn", items: OptionsItems },
      { title: "Khác", items: supportItems },
    ];
  }

  return (
    <ScrollView
      style={{ backgroundColor: "#F8F8F8" }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginHorizontal: 25, marginBottom: 80, marginTop: 10 }}>
        {menuSections.map((section, index) => (
          <View
            key={index}
            style={{
              marginTop: 15,
              marginBottom: 15,
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <Text style={{ ...FONTS.h5, marginVertical: 5, color: "#A9A9A9" }}>
              {t(section.title)}
            </Text>
            <View style={{ backgroundColor: "white", borderRadius: 18 }}>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const MenuScreen = () => {
  const {userInfo} = useContext(AuthContext);
  const { colors } = useTheme();

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
        component={MenuContent}
        options={{
          title: "",
          headerRight: () => (
            <View style={[styles.userInfoSection]}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    marginLeft: 15,
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Title style={styles.title}>{userInfo.name}</Title>
                  <Caption style={styles.caption}>{userInfo.email}</Caption>
                </View>
                <TouchableOpacity
                  style={{ paddingHorizontal: 20, marginTop: 5 }}
                >
                  <Image
                    source={userInfo?.image ? {uri: userInfo?.image} : images.avatar_default}
                    resizeMode="contain"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      borderColor: COLORS.primary,
                      borderWidth: 2,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
    </MenuStack.Navigator>
  );
};

export default MenuScreen;

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
});
