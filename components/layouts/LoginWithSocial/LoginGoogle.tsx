import authApi from '@/services/api/auth';
import { setAuth } from '@/utils/auth';
import { GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'next-i18next';

interface credentialResponseProps {
  clientId?: string;
  credential?: string;
  select_by?: string;
}

const LoginGoogle = () => {
  const { t } = useTranslation();

  const onSuccess = async (credentialResponse: credentialResponseProps) => {
    try {
      const { credential } = credentialResponse;

      const response: any = await authApi.loginWithGoogle({
        accessToken: credential,
        platform: 'web',
      });

      if (response?.data) {
        setAuth({
          api_token: response?.data?.token || '',
          user: response?.data?.user,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
        onError={() => {
          console.log('Login Failed');
        }}
        type="icon"
        size="large"
        shape="rectangular"
      />
    </>
  );
};

export default LoginGoogle;
