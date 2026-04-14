import axios from 'axios';
import { Envs } from '@constants/envs';
import localStorageService from './localStorage.service';

export const httpClient = axios.create({
  baseURL: Envs.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorageService.getToken();
  if (token) { config.headers.Authorization = `Bearer ${token}`; }
  return config;
});

httpClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

export interface IAxiosError {
  response: {
    data: {
      error: string;
    };
  };
}
