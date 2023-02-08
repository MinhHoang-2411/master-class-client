import { ENV } from '@/declares/env';
import { ListResponse } from '@/declares/models/common';
import axiosClient from '@/utils/api/axiosClient';

const authApi = {
  getAll(): Promise<ListResponse<>{
    const url = `${ENV.REACT_APP_API_URL}/auth/login`;
    return axiosClient.get(url);
  },
};

export default authApi;
