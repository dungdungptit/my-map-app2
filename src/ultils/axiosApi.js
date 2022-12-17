import axios from 'axios';

export const assetUrl = 'http://192.168.1.6:5000/uploads/';
export const BASE_URL = axios.defaults.baseURL = 'http://192.168.1.6:5000/api/v1';
export const BASE_URL_AUTH = 'http://192.168.1.6:5000/api/auth';

export const token = JSON.parse(localStorage.getItem('token'));