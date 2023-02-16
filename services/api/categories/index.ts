import axiosClient from '@/services/api/axiosClient';

interface ParamsFetchDataModel {
  page: number;
  limit: number;
}

const categoriesAPI = {
  fetchData(params: ParamsFetchDataModel) {
    const url = '/categories';
    return axiosClient.get(url, { params });
  },
};

export default categoriesAPI;
