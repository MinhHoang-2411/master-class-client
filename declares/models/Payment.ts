export interface ResponseGetListProduct {
  success?: boolean;
  message?: string;
  data?: {
    _id: string;
    amount: number;
    currency: string;
    intervalCount: number;
    productId: string;
    priceId: string;
    name: string;
    interval: string;
  }[];
}
