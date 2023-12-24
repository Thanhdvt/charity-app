import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Logo = props => {
    return (
        <View style={styles.iconContainer}>
            <Text style={styles.textStyle}>{props.name}</Text>
        </View>
    )
}

export default Logo;

const styles =StyleSheet.create({
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: '#005082',
        overflow: 'hidden',
        justifyContent: 'center',
        borderWidth: 2,
        marginHorizontal: 10
    },
    textStyle: {
        fontSize:20,
        color: '#005082',
        textAlign: 'center',
        fontWeight: "bold"
    }
})