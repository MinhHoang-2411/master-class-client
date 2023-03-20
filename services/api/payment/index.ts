import axiosPayment from '@/services/api/axiosPayment';
import axiosClient from '@/services/api/axiosClient';
import axiosClient_V2 from '../axiosClient_V2';

const paymentApi = {
  getListProduct() {
    const url = 'payments/products';
    return axiosClient.get(url);
  },
  createCardToCusTomer(params: URLSearchParams) {
    const url = 'https://api.stripe.com/v1/tokens';
    return axiosPayment.post(url, params, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  addCardToCustomer(params: any) {
    const url = '/payments/customers/cards';
    return axiosClient.post(url, params);
  },
};

export default paymentApi;
