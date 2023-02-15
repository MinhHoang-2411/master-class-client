import { all } from 'redux-saga/effects';
import { authSaga } from './auth/authSaga';
import { homePageSaga } from './home-page/homePageSaga';

export default function* rootSaga() {
  yield all([authSaga(), homePageSaga()]);
}
