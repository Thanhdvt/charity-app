import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {COLORS} from "../../../constants";

const EventTab = ({ navigation }) => {
  const eventList = [
    {
      id: 1,
      name: 'Chăm sóc sức khỏe cộng đồng',
      image: 'https://redcross.org.vn/upload/18.jpg?v=1.0.2',
      status: 'Đã kết thúc',
    },
    {
      id: 2,
      name: 'Diễn tập cứu hộ cứu nạn',
      image: 'https://redcross.org.vn/upload/cham-soc-suc-khoe-2.jpg?v=1.0.2',
      status: 'Đã kết thúc',
    },
    {
        id: 3,
        name: 'Hiến máu nhân đạo',
        image: 'https://redcross.org.vn/upload/cham-soc-suc-khoe.jpg?v=1.0.2',
        status: 'Đang diễn ra',
      },
      {
        id: 4,
        name: 'Mái ấm cho em',
        image: 'https://redcross.org.vn/upload/phong-ngua-ung-pho-tham-hoa.jpg?v=1.0.2',
        status: 'Đang diễn ra',
      },
    {
      id: 5,
      name: 'Chăm sóc sức khỏe cộng đồng',
      image: 'https://redcross.org.vn/upload/18.jpg?v=1.0.2',
      status: 'Đã kết thúc',
    },
    {
      id: 6,
      name: 'Diễn tập cứu hộ cứu nạn',
      image: 'https://redcross.org.vn/upload/cham-soc-suc-khoe-2.jpg?v=1.0.2',
      status: 'Đã kết thúc',
    },
    {
      id: 7,
      name: 'Hiến máu nhân đạo',
      image: 'https://redcross.org.vn/upload/cham-soc-suc-khoe.jpg?v=1.0.2',
      status: 'Đang diễn ra',
    },
    {
      id: 8,
      name: 'Mái ấm cho em',
      image: 'https://redcross.org.vn/upload/phong-ngua-ung-pho-tham-hoa.jpg?v=1.0.2',
      status: 'Đang diễn ra',
    },
    {
      id: 9,
      name: 'Chăm sóc sức khỏe cộng đồng',
      image: 'https://redcross.org.vn/upload/18.jpg?v=1.0.2',
      status: 'Đã kết thúc',
    },
    {
      id: 10,
      name: 'Diễn tập cứu hộ cứu nạn',
      image: 'https://redcross.org.vn/upload/cham-soc-suc-khoe-2.jpg?v=1.0.2',
      status: 'Đã kết thúc',
    },
    {
      id: 11,
      name: 'Hiến máu nhân đạo',
      image: 'https://redcross.org.vn/upload/cham-soc-suc-khoe.jpg?v=1.0.2',
      status: 'Đang diễn ra',
    },
    {
      id: 12,
      name: 'Mái ấm cho em',
      image: 'https://redcross.org.vn/upload/phong-ngua-ung-pho-tham-hoa.jpg?v=1.0.2',
      status: 'Đang diễn ra',
    },
  ];

  const handleMoreOptions = (eventId) => {
    console.log(`More options for event ${eventId}`);
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventStatus}>{item.status}</Text>
      </View>
      <TouchableOpacity onPress={() => handleMoreOptions(item.id)}>
        <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {eventList.map((item) => (
        <View key={item.id}>
          {renderEventItem({ item })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginHorizontal: 20
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 12,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventStatus: {
    fontSize: 14,
    color: 'gray',
  },
});

export default EventTab;
