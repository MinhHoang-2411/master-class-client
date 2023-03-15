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

function* paymentFlow() {
  yield all([takeEvery(paymentActions.getListProduct, handleGetListProduct)]);
}

export function* paymentSaga() {
  yield fork(paymentFlow);
}
