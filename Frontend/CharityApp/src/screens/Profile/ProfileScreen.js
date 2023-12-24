import {StatusBar} from "expo-status-bar";
import React from "react";
import {ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import IntroInfo from "../../components/Profile/IntroInfo";
import Post from "../../components/Profile/Post";
import PostCreat from "../../components/Profile/PostCreat";
import Statistic from "../../components/Profile/Statistic";
import Image from "../../components/Profile/Image";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor="white" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <IntroInfo />
        <Statistic/>
        <PostCreat/>
        <Image/>
        <Post />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
