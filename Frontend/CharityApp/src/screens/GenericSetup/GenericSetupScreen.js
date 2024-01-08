import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    View,
    FlatList,
} from 'react-native';
import i18next, {languageResources} from '../../locales/i18next';
import {useTranslation} from 'react-i18next';
import languagesList from '../../locales/languagesList.json';
import {COLORS} from "../../constants";
import FlashMessage from "react-native-flash-message";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const GenericSetupScreen = () => {
    const [visible, setVisible] = useState(false);
    const {t} = useTranslation();
    const navigation = useNavigation();
    const [language, setLanguage] = useState("en");

    const changeLng = lng => {
        i18next.changeLanguage(lng);
        setLanguage(lng);
        setVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
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
                    Ngôn ngữ
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                <View style={{paddingTop: 20, paddingBottom: 30,  borderBottomWidth: 1, borderColor: COLORS.secondaryGray}}>
                    <Text style={{fontSize: 12, fontWeight: "bold", color: COLORS.sliver, marginBottom: 30,  textTransform: "uppercase"}}>{t('Ngôn ngữ')}</Text>
                   <View style={{justifyContent: "space-between", flexDirection: "row",}}>
                       <Text style={styles.text}>{t('Ngôn ngữ')}</Text>
                       <View style={{ flexDirection: "row"}}>
                           <Text style={{ fontSize: 16, color: 'black', marginRight: 15}}>{languagesList[language].nativeName}</Text>
                           <AntDesign name="right" size={24} color={COLORS.secondaryGray} />
                       </View>
                   </View>
                </View>
            </TouchableOpacity>
            {/*<Text style={styles.text}>{t('welcome')}</Text>*/}
            <Modal visible={visible} onRequestClose={() => setVisible(false)}>
                <View style={styles.languagesList}>
                    <FlatList
                        data={Object.keys(languageResources)}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.languageButton}
                                onPress={() => changeLng(item)}>
                                <Text style={styles.lngName}>
                                    {languagesList[item].nativeName}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 25,
        backgroundColor: COLORS.white,
    },
    button: {
        paddingHorizontal: 0,
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    languagesList: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 25,
        backgroundColor: COLORS.white,
    },

    languageButton: {
        padding: 10,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
    },
    lngName: {
        fontSize: 16,
        color: 'black',
    },
});

export default GenericSetupScreen;