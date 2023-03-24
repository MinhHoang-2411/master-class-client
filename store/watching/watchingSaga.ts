import { ErrorModel } from '@/declares/models';
import { ParamsGetListClass } from '@/declares/models/ClassModels';
import { ResponseGetWatching } from '@/declares/models/Watching';
import watchingApi from '@/services/api/watching';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { watchingActions } from './watchingSlice';

function* handleMyWatching(action: PayloadAction<ParamsGetListClass>) {
  try {
    const params = action.payload;
    const response: ResponseGetWatching = yield call(watchingApi.createOrUpdateMyWatching, params);

    yield put(watchingActions.handleCreateAndUpdateMyWatchingSuccess(params));
  } catch (error: ErrorModel | any) {
    yield put(
      watchingActions.handleCreateAndUpdateMyWatchingFalse(
        error?.response?.data?.message || 'An error occurred, please try again'
      )
    );
  }
}

function* watchingFlow() {
  yield all([takeEvery(watchingActions.handleCreateAndUpdateMyWatching.type, handleMyWatching)]);
}

export function* watchingSaga() {
  yield fork(watchingFlow);
}
