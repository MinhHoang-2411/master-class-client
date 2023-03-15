import PrimaryButton from '@/components/share/PrimaryButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { paymentActions } from '@/store/payment/paymentSlice';
import { Box, Card, Grid, Icon, IconButton, Modal, Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import styles from '@/styles/paymentModal.module.scss';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

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

const PaymentModal = ({ isOpen, closeModal }: Props) => {
  const { t } = useTranslation('common');
  const listProduct = useAppSelector((state) => state.payment.listProduct);
  const dispatch = useAppDispatch();
  const { locale } = useRouter();
  useEffect(() => {
    dispatch(paymentActions.getListProduct());

    if (typeof window !== 'undefined') {
      const isOpen = localStorage.getItem('openModalPayment');
      if (!!isOpen) {
        dispatch(paymentActions.openModalChoosePayment());
        localStorage.removeItem('openModalPayment');
      }
    }
  }, [locale]);

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box sx={styleModal}>
        <Box sx={{ position: 'absolute', top: '4px', right: '16px' }}>
          <IconButton
            onClick={() => {
              localStorage.removeItem('openModalPayment');
              dispatch(paymentActions.closeModalChoosePayment());
            }}
          >
            <CloseIcon fontSize="medium" sx={{ color: '#1e1e1e' }} />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          {listProduct.map((product, index) => (
            <Grid key={product?._id} item xs={6} lg={3}>
              <Card
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  color: '#595959',
                  bgcolor: '#f9f9f9',
                  '&:hover': { bgcolor: 'black', color: 'white' },
                  transition: 'background 0.3s ease, color 0.3s ease ',
                }}
                className={styles.wrapper}
              >
                <h2 style={{ margin: '12px 0' }}>{product?.name}</h2>
                <Stack direction="row" alignItems="center">
                  <AttachMoneyIcon fontSize="large" sx={{ transform: 'translate(-9px, 0px)' }} />

                  <h2 style={{ margin: 0, transform: 'translate(-17px, 0px)' }}>
                    {`${product?.amount
                      .toString()
                      .substring(0, product?.amount.toString().length - 2)}.${product?.amount
                      .toString()
                      .slice(-2)}`}
                  </h2>
                </Stack>
                <p
                  style={{
                    margin: '8px 0',
                    fontSize: '12px',
                    color: '#636363',
                  }}
                >
                  Vi cuoc song dau la de dang.Vi cuoc song dau la de dang{' '}
                </p>
                <Stack spacing={1} sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckCircleRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                    <p
                      style={{
                        margin: '0',
                        fontSize: '12px',
                        color: '#636363',
                      }}
                    >
                      Skill 1{' '}
                    </p>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckCircleRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                    <p
                      style={{
                        margin: '0',
                        fontSize: '12px',
                        color: '#636363',
                      }}
                    >
                      Skill 1{' '}
                    </p>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckCircleRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                    <p
                      style={{
                        margin: '0',
                        fontSize: '12px',
                        color: '#636363',
                      }}
                    >
                      Skill 1{' '}
                    </p>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckCircleRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                    <p
                      style={{
                        margin: '0',
                        fontSize: '12px',
                        color: '#636363',
                      }}
                    >
                      Skill 1{' '}
                    </p>
                  </Stack>
                </Stack>
                <PrimaryButton style={{ width: '100%' }}>{t('Choose')}</PrimaryButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
