import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GoogleMapViewFull from "../../components/Map/GoogleMapViewFull";
import SearchBar from "../../components/Map/SearchBar";
import {UserLocationContext} from "../../context/UserLocationContext";
import GlobalApi from "../../services/GlobalApi";
import BusinessList from "../../components/Map/BusinessList";

const MapScreen = () => {
    const [placeList,setPlaceList]=useState([]);
    // const {location,setLocation}=useContext(UserLocationContext);

    useEffect(()=>{
        GetNearBySearchPlace('restaurant');
    },[])
    const GetNearBySearchPlace=(value)=>{
        GlobalApi.searchByText(value).then(resp=>{
            setPlaceList(resp.data.results);
            console.log(placeList)
        })
    }
    return (
        <View>
            <View style={{position:'absolute',zIndex:20}}>
                <SearchBar setSearchText={(value)=>GetNearBySearchPlace(value)} />
            </View>
            <GoogleMapViewFull placeList={placeList}/>
            <View style={{position:'absolute',zIndex:20,bottom:0}}>
                <BusinessList placeList={placeList} />
            </View>

        </View>
    )
}
export default MapScreen;