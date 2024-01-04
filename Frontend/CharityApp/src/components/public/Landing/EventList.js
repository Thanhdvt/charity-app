import React, {useContext, useEffect, useState} from 'react';
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
import {getAllEvent} from "../../../services/Event/GetAllEvent";
import {getAllOrganization} from "../../../services/CharityOrganization/GetAllOrganization";
import {getUserById} from "../../../services/User/{id}/GetUserById";
import {getOrganizationById} from "../../../services/CharityOrganization/{id}/GetOrganizationById";
import {AuthContext} from "../../../context/AuthContext";
import ModalPop from "../../Modal/PopModal";
import {hideMessage, showMessage} from "react-native-flash-message";

const {width} = Dimensions.get('screen');
const EventList = () => {

    const post=
        {
            postPersonName: "Hội chữ thập đỏ Việt Nam",
            postPersonImage: images.profile,
            title:
                "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng, do Chủ tịch Hồ Chí Minh sáng lập ngày 23/11/1946 và Người làm Chủ tịch danh dự đầu tiên của Hội. 7 nguyên tắc hoạt động: Nhân đạo, Vô tư, Trung lập, Độc lập, Tự nguyện, Thống nhất, Toàn cầu",
            image: images.onboarding_0,
            like_Count: 765,
            isLiked: false,
        }

    const {userToken} = useContext(AuthContext);
    const navigation = useNavigation();
    const [eventList, setEventList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const handleButtonClick = () => {
        setVisible(true);
    };

    const handleButtonLogin = () => {
        setVisible(false);
        navigation.navigate("Login");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllEvent();
                const updatedList = await Promise.all(
                    res.data.map(async (item) => {
                        try {
                            const organization = await getOrganizationById(item.organization_Id);
                            if (organization) {
                                const userResponse = await getUserById(organization.data.user_Id)
                                const { image, name, email } = userResponse.data;
                                return { ...item, image, name, email };
                            }
                        } catch (error) {
                            console.error('Error fetching user data', error);
                            return item;
                        }
                    })
                );
                setEventList(updatedList);
            } catch (error) {
                console.error('Error fetching data', error);
                setEventList([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const showModal = () => {
        return (
            <ModalPop visible={visible}>
                <View style={{alignItems: 'center'}}>
                    <View style={{
                        width: '100%',
                        height: 20,
                        alignItems: "flex-end",
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: COLORS.primary}}>Lúc khác</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={images.landing_1}
                        style={{height: 250, width: 250}}
                    />
                </View>

                <Text style={{marginTop: 15, fontSize: 18, fontWeight: "500", textAlign: 'center'}}>
                    Chào mừng bạn đến với nền tảng thiện nguyện minh bạch
                </Text>

                <Text style={{
                    marginVertical: 20,
                    fontSize: 14,
                    textAlign: 'center',
                    color: COLORS.secondary,
                    paddingHorizontal: 25
                }}>
                    Chúng tôi sẽ giúp bạn có trải nghiệm thiện nguyện thật khác biệt
                </Text>

                <Button
                    title="Đăng nhập hoặc tạo tài khoản"
                    filled
                    style={{
                        marginHorizontal: 20
                    }}
                    onPress={() => handleButtonLogin()}
                />
            </ModalPop>
        )
    }


    const Card = ({index}) => {
        const event = eventList[index];
        // console.log(event)
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('EventDetail', { eventId: event.id, organizationId: event.organization_Id })}>
                <View style={{width: width/1.4, backgroundColor: COLORS.grey, marginRight: 20, borderRadius: 16}}>
                    <ImageBackground style={styles.cardImage} source={post.image}>
                        <View style={{flexDirection: "row", alignItems: 'flex-start', alignSelf: "flex-end", padding: 10}}>
                            <AntDesign name="heart" size={20} color={"red"} />
                            <Text style={{marginLeft: 5, color: COLORS.white}}>{event?.like_Count}</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                            }}>
                            <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center", padding: 10}}>
                                <Image source={ isLoading ? images.avatar_default : {uri: event?.image}} style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 50,
                                    borderWidth: 4,
                                }}/>
                               <View>
                                   <Text style={{marginLeft: 5, color: COLORS.white, fontWeight: "500", fontSize: 18}} numberOfLines={1} ellipsizeMode="tail">
                                       {event?.name}
                                   </Text>
                                   <Text style={{marginLeft: 5, color: COLORS.white }}>
                                       {event?.email}
                                   </Text>
                               </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={{paddingVertical: 15, paddingHorizontal: 15}}>
                        <Text style={{fontWeight: "bold", fontSize: 16, paddingBottom: 15, textAlign: "justify"}} numberOfLines={1} ellipsizeMode="tail">
                            {event?.title}
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
                            onPress={ () => (userToken ? navigation.navigate("JoinRegister") : handleButtonClick)}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1, backgroundColor: COLORS.white, marginBottom: 5, paddingTop: 15, paddingBottom: 25}}>
            {showModal()}
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
                        data={eventList}
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