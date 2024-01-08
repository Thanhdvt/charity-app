import React, {useContext, useEffect, useState} from "react";
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {COLORS} from "../../../constants";
import {getVolunteerByOrganizationId} from "../../../services/Volunteer/organization/GetVolunteerByOrganizationId";
import {getUserById} from "../../../services/User/{id}/GetUserById";
import {
  getJoinRequestByOrganizationId
} from "../../../services/JoinRequest/organization/GetJoinRequestByOrganizationId";
import {AuthContext} from "../../../context/AuthContext";
import {createVolunteer} from "../../../services/Volunteer/CreateVolunteer";
import {getJoinRequestById} from "../../../services/JoinRequest/{id}/GetJoinRequestById";
import {createApprove} from "../../../services/JoinRequest/approve/{id}";
import {useFocusEffect} from "@react-navigation/native";

const {width} = Dimensions.get('screen');

const JoinRequestListScreen = ({ navigation }) => {
  // const [requestData, setRequestData] = useState([
  //   {
  //     id: "1",
  //     name: "Phan Nhật Minh",
  //     image: {
  //       uri: "https://toigingiuvedep.vn/wp-content/uploads/2021/05/anh-avatar-nam-buon-1.jpg",
  //     },
  //   },
  // ]);
  const {charityOrganization, userToken} = useContext(AuthContext);
  const [requestData, setRequestData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const res = await getJoinRequestByOrganizationId(charityOrganization.id);
                    const updatedList = await Promise.all(
                        res.data.map(async (item) => {
                            try {
                                const userResponse = await getUserById(item.user_Id);
                                const { image, name } = userResponse.data;
                                return { ...item, image, name };
                            } catch (error) {
                                console.error('Error fetching user data', error);
                                return item;
                            }
                        })
                    );
                    setRequestData(updatedList);
                } catch (error) {
                    console.error('Error fetching join request data', error);
                    setRequestData([]);
                }
            };

            fetchData();
        }, [charityOrganization.id]) // Ensure to include any dependencies in the dependency array
    );

  const addVolunteer = async (id) => {
      await createApprove(id);
  }

    const handleConfirm = (id) => {
        const updatedData = requestData.filter((item) => item.id !== id);
        setRequestData(updatedData);
        addVolunteer(id);
    };

    const handleDelete = (id) => {
        const updatedData = requestData.filter((item) => item.id !== id);
        setRequestData(updatedData);
    };

    const handleRequestPress = (userId, id) => {
        console.log(`Request with ID ${id} is pressed.`);
        navigation.navigate("JoinRequestScreen", {userId: userId, id: id});
    };

  const RequestItem = ({ userId, id, name, image, onPress, onConfirm, onDelete }) => {
    return (
        <TouchableOpacity onPress={() => onPress(userId, id)}>
          <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 8,
              }}
          >
            <Image
                source={{uri: image}}
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

  return (
    <View style={{paddingBottom: 47}}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 10,
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
              userId={item.user_Id}
            id={item.id}
            name={item.name}
            image={item.image}
            onPress={handleRequestPress}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
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
