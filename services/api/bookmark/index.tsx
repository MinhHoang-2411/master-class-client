import axiosClient from '@/services/api/axiosClient';
import { getAuth } from '@/utils/auth';

const bookmarkApi = {
  getAllFavourite(token: any) {
    
    console.log('token', token)

    const url = '/favourites?modelType=LESSONS';
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default bookmarkApi;
