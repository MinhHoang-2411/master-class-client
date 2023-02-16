import axiosClient from '@/services/api/axiosClient';

interface ParamsFetchDataModel {
  page: number;
  limit: number;
  search?: string;
  categories?: string;
}

const classAPI = {
  fetchData(params: ParamsFetchDataModel) {
    const url = '/courses';
    return axiosClient.get(url, { params });
  },
};

export default classAPI;
