import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {COLORS, images} from "../../../constants";
import {useNavigation} from "@react-navigation/native";
import {getAllEvent} from "../../../services/Event/GetAllEvent";
import {getOrganizationById} from "../../../services/CharityOrganization/{id}/GetOrganizationById";
import {getUserById} from "../../../services/User/{id}/GetUserById";
import getAllFileByEventId from "../../../../firebase/GetAllFileByEventId";
import getBackgroundByEventId from "../../../../firebase/getBackgroundByEventId";

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
        const updatedList = await Promise.all(
            res.data.map(async (item) => {
              try {
                const organization = await getOrganizationById(item.organization_Id);
                if (organization) {
                  const background = await getBackgroundByEventId(organization.data.user_Id, item.id);
                  return { ...item, background };
                }
              } catch (error) {
                console.error('Error fetching user data', error);
                return item;
              }
            })
        );
        setEventList(updatedList);
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
      <Image source={item?.background ? { uri: item?.background } : images.onboarding_2} style={styles.eventImage} />
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
