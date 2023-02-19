import { ErrorModel } from '@/declares/models';
import { ParamsGetListClass, ResponseGetClass } from '@/declares/models/ClassModels';
import classAPI from '@/services/api/class';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { alertActions } from '../alert/alertSlice';
import { classActions } from './classSlice';

function* handleFetchData(action: PayloadAction<ParamsGetListClass>) {
  try {
    const params = action.payload;
    const response: ResponseGetClass = yield call(classAPI.fetchData, params);

    yield put(classActions.fetchDataSuccess(response.data));
  } catch (error: ErrorModel | any) {
    yield put(
      classActions.fetchDataFalse(
        error?.response?.data?.message || 'An error occurred, please try again'
      )
    );
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* classFlow() {
  yield all([takeEvery(classActions.fetchData.type, handleFetchData)]);
}

export function* classSaga() {
  yield fork(classFlow);
}
