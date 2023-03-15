import axiosClient from '@/services/api/axiosClient';
import axiosClient_V2 from '../axiosClient_V2';

const paymentApi = {
  getListProduct() {
    const url = 'payments/products';
    return axiosClient.get(url);
  },
};

export default paymentApi;
