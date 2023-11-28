import React, { useState } from "react";
import { TouchableOpacity, FlatList, Text, View, StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../../constants";

function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
}

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
    container: {
      marginTop: SIZES.small,
      marginBottom: SIZES.small,
    },
    btn: (name, activeTab) => ({
      paddingVertical: SIZES.xSmall,
      paddingHorizontal: SIZES.large,
      backgroundColor: name === activeTab ? COLORS.primary : "#F3F4F8",
      borderRadius: 28,
      marginLeft: 2,
      
      shadowColor: COLORS.white,
    }),
    btnText: (name, activeTab) => ({
      fontWeight: "bold",
      fontSize: 14,
      color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
    }),
  });