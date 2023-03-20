import { alertActions } from './../alert/alertSlice';
import { ResponseAddCardToCustomer, ResponseCreateCard } from './../../declares/models/Payment';
import { ResponseGetListProduct } from '@/declares/models/Payment';
import paymentApi from '@/services/api/payment';
import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { paymentActions } from './paymentSlice';

function* handleGetListProduct() {
  try {
    const response: ResponseGetListProduct = yield call(paymentApi.getListProduct);

    yield put(paymentActions.getListProductSuccess(response?.data));
  } catch (error) {
    yield put(paymentActions.getListProductFail('An error occurred, please try again'));
  }
}

function* handleAddCardToCustomer(action: {
  payload: {
    formData: URLSearchParams;
    stripeCustomerId: string;
    setSubmitting: (isSubmitting: boolean) => void;
  };
}) {
  try {
    const responseCreateCard: ResponseCreateCard = yield call(
      paymentApi.createCardToCusTomer,
      action.payload.formData
    );

    const cardData = {
      cardObj: {
        token: responseCreateCard?.id,
      },
      stripeCustomerId: action.payload.stripeCustomerId,
    };
    const responseAddCard: ResponseAddCardToCustomer = yield call(
      paymentApi.addCardToCustomer,
      cardData
    );
    yield put(paymentActions.addCardToCustomerSuccess({}));
    yield put(
      alertActions.showAlert({
        text: 'Add card successfuly',
        type: 'success',
      })
    );
  } catch (error: any) {
    yield put(paymentActions.addCardToCustomerFail('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text:
          error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          'Add card fail',
        type: 'error',
      })
    );
    action.payload.setSubmitting(false);
  }
}

function* paymentFlow() {
  yield all([takeLatest(paymentActions.getListProduct, handleGetListProduct)]);
  yield all([takeLatest(paymentActions.addCardToCustomer, handleAddCardToCustomer)]);
}

export function* paymentSaga() {
  yield fork(paymentFlow);
}
