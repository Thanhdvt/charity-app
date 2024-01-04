import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, images } from '../../../constants';
import { LinearGradient } from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getAllOrganization } from '../../../services/CharityOrganization/GetAllOrganization';
import { getUserById } from '../../../services/User/{id}/GetUserById';

const OrganizationTab = ({ searchValue }) => {
    const [organizationList, setOrganizationList] = useState([]);
    const navigation = useNavigation();

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

    const filteredOrganizationList = organizationList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const renderOrganizationItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={{ width: 74, padding: 5, marginHorizontal: 10, marginBottom: 20 }}
            onPress={() => navigation.navigate('Organization', { id: item.id, userId: item.user_Id })}
        >
            <LinearGradient colors={['#bc2a8d', '#e95950', '#fccc63']} style={{ padding: 2, borderRadius: 50 }}>
                <Image source={item.image ? { uri: item.image } : images.avatar_default} style={styles.userImage} />
            </LinearGradient>
            <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderOrganizationRow = (start, end) => (
        <View style={{ flexDirection: 'row' }}>
            {filteredOrganizationList.slice(start, end).map((item) => (
                <View key={item.id} style={{ flex: 1 }}>
                    {renderOrganizationItem({ item })}
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {Array.from({ length: Math.ceil(filteredOrganizationList.length / 3) }).map((_, index) => (
                    <View key={index}>{renderOrganizationRow(index * 3, (index + 1) * 3)}</View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    userImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 4,
    },
    userName: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 5,
    },
});

export default OrganizationTab;
