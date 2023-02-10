import {
  LoginPayload,
  RegisterPayload,
  ResetPasswordModel,
  VerifyCodeModel,
} from '@/declares/models';
import axiosClient from '@/services/api/axiosClient';

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
    console.log("verifyCodeParams", params)
    const url = 'auth/verify-forgot-password';
    return axiosClient.post(url, params);
  },
  resetPassword(params: ResetPasswordModel) {
    console.log("resetPassword", params)
    const url = 'auth/reset-password';
    return axiosClient.post(url, params);
  },
};

export default authApi;
