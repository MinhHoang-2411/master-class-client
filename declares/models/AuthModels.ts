import { UserModel } from './UserModels';

export interface AuthModel {
  api_token: string;
  refreshToken?: string;
  user?: UserModel;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LogoutPayload {}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms?: boolean;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging: boolean;
  loadingRegister: boolean;
  loadingForgotPass: boolean;
  loadingVerify: boolean;
  loadingResetPass: boolean;
  loadingChangePass: boolean;
  currentUser?: UserModel;
  tokenForgotPass?: string;

  modalSignIn: {
    isOpen?: boolean;
  };
  modalSignUp: {
    isOpen?: boolean;
  };
  modalSendEmail: {
    isOpen: boolean;
  };
  modalVerifyCode: {
    isOpen: boolean;
  };
  modalResetPassword: {
    isOpen: boolean;
  };
  modalChangePassword: {
    isOpen: boolean;
  };
}

export interface EmailPayload {
  email: string;
}

export interface VerifyCodePayload {
  code: string;
  token: string;
}
export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface VerifyCodeModel {
  code: string;
  token: string;
}

export interface ResetPasswordModel {
  token: string;
  password: string;
}

export interface ResponseForgotPass {
  data: {
    token: string;
  };
}

export interface ResponseVerifyCode {
  data: string;
}
