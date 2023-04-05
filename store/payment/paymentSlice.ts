import { createSlice } from '@reduxjs/toolkit';

interface IPaymentState {
  loadingGetListProduct: boolean;
  loadingGetListCard: boolean;
  loadingGetListSubscription: boolean;
  loadingDeleteSubscription: boolean;
  loadingDeleteCard: boolean;
  isPayment: boolean;
  loadingCheckPayment: boolean;

  listProduct:
    | {
        id: string;
        amount: number;
        currency: string;
        intervalCount: number;
        productStripeId: string;
        priceStripeId: string;
        name: string;
        interval: string;
      }[]
    | [];

  detailProduct: {
    amount?: number;
    currency?: string;
    interval?: string;
    intervalCount?: number;
    name?: string;
    priceStripeId?: string;
    productStripeId?: string;
    id?: string;
  };

  listCard:
    | {
        id?: string;
        isDefault?: boolean;
        cardId?: string;
        brand?:
          | 'Visa'
          | 'MasterCard'
          | 'American Express'
          | 'Discover'
          | 'Diners Club'
          | 'JCB'
          | 'UnionPay'
          | '';
        last4?: string;
        stripeCustomerId?: string;
      }[]
    | [];

  listSubscription:
    | {
        id: string;
        cancelAtPeriodEnd: false;
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
      }[]
    | [];
  modalChoosePayment: {
    isOpen: boolean;
  };
  modalAddCardAndPay: {
    isOpen: boolean;
    isLoadingAddCard: boolean;
  };
  modalAddCard: {
    isOpen: boolean;
    isLoadingAddCard: boolean;
  };
}

const initialState: IPaymentState = {
  loadingGetListProduct: false,
  loadingGetListCard: false,
  loadingGetListSubscription: false,
  loadingDeleteSubscription: false,
  loadingDeleteCard: false,
  isPayment: false,
  loadingCheckPayment: true,

  listProduct: [],
  detailProduct: {},
  listCard: [],
  listSubscription: [],
  modalChoosePayment: {
    isOpen: false,
  },

  modalAddCardAndPay: {
    isOpen: false,
    isLoadingAddCard: false,
  },

  modalAddCard: {
    isOpen: false,
    isLoadingAddCard: false,
  },
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    //Choose payment Modal
    openModalChoosePayment: (state) => {
      state.modalChoosePayment.isOpen = true;
    },
    closeModalChoosePayment: (state) => {
      state.modalChoosePayment.isOpen = false;
    },

    //Add card and pay Modal
    openModalAddCardAndPay: (state) => {
      state.modalAddCardAndPay.isOpen = true;
    },
    closeModalAddCardAndPay: (state) => {
      state.modalAddCardAndPay.isOpen = false;
    },

    addCardAndPayToCustomer: (state, action) => {
      state.modalAddCardAndPay.isLoadingAddCard = true;
    },
    addCardAndPayToCustomerFail: (state, action) => {
      state.modalAddCardAndPay.isLoadingAddCard = false;
    },

    //
    createSubscription: (state, action) => {
      state.modalAddCardAndPay.isLoadingAddCard = true;
    },
    createSubscriptionSuccess: (state, action) => {
      state.modalAddCardAndPay.isLoadingAddCard = false;
      state.modalAddCardAndPay.isOpen = false;
      state.modalChoosePayment.isOpen = false;
    },
    createSubscriptionFail: (state) => {
      state.modalAddCardAndPay.isLoadingAddCard = false;
    },

    //Add Card Modal
    openModalAddCard: (state) => {
      state.modalAddCard.isOpen = true;
    },
    closeModalAddCard: (state) => {
      state.modalAddCard.isOpen = false;
    },
    addCardToCustomer: (state, action) => {
      state.modalAddCard.isLoadingAddCard = true;
    },
    addCardToCustomerSuccess: (state) => {
      state.modalAddCard.isLoadingAddCard = false;
      state.modalAddCard.isOpen = false;
    },
    addCardToCustomerFail: (state, action) => {
      state.modalAddCard.isLoadingAddCard = false;
    },

    //get list product
    getListProduct: (state) => {
      state.loadingGetListProduct = true;
    },
    getListProductSuccess: (state, action) => {
      state.loadingGetListProduct = false;
      state.listProduct = action.payload;
    },
    getListProductFail: (state, action) => {
      state.loadingGetListProduct = false;
      console.error(action.payload);
    },

    //detail product
    getDetailProduct: (state, action) => {
      state.detailProduct = action.payload;
    },

    //get list card
    getListCard: (state, action) => {
      state.loadingGetListCard = true;
    },
    getListCardSuccess: (state, action) => {
      state.loadingGetListCard = false;
      state.listCard = action.payload;
      localStorage.setItem('listCard', action.payload);
    },
    getListCardFail: (state, action) => {
      state.loadingGetListCard = false;
    },

    //get list subscription
    getListSubscription: (state) => {
      state.loadingGetListSubscription = true;
    },
    getListSubscriptionSuccess: (state, action) => {
      state.loadingGetListCard = false;
      state.listSubscription = action.payload;
    },
    getListSubscriptionFail: (state, action) => {
      state.loadingGetListSubscription = false;
    },

    //delete subscription
    deleteSubscription: (state, action) => {
      state.loadingDeleteSubscription = true;
    },
    deleteSubscriptionSuccess: (state) => {
      state.loadingDeleteSubscription = false;
    },
    deleteSubscriptionFail: (state, action) => {
      state.loadingDeleteSubscription = false;
    },

    //delete card
    deleteCard: (state, action) => {
      state.loadingDeleteCard = true;
    },
    deleteCardSuccess: (state) => {
      state.loadingDeleteCard = false;
    },
    deleteCardFail: (state) => {
      state.loadingDeleteCard = false;
    },

    //check payment
    isPayment: (state) => {
      state.isPayment = true;
      state.loadingCheckPayment = false;
    },
    isNotPayment: (state) => {
      state.isPayment = false;
      state.loadingCheckPayment = false;
    },
  },
});

export const paymentReducer = paymentSlice.reducer;
export const paymentActions = paymentSlice.actions;
