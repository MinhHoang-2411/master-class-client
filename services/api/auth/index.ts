import {
  LoginPayload,
  RegisterPayload,
  ResetPasswordModel,
  VerifyCodeModel,
} from '@/declares/models';
import axiosClient from '@/services/api/axiosClient';
import axiosClient_V2 from '../axiosClient_V2';

const authApi = {
  login(params: LoginPayload) {
    const url = 'auth/login';
    return axiosClient.post(url, params);
  },
  register(params: RegisterPayload) {
    const url = 'auth/register';
    return axiosClient.post(url, params);
  },
  forgotPassword(email: string) {
    const url = 'auth/forgot-password';
    return axiosClient.post(url, { email });
  },
  verifyCode(params: VerifyCodeModel) {
    const url = 'auth/verify-forgot-password';
    return axiosClient.post(url, params);
  },
  resetPassword(params: ResetPasswordModel) {
    const url = 'auth/reset-password';
    return axiosClient.post(url, params);
  },
  changePassword(params: ResetPasswordModel) {
    const url = 'auth/change-password';
    return axiosClient.post(url, params);
  },

  loginWithGoogle(params: any) {
    const url = 'auth/google';
    return axiosClient.post(url, params);
  },
  loginWithFacebook(params: any) {
    const url = 'auth/facebook';
    return axiosClient.post(url, params);
  },
};

export default authApi;
