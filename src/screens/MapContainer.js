import React from 'react';
import { View, Text, Dimensions, AsyncStorage, Linking, Platform, Vibration, Alert } from 'react-native';
import { Button } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import DispatchApi from '../api/DispatchApi';
import { getLocation } from '../services/location-service';
import mapcontainerstyles from "./mapcontainerstyles";
import Home from '../components/Home';
import TripView from './TripView';
import Modal from "react-native-modal";
import socketIOClient from 'socket.io-client';
import Spinner from 'react-native-loading-spinner-overlay';
import registerForPushNotificationsAsync from '../components/RegisterForPushNotification';

class MapContainer extends React.Component {
    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
        },
        isLoading: false,
        isModalVisible: false,
        showCompleteTrip: false
    };

    async componentDidMount() {
        this.getInitialState();
        const token = await AsyncStorage.getItem('driverToken');
        const socket = socketIOClient('https://limitless-cliffs-70609.herokuapp.com/?token=' + token + '&user=driver');
        this.setState({ driverSocket: socket });

        registerForPushNotificationsAsync();

        socket.on('new_trip_request', (data) => {
            console.log(data);
            this.setState({ isModalVisible: true, tripRequestData: data });
            Vibration.vibrate(10000);
        });

        socket.on('trip_request_response', (data) => {

            console.log(data);
            this.setState({ trip: { tripId: data.tripId, userId: data.userId, driverId: data.driverId } })
        });

        socket.on('trip_canceled_by_driver', (data) => {

            this.setState({ trip: {}, isLoading: false, tripAccepted: false });
            Alert.alert(
                '',
                `Trip Canceled`,
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('MapContainer', { pageStatus: '' }) },
                ],
                { cancelable: false },
            );
        });

        socket.on('trip_canceled_by_rider', (data) => {

            Alert.alert(
                '',
                `Trip canceled by rider`,
                [
                    { text: 'OK', onPress: () => { this.setState({ tripAccepted: false }); this.props.navigation.navigate('MapContainer', { pageStatus: '' }) } },
                ],
                { cancelable: false },
            );
        });

        if (this.state.isLoading) {
            setInterval(() => {
                this.setState({ isLoading: false });
            }, 10000);
        }
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                console.log(data);
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                });
            }
        );
    }

    getCoordsFromName(loc) {
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            }
        });
    }

    onMapRegionChange(region) {
        this.setState({ region });
    }

    acceptTrip = () => {

        Vibration.cancel();
        this.state.driverSocket.emit('is_trip_accepted', true);
        this.setState({ isModalVisible: false });
        this.setState({ tripAccepted: true });
    }

    denyTrip = () => {

        Vibration.cancel();
        this.state.driverSocket.emit('is_trip_accepted', false);
        this.setState({ isModalVisible: false });
        this.setState({ tripAccepted: false });
    }

    navigateToRider = () => {
        if (Platform.OS === 'android')
            Linking.openURL(`google.navigation:q=${this.state.tripRequestData.userRegion.latitude}+${this.state.tripRequestData.userRegion.longitude}`)
        else Linking.openURL(`maps://app?saddr=${this.state.region.latitude}+${this.state.region.longitude}&daddr=${this.state.tripRequestData.userRegion.latitude}+${this.state.tripRequestData.userRegion.longitude}`)
    }

    startTrip = () => {
        if (Platform.OS === 'android')
            Linking.openURL(`google.navigation:q=${this.state.tripRequestData.place.latitude}+${this.state.tripRequestData.place.longitude}`)
        else Linking.openURL(`maps://app?saddr=${this.state.region.latitude}+${this.state.region.longitude}&daddr=${this.state.tripRequestData.place.latitude}+${this.state.tripRequestData.place.longitude}`)
        this.state.driverSocket.emit('trip_started', this.state.trip);
        this.setState({ showCompleteTrip: true });
    }

    cancelTrip = () => {
        this.setState({ isLoading: true, showCompleteTrip: false, tripAccepted: false });
        this.state.driverSocket.emit('cancel_trip_driver', this.state.trip);
    }

    completeTrip = () => {
        this.state.driverSocket.emit('complete_trip', this.state.trip);
        this.setState({ showCompleteTrip: false, tripAccepted: false });
        this.props.navigation.navigate('MapContainer', { pageStatus: '' });
    }

    render() {

        const { navigate } = this.props.navigation;

        let component = null;
        if (this.state.tripAccepted)
            component = <TripView navigateToRider={this.navigateToRider} startTrip={this.startTrip} cancelTrip={this.cancelTrip} completeTrip={this.completeTrip} navigate={navigate} showCompleteTrip={this.state.showCompleteTrip} />;
        else
            component = <Home navigation={this.props.navigation} />;


        const deviceHeight = Dimensions.get("window").height;
        const deviceWidth = Dimensions.get("window").width;

        return (

            <View style={mapcontainerstyles.container}>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={''}
                    textStyle={{ color: '#FFF' }}
                />
                <Modal
                    isVisible={this.state.isModalVisible}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", color: 'white', margin: 10 }}>New Trip Request</Text>
                        <Button style={{ marginVertical: 10 }} success block onPress={() => this.acceptTrip()}><Text> Accept </Text></Button>
                        <Button style={{ marginVertical: 10 }} danger block onPress={() => this.denyTrip()}><Text> Cancel </Text></Button>
                    </View>
                </Modal>

                <MapView
                    style={
                        this.props.pageStatus === "confirmRide"
                            ? mapcontainerstyles.confirmmap
                            : this.props.pageStatus === "rideBooked" &&
                                this.props.tripStatus !== "onTrip"
                                ? mapcontainerstyles.ridebookedmmap
                                : this.props.tripStatus === "onTrip"
                                    ? mapcontainerstyles.ontripmap
                                    : mapcontainerstyles.map
                    }
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    followsUserLocation
                    fitToElements={MapView.IMMEDIATE_FIT}
                    region={this.state.region}
                    //maxZoomLevel={15}
                    showsCompass={false}
                    onUserLocationChange={(e) => {
                        const { latitude, longitude } = e.nativeEvent.coordinate;
                        DispatchApi.post('/updateLocation', { latitude, longitude })
                            .then()
                            .catch((error) => {
                            });
                    }}
                >
                </MapView>

                {component}
            </View>

        );
    }
}

export default MapContainer;