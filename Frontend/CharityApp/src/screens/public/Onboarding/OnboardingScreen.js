import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import {useNavigation} from "@react-navigation/native";
import {images} from "../../../constants";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Landing");
    // setItem("onboarded", "1");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{ fontWeight: "500", color: "white", fontSize: 16 }}>
          Done
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        // bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#ffffff",
            image: (
              <View style={styles.imageContainer}>
                <Image
                  source={images.onboarding_0}
                  style={styles.image}
                />
              </View>
            ),
            title: (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Thiện nguyện</Text>
              </View>
            ),
            subtitle: (
              <View style={styles.subTitleContainer}>
                <Text style={styles.subtitle}>
                  Tạo điều kiện để các cá nhân có thể góp sức vào những dự án
                  thiện nguyện ý nghĩa
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: "#ffffff",
            image: (
              <View style={styles.imageContainer}>
                <Image
                  source={images.onboarding_1}
                  style={styles.image}
                />
              </View>
            ),
            title: (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Gắn kết</Text>
              </View>
            ),
            subtitle: (
              <View style={styles.subTitleContainer}>
                <Text style={styles.subtitle}>
                  Tạo dựng không gian để lan tỏa sự sẻ chia với những hoàn cảnh khó khăn
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: "#ffffff",
            image: (
              <View style={styles.imageContainer}>
                <Image
                  source={images.onboarding_2}
                  style={styles.image}
                />
              </View>
            ),
            title: (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Minh bạch</Text>
              </View>
            ),
            subtitle: (
              <View style={styles.subTitleContainer}>
                <Text style={styles.subtitle}>
                  Đảm bảo tính minh bạch về những hoàn cảnh và dự án thiện
                  nguyện cộng đồng
                </Text>
              </View>
            ),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: width,
    height: height * 0.8,
    borderBottomLeftRadius: width * 0.3,
  },

  titleContainer: {
    marginTop: 280,
    width: "100%",
    height: 50,
  },

  title: {
    fontWeight: "500",
    fontSize: 30,
    color: "#FF7F50",
  },

  subTitleContainer: {
    width: "100%",
    height: 50,
  },

  subtitle: {
    fontSize: 15,
    color: "#000000",
  },

  doneButton: {
    padding: 20,
    backgroundColor: "#FF7F50",
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
});
