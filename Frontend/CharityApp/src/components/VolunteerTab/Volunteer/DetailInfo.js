import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {COLORS} from '../../../constants';

const volunteer = {
    id: 1,
    name: 'Nguyễn Thị Anh',
    avatar: 'https://example.com/avatar.jpg',
    skills: [
      { id: 1, name: 'Quản lý dự án' },
      { id: 2, name: 'Giao tiếp hiệu quả' },
      { id: 3, name: 'Ngôn ngữ' },
      { id: 4, name: 'Thiết kế đồ họa' },
      { id: 5, name: 'Lập trình' },
    ],
    availability: 'Buổi chiều thứ 5, thứ 7 và cả ngày chủ nhật',
    additionalInfo: 'Tôi đã tham gia nhiều dự án tình nguyện về hiến máu nhân đạo và phát triển cộng đồng.',
    contact: {
      email: 'nguyenduythanh@example.com',
      phone: '0123 456 789',
    },
    address: {
      city: 'Hà Nội',
      district: 'Hoàng Mai',
      street: '123 Đường ABC',
    },
  };

const DetailInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" /> Kỹ Năng:
        </Text>
        {volunteer.skills.map((skill) => (
          <View key={skill.id} style={styles.skillItemContainer}>
            <MaterialIcons name="check" size={16} color={COLORS.primary} />
            <Text style={styles.skillItem}>{skill.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="black" /> Thời Gian Hỗ Trợ:
        </Text>
        <Text style={styles.sectionText}>{volunteer.availability}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialCommunityIcons name="information-outline" size={24} color="black" /> Thông Tin Bổ Sung:
        </Text>
        <Text style={styles.sectionText}>{volunteer.additionalInfo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialCommunityIcons name="card-account-details-outline" size={24} color="black" /> Liên Hệ:
        </Text>
        <Text style={styles.sectionText}>{volunteer.contact.email}</Text>
        <Text style={styles.sectionText}>{volunteer.contact.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="black" /> Địa Chỉ:
        </Text>
        <Text style={styles.sectionText}>
          {`${volunteer.address.street}, ${volunteer.address.district}, ${volunteer.address.city}`}
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
