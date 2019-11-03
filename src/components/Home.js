import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform, Switch } from 'react-native';
import DispatchApi from '../api/DispatchApi';
import { Entypo } from '@expo/vector-icons';
import { Item, Input } from "native-base";

const deviceWidth = Dimensions.get("window").width;

const Home = ({ navigation }) => {

    const [switchValue, setSwitchValue] = useState(true);

    return (

        <View pointerEvents="box-none" style={{ flex: 1, position: "relative" }}>

            <View style={styles.headerContainer} pointerEvents="box-none">
                <View style={{ flex: 0.8, height: 35 }}>
                </View>
                <View
                    style={Platform.OS === "ios" ? styles.iosSrcdes : styles.aSrcdes}
                >

                    <View style={Platform.OS === "ios" ? styles.iosSearchBar : styles.aSearchBar}>
                        <Item
                            regular
                            style={{
                                backgroundColor: "#FFF",
                                marginLeft: 0,
                                borderColor: "transparent",
                                borderRadius: 10
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => { navigation.openDrawer() }}>
                                <Entypo name="menu" style={styles.searchIcon} />
                            </TouchableOpacity>

                            <Input
                                type="text"
                                placeholder="Available"
                                placeholderTextColor="#9098A1"
                                editable={false}
                                style={{ fontSize: 16, fontWeight: '500' }}
                            />
                            <Switch
                                value={switchValue}
                                onValueChange={(value) => {
                                    setSwitchValue(value);
                                    DispatchApi.post('/updateAvailableStatus', { 'status': value == true ? 1 : 0 })
                                        .then()
                                        .catch(function (error) {
                                            console.log(error);
                                        })
                                        .finally(function () {
                                            // always executed
                                        });
                                }}
                            />
                        </Item>
                    </View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    iosSearchBar: {
        width: deviceWidth - 30,
        alignSelf: "center",
        //marginTop: 10,
        //paddingLeft: 5,
        flex: 1,
        shadowColor: "#aaa",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
        //paddingTop: 12,
        //margin: 10
    },
    aSearchBar: {
        width: deviceWidth - 30,
        alignSelf: "center",
        //marginTop: 10,
        //paddingLeft: 5,
        flex: 1,
        shadowColor: "#aaa",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
        //paddingTop: 9,
        //margin: 10
    },
    searchBar: {
        width: deviceWidth - 30,
        alignSelf: "center",
        backgroundColor: "#EEE",
        borderRadius: 10,
        marginLeft: -5,
        marginTop: 5,
        shadowColor: "#aaa",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
    },
    searchIcon: {
        fontSize: 25,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignSelf: "center",
        flex: 0,
        left: 0,
        color: "#818183",
        marginHorizontal: 5
    },
    aSrcdes: {
        paddingVertical: 7
    },
    iosSrcdes: {
        //paddingVertical: 25,
        paddingHorizontal: 20
    },
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#fff"
    },

    map: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff"
    },

    headerContainer: {
        position: "absolute",
        top: 0,
        width: deviceWidth
    },
    iosHeader: {
        backgroundColor: "#fff"
    },
    aHeader: {
        backgroundColor: "#fff",
        borderColor: "#aaa",
        elevation: 3,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
});

export default Home;