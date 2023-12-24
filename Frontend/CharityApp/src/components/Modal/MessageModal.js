import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from "../../constants";
import Button from "../common/Button";
import Feather from "react-native-vector-icons/Feather";

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
                <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 15, width: '80%' }}>
                    <Feather name="alert-circle" size={24} color={COLORS.error} style={{ marginBottom: 10 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{message}</Text>
                    <Button
                        title="Thử lại"
                        filled
                        style={{
                            marginTop: 20,
                            marginBottom: 4,
                        }}
                        onPress = {() => onClose()}

                    />
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;
