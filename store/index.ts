import { authReducer } from '@/store/auth/authSlice';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import alertReducer from './alert/alertSlice';
import categoriesReducer from './categories/categoriesSlice';
import classReducer from './class/classSlice';
import homePageReducer from './home-page/homePageSlice';
import { paymentReducer } from './payment/paymentSlice';
import rootSaga from './rootSaga';

const reducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  homePage: homePageReducer,
  categories: categoriesReducer,
  class: classReducer,
  payment: paymentReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
