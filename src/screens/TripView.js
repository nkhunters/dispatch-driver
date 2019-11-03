import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Text } from "native-base";
import commonColor from "./commonColor";

const deviceWidth = Dimensions.get("window").width;

const TripView = ({ navigateToRider, startTrip, cancelTrip, completeTrip, navigate, showCompleteTrip }) => {

    return (
        <View
            style={{ position: 'absolute', height: '100%', width: '100%' }}
        >

            <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', height: 230, backgroundColor: commonColor.brandPrimary }}>
                <TouchableOpacity
                    style={{ width: '80%', height: 40, marginTop: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: commonColor.brandInfo }}
                    onPress={() => {
                        navigateToRider()
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: "500", }}>Navigate to Rider</Text>
                </TouchableOpacity>
                {!showCompleteTrip ? <TouchableOpacity
                    style={{ width: '80%', height: 40, marginTop: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: commonColor.brandInfo }}
                    onPress={() => {
                        startTrip()
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: "500", }}>Start Trip</Text>
                </TouchableOpacity> : null}

                {showCompleteTrip ? <TouchableOpacity
                    style={{ width: '80%', height: 40, marginTop: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: commonColor.brandInfo }}
                    onPress={() => {
                        completeTrip()
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: "500", }}>Complete Trip</Text>
                </TouchableOpacity> : null}


                <TouchableOpacity
                    style={{ width: '80%', height: 40, marginTop: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: commonColor.brandInfo }}
                    onPress={() => {
                        cancelTrip()
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: "500", }}>Cancel Trip</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


export default TripView;