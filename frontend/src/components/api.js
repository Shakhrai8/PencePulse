import axios from 'axios';
import {Platform} from 'react-native';

const baseURL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

const instance = axios.create({
  baseURL,
});

const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export {setAuthToken};
export default instance;
