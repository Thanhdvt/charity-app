import React from 'react';
import {
    FlatList,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Image
} from 'react-native';
import {COLORS, images} from '../../../constants';
import {useNavigation} from "@react-navigation/native";
import Button from "../../common/Button";
import {AntDesign} from "@expo/vector-icons";

const {width} = Dimensions.get('screen');
const EventList = () => {
    const postInfo = [
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            commentPersonImage: images.avatar,
            postContent:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            postImage: images.onboarding_0,
            likes: 765,
            isLiked: false,
        },
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            commentPersonImage: images.avatar,
            postContent:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            postImage: images.onboarding_2,
            likes: 345,
            isLiked: false,
        },
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            commentPersonImage: images.avatar,
            postContent:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            postImage: images.onboarding_1,
            likes: 734,
            isLiked: false,
        },
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            commentPersonImage: images.avatar,
            postContent:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            postImage: images.cover,
            likes: 875,
            isLiked: false,
        },
    ];

    const navigation = useNavigation();

    const Card = ({event}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Profile")}>
                <View style={{width: width/1.4, backgroundColor: COLORS.grey, marginRight: 20, borderRadius: 16}}>
                    <ImageBackground style={style.cardImage} source={event.postImage}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                            }}>
                            <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center", padding: 10}}>
                                <Image source={event.postPersonImage} style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 50,
                                    borderWidth: 4,
                                }}/>
                               <View>
                                   <Text style={{marginLeft: 5, color: COLORS.white, fontWeight: "500", fontSize: 18}} numberOfLines={1} ellipsizeMode="tail">
                                       {event.postPersonName}
                                   </Text>
                                   <Text style={{marginLeft: 5, color: COLORS.white }}>
                                       @chuthapdo
                                   </Text>
                               </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={{paddingVertical: 15, paddingHorizontal: 15}}>
                        <Text style={{fontWeight: "bold", fontSize: 16, paddingBottom: 15, textAlign: "justify"}} numberOfLines={2} ellipsizeMode="tail">
                            {event.postContent}
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                            <Text style={{paddingBottom: 15}}>1280 người tham gia</Text>
                           <View style={{flexDirection: "row"}}>
                               <AntDesign name="heart" size={20} color={"red"} />
                               <Text style={{marginLeft: 5}}>100</Text>
                           </View>
                        </View>
                        <Button
                            title="Tham gia"
                            style={{
                                paddingVertical: 8,
                                paddingBottom: 8,
                                borderWidth: 1,
                                borderRadius: 8
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
                <View style={style.sectionTitle}>
                    <Text style={{fontSize: 18, fontWeight: "500"}}>Sự kiện nổi bật</Text>
                    <Text style={{color: COLORS.primary}}>Xem tất cả</Text>
                </View>
                <View>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={postInfo}
                        renderItem={({item}) => <Card event={item}/>}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const style = StyleSheet.create({
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
    },
    rmCardImage: {
        width: width - 40,
        height: 200,
        marginRight: 20,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
    },
});
export default EventList;