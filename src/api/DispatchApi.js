import axios from 'axios';
import {AsyncStorage} from 'react-native';

const instance = axios.create({
    baseURL: 'https://limitless-cliffs-70609.herokuapp.com/'
});

instance.interceptors.request.use(

    async config => {
        const token = await AsyncStorage.getItem('driverToken');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    err => {
        Promise.reject(err);
    }
);

export default instance;