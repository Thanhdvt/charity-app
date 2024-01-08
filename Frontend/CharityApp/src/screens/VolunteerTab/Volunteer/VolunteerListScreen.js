import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {getUserById} from "../../../services/User/{id}/GetUserById";
import {getVolunteerByOrganizationId} from "../../../services/Volunteer/organization/GetVolunteerByOrganizationId";
import {AuthContext} from "../../../context/AuthContext";
import {useFocusEffect} from "@react-navigation/native";

const VolunteerListScreen = ({ navigation }) => {
    const {charityOrganization} = useContext(AuthContext)
    const [volunteerData, setVolunteerData] = useState([])
    const handleVolunteerPress = (userId, id) => {
      // console.log(`Volunteer with ID ${id} is pressed.`);
      navigation.navigate('VolunteerScreen', {userId: userId, id: id})
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const res = await getVolunteerByOrganizationId(charityOrganization.id);
                    const updatedList = await Promise.all(
                        res.data.map(async (item) => {
                            try {
                                const userResponse = await getUserById(item.user_Id);
                                const { image, name } = userResponse.data;
                                return { ...item, image, name };
                            } catch (error) {
                                console.error(`Error fetching user data for user ID ${item.user_Id}`, error);
                                return item;
                            }
                        })
                    );
                    setVolunteerData(updatedList);
                } catch (error) {
                    console.error('Error fetching volunteer data', error);
                    setVolunteerData([]);
                }
            };

            fetchData();
        }, [charityOrganization.id])
    );

    const VolunteerItem = ({ userId, id, name, image, onPress }) => {
        return (
            <TouchableOpacity onPress={() => onPress(userId, id)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20 }}>
                    <Image source={{uri: image}} style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }} />
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>{name}</Text>
                    <Ionicons name="ellipsis-vertical" size={20} color="#555" />
                </View>
            </TouchableOpacity>
        );
    };
  
    return (
          <View style={{paddingBottom: 47}}>
              <View style={{ paddingHorizontal: 20, paddingTop: 15, flexDirection: "row", justifyContent: 'space-between'}}>
                  <Text style={{ fontSize: 16, fontWeight: "500",}}>{volunteerData.length} thành viên</Text>
                  <Text style={{ fontSize: 16, fontWeight: "normal",}}>Sắp xếp</Text>
              </View>
              <FlatList
                  showsVerticalScrollIndicator={false}
                  data={volunteerData}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                      <VolunteerItem
                          userId={item.user_Id}
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