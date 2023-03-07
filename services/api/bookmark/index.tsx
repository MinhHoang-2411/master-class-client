import axiosClient_V2 from '../axiosClient_V2';

const URL_API = process.env.NEXT_PUBLIC_API_URL;

const bookmarkApi = {
  getAllFavourite(token: any) {
    const url = `${URL_API}/favourites`;
    const params = {
      modelType: 'CLASSES',
    };
    return axiosClient_V2.get(url, { params });
  },
  postMyFavorite(params: any) {
    const url = `${URL_API}/favourites`;
    return axiosClient_V2.post(url, {
      modelId: params.modelId,
      modelType: params.modelType,
    });
  },
  deleteMyFavorite(params: any) {
    const url = `${URL_API}/favourites`;
    return axiosClient_V2.delete(url, { data: params });
  },
};

export default bookmarkApi;
