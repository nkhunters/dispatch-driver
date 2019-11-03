import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from "./styles";
import { Context as AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const Form = () => {

    const { state, signIn } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoader] = useState(false);

    return (
        <View>
            <Spinner
                visible={isLoading}
                textContent={''}
                textStyle={{ color: '#FFF' }}
            />
            <View style={styles.headingViewStyle}>
                <Text style={styles.headingTextStyle}>Login</Text>
            </View>

            <View style={styles.fieldViewStyleLogin}>
                <TextInput
                    style={{ flex: 1 }}
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={(newValue) => { setEmail(newValue) }}
                />
            </View>

            <View style={styles.fieldViewStyleLogin}>
                <TextInput
                    style={{ flex: 1 }}
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(newValue) => { setPassword(newValue) }}
                />
            </View>

            <View>
                <TouchableOpacity>
                    <Text style={styles.problemText}>Having Problems ?</Text>
                    {state.errorMessage ? <Text style={{ fontSize: 16, color: "red", alignSelf: "center", marginBottom: 5 }}>{state.errorMessage}</Text> : null}
                </TouchableOpacity >
            </View>

            <View>
            </View>
            <View>
                <TouchableOpacity style={styles.regBtn} onPress={() => { setLoader(true); signIn({ email, password, setLoader }) }}>
                    <Text style={{ color: "#fff", fontWeight: "900", fontSize: 22, alignSelf: "center", textAlign: "center", marginTop: 10 }}>GO</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};


export default Form;