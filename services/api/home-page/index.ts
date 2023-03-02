import axiosClient from '@/services/api/axiosClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL_WEB;

export const GET_BANNERS = `${API_URL}/banners`;

const bannerApi = {
  getAll() {
    return axiosClient.get(GET_BANNERS);
  },
  getHomeLayout() {
    return axiosClient.get(`${API_URL}/home/layout`)
  }
};

export default bannerApi;
