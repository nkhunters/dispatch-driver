import React, { useState, useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { View, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';

const ResolveAuthScreen = () => {

    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {

        tryLocalSignin();
    }, []);

    return <View style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }}>
        < ActivityIndicator size="large" color="#0000ff" />
    </View>;
};

export default ResolveAuthScreen;