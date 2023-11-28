import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {images} from "../../../constants";

const volunteerData = [
    { id: '1', name: 'Nguyễn Văn An', image: images.avatar_1 },
    { id: '2', name: 'Trần Thị Thu Hằng', image: images.avatar_2 },
    { id: '3', name: 'Phan Đăng Khải', image: images.avatar_7 },
    { id: '4', name: 'Hoàng Thị Hải Yến', image: images.avatar_3 },
    { id: '5', name: 'Đỗ Bá Duy Mạnh', image: images.avatar_6 },
    { id: '6', name: 'Trần Thị Phương Nga', image: images.avatar_4 },
    { id: '7', name: 'Nguyễn Đăng Nhật Minh', image: images.avatar_8 },
    { id: '8', name: 'Lan Thị Thu Huệ', image: images.avatar_5 },
    { id: '9', name: 'Phan Nhật Minh', image: {uri: 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/anh-avatar-nam-buon-1.jpg'} },
    { id: '10', name: 'Nguyễn Thị Phương Thảo', image: {uri: 'https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/1675684301_441_1001-anh-avatar-dep-cho-con-gai-ngau-buon-chat-1.jpg'} },
    { id: '11', name: 'Lý Nhã Nam Phong', image: {uri: 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/avatar-nam-ca-tinh.jpg'} },
    { id: '12', name: 'Vũ Như Diệp Linh', image: {uri: 'https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/avatar-anime-cho-nu-dep-2.jpg'} },
    { id: '13', name: 'Đỗ Khắc Cường', image: {uri: 'https://kynguyenlamdep.com/wp-content/uploads/2022/08/anime-trai-dep-cuoi-de-thuong.jpg'} },
    { id: '14', name: 'Trịnh Kim Khả Ngân', image: {uri: 'https://i.pinimg.com/736x/c9/67/79/c9677971022e91c54f984b4f9d896e3d.jpg'} },
    { id: '15', name: 'Khổng Minh Tuệ', image: {uri: 'https://taytou.com/wp-content/uploads/2022/06/Anh-Avatar-cute-Nam-NGAU-my-nam-ao-hoodie-deo-khau-trang-trang.jpg'} },
    { id: '16', name: 'Trương Thị Mỹ Lan', image: {uri: 'https://i.pinimg.com/1200x/6f/1e/65/6f1e652d717da2b043b7202cf274676d.jpg'} },
  ];

const VolunteerItem = ({ id, name, image, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
        <Image source={image} style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }} />
        <Text style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>{name}</Text>
        <Ionicons name="ellipsis-vertical" size={20} color="#555" />
      </View>
    </TouchableOpacity>
  );
};


const VolunteerListScreen = ({ navigation }) => {
    const handleVolunteerPress = (id) => {
      console.log(`Volunteer with ID ${id} is pressed.`);
      navigation.navigate('VolunteerScreen')
    };
  
    return (
      <View style={{paddingHorizontal: 24}}>
        <View style={{ paddingBottom: 5, paddingTop: 20, flexDirection: "row", justifyContent: 'space-between'}}>
          <Text style={{ fontSize: 16, fontWeight: "500",}}>{volunteerData.length} thành viên</Text>
          <Text style={{ fontSize: 16, fontWeight: "normal",}}>Sắp xếp</Text>
        </View>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={volunteerData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VolunteerItem
            id={item.id}
            name={item.name}
            image={item.image}
            onPress={handleVolunteerPress}
          />
        )}
      />
      </View>
    );
  };
  
  export default VolunteerListScreen;