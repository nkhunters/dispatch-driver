import React from 'react';
import { Text, FlatList } from 'react-native';
import DispatchApi from '../api/DispatchApi';
import { Container, Header, Content, ListItem, Left, Body, Button, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

export default class TripHistory extends React.Component {

    state = {
        loading: true,
        tripHistory: []
    }

    componentDidMount() {
        DispatchApi.get('/getTripHistory')
            .then(response => this.setState({ tripHistory: response.data, loading: false }))
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    render() {
        return (
            <Container>
                <Spinner
                    visible={this.state.loading}
                    textContent={''}
                />
                <Header>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Trip History</Text>
                    </Body>
                </Header>
                <Content>

                    <FlatList
                        keyExtractor={(item) => {
                            return item._id;
                        }}
                        data={this.state.tripHistory}
                        renderItem={({ item }) => {
                            date = new Date(item.timestamp).toLocaleString();

                            return (
                                <ListItem>
                                    <Body>
                                        <Text style={{ fontWeight: 'bold' }}>{`From - ${item.sourceMainName}`}</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{`To - ${item.destMainName}`}</Text>
                                        <Text note>{`Rider - ${item.userName}`}</Text>
                                        <Text note>{date}</Text>
                                    </Body>
                                </ListItem>
                            )
                        }}
                    />
                </Content>
            </Container>
        );
    }
}