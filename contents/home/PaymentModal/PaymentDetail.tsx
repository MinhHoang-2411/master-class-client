import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { paymentActions } from '@/store/payment/paymentSlice';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: '#fff',
  boxShadow: 24,
  padding: 3,
  paddingTop: 6,
  borderRadius: 1,
  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const PaymentDetail = ({ isOpen, closeModal }: Props) => {
  const { t } = useTranslation('common');
  const detailProduct = useAppSelector((state) => state.payment.detailProduct);
  const dispatch = useAppDispatch();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box sx={styleModal}>
        <Box sx={{ position: 'absolute', top: '4px', right: '16px' }}>
          <IconButton
            onClick={() => {
              localStorage.removeItem('openModalPayment');
              dispatch(paymentActions.closeModalPaymentDetail());
            }}
          >
            <CloseIcon fontSize="medium" sx={{ color: '#1e1e1e' }} />
          </IconButton>
        </Box>
        <p>{detailProduct?.name}</p>
        <p>{detailProduct?.amount}</p>
        <p>{detailProduct?.currency}</p>
        <form id="payment-form">
          <label htmlFor="card">Card</label>

          <button type="submit">Pay</button>
        </form>
      </Box>
    </Modal>
  );
};

export default PaymentDetail;
