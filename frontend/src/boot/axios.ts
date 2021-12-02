import axios from 'axios';

axios.defaults.withCredentials = true;
const api = axios.create({ baseURL: process.env.SERVER_URL_API });

export { api };
