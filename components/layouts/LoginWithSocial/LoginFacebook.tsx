import authApi from '@/services/api/auth';
import { setAuth } from '@/utils/auth';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import styles from './styles.module.scss';
import IconFb from '../../../public/icons/icon-facebook.png';
import Image from 'next/image';

const LoginFacebook = () => {
  const responseFacebook = async (response: any) => {
    const { accessToken } = response;
    try {
      const response: any = await authApi.loginWithFacebook({
        accessToken: accessToken,
      });

      if (response?.data) {
        setAuth({
          api_token: response?.data?.token || '',
          user: response?.data?.user,
        });
      }
    } catch (e) {}
  };

  return (
    <div className={styles.buttonLoginFacebook}>
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FB_APP_ID || ''}
        autoLoad={false}
        fields="name,email,picture,id"
        responseType={`token`}
        icon={
          <>
            <Image src={IconFb} alt="fb" width={26} height={26} />
          </>
        }
        cssClass={styles['kep-login-facebook']}
        callback={responseFacebook}
        disableMobileRedirect={true}
        textButton=""
      />
    </div>
  );
};

export default LoginFacebook;
