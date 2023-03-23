import Image from 'next/image';
import React from 'react';
import AppleLogin from 'react-apple-login';
import Logo from '../../../public/icons/icons8-apple-logo-50.png';

const LoginApple = () => {
  return (
    <AppleLogin
      clientId={'com.react.apple.login'}
      redirectURI={'https://redirectUrl.com'}
      responseType={'code'}
      responseMode={'query'}
      usePopup={true}
      render={(renderProps) => (
        <div className={`cursor-pointer`}>
          <Image onClick={renderProps.onClick} src={Logo} alt="fb" width={42} height={42} />
        </div>
      )}
    />
  );
};

export default LoginApple;
