import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS, images} from "../../../constants";
import {useNavigation} from '@react-navigation/native';
import {getAllOrganization} from "../../../services/CharityOrganization/GetAllOrganization";
import {getUserById} from "../../../services/User/{id}/GetUserById";

const OrganizationList = () => {
    const [organizationList, setOrganizationList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllOrganization();
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
                setOrganizationList(updatedList);
            } catch (error) {
                console.error('Error fetching data', error);
                setOrganizationList([]);
            }
        };

        fetchData();
    }, []);

    const navigation = useNavigation();

    const Card = ({item}) => {
        return (
            <TouchableOpacity key={item.id} style={{width: 74, padding: 5, marginRight: 10}}
                              onPress={() => navigation.navigate('Organization', { id: item.id, userId: item.user_Id })}
            >
                <LinearGradient
                    colors={['#bc2a8d', '#e95950', '#fccc63']}
                    style={{padding: 2, borderRadius: 50}}
                >
                    <Image  source={item.image ? { uri: item.image } : images.avatar_default} style={styles.userImage}/>
                </LinearGradient>
                <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: COLORS.white, marginBottom: 1, paddingTop: 15, paddingBottom: 15}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sectionTitle}>
                    <Text style={{fontSize: 18, fontWeight: "500"}}>Hội thiện nguyện</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("OrganizationSearch")}>
                        <Text style={{color: COLORS.primary}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={organizationList}
                        renderItem={({item}) => <Card item={item}/>}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default OrganizationList;

const styles = StyleSheet.create({
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 4,
    },
    userName: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10,
    },
    sectionTitle: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10
    },
})