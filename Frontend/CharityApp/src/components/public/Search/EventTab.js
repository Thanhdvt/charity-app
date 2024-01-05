import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {COLORS} from "../../../constants";
import {useNavigation} from "@react-navigation/native";
import {getAllEvent} from "../../../services/Event/GetAllEvent";

const EventTab = ({searchValue}) => {
  const event = {
      id: 1,
      name: 'Chăm sóc sức khỏe cộng đồng',
      image: 'https://redcross.org.vn/upload/18.jpg?v=1.0.2',
      status: 'Đã kết thúc',
    };

  const [eventList, setEventList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllEvent();
        setEventList(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
        setEventList([]);
      }
    };

    fetchData();
  }, []);

  const filteredEventList = eventList.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetail', { eventId: item.id, organizationId: item.organization_Id })}
    >
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventName} numberOfLines={1} >{item.title}</Text>
        <Text style={styles.eventStatus}>{item.type === 0 ? "Đang diễn ra" : "Đã kết thúc" }</Text>
      </View>
      <TouchableOpacity onPress={() => handleMoreOptions(item.id)}>
        <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {filteredEventList.map((item) => (
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
