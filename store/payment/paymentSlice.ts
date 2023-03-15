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
  modalChoosePayment: {
    isOpen: boolean;
  };
}

const initialState: IPaymentState = {
  loadingGetListProduct: false,

  listProduct: [],
  modalChoosePayment: {
    isOpen: false,
  },
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    openModalChoosePayment: (state) => {
      state.modalChoosePayment.isOpen = true;
    },
    closeModalChoosePayment: (state) => {
      state.modalChoosePayment.isOpen = false;
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
  },
});

export const paymentReducer = paymentSlice.reducer;
export const paymentActions = paymentSlice.actions;
