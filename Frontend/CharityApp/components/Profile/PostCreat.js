import React from "react";
import {TextInput, TouchableOpacity, View, StyleSheet, Image, Dimensions} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Button from "../common/Button";
import {COLORS, images} from "../../constants";

const {width} = Dimensions.get('screen');
const PostCreat = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 0 }}>
                <Image
                    source={images.profile}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 999,
                        borderWidth: 2,
                    }}
                />
            </TouchableOpacity>
                <Button
                    title="Bài viết hôm nay?"
                    style={{
                        paddingLeft: 20,
                        paddingBottom: 8,
                        paddingVertical: 8,
                        borderRadius: 32,
                        borderWidth: 1,
                        alignItems: "left",
                        width: width/1.5,
                    }}
                    onPress = {() => navigation.navigate("Post")}
                />
        </View>
    );
};

export default PostCreat;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.white,
        marginBottom: 2,
        paddingVertical: 15,
        paddingHorizontal: 5,
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 8,
    },
})