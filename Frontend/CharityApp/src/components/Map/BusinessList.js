import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {COLORS} from "../../constants";
import {LinearGradient} from 'expo-linear-gradient'
import BusinessItem from './BusinessItem'
import {useNavigation} from '@react-navigation/native'

export default function BusinessList({placeList}) {
    const navigation=useNavigation();
    return (
        <View >
            <LinearGradient
                // Background Linear Gradient
                colors={["transparent", COLORS.WHITE]}
                style={{ padding: 20,  width: Dimensions.get("screen").width }}
            >
                <FlatList
                    data={placeList}
                    horizontal={true}
                    renderItem={({item,index})=>index<=6&&(
                        <TouchableOpacity onPress={()=>navigation.navigate(
                            'place-detail',
                            {
                                place:item
                            }
                        )}>
                            <BusinessItem place={item} />
                        </TouchableOpacity>
                    )}
                />
            </LinearGradient>
        </View>
    )
}