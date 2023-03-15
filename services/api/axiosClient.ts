import { getAccessToken, getAuth } from '@/utils/auth';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

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
    const auth = getAuth();
    const accessToken = getAccessToken();
    // if (auth) {
    //   config.headers = {
    //     Authorization: `Bearer ${auth.api_token}`,
    //   };
    // }

    config.headers = {
      'Accept-Language': 'en',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${accessToken}`,
    };

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
    return Promise.reject(error);
  }
);
