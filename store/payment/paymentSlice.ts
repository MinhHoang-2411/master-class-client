import { createSlice } from '@reduxjs/toolkit';

interface IPaymentState {
  loadingGetListProduct: boolean;
  loadingGetListCard: boolean;
  loadingGetListSubscription: boolean;
  loadingDeleteSubscription: boolean;
  loadingDeleteCard: boolean;
  isPayment: boolean;

  listProduct:
    | {
        _id: string;
        amount: number;
        currency: string;
        intervalCount: number;
        productId: string;
        priceId: string;
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
    priceId?: string;
    productId?: string;
    _id?: string;
  };

  listCard:
    | {
        _id?: string;
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
        _id: string;
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
      console.log('Add card fail');
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
      console.log('create subscription fail');
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
      console.log('Add card fail');
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
      console.log('get list card fail');
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
      console.log('get list subscription fail');
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
      console.log('Delete subscription fail');
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
      console.log('Delete card fail');
    },

    //check payment
    isPayment: (state) => {
      state.isPayment = true;
    },
    isNotPayment: (state) => {
      state.isPayment = false;
    },
  },
});

export const paymentReducer = paymentSlice.reducer;
export const paymentActions = paymentSlice.actions;
