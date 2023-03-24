import axiosClient from '@/services/api/axiosClient';
import axiosClient_V2 from '../axiosClient_V2';

interface ParamsFetchDataModel {
  page: number;
  limit: number;
  search?: string;
  categories?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL_WEB;

const classAPI = {
  fetchData(params: ParamsFetchDataModel) {
    const url = '/courses';
    return axiosClient.get(url, { params });
  },
  getDetailByWebName(params: any) {
    const url = `${API_URL}/courses/${params.webName}`;
    return axiosClient_V2.get(url);
  },

  getDetailByWebNameV1(params: any) {
    const url = `${API_URL}/courses/${params.webName}`;
    return axiosClient.get(url);
  },
  getListCategory(params: any) {
    const url = '/categories';
    return axiosClient.get(url, { params });
  },

  getDetailLesson(paramId: any) {
    const url = `/lessons/${paramId}`;
    return axiosClient.get(url);
  },
};

export default classAPI;
