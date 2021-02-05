import axios from 'axios';
// import { BASEURL as baseURL } from '@env';

const api = axios.create({
  baseURL: 'https://18.229.244.224:1919',
});

export default api;
