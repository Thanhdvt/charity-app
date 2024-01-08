import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, FONTS} from "../../constants";
import Button from "../common/Button";
import Feather from "react-native-vector-icons/Feather";
import {AntDesign, EvilIcons, Ionicons, SimpleLineIcons} from "@expo/vector-icons";

const CustomModal = ({ isVisible, onClose, message }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropOpacity={0.5}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 10, width: '90%', alignItems: 'center' }}>
                    <SimpleLineIcons  name="close" size={80} color={COLORS.primary} style={{ marginBottom: 15 }}/>

                    <Text style={{ fontSize: 16, marginBottom: 30 }}>{message}</Text>
                    <View style={{width: "100%"}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.primary,
                                height: 44,
                                marginTop: 10,
                                marginBottom: 5,
                                alignItems: "center",
                                justifyContent: "center",
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8
                            }}
                            activeOpacity={0.8}
                            onPress={() => onClose()}
                        >

                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.white,
                                }}
                            >
                                Thử lại
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;
