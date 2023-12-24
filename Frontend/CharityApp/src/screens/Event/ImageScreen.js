import React from 'react';
import {Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, images} from "../../constants"
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const {width} = Dimensions.get("screen");

const ImageScreen = () => {
    const imageData = [
        {id: '1', source: images.onboarding_0},
        {id: '2', source: images.onboarding},
        {id: '3', source: images.onboarding_1},
        {id: '4', source: images.onboarding_2},
        {id: '5', source: images.onboarding_0},
        {id: '6', source: images.onboarding},
        {id: '7', source: images.onboarding_1},
        {id: '8', source: images.onboarding_2},
        {id: '9', source: images.onboarding_0},
        {id: '10', source: images.onboarding},
        {id: '11', source: images.onboarding_1},
        {id: '12', source: images.onboarding_2},
        {id: '13', source: images.onboarding_0},
        {id: '14', source: images.onboarding},
        {id: '15', source: images.onboarding_1},
        {id: '16', source: images.onboarding_0},
        {id: '17', source: images.onboarding},
        {id: '18', source: images.onboarding_1},
        {id: '19', source: images.onboarding_2},
        {id: '20', source: images.onboarding_0},
        {id: '21', source: images.onboarding},
        {id: '22', source: images.onboarding_1},
        {id: '23', source: images.onboarding_2},
        {id: '24', source: images.onboarding_0},
        {id: '25', source: images.onboarding},
        {id: '26', source: images.onboarding_1},
        {id: '27', source: images.onboarding_2},
        {id: '28', source: images.onboarding_0},
        {id: '29', source: images.onboarding},
        {id: '30', source: images.onboarding_1},
        {id: '31', source: images.onboarding_0},
        {id: '32', source: images.onboarding},
        {id: '33', source: images.onboarding_1},
        {id: '34', source: images.onboarding_2},
        {id: '35', source: images.onboarding_0},
        {id: '36', source: images.onboarding},
        {id: '37', source: images.onboarding_1},
        {id: '38', source: images.onboarding_2},
        {id: '39', source: images.onboarding_0},
        {id: '40', source: images.onboarding},
        {id: '41', source: images.onboarding_1},
        {id: '42', source: images.onboarding_2},
        {id: '43', source: images.onboarding_0},
        {id: '44', source: images.onboarding},
        {id: '45', source: images.onboarding_1},
    ];

    const renderItem = ({item}) => (
        <Image source={item.source} style={styles.image}/>
    );

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={{
                backgroundColor: COLORS.white,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
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
                    Ảnh/Video
                </Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={imageData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={4}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    image: {
        width: (width - 16) / 4,
        aspectRatio: 1,
        margin: 2,
    },
});

export default ImageScreen;
