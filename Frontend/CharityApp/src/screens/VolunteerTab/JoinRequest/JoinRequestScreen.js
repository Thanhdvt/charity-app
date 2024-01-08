import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, images} from "../../../constants";
import {Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons,} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {getVolunteerById} from "../../../services/Volunteer/{id}/GetVolunteerById";
import {getJoinRequestById} from "../../../services/JoinRequest/{id}/GetJoinRequestById";
import {getUserById} from "../../../services/User/{id}/GetUserById";

const {width} = Dimensions.get("screen")

const DetailInfo = ({joinRequest, user}) => {
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
        {/*{joinRequest.skills.map((skill) => (*/}
        {/*  <View key={skill.id} style={styles.skillItemContainer}>*/}
        {/*    <MaterialIcons name="check" size={16} color={COLORS.primary} />*/}
        {/*    <Text style={styles.skillItem}>{skill.name}</Text>*/}
        {/*  </View>*/}
        {/*))}*/}
        <Text style={styles.skillItem}>{joinRequest.skills}</Text>
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
        <Text style={styles.sectionText}>{joinRequest.support_Time}</Text>
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
        <Text style={styles.sectionText}>{joinRequest.location}</Text>
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
        <Text style={styles.sectionText}>{user.email}</Text>
        <Text style={styles.sectionText}>{user.phone}</Text>
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

const JoinRequestScreen = ({ navigation, route }) => {
  let userId = route.params.userId;
  let joinRequestId = route.params.id;
  const [joinRequest, setJoinRequest] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getJoinRequestById(joinRequestId);
        setJoinRequest(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
        setJoinRequest({});
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserById(userId);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
        setUser({});
      }
    };

    fetchData();
  }, []);

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
          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.screen}>
          {
            user?.image && (
                  <View style={styles.imageContainer}>
                    <Image
                        source={{uri: user?.image}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                  </View>
              )
          }
          <View>
            <Text style={styles.hearderText}>{user.name}</Text>
          </View>
          <DetailInfo joinRequest={joinRequest} user={user}/>
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
    paddingHorizontal: 40,
    width: width,
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
