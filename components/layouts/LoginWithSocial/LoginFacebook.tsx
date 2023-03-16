import authApi from '@/services/api/auth';
import { setAuth } from '@/utils/auth';
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const LoginFacebook = () => {
  const responseFacebook = async (response: any) => {
    console.log('response', response)
    const { accessToken } = response;
    try {
      const response: any = await authApi.loginWithGoogle({
        accessToken: accessToken,
      });

      console.log("response", response)
      if (response?.data) {
        setAuth({
          api_token: response?.data?.token || '',
          user: response?.data?.user,
        });
      }
    } catch (e) {}
  };

  return (
    <FacebookLogin
      appId="1375545393205592"
      autoLoad={false}
      fields="name,email,picture,id"
      callback={responseFacebook}
      cssClass="my-facebook-button-class"
      icon="fa-facebook"
      disableMobileRedirect={true}
    />
  );
};

export default LoginFacebook;
