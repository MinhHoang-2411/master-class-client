import { getAccessToken, getAuth, getLanguage } from '@/utils/auth';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosPayment = axios.create({
  baseURL: 'https://api.stripe.com/v1/tokens',
});

export default axiosPayment;

// Add a request interceptor
axiosPayment.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const language = getLanguage();

    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': 'en',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY}`,
    };
    config.headers['Accept-Language'] = language ? language : 'en';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosPayment.interceptors.response.use(
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
