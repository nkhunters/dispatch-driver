import React from 'react';
import { View, Platform, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "./styles";
import Form from "../components/Form";
const applogo = require('../../assets/logo.png');
import commonColor from "./commonColor";

const SigninScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: commonColor.brandPrimary }}>
            <View style={{ flex: 3 }}>
            <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}} scrollToEnd={true} enableResetScrollToCoords={true} enableOnAndroid={true} keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 3}}>
                    <View style={
                        Platform.OS === "ios"
                            ? styles.iosLogoContainer
                            : styles.aLogoContainer
                    }
                    >
                        <Image source={applogo} style={styles.logoStyle} />
                    </View>
                    <View style={styles.container}>
                        <View style={styles.triangleCorner}></View>
                    </View>
                    <View style={styles.loginViewStyle}>
                        <Form />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
};


export default SigninScreen;