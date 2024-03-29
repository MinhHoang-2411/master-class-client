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

function* handleFetchDataSearch(action: PayloadAction<ParamsGetListClass>) {
  try {
    const params = action.payload;
    const response: ResponseGetClass = yield call(classAPI.fetchData, params);

    yield put(classActions.fetchDataSearchSuccess(response.data));
  } catch (error: ErrorModel | any) {
    yield put(
      classActions.fetchDataSearchFalse(
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

function* handleSelectedLessons(action: PayloadAction<ParamsGetListClass>) {
  try {
    const params = action.payload;
    yield put(classActions.setIndexSelectedLessonSuccess(params));
  } catch (error: ErrorModel | any) {
    yield put(
      classActions.setIndexSelectedLessonFalse(
        error?.response?.data?.message || 'An error occurred, please try again'
      )
    );
  }
}

function* classFlow() {
  yield all([
    takeEvery(classActions.fetchData.type, handleFetchData),
    takeEvery(classActions.fetchDataSearch.type, handleFetchDataSearch),
    takeEvery(classActions.setIndexSelectedLesson.type, handleSelectedLessons),
  ]);
}

export function* classSaga() {
  yield fork(classFlow);
}
