import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, {useContext} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, images } from "../../../constants";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import {AuthContext} from "../../../context/AuthContext";

const MenuStack = createStackNavigator();

const MenuContent = ({ navigation }) => {
  const {logout} = useContext(AuthContext);
  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const navigateToEditAccount = () => {
    console.log("Edit account ");
  };

  const navigatorToPlightList = () => {
    console.log("Danh sách hoàn cảnh khó khăn");
  };

  const navigatorToEventList = () => {
    console.log("Danh sách sự kiện");
  };

  const navigateToNotifications = () => {
    console.log("THông báo");
  };

  const navigateToVolunteerTab = () => {
    navigation.navigate("VolunteerTab");
  };

  const navigateToRecruitment = () => {
    console.log("Recruitment ");
  };

  const navigatorToMessage= () => {
    console.log("Danh sách hoàn cảnh khó khăn");
  };

  const navigatorToPost = () => {
    console.log("Sự kiện đã lưu");
  };

  const navigateToStatistic = () => {
    console.log("Thống kê");
  };

  const navigateToTermsAndPolicies = () => {
    console.log("Điều khoản và chính sách");
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

  const actionsItems = [
    {
      icon: "hand-heart-outline",
      text: "Yêu cầu trợ giúp",
      action: navigatorToPlightList,
    },
    {
      icon: "account-group-outline",
      text: "Tình nguyện viên",
      action: navigateToVolunteerTab,
    },
    {
      icon: "newspaper",
      text: "Bảng tin sự kiện",
      action: navigatorToEventList,
    },
    {
      icon: "chart-box-outline",
      text: "Thống kê phân tích",
      action: navigateToStatistic
    },
  ];

  const OptionsItems = [
    {
      icon: "map-outline",
      text: "Bản đồ",
      action: navigatorToPost,
    },
    {
      icon: "bell-outline",
      text: "Thông báo",
      action: navigateToNotifications,
    },
    {
      icon: "message-text-outline",
      text: "Tin nhắn",
      action: navigateToNotifications,
    },
  ];

  const supportItems = [
    {
      icon: "information-outline",
      text: "Điều khoản và chính sách",
      action: navigateToTermsAndPolicies,
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
          {text}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const menuSections = [
    { title: "Hồ sơ", items: accountItems },
    { title: "Hoạt động", items: actionsItems },
    // { title: 'Sao kê', items: ReportItems },
    { title: "Tùy chọn", items: OptionsItems },
    { title: "Khác", items: supportItems },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: "#F8F8F8" }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginHorizontal: 25, marginBottom: 60 }}>
        {menuSections.map((section, index) => (
          <View
            key={index}
            style={{
              marginTop: 20,
              marginBottom: 20,
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <Text style={{ ...FONTS.h5, marginVertical: 5, color: "#A9A9A9" }}>
              {section.title}
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
                  <Title style={styles.title}>Hội chữ thập đỏ Việt Nam</Title>
                  <Caption style={styles.caption}>@chuthapdo</Caption>
                </View>
                <TouchableOpacity
                  style={{ paddingHorizontal: 20, marginTop: 5 }}
                >
                  <Image
                    source={images.profile}
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
