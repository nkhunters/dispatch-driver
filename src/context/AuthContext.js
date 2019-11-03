import createDataContext from './createDataContext';
import DispatchApi from '../api/DispatchApi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { ...state, errorMessage: '', token: action.payload };
        case 'signout':
            return { ...state, errorMessage: '', token: null };
        default: return state;
    }
};


const signIn = (dispatch) => {
    return async ({ email, password, setLoader }) => {

        try {
            const response = await DispatchApi.post('/signinDriver', { email, password });
            await AsyncStorage.setItem('driverToken', response.data.token);
            setLoader(false);
            dispatch({ type: 'signin', payload: response.data.token });
            navigate('MapContainer');
            console.log(response.data);
        }
        catch (err) {
            setLoader(false);
            dispatch({ type: 'add_error', payload: 'Something went wrong' });
        }
    };
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('driverToken');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('MapContainer');
    }
    else {
        navigate('SigninScreen');
    }
}

const signOut = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('driverToken');
        dispatch({ type: 'signout' });
        navigate('SigninScreen');
    };
};

export const { Provider, Context } = createDataContext(authReducer, { signIn, signOut, tryLocalSignin }, { tokek: null, errorMessage: '' });