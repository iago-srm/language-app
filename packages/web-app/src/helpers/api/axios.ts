import axios from 'axios';
import { useUser, LocalStorage } from '@helpers';

export const BASE_AUTH_URL = 'localhost:3000';

const axiosAuthAPI = axios.create({ baseURL: BASE_AUTH_URL });
const refreshTokenLocalStorage = new LocalStorage().getRefreshToken();
axiosAuthAPI.defaults.headers.common['Authorization'] = refreshTokenLocalStorage;

export const authAxiosGetFetcher = (url: string) => axiosAuthAPI.get(url).then(res => res.data);
