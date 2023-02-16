import { all } from 'redux-saga/effects';
import { authSaga } from './auth/authSaga';
import { categoriesSaga } from './categories/categoriesSaga';
import { classSaga } from './class/classSaga';
import { homePageSaga } from './home-page/homePageSaga';

export default function* rootSaga() {
  yield all([authSaga(), homePageSaga(), categoriesSaga(), classSaga()]);
}
