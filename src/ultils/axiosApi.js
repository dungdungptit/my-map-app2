import axios from 'axios';

// export const assetUrl = 'http://26.188.5.187:5000/';
// export const BASE_URL = axios.defaults.baseURL = 'http://26.188.5.187:5000/api/v1';
// export const BASE_URL_AUTH = 'http://26.188.5.187:5000/api/auth';
export const assetUrl = 'https://map-ws-exp.cleverapps.io/';
export const BASE_URL = axios.defaults.baseURL = 'https://map-ws-exp.cleverapps.io/api/v1';
export const BASE_URL_AUTH = 'https://map-ws-exp.cleverapps.io/api/auth';


export const token = JSON.parse(localStorage.getItem('token'));