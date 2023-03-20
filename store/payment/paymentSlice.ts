import { createSlice } from '@reduxjs/toolkit';

interface IPaymentState {
  loadingGetListProduct: boolean;
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
  modalChoosePayment: {
    isOpen: boolean;
  };
  modalPaymentDetail: {
    isOpen: boolean;
  };
  modalAddCard: {
    isOpen: boolean;
    isLoadingAddCard: boolean;
  };
}

const initialState: IPaymentState = {
  loadingGetListProduct: false,

  listProduct: [],
  detailProduct: {},
  modalChoosePayment: {
    isOpen: false,
  },
  modalPaymentDetail: {
    isOpen: false,
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

    //Add card Modal
    openModalAddCard: (state) => {
      state.modalAddCard.isOpen = true;
    },
    closeModalAddCard: (state) => {
      state.modalAddCard.isOpen = false;
    },

    addCardToCustomer: (state, action) => {
      state.modalAddCard.isLoadingAddCard = true;
    },
    addCardToCustomerSuccess: (state, action) => {
      state.modalAddCard.isLoadingAddCard = false;
      state.modalAddCard.isOpen = false;
    },
    addCardToCustomerFail: (state, action) => {
      state.modalAddCard.isLoadingAddCard = false;
      console.log('Add card fail');
    },

    //Payment detail Modal
    openModalPaymentDetail: (state) => {
      state.modalPaymentDetail.isOpen = true;
    },
    closeModalPaymentDetail: (state) => {
      state.modalPaymentDetail.isOpen = false;
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
  },
});

export const paymentReducer = paymentSlice.reducer;
export const paymentActions = paymentSlice.actions;
