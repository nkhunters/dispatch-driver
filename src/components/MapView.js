import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const MyMapView = (props) => {
    return (
        <MapView
            style={{ flex: 1 }}
            region={props.region}
            showsUserLocation={true}
        >
            {<Marker coordinate={props.region} />}
        </MapView>
    )
}
export default MyMapView;