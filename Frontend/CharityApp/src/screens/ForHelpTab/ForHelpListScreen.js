import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../../constants";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {AuthContext} from "../../context/AuthContext";
import {getUserById} from "../../services/User/{id}/GetUserById";
import {getAllForHelpRequestByUserId} from "../../services/ForHelpRequest/user/{userId}/GetAllForHelpRequestByUserId";
import moment from "moment/moment";
import {getOrganizationById} from "../../services/CharityOrganization/{id}/GetOrganizationById";

const ForHelpRegisterScreen = ({navigation}) => {
    const eventList = [
        {
            id: 1,
            name: 'Chăm sóc sức khỏe cộng đồng',
            image: 'https://redcross.org.vn/upload/18.jpg?v=1.0.2',
            status: 'Đã kết thúc',
        },
    ];

    const {userInfo} = useContext(AuthContext);
    const [forHelpRequestList, setForHelpRequestList] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getAllForHelpRequestByUserId(userInfo.id);
                if (res?.data) {

                const updatedList = await Promise.all(
                    res.data.map(async (item) => {
                        try {
                            const organization = await getOrganizationById(item.organization_Id);
                            if (organization) {
                                const userResponse = await getUserById(organization.data.user_Id)
                                const { image, name } = userResponse.data;
                                return { ...item, name, image };
                            }
                        } catch (error) {
                            console.error('Error fetching user data', error);
                            return item;
                        }
                    })
                );
                    setForHelpRequestList(updatedList)
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        getData();
    }, []);

    const renderEventItem = ({ item }) => (
        <TouchableOpacity
            style={styles.eventItem}
            onPress={() => navigation.navigate('ForHelpDetail', { forHelpRequestId: item.id, organizationName: item.name })}
        >
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <View style={styles.eventDetails}>
                <Text style={styles.eventName}  numberOfLines={1} ellipsizeMode="tail">{item.description}</Text>
                <Text style={styles.eventStatus}>{moment(item?.date).format("DD/MM/YYYY")}</Text>
            </View>
            <TouchableOpacity onPress={() => handleMoreOptions(item.id)}>
                <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 20,
                    height: 60,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.black}/>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "500",
                        marginLeft: 30,
                    }}
                >
                    Yêu cầu trợ giúp
                </Text>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{marginHorizontal: 20}}
            >
                {forHelpRequestList.map((item) => (
                    <View key={item.id}>
                        {renderEventItem({ item })}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForHelpRegisterScreen;

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
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        padding: 12,
    },
    eventImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    eventDetails: {
        flex: 1,
        marginLeft: 12,
    },
    eventName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "justify"
    },
    eventStatus: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5
    },
});