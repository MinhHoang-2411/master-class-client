import { useEffect, useState } from 'react';
import styles from '../../styles/stickyFooter.module.scss';
import { Stack } from '@mui/material';
import PrimaryButton from '../share/PrimaryButton';
import { useAppDispatch } from '@/store/hooks';
import { paymentActions } from '@/store/payment/paymentSlice';
import { authActions } from '@/store/auth/authSlice';
import { useTranslation } from 'next-i18next';

const StickyFooter = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const [showComponent, setShowComponent] = useState(false);
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.offsetHeight;
    const currentPosition = window.scrollY + windowHeight;
    // console.log({ windowHeight, fullHeight, currentPosition });
    if (currentPosition >= fullHeight - 200) {
      setShowComponent(false);
    } else if (window.scrollY > 0) {
      setShowComponent(true);
    } else {
      setShowComponent(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      className={`${styles.sticky} ${showComponent ? styles.stickyActive : styles.stickyUnActive}`}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <span className={styles.stickyText}>
          {t('Starting at $24.99/month (billed annually) for all classes and sessions')}
        </span>
        <PrimaryButton
          onClick={() => {
            const isLogin = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string)?.api_token;
            if (!!isLogin) {
              dispatch(paymentActions.openModalChoosePayment());
              localStorage.removeItem('openModalPayment');
            } else {
              localStorage.setItem('openModalPayment', 'true');
              dispatch(authActions.openSignInModal());
            }
          }}
        >
          {t('Subscribe')}
        </PrimaryButton>
      </Stack>
    </div>
  );
};

export default StickyFooter;
