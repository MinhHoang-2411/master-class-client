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

export interface ResponseGetListCard {
  success: boolean;
  message: string;
  data: {
    _id: string;
    isDefault: boolean;
    cardId: string;
    brand: string;
    last4: string;
    stripeCustomerId: string;
  }[];
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
  };
}

export interface ResponseCreateSubscription {
  success: boolean;
  message: string;
  data: boolean;
}
