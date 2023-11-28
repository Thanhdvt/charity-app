import React from "react";
import { Text, Image, StyleSheet } from "react-native";

import { COLORS, images } from "../../../constants";
// import { DrawerContent } from "../../Drawer/DrawerContent";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import { useTheme, Avatar } from "react-native-paper";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  stretch: {
    width: 60,
    height: 60,
  },
});

const HomeStack = createStackNavigator();

const HomeContent = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
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
        component={HomeContent}
        options={{
          title: "Thiện nguyện",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Image style={styles.stretch} source={images.logo_app} />
            </View>
          ),

          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <Icon.Button
                name="ios-search"
                size={24}
                color="#000"
                backgroundColor={colors.background}
                onPress={() => {}}
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
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
