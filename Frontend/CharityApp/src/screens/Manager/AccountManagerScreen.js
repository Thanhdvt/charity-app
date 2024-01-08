import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {COLORS, images} from "../../constants";
import {getAllUser} from "../../services/User/GetAllUser";


const UserItem = ({ id, name, image, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                <Image source={image ? {uri: image} : images.avatar_default} style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }} />
                <Text style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>{name}</Text>
                <Ionicons name="ellipsis-vertical" size={20} color="#555" />
            </View>
        </TouchableOpacity>
    );
};


const AccountManagerScreen = ({ navigation }) => {

    const [userList, setUserList] = useState([]);
    const handleVolunteerPress = (id) => {
        console.log(`Volunteer with ID ${id} is pressed.`);
        navigation.navigate('AccountDetailCensor', {userId: id});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllUser();
                setUserList(res.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    height: 60,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "500",
                        marginLeft: 30,
                    }}
                >
                    Quản lý tài khoản
                </Text>
            </View>
            <View style={{paddingHorizontal: 10, marginBottom: 110, marginTop: 5}}>
                <View style={{ paddingBottom: 5, flexDirection: "row", justifyContent: 'space-between'}}>
                    <Text style={{ fontSize: 16, fontWeight: "500",}}>{userList?.length} tài khoản</Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal",}}>Sắp xếp</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={userList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <UserItem
                            id={item.id}
                            name={item.name}
                            image={item?.image}
                            onPress={handleVolunteerPress}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default AccountManagerScreen;