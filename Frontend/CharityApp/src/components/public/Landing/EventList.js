import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {COLORS, images} from '../../../constants';
import {useNavigation} from "@react-navigation/native";
import Button from "../../common/Button";
import {AntDesign} from "@expo/vector-icons";
import {getEventList} from "../../../services/GetEventList";

const {width} = Dimensions.get('screen');
const EventList = ({setModalVisible}) => {

    const [postInfo, setPostInfo] = useState([
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
            image: images.onboarding_2,
            like_Count: 345,
            isLiked: false,
        },
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            title:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            image: images.onboarding_1,
            like_Count: 734,
            isLiked: false,
        },
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            title:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            image: images.cover,
            like_Count: 875,
            isLiked: false,
        },
    ]);

    const navigation = useNavigation();

    const handleEventPress = () => {
        setModalVisible(true);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const eventList = await getEventList();

                // setPostInfo(eventList);
            } catch (error) {
                console.log('fetchApi' + error);
            }
        };
        fetchApi();
    }, []);

    const Card = ({index}) => {
        const event = postInfo[index];

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("EventDetail")}>
                <View style={{width: width/1.4, backgroundColor: COLORS.grey, marginRight: 20, borderRadius: 16}}>
                    <ImageBackground style={styles.cardImage} source={event.image}>
                        <View style={{flexDirection: "row", alignItems: 'flex-start', alignSelf: "flex-end", padding: 10}}>
                            <AntDesign name="heart" size={20} color={"red"} />
                            <Text style={{marginLeft: 5, color: COLORS.white}}>{event.like_Count}</Text>
                        </View>
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
                            {event.title}
                        </Text>
                        <View style={{justifyContent: "space-between", paddingBottom: 15, paddingLeft: 15}}>
                           <View style={{flexDirection: "row", alignItems: "center"}}>
                               <View style={styles.container}>
                                   <Image style={styles.avatar} source={images.avatar_1} />
                                   <Image style={styles.avatar} source={images.avatar_2} />
                                   <Image style={styles.avatar} source={images.avatar_3} />
                                   <Image style={styles.avatar} source={images.avatar_4} />
                               </View>
                               <Text>1280 người tham gia</Text>
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
                            onPress={handleEventPress}
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
                    <TouchableOpacity onPress={() => navigation.navigate("EventSearch")}>
                        <Text style={{color: COLORS.primary}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={postInfo}
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
export default EventList;