import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from '../../context/UserLocationContext';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions } from 'react-native';
import PlaceMarker from '../Map/PlaceMarker';
import * as Location from "expo-location";

export default function GoogleMapViewFull({placeList}) {
    const [mapRegion, setMapRegion] = useState({
        latitude: 21.005208714299744,
        longitude: 105.84385906679833,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [errorMsg, setErrorMsg] = useState(null);

    const userLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted') {
            setErrorMsg("Permission to access location was denied");
            return;
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }

    useEffect(() => {
        userLocation();
    }, []);

    return (
        <View>
            <MapView
                style={{
                    width: Dimensions.get("screen").width,
                    height: Dimensions.get("screen").height * 0.89,
                }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={mapRegion}
            >
                <Marker
                    title="You"
                    coordinate={mapRegion}
                />
                {placeList.map((item,index)=>index<=4&&(
                    <PlaceMarker item={item} key={index} />
                ))}

            </MapView>
        </View>
    )
}