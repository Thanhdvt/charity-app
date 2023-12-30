import {StatusBar} from "expo-status-bar";
import React, {useContext, useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import IntroInfo from "../../components/Profile/IntroInfo";
import Post from "../../components/Profile/Post";
import PostCreat from "../../components/Profile/PostCreat";
import Statistic from "../../components/Profile/Statistic";
import Image from "../../components/Profile/Image";
import {AuthContext} from "../../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const {userInfo} = useContext(AuthContext)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor="white" />
      <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      >
        <IntroInfo />
        {
          userInfo?.role !== 1 ?
          (
              <></>
          ): (
              <>
                <Statistic/>
                <PostCreat/>
              </>
          )
        }
        <Image/>
        <Post />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
