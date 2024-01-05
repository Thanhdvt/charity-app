import React from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, images} from '../../constants';
import Button from "../common/Button";

const {width} = Dimensions.get('screen');
const SkeletonForEventList = () => {

    const postList=[
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            title:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            image: images.onboarding_0,
            like_Count: 765,
            isLiked: false,
        },
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            title:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            image: images.onboarding_0,
            like_Count: 765,
            isLiked: false,
        }
    ]

    const Card = ({index}) => {
        const event = postList[index];
        return (
            <TouchableOpacity activeOpacity={0.8}>
                <View style={{width: width/1.4, backgroundColor: COLORS.grey, marginRight: 20, borderRadius: 16}}>
                    <View style={styles.cardImage}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                            }}>
                            <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center", padding: 10}}>
                                   <View style={{
                                       height: 40,
                                       width: 40,
                                       borderRadius: 50,
                                       borderWidth: 0,
                                       backgroundColor: COLORS.secondaryGray
                                   }}/>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingVertical: 15, paddingHorizontal: 15}}>
                        <View style={{fontWeight: "bold", fontSize: 16, paddingBottom: 20, marginBottom: 10, textAlign: "justify", width: 150, backgroundColor: COLORS.secondaryGray}} numberOfLines={1} ellipsizeMode="tail">
                        </View>
                        <View style={{justifyContent: "space-between", paddingBottom: 15, paddingLeft: 15}}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <View style={styles.container}>
                                    <Image style={styles.avatar} source={images.circle_gray} />
                                    <Image style={styles.avatar} source={images.circle_gray} />
                                    <Image style={styles.avatar} source={images.circle_gray} />
                                    <Image style={styles.avatar} source={images.circle_gray} />
                                </View>
                            </View>
                        </View>
                        <Button
                            style={{
                                paddingVertical: 8,
                                paddingBottom: 8,
                                borderWidth: 0,
                                borderRadius: 8,
                                backgroundColor: COLORS.secondaryGray,
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1, backgroundColor: COLORS.white, marginBottom: 5, paddingTop: 15, paddingBottom: 25}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sectionTitle}>
                    <Text style={{fontSize: 18, fontWeight: "500"}}>Sự kiện nổi bật</Text>
                    <TouchableOpacity>
                        <Text style={{color: COLORS.primary}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={postList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <Card index={index} />}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
    },
    headerTitle: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 23,
    },
    inputContainer: {
        height: 60,
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        position: 'absolute',
        top: 90,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 12,
    },
    categoryContainer: {
        marginTop: 60,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContainer: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    sectionTitle: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    cardImage: {
        height: 200,
        overflow: 'hidden',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: COLORS.secondaryGray
    },
    rmCardImage: {
        width: width - 40,
        height: 200,
        marginRight: 20,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 25,
        marginHorizontal: -8,
        position: 'relative',
        zIndex: 1,
    },
});
export default SkeletonForEventList;