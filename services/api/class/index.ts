import axiosClient from '@/services/api/axiosClient';

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
    return axiosClient.get(url);
  },
  getListCategory(params: any) {
    const url = '/categories';
    return axiosClient.get(url, { params });
  },
};

export default classAPI;
