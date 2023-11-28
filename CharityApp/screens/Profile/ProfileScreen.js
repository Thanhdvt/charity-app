import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IntroInfo from  "../../components/Profile/IntroInfo";
import Post from "../../components/Profile/Post";
import { COLORS } from "../../constants";

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
        <Post />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
