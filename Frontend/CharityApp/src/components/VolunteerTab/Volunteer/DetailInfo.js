import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {COLORS} from '../../../constants';
import {getUserById} from "../../../services/User/{id}/GetUserById";
import {getVolunteerById} from "../../../services/Volunteer/{id}/GetVolunteerById";

const DetailInfo = ({volunteerId, userId}) => {
    const [volunteer, setVolunteer] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getVolunteerById(volunteerId);
                setVolunteer(res.data);
            } catch (error) {
                console.error('Error fetching data', error);
                setVolunteer({});
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserById(userId);
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching data', error);
                setUser({});
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <MaterialCommunityIcons name="checkbox-outline" size={24} color="black"/> Kỹ Năng:
                </Text>
                {/*{volunteer.skills.map((skill) => (*/}
                {/*  <View key={skill.id} style={styles.skillItemContainer}>*/}
                {/*    <MaterialIcons name="check" size={16} color={COLORS.primary} />*/}
                {/*    <Text style={styles.skillItem}>{skill.name}</Text>*/}
                {/*  </View>*/}
                {/*))}*/}
                <Text style={styles.skillItem}>{volunteer.skills}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="black"/> Thời Gian Hỗ Trợ:
                </Text>
                <Text style={styles.sectionText}>{volunteer.support_Time}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <MaterialCommunityIcons name="information-outline" size={24} color="black"/> Thông Tin Bổ Sung:
                </Text>
                <Text style={styles.sectionText}>{volunteer.location}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <MaterialCommunityIcons name="card-account-details-outline" size={24} color="black"/> Liên Hệ:
                </Text>
                <Text style={styles.sectionText}>{user.email}</Text>
                <Text style={styles.sectionText}>{user.phone}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="black"/> Địa Chỉ:
                </Text>
                <Text style={styles.sectionText}>
                    {`${user.address}`}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 4,
    },
    skillItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    skillItem: {
        fontSize: 16,
        marginLeft: 8,
    },
});

export default DetailInfo;
