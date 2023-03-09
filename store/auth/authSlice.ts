import { TOKEN_FORGOT_PASS } from '@/constants/auth';
import {
  AuthState,
  LoginPayload,
  LogoutPayload,
  RegisterPayload,
  ResetPasswordModel,
  VerifyCodeModel,
} from '@/declares/models';
import { UserModel } from '@/declares/models/UserModels';
import { RootState } from '@/store';
import { getAuth, getSessionStorage } from '@/utils/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const api_token = getAuth()?.api_token;
const token_forgot_pass = getSessionStorage(TOKEN_FORGOT_PASS)?.someOtherSessionData?.token;
const initialState: AuthState = {
  isLoggedIn: api_token ? true : false, // logged
  logging: false, // loading
  loadingRegister: false,
  loadingForgotPass: false,
  loadingVerify: false,
  loadingResetPass: false,
  loadingChangePass: false,
  currentUser: undefined, // info user if login success
  tokenForgotPass: token_forgot_pass || undefined,

  modalSignIn: {
    isOpen: false,
  },
  modalSignUp: {
    isOpen: false,
  },
  modalSendEmail: {
    isOpen: false,
  },
  modalVerifyCode: {
    isOpen: false,
  },
  modalResetPassword: {
    isOpen: false,
  },
  modalChangePassword: {
    isOpen: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //login
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<UserModel>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },
    //logout
    logout(state, action: PayloadAction<LogoutPayload>) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
    //register
    register(state, action: PayloadAction<RegisterPayload>) {
      state.loadingRegister = true;
    },
    registerSuccess(state, action: PayloadAction<UserModel>) {
      state.isLoggedIn = true;
      state.loadingRegister = false;
      state.currentUser = action.payload;
    },
    registerFailed(state, action: PayloadAction<string>) {
      state.loadingRegister = false;
    },
    // forgot password
    forgotPass(state, action: PayloadAction<string>) {
      state.loadingForgotPass = true;
    },
    forgotPassSuccess(state, action: PayloadAction<string>) {
      state.tokenForgotPass = action.payload;
      state.loadingForgotPass = false;
      state.modalVerifyCode.isOpen = true;
      state.modalSendEmail.isOpen = false;
    },
    forgotFailed(state, action: PayloadAction<string>) {
      state.loadingForgotPass = false;
    },
    // verify code
    verifyCode(state, action: PayloadAction<VerifyCodeModel>) {
      state.loadingVerify = true;
    },

    verifyCodeSuccess(state, action: PayloadAction<string>) {
      state.loadingVerify = false;
      state.modalVerifyCode.isOpen = false;
      state.modalResetPassword.isOpen = true;
      state.tokenForgotPass = action.payload;
    },

    verifyCodeFailed(state, action: PayloadAction<string>) {
      state.loadingVerify = false;
    },
    // reset password
    resetPassword(state, action: PayloadAction<ResetPasswordModel>) {
      state.loadingResetPass = true;
    },
    resetPasswordSuccess(state, action: PayloadAction<string>) {
      state.loadingResetPass = false;
      state.modalResetPassword.isOpen = false;
    },
    resetPasswordFailed(state, action: PayloadAction<string>) {
      state.loadingResetPass = false;
    },
    // change password
    changePassword(state, action: PayloadAction<any>) {
      state.loadingChangePass = true;
    },
    changePasswordSuccess(state, action: PayloadAction<string>) {
      state.loadingChangePass = false;
      state.modalChangePassword.isOpen = false;
    },
    changePasswordFailed(state, action: PayloadAction<string>) {
      state.loadingChangePass = false;
    },

    // modal
    openModalSendEmail(state) {
      state.modalSendEmail.isOpen = true;
      state.modalSignIn.isOpen = false;
    },
    closeModalSendEmail(state) {
      state.modalSendEmail.isOpen = false;
    },

    openModalVerifyCode(state) {
      state.modalVerifyCode.isOpen = true;
    },

    closeModalVerifyCode(state) {
      state.modalVerifyCode.isOpen = false;
    },

    openModalResetPassword(state) {
      state.modalResetPassword.isOpen = true;
    },
    closeModalResetPassword(state) {
      state.modalResetPassword.isOpen = false;
    },

    openSignInModal(state) {
      state.modalSignIn.isOpen = true;
      state.modalSignUp.isOpen = false;
    },
    closeSignInModal(state) {
      state.modalSignIn.isOpen = false;
    },
    openSignUpModal(state) {
      state.modalSignUp.isOpen = true;
      state.modalSignIn.isOpen = false;
    },
    closeSignUpModal(state) {
      state.modalSignUp.isOpen = false;
    },
    
    openChangePassModal(state) {
      state.modalChangePassword.isOpen = true;
    },
    closeChangePassModal(state) {
      state.modalChangePassword.isOpen = false;
    },

    backToLogInModal(state) {
      state.modalSignIn.isOpen = true;
      state.modalSendEmail.isOpen = false;
      state.modalVerifyCode.isOpen = false;
      state.modalResetPassword.isOpen = false;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;
// Reducer
export const authReducer = authSlice.reducer;
