import { ErrorModel } from '@/declares/models';
import { ParamsGetListClass } from '@/declares/models/ClassModels';
import { ResponseGetWatching } from '@/declares/models/Watching';
import watchingApi from '@/services/api/watching';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { watchingActions } from './watchingSlice';

function* handleCreAndUpdMyWatching(action: PayloadAction<ParamsGetListClass>) {
  try {
    const params = action.payload;
    const response: ResponseGetWatching = yield call(watchingApi.createOrUpdateMyWatching, params);
    yield put(watchingActions.handleCreateAndUpdateMyWatchingSuccess(response.data));
  } catch (error: ErrorModel | any) {
    yield put(
      watchingActions.handleCreateAndUpdateMyWatchingFalse(
        error?.response?.data?.message || 'An error occurred, please try again'
      )
    );
  }
}

function* getMyWatching(action: PayloadAction<ParamsGetListClass>) {
  try {
    const params = action.payload;
    const response: ResponseGetWatching = yield call(watchingApi.getMyWatching, params);
    yield put(watchingActions.getMyWatchingSuccess(response));
  } catch (error: ErrorModel | any) {
    yield put(
      watchingActions.getMyWatchingFalse(
        error?.response?.data?.message || 'An error occurred, please try again'
      )
    );
  }
}
function* onFetchMore(action: PayloadAction<ParamsGetListClass>) {
  try {
    const params = action.payload;
    const response: ResponseGetWatching = yield call(watchingApi.getMyWatching, params);
    yield put(watchingActions.onFetchMoreSuccess(response.data));
  } catch (error: ErrorModel | any) {
    console.log(error);
    yield put(watchingActions.onFetchMoreFalse(''));
  }
}

function* watchingFlow() {
  yield all([
    takeEvery(watchingActions.handleCreateAndUpdateMyWatching.type, handleCreAndUpdMyWatching),
    takeEvery(watchingActions.getMyWatching.type, getMyWatching),
    takeEvery(watchingActions.onFetchMore.type, onFetchMore),
  ]);
}

export function* watchingSaga() {
  yield fork(watchingFlow);
}
