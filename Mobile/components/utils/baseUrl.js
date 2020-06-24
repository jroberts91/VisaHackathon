import axios from 'react-native-axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

export const baseUrl = `http://${manifest.debuggerHost.split(':').shift()}:3001/`;

export default axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
