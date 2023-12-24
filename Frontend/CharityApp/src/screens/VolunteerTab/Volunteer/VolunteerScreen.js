import {useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, images} from "../../../constants";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import {EmailIcon, TikTokIcon} from "../../../components/common/Icon";
import Tabs from "../../../components/VolunteerTab/Volunteer/Tabs";
import DetailInfo from "../../../components/VolunteerTab/Volunteer/DetailInfo";
import AttendEvent from "../../../components/VolunteerTab/Volunteer/AttendEvent";

const tabs = ["Chi tiết", "Sự kiện tham gia"];

const VolunteerScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Chi tiết":
        return <DetailInfo />;

      case "Sự kiện tham gia":
        return <AttendEvent />;
      default:
        return null;
    }
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
            justifyContent: "space-between",
            height: 60,
            backgroundColor: COLORS.white,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMoreOptions(item.id)}>
            <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.screen}>
          <View style={styles.imageContainer}>
            <Image
              source={images.avatar_1}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={styles.hearderText}>Nguyễn Duy Thành</Text>
          </View>
          <View>
            <Text style={styles.textStyle}>
              Tuổi trẻ tình nguyện, chung tay vì cộng đồng
            </Text>
          </View>
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
                marginHorizontal: 8,
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
                marginHorizontal: 8,
              }}
            >
              <EmailIcon />
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
                marginHorizontal: 8,
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
                marginHorizontal: 8,
              }}
            >
              <TikTokIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: COLORS.white }}>
          <View
            style={{
              borderBottomWidth: 1,
              paddingHorizontal: 20,
              borderBottomColor: COLORS.secondaryGray,
            }}
          >
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            {displayTabContent()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VolunteerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingBottom: 20,
    marginBottom: 5,
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
});
