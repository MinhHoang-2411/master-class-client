import { convertStringToLowerCase } from '@/utils/convert/string';
import { ErrorModel } from '@/declares/models';
import { CategoryModel, ResponseGetCate } from '@/declares/models/Categories';
import categoriesAPI from '@/services/api/categories';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { alertActions } from '../alert/alertSlice';
import { categoriesActions } from './categoriesSlice';

const addUrlToArrayCate = (data: Array<CategoryModel>) => {
  let newData = [...data];
  if (data?.length > 0) {
    newData = newData.map((item) => {
      return { ...item, url: convertStringToLowerCase(item?.name) };
    });
  }
  return newData;
};

function* handleFetchData(action: PayloadAction<{}>) {
  try {
    const params = {
      page: 1,
      limit: 100,
    };
    let response: ResponseGetCate = yield call(categoriesAPI.fetchData, params);
    if (response.data) response = yield call(addUrlToArrayCate, response.data);

    yield put(categoriesActions.fetchDataSuccess(response));
  } catch (error: ErrorModel | any) {
    yield put(
      categoriesActions.fetchDataFalse(
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

function* categoriesFlow() {
  yield all([takeEvery(categoriesActions.fetchData.type, handleFetchData)]);
}

export function* categoriesSaga() {
  yield fork(categoriesFlow);
}
