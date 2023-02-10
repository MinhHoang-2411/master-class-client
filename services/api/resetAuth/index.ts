import {
  EmailPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyCodePayload,
} from '@/declares/models';
import axiosClient from '@/services/api/axiosClient';

const resetAuthApi = {
  sendEmail(params: EmailPayload) {
    const url = 'auth/forgot-password';
    return axiosClient.post(url, params);
  },
  verifyCode(params: VerifyCodePayload) {
    const url = 'auth/verify-forgot-password';
    return axiosClient.post(url, params);
  },
  resetPassword(params: ResetPasswordPayload) {
    const url = 'auth/reset-password';
    return axiosClient.post(url, params);
  },
};

export default resetAuthApi;
