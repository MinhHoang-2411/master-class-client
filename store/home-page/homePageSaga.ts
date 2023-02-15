import { ErrorModel, ResponseGetBanner } from '@/declares/models';
import bannerApi from '@/services/api/home-page';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, fork, put, takeEvery, delay, call } from 'redux-saga/effects';
import { alertActions } from '../alert/alertSlice';
import { homePageActions } from './homePageSlice';

function* handleFetchData(action: PayloadAction<{}>) {
  try {
    const response: ResponseGetBanner = yield call(bannerApi.getAll);
    yield put(homePageActions.fetchDataSuccess(response.data));
  } catch (error: ErrorModel | any) {
    yield put(
      homePageActions.fetchDataFalse(
        error?.response?.data?.message ||
          'The username or password you entered did not match our records. Please try again'
      )
    );
    yield put(
      alertActions.showAlert({
        text:
          error?.response?.data?.message ||
          'The username or password you entered did not match our records. Please try again',
        type: 'error',
      })
    );
  }
}

function* homePageFlow() {
  yield all([takeEvery(homePageActions.fetchData.type, handleFetchData)]);
}

export function* homePageSaga() {
  yield fork(homePageFlow);
}
