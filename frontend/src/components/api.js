import axios from 'axios';
import {Platform} from 'react-native';

let baseURL;

if (Platform.OS === 'android') {
  baseURL = 'http://10.0.2.2:8080';
} else {
  baseURL = 'http://localhost:8080';
}

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
