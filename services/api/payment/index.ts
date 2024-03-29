import axiosPayment from '@/services/api/axiosPayment';
import axiosClient from '@/services/api/axiosClient';
import axiosClient_V2 from '../axiosClient_V2';

const paymentApi = {
  getListProduct() {
    const url = 'payments/products';
    return axiosClient.get(url);
  },
  createCardToCusTomer(params: any) {
    // const url = 'https://api.stripe.com/v1/tokens';
    // return axiosPayment.post(url, params, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY}`,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // });
    const url = '/payments/card-token';
    return axiosClient.post(url, params);
  },
  addCardToCustomer(params: any) {
    const url = '/payments/customers/cards';
    return axiosClient.post(url, params);
  },
  createSubscription(params: any) {
    const url = '/payments/subscriptions';
    return axiosClient.post(url, params);
  },

  getListCard() {
    const url = '/payments/customers/cards';
    return axiosClient.get(url);
  },
  getListSubscription() {
    const url = '/payments/subscriptions';
    return axiosClient.get(url);
  },
  deleteSubscription(params: any) {
    const url = '/payments/subscriptions/cancel';
    return axiosClient.post(url, params);
  },
  deleteCard(params: any) {
    const url = `/payments/customers/cards/${params}`;
    return axiosClient.delete(url);
  },
};

export default paymentApi;
