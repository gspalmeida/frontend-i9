import axios from 'axios';
// import { BASEURL as baseURL } from '@env';

const api = axios.create({
  baseURL: 'https://provai9.cuideme.care:1919/',
});

export default api;
