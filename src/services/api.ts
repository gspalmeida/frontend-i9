import axios from 'axios';
// import { BASEURL as baseURL } from '@env';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
