import { NumberFormatBase } from 'react-number-format';
import { getAccessToken, getAuth, getLanguage, logout } from '@/utils/auth';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Router from 'next/router';

const URL_API = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const accessToken = getAccessToken();
    const language = getLanguage();

    config.headers = {
      'Accept-Language': 'en',
      'Access-Control-Allow-Origin': '*',
    };
    if (!!accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['Accept-Language'] = language ? language : 'en';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error);
    // if (error?.response) {
    //   handleErrorApi(error?.response?.status);
    // }
    return Promise.reject(error);
  }
);

const handleErrorApi = (status: number) => {
  switch (status) {
    case 401:
      logout();
      break;
    case 403:
      logout();

      break;

    case 500:
      Router.push('/500');
  }
};
