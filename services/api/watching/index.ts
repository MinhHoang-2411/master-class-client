import { WatchingPayload } from '@/declares/models/Watching';
import axiosClient from '@/services/api/axiosClient';

interface ParamsFetchDataModel {
  page: number;
  limit: number;
  search?: string;
  categories?: string;
}

const watchingApi = {
  createOrUpdateMyWatching(params: ParamsFetchDataModel) {
    const url = 'watchings/create-or-update';
    return axiosClient.post(url, params);
  },
  getMyWatching(params: any) {
    const url = 'watchings';
    return axiosClient.get(url, { params });
  },
};

export default watchingApi;
