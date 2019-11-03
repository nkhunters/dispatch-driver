import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { View } from 'native-base';

const Logout = () => {

    const { signOut } = useContext(AuthContext);
    signOut();
    return (
        <View />
    );
}

export default Logout;