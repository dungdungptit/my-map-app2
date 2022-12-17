import axios from 'axios';

export const assetUrl = 'http://192.168.88.124:3001/uploads/';
export const BASE_URL = axios.defaults.baseURL = 'http://192.168.88.124:3001/api/v1';
export const BASE_URL_AUTH = 'http://192.168.88.124:3001/api/auth';

export const token = localStorage.getItem('token');