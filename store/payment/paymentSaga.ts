import { alertActions } from './../alert/alertSlice';
import {
  ResponseAddCardToCustomer,
  ResponseCreateCard,
  ResponseCreateSubscription,
  ResponseGetListCard,
} from './../../declares/models/Payment';
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

function* handleGetListCard() {
  try {
    const response: ResponseGetListCard = yield call(paymentApi.getListCard);

    yield put(paymentActions.getListCardSuccess(response?.data));
  } catch (error) {
    yield put(paymentActions.getListCardFail('An error occurred, please try again'));
  }
}

function* handleAddCardToCustomer(action: {
  payload: {
    formData: URLSearchParams;
    stripeCustomerId: string;
    setSubmitting: (isSubmitting: boolean) => void;
    priceId: string;
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
    const subscriptionParams = {
      priceId: action.payload.priceId,
      paymentMethod: responseAddCard.data?.cardId,
      stripeCustomerId: action.payload.stripeCustomerId,
      setSubmitting: action.payload.setSubmitting,
    };
    yield put(paymentActions.createSubscription(subscriptionParams));
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

function* handleCreateSubscription(action: {
  payload: {
    priceId: string;
    paymentMethod: string;
    stripeCustomerId: string;
    setSubmitting?: (isSubmitting: boolean) => void;
  };
}) {
  try {
    const response: ResponseCreateSubscription = yield call(
      paymentApi.createSubscription,
      action.payload
    );
    yield put(
      alertActions.showAlert({
        text: 'Create Subscription successfully',
        type: 'success',
      })
    );
    yield put(paymentActions.createSubscriptionSuccess({}));
    yield put(paymentActions.getListCard({}));
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

    if (action.payload.setSubmitting) {
      action.payload.setSubmitting(false);
    }
  }
}

function* paymentFlow() {
  yield all([takeLatest(paymentActions.getListProduct, handleGetListProduct)]);
  yield all([takeLatest(paymentActions.getListCard, handleGetListCard)]);
  yield all([takeLatest(paymentActions.addCardToCustomer, handleAddCardToCustomer)]);
  yield all([takeLatest(paymentActions.createSubscription, handleCreateSubscription)]);
}

export function* paymentSaga() {
  yield fork(paymentFlow);
}
