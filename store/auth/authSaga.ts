import { TOKEN_FORGOT_PASS } from '@/constants/auth';
import { ErrorModel, ResponseAuth, UserModel } from '@/declares/models';
import type { AxiosResponse } from 'axios';
import {
  LoginPayload,
  LogoutPayload,
  RegisterPayload,
  ResetPasswordModel,
  ResponseForgotPass,
  ResponseVerifyCode,
  VerifyCodeModel,
} from '@/declares/models/AuthModels';
import authApi from '@/services/api/auth';
import { logout, setAuth } from '@/utils/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { alertActions } from '../alert/alertSlice';
import { authActions } from './authSlice';
import Cookies from 'js-cookie';

function* handleLogin(action: PayloadAction<LoginPayload>) {
  const payload = action.payload;
  try {
    const response: ResponseAuth<UserModel> = yield call(authApi.login, payload);
    if (response?.data) {
      setAuth({
        api_token: response?.data?.token || '',
        user: response?.data?.user,
      });
    }
    yield put(authActions.loginSuccess(response.data as UserModel));
  } catch (error: ErrorModel | any) {
    yield put(
      authActions.loginFailed(
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

function* handleLogout(action: PayloadAction<LogoutPayload>) {
  yield call(logout);
  Cookies.remove('appLocale');
  localStorage.removeItem('appLocale');
}

function* handleRegister(action: PayloadAction<RegisterPayload>) {
  const payload = action.payload;
  try {
    const response: ResponseAuth<UserModel> = yield call(authApi.register, payload);

    setAuth({
      api_token: response?.data?.token || '',
      user: response?.data?.user,
    });

    yield put(authActions.registerSuccess(response.data as UserModel));
  } catch (error: ErrorModel | any) {
    console.error(error);

    yield put(authActions.registerFailed(error as string));
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
function* handleForgotPass(action: PayloadAction<string>) {
  const email = action.payload;
  try {
    const response: ResponseForgotPass = yield call(authApi.forgotPassword, email);

    const expires = new Date(new Date().getTime() + 60000 * 5); // 5min
    const sessionObject = {
      expiresAt: expires,
      someOtherSessionData: response.data,
    };
    sessionStorage.setItem(TOKEN_FORGOT_PASS, JSON.stringify(sessionObject));

    yield put(authActions.forgotPassSuccess(response.data.token));
  } catch (error: ErrorModel | any) {
    console.error(error);
    yield put(authActions.forgotFailed(error as string));
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleVerifyCode(action: PayloadAction<VerifyCodeModel>) {
  const params = action.payload;
  try {
    const response: ResponseVerifyCode = yield call(authApi.verifyCode, params);
    yield put(authActions.verifyCodeSuccess(response.data));
    yield put(
      alertActions.showAlert({
        text: 'Code verification successful',
        type: 'success',
      })
    );
  } catch (error: ErrorModel | any) {
    console.error(error);
    yield put(authActions.verifyCodeFailed(error as string));
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleResetPass(action: PayloadAction<ResetPasswordModel>) {
  const params = action.payload;
  try {
    yield call(authApi.resetPassword, params);

    yield put(authActions.resetPasswordSuccess('Successfully changed password'));
    yield put(
      alertActions.showAlert({
        text: 'Successfully changed password',
        type: 'success',
      })
    );
    yield put(authActions.openSignInModal());
  } catch (error: ErrorModel | any) {
    console.error(error);
    yield put(authActions.resetPasswordFailed(error as string));
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleChangePass(action: PayloadAction<ResetPasswordModel>) {
  const params = action.payload;
  try {
    const res: AxiosResponse<{ data: string }> = yield call(authApi.changePassword, params);

    yield put(authActions.changePasswordSuccess('Successfully changed password'));
    yield put(
      alertActions.showAlert({
        text: res?.data,
        type: 'success',
      })
    );
  } catch (error: ErrorModel | any) {
    console.error(error);
    yield put(authActions.changePasswordFailed(error as string));
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* watchLoginFlow() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.logout.type, handleLogout),
    takeLatest(authActions.register.type, handleRegister),
    takeLatest(authActions.forgotPass.type, handleForgotPass),
    takeLatest(authActions.verifyCode.type, handleVerifyCode),
    takeLatest(authActions.resetPassword.type, handleResetPass),
    takeLatest(authActions.changePassword.type, handleChangePass),
  ]);
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
