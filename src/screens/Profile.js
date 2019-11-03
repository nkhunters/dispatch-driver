import React from 'react';
import { Button } from 'react-native';

export default class Profile extends React.Component {
    
    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('TripHistory')}
                title="Go to trip history"
            />
        );
    }
}