export interface ResponseGetListProduct {
  success?: boolean;
  message?: string;
  data?: {
    id: string;
    amount: number;
    currency: string;
    intervalCount: number;
    productId: string;
    priceId: string;
    name: string;
    interval: string;
  }[];
}

export interface ResponseGetListCard {
  success: boolean;
  message: string;
  data: {
    id: string;
    isDefault: boolean;
    cardId: string;
    brand: string;
    last4: string;
    stripeCustomerId: string;
  }[];
}

export interface ResponseGetListSubscription {
  success: boolean;
  message: string;
  data: [
    {
      id: string;
      cancelAtPeriodEnd: boolean;
      cancelAt?: any;
      canceledAt?: any;
      subscriptionId: string;
      status: string;
      currentPeriodEnd: number;
      currentPeriodStart: number;
      stripeCustomerId: string;
      productpayments: {
        name: string;
        interval: string;
        amount: number;
        currency: string;
        intervalCount: number;
        productId: string;
      };
    }
  ];
}

export interface ResponseCreateCard {
  data: {
    token: string;
  };
  message: string;
  success: boolean;
}

export interface ResponseAddCardToCustomer {
  data?: {
    cardId: string;
    id: string;
  };
}

export interface ResponseCreateSubscription {
  success: boolean;
  message: string;
  data: boolean;
}
