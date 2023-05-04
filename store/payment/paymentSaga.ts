import { alertActions } from './../alert/alertSlice';
import {
  ResponseAddCardToCustomer,
  ResponseCreateCard,
  ResponseCreateSubscription,
  ResponseGetListCard,
  ResponseGetListSubscription,
} from './../../declares/models/Payment';
import { ResponseGetListProduct } from '@/declares/models/Payment';
import paymentApi from '@/services/api/payment';
import { all, call, fork, put, takeLatest, takeEvery, delay } from 'redux-saga/effects';
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

function* handleGetListSubscription() {
  try {
    const response: ResponseGetListSubscription = yield call(paymentApi.getListSubscription);

    //test area
    if (response?.data.find((sub) => sub.status === 'active')) {
      yield put(paymentActions.isPayment());
    } else {
      yield put(paymentActions.isNotPayment());
    }

    yield put(paymentActions.getListSubscriptionSuccess(response?.data));
  } catch (error) {
    yield put(paymentActions.getListSubscriptionFail('An error occurred, please try again'));
  }
}

function* handleAddCardAndPayToCustomer(action: {
  payload: {
    formData: any;
    stripeCustomerId: string;
    setSubmitting: (isSubmitting: boolean) => void;
    priceId: string;
    currency: string;
    shareLink: any;
    authorName?: any;
  };
}) {
  try {
    const responseCreateCard: ResponseCreateCard = yield call(
      paymentApi.createCardToCusTomer,
      action.payload.formData
    );

    const cardData = {
      cardObj: {
        token: responseCreateCard?.data.token,
      },
    };
    const responseAddCard: ResponseAddCardToCustomer = yield call(
      paymentApi.addCardToCustomer,
      cardData
    );
    const subscriptionParams: any = {
      priceId: action.payload.priceId,
      paymentMethod: responseAddCard.data?.cardId,
      stripeCustomerId: action.payload.stripeCustomerId,
      setSubmitting: action.payload.setSubmitting,
      currency: action.payload.currency,
      cardId: responseAddCard.data?.id,
      shareLink: action.payload.shareLink,
    };
    if (action.payload.authorName) {
      subscriptionParams.authorName = action.payload.authorName;
    }

    yield put(paymentActions.createSubscription(subscriptionParams));
  } catch (error: any) {
    yield put(paymentActions.addCardAndPayToCustomerFail('An error occurred, please try again'));
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

function* handleAddCardToCustomer(action: {
  payload: {
    formData: any;
    stripeCustomerId: string;
    setSubmitting: (isSubmitting: boolean) => void;
    priceId: string;
    currency: string;
  };
}) {
  try {
    const responseCreateCard: ResponseCreateCard = yield call(
      paymentApi.createCardToCusTomer,
      action.payload.formData
    );

    const cardData = {
      cardObj: {
        token: responseCreateCard?.data.token,
      },
    };
    const responseAddCard: ResponseAddCardToCustomer = yield call(
      paymentApi.addCardToCustomer,
      cardData
    );
    yield put(
      alertActions.showAlert({
        text: 'Add card to customer successfully',
        type: 'success',
      })
    );
    yield put(paymentActions.addCardToCustomerSuccess());
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
    action.payload.setSubmitting(false);
  }
}

function* handleCreateSubscription(action: {
  payload: {
    priceId: string;
    paymentMethod: string;
    stripeCustomerId: string;
    currency: string;
    setSubmitting?: (isSubmitting: boolean) => void;
    cardId?: string;
    shareLink: any;
    authorName?: any;
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
    yield put(paymentActions.getListSubscription());
  } catch (error: any) {
    yield put(paymentActions.addCardAndPayToCustomerFail('An error occurred, please try again'));
    if (action.payload.cardId) {
      yield call(paymentApi.deleteCard, action.payload.cardId);
    }
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

function* handleDeleteSubscription(action: {
  payload: {
    stripeSubscriptionId: string;
    closeModal?: () => void;
  };
}) {
  try {
    yield call(paymentApi.deleteSubscription, action.payload);
    yield put(paymentActions.deleteSubscriptionSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Cancel Subscription successfully',
        type: 'success',
      })
    );
    yield put(paymentActions.getListSubscription());
    if (action.payload.closeModal) {
      action.payload.closeModal();
    }
  } catch (error: any) {
    yield put(paymentActions.deleteSubscriptionFail('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text:
          error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          'Cancle subscription fail',
        type: 'error',
      })
    );
  }
}

function* handleDeleteCard(action: {
  payload: {
    id: string;
    closeDeleteCardModal?: () => void;
  };
}) {
  try {
    yield call(paymentApi.deleteCard, action.payload.id);
    yield put(paymentActions.deleteCardSuccess());
    yield put(paymentActions.getListCard({}));
    yield put(
      alertActions.showAlert({
        text: 'Delete card successfully',
        type: 'success',
      })
    );
    if (action.payload.closeDeleteCardModal) {
      action.payload.closeDeleteCardModal();
    }
  } catch (error) {
    yield put(paymentActions.deleteCardFail());
  }
}

function* paymentFlow() {
  yield all([takeLatest(paymentActions.getListProduct, handleGetListProduct)]);
  yield all([takeLatest(paymentActions.getListCard, handleGetListCard)]);
  yield all([takeLatest(paymentActions.getListSubscription, handleGetListSubscription)]);
  yield all([takeLatest(paymentActions.addCardAndPayToCustomer, handleAddCardAndPayToCustomer)]);
  yield all([takeLatest(paymentActions.addCardToCustomer, handleAddCardToCustomer)]);
  yield all([takeLatest(paymentActions.createSubscription, handleCreateSubscription)]);
  yield all([takeLatest(paymentActions.deleteSubscription, handleDeleteSubscription)]);
  yield all([takeLatest(paymentActions.deleteCard, handleDeleteCard)]);
}

export function* paymentSaga() {
  yield fork(paymentFlow);
}
