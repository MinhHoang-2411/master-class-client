import { useEffect } from 'react';
import ChangePassword from '@/contents/auth/ChangePasswordModal';
import ResetPassword from '@/contents/auth/ForgotPassword/ResetPassword';
import SendEmail from '@/contents/auth/ForgotPassword/SendEmail';
import VerifyCode from '@/contents/auth/ForgotPassword/VerifyCode';
import SignInModal from '@/contents/auth/SignInModal';
import SignUpModal from '@/contents/auth/SignUpModal';
import PaymentModal from '@/contents/home/PaymentModal';
import { authActions } from '@/store/auth/authSlice';
import { paymentActions } from '@/store/payment/paymentSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { classActions } from '@/store/class/classSlice';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import StickyFooter from './StickyFooter';
import AddCardAndPayModal from '@/contents/home/PaymentModal/AddCardAndPayModal';
import AddCardModal from '@/contents/home/PaymentModal/AddCardModal';
import { useRouter } from 'next/router';
import Footer from './Footer';

// const Footer = dynamic(() => import('./Footer'));
const Navbar = dynamic(() => import('./Navbar'), {
  ssr: false,
});

export default function MyLayout({ children }: any) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const modalSignIn = useAppSelector((state) => state.auth.modalSignIn);
  const modalSignUp = useAppSelector((state) => state.auth.modalSignUp);

  const modalSendEmail = useAppSelector((state) => state.auth.modalSendEmail);
  const modalVerifyCode = useAppSelector((state) => state.auth.modalVerifyCode);
  const modalResetPassword = useAppSelector((state) => state.auth.modalResetPassword);

  const modalChangePassword = useAppSelector((state) => state.auth.modalChangePassword);
  const modalChoosePayment = useAppSelector((state) => state.payment.modalChoosePayment);
  const modalAddCardAndPay = useAppSelector((state) => state.payment.modalAddCardAndPay);
  const modalAddCard = useAppSelector((state) => state.payment.modalAddCard);

  const isPayment = useAppSelector((state) => state.payment.isPayment);
  const loadingCheckPayment = useAppSelector((state) => state.payment.loadingCheckPayment);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
      if (currentUser) {
        dispatch(authActions.loginSuccess(currentUser?.user));
        dispatch(paymentActions.getListCard({}));
        dispatch(paymentActions.getListSubscription());
      }
    }
  }, []);

  return router.pathname === '/500' ? (
    <>{children}</>
  ) : (
    <Box sx={{ overflowX: 'hidden' }}>
      <Navbar />
      {children}
      {/* <Footer /> */}
      <SignInModal
        isOpen={modalSignIn.isOpen}
        CloseModal={() => dispatch(authActions.closeSignInModal())}
      />
      <SignUpModal
        isOpen={modalSignUp.isOpen}
        CloseModal={() => dispatch(authActions.closeSignUpModal())}
      />
      <SendEmail
        isOpen={modalSendEmail.isOpen}
        CloseModal={() => dispatch(authActions.closeModalSendEmail())}
      />
      <VerifyCode
        isOpen={modalVerifyCode.isOpen}
        CloseModal={() => dispatch(authActions.closeModalVerifyCode())}
      />
      <ResetPassword
        isOpen={modalResetPassword.isOpen}
        CloseModal={() => dispatch(authActions.closeModalResetPassword())}
      />

      <ChangePassword
        isOpen={modalChangePassword.isOpen}
        CloseModal={() => dispatch(authActions.closeChangePassModal())}
      />

      <PaymentModal
        isOpen={modalChoosePayment.isOpen}
        closeModal={() => {
          localStorage.removeItem('openModalPayment');
          dispatch(paymentActions.closeModalChoosePayment());
        }}
      />

      <AddCardAndPayModal
        isOpen={modalAddCardAndPay.isOpen}
        closeModal={() => {
          dispatch(paymentActions.closeModalAddCardAndPay());
          dispatch(classActions.setAuthorName(''));
        }}
      />

      <AddCardModal
        isOpen={modalAddCard.isOpen}
        closeModal={() => {
          dispatch(paymentActions.closeModalAddCard());
        }}
      />

      {isPayment && !loadingCheckPayment ? <></> : <StickyFooter />}
      {/* <Footer /> */}
    </Box>
  );
}
