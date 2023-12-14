import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Button} from "react-native";
import {COLORS, FONTS} from "../../constants";

const PersonInfoScreen = ({navigation}) => {
    const [supportTime, setSupportTime] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [description, setDescription] = useState('');

    const handleSendToServer = () => {

    };

    return (
        <View>
            <View
                style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}
            >
                <Text style={{ ...FONTS.h5 }}>
                    Địa chỉ <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View style={styles.containerTextInput}>
                    <TextInput
                        style={{ fontSize: 16 }}
                        value={skills}
                        onChangeText={(value) => setSkills(value)}
                        editable={true}
                    />
                </View>
            </View>

            <View
                style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}
            >
                <Text style={{ ...FONTS.h5 }}>
                    Địa chỉ <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View style={styles.containerTextInput}>
                    <TextInput
                        style={{ fontSize: 16 }}
                        value={location}
                        onChangeText={(value) => setLocation(value)}
                        editable={true}
                    />
                </View>
            </View>

            <View
                style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}
            >
                <Text style={{ ...FONTS.h5 }}>
                    Địa chỉ <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View style={styles.containerTextInput}>
                    <TextInput
                        style={{ fontSize: 16 }}
                        value={supportTime}
                        onChangeText={(value) => setSupportTime(value)}
                        editable={true}
                    />
                </View>
            </View>

            <View
                style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}
            >
                <Text style={{ ...FONTS.h5 }}>Mô tả chung</Text>
                <View style={[styles.containerTextInput, { height: 200 }]}>
                    <TextInput
                        style={{ fontSize: 16 }}
                        multiline
                        numberOfLines={8}
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                        editable={true}
                    />
                </View>
            </View>

            <Button
                title="Send to Server"
                onPress={handleSendToServer}
            />
        </View>
    );
};

export default PersonInfoScreen;

const styles = StyleSheet.create({
    containerTextInput: {
        height: 44,
        width: "100%",
        borderColor: COLORS.secondaryGray,
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 4,
        marginBottom: 12,
        justifyContent: "center",
        paddingLeft: 8,
    },
});
