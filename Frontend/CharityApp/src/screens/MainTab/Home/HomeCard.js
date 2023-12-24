import React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";

import {COLORS, images} from "../../../constants";
import {createStackNavigator} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import {useTheme} from "react-native-paper";
import {View} from "react-native-animatable";
import OrganizationList from "../../../components/public/Landing/OrganizationList";
import EventList from "../../../components/public/Landing/EventList";
import Post from "../../../components/public/Landing/Post";
import Button from "../../../components/common/Button";
import ModalPop from "../../../components/Modal/PopModal";
import {useFocusEffect} from "@react-navigation/native";

const HomeStack = createStackNavigator();

const HomeContent = ({ navigation, visible, setVisible }) => {
  const theme = useTheme();

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setVisible(false);
            };
        }, [])
    );

  return (
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 50}}>
          <OrganizationList/>
          <EventList setModalVisible={setVisible}/>
          <Post/>

          <ModalPop visible={visible}>
              <View style={{alignItems: 'center'}}>
                  <View style={styles.header}>
                      <TouchableOpacity onPress={() => setVisible(false)}>
                          <Text style={{fontSize: 18, fontWeight: "bold", color: COLORS.primary}}>Lúc khác</Text>
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={{alignItems: 'center'}}>
                  <Image
                      source={images.landing_1}
                      style={{height: 250, width: 250}}
                  />
              </View>

              <Text style={{marginTop: 15, fontSize: 18, fontWeight: "500", textAlign: 'center'}}>
                  Chào mừng bạn tham gia Hội chữ thập đỏ Việt Nam
              </Text>

              <Text style={{
                  marginVertical: 20,
                  fontSize: 14,
                  textAlign: 'center',
                  color: COLORS.secondary,
                  paddingHorizontal: 25
              }}>
                  Với việc tiếp tục đăng ký bạn sẽ trở thành một thành viên của hội
              </Text>

              <Button
                  title="Đăng ký tham gia"
                  filled
                  style={{
                      marginHorizontal: 20
                  }}
                  onPress={() => navigation.navigate("JoinRegister")}
              />
          </ModalPop>
      </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: COLORS.secondary,
        headerTitleStyle: {
          fontWeight: "500",
          fontSize: 18,
        },
      }}
    >
      <HomeStack.Screen
        name="HomeStack"
        options={{
          title: "Thiện nguyện",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Image style={styles.stretch} source={images.logo_app} />
            </View>
          ),

          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <Icon
                name="ios-search"
                size={24}
                color="#000000"
                backgroundColor={colors.background}
                onPress={() => navigation.navigate("SearchAll")}
                style={{paddingVertical: 10, paddingHorizontal: 10}}
              />
              <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 0 }}>
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
          ),
        }}
      >
          {() => <HomeContent navigation={navigation} visible={visible} setVisible={setVisible} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    stretch: {
        width: 60,
        height: 60,
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
