import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet, Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, images } from "../../../constants";

const {width} = Dimensions.get('screen');

const JoinRequestListScreen = ({ navigation }) => {
  const [requestData, setRequestData] = useState([
    {
      id: "1",
      name: "Phan Nhật Minh",
      image: {
        uri: "https://toigingiuvedep.vn/wp-content/uploads/2021/05/anh-avatar-nam-buon-1.jpg",
      },
    },
    {
      id: "2",
      name: "Nguyễn Thị Phương Thảo",
      image: {
        uri: "https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/1675684301_441_1001-anh-avatar-dep-cho-con-gai-ngau-buon-chat-1.jpg",
      },
    },
    {
      id: "3",
      name: "Lý Nhã Nam Phong",
      image: {
        uri: "https://toigingiuvedep.vn/wp-content/uploads/2021/05/avatar-nam-ca-tinh.jpg",
      },
    },
    {
      id: "4",
      name: "Vũ Như Diệp Linh",
      image: {
        uri: "https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/avatar-anime-cho-nu-dep-2.jpg",
      },
    },
    {
      id: "5",
      name: "Đỗ Khắc Cường",
      image: {
        uri: "https://kynguyenlamdep.com/wp-content/uploads/2022/08/anime-trai-dep-cuoi-de-thuong.jpg",
      },
    },
    {
      id: "6",
      name: "Trịnh Kim Khả Ngân",
      image: {
        uri: "https://i.pinimg.com/736x/c9/67/79/c9677971022e91c54f984b4f9d896e3d.jpg",
      },
    },
    {
      id: "7",
      name: "Khổng Minh Tuệ",
      image: {
        uri: "https://taytou.com/wp-content/uploads/2022/06/Anh-Avatar-cute-Nam-NGAU-my-nam-ao-hoodie-deo-khau-trang-trang.jpg",
      },
    },
    {
      id: "8",
      name: "Trương Thị Mỹ Lan",
      image: {
        uri: "https://i.pinimg.com/1200x/6f/1e/65/6f1e652d717da2b043b7202cf274676d.jpg",
      },
    },
  ]);

  const handleConfirm = (id) => {
    const updatedData = requestData.filter((item) => item.id !== id);
    setRequestData(updatedData);
  };

  const handleDelete = (id) => {
    const updatedData = requestData.filter((item) => item.id !== id);
    setRequestData(updatedData);
  };

  const handleRequestPress = (id) => {
    console.log(`Request with ID ${id} is pressed.`);
    navigation.navigate("JoinRequestScreen");
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 5,
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          {requestData.length} yêu cầu tham gia
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "normal" }}>Sắp xếp</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={requestData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestItem
            id={item.id}
            name={item.name}
            image={item.image}
            onPress={handleRequestPress}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
          />
        )}
      />
    </>
  );
};

const RequestItem = ({ id, name, image, onPress, onConfirm, onDelete }) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 8,
        }}
      >
        <Image
          source={image}
          style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }}
        />
        <View>
          <View style={{ paddingBottom: 8 }}>
            <Text style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>
              {name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", }}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => onConfirm(id)}
            >
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(id)}
            >
              <Text style={styles.buttonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JoinRequestListScreen;

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 8,
    width: width/3.1,
    alignItems: "center",
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#9C9C9C",
    paddingVertical: 8,
    width: width/3.1,
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
