import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, images} from "../../../constants";
import {Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons,} from "@expo/vector-icons";

const joinRequest = {
  id: 1,
  name: "Nguyễn Thị Anh",
  avatar: "https://example.com/avatar.jpg",
  skills: [
    { id: 1, name: "Quản lý dự án" },
    { id: 2, name: "Giao tiếp hiệu quả" },
    { id: 3, name: "Ngôn ngữ" },
    { id: 4, name: "Thiết kế đồ họa" },
    { id: 5, name: "Lập trình" },
  ],
  availability: "Buổi chiều thứ 5, thứ 7 và cả ngày chủ nhật",
  additionalInfo:
    "Tôi đã tham gia nhiều dự án tình nguyện về hiến máu nhân đạo và phát triển cộng đồng.",
  contact: {
    email: "nguyenduythanh@example.com",
    phone: "0123 456 789",
  },
  address: {
    city: "Hà Nội",
    district: "Hoàng Mai",
    street: "123 Đường ABC",
  },
};

const DetailInfo = () => {
  return (
    <View style={styles.containerInfo}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialCommunityIcons
            name="checkbox-outline"
            size={24}
            color="black"
          />{" "}
          Kỹ Năng:
        </Text>
        {joinRequest.skills.map((skill) => (
          <View key={skill.id} style={styles.skillItemContainer}>
            <MaterialIcons name="check" size={16} color={COLORS.primary} />
            <Text style={styles.skillItem}>{skill.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialCommunityIcons
            name="clock-time-four-outline"
            size={24}
            color="black"
          />{" "}
          Thời Gian Hỗ Trợ:
        </Text>
        <Text style={styles.sectionText}>{joinRequest.availability}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color="black"
          />{" "}
          Thông Tin Bổ Sung:
        </Text>
        <Text style={styles.sectionText}>{joinRequest.additionalInfo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialCommunityIcons
            name="card-account-details-outline"
            size={24}
            color="black"
          />{" "}
          Liên Hệ:
        </Text>
        <Text style={styles.sectionText}>{joinRequest.contact.email}</Text>
        <Text style={styles.sectionText}>{joinRequest.contact.phone}</Text>
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

const JoinRequestScreen = ({ navigation }) => {
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
          <DetailInfo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JoinRequestScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingBottom: 20,
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
    paddingVertical: 16,
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
});
