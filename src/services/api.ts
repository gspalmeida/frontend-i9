import axios from 'axios';
// import { BASEURL as baseURL } from '@env';

const api = axios.create({
  baseURL: 'https://provai9.cuideme.care/',
});

export default api;
