import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Box, Divider, FormControl, Grid, IconButton, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeMeta, PatternFormat } from 'react-number-format';
import { NumberFormatBase } from 'react-number-format';

import { paymentActions } from '@/store/payment/paymentSlice';
import { Field, Form, Formik } from 'formik';
import { ErrorMessage } from '@/components/share/ErrorMessage';
import * as Yup from 'yup';
import axiosPayment from '@/services/api/axiosPayment';
import { Stack } from '@mui/system';
import CardImage from '@/components/payment/CardImage';
import cardDefault from '@/public/images/card-default.svg';
import cardAmex from '@/public/images/card-amex.svg';
import cardDiscover from '@/public/images/card-discover.svg';
import cardMastercard from '@/public/images/card-mastercard.svg';
import cardVisa from '@/public/images/card-visa.svg';
import PrimaryButton from '@/components/share/PrimaryButton';

interface IAddCard {
  card: {
    number: string | number;
    exp_date: string;
    cvc: string | number;
  };
}

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
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

const AddCardModal = ({ isOpen, closeModal }: Props) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  //test area
  const [show, setShow] = useState(true);
  const format = (val: any) => {
    if (val === '') return '';
    let month = val.substring(0, 2);
    const year = val.substring(2, 4);

    if (month.length === 1 && month[0] > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      // set the lower and upper boundary
      if (Number(month) === 0) {
        month = `01`;
      } else if (Number(month) > 12) {
        month = '12';
      }
    }

    return `${month}/${year}`;
  };

  const initialValues: IAddCard = {
    card: {
      number: '',
      exp_date: '',
      cvc: '',
    },
  };

  const AddCardSchema = Yup.object().shape({
    card: Yup.object().shape({
      number: Yup.number().required('Please enter card number'),
      //   exp_month: Yup.number().max(12, 'Invalid Month').required(),
      //   exp_year: Yup.number()
      //     .min(parseInt(new Date().getFullYear().toString().slice(-2)), 'Invalid Year')
      //     .required(),
      exp_date: Yup.string().required('Please enter expiry date'),
      cvc: Yup.number().required('Please enter cvc'),
    }),
  });

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box sx={styleModal}>
        <Box sx={{ position: 'absolute', top: '4px', right: '16px' }}>
          <IconButton
            onClick={() => {
              closeModal();
            }}
          >
            <CloseIcon fontSize="medium" sx={{ color: '#1e1e1e' }} />
          </IconButton>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={AddCardSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log({ values });
            const formData = new URLSearchParams();
            const month = values.card.exp_date.substring(0, 2);
            const year = values.card.exp_date.substring(3, 5);
            formData.append('card[number]', values.card.number as string);
            formData.append('card[cvc]', values.card.cvc as string);
            formData.append('card[exp_month]', month as string);
            formData.append('card[exp_year]', year as string);
            const params = {
              formData,
              stripeCustomerId: currentUser?.stripeCustomerId,
              setSubmitting,
            };
            dispatch(paymentActions.addCardToCustomer(params));
          }}
        >
          {({ isSubmitting, handleChange, values, handleSubmit }) => (
            <Form>
              <h3 style={{ margin: '8px 0' }}>Add your payment method</h3>
              <Divider sx={{ mb: 2 }} />

              <Stack
                sx={{ mb: 2 }}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center">
                  <CardImage src={cardDefault} alt="card-default" />
                  <b>Credit/Debit Card</b>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                  <CardImage src={cardAmex} alt="card-amex" />
                  <CardImage src={cardDiscover} alt="card-discover" />
                  <CardImage src={cardMastercard} alt="card-mastercard" />
                  <CardImage src={cardVisa} alt="card-visa" />
                </Stack>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <PatternFormat
                      format="#### #### #### ####"
                      mask=""
                      customInput={TextField}
                      label="Card number"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="card.number"
                    />
                    <ErrorMessage name={`card.number`} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <PatternFormat
                      format="####"
                      mask=""
                      customInput={TextField}
                      label="CVC/CVV"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="card.cvc"
                    />
                    <ErrorMessage name={`card.cvc`} />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={4}>
                  <FormControl fullWidth>
                    <PatternFormat
                      format="##"
                      placeholder="MM"
                      customInput={TextField}
                      label="Expiry Month"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="card.exp_month"
                    />
                    <ErrorMessage name={`card.exp_month`} />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <PatternFormat
                      format="##"
                      placeholder="YY"
                      customInput={TextField}
                      label="Expiry Year"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="card.exp_year"
                    />

                    <ErrorMessage name={`card.exp_year`} />
                  </FormControl>
                </Grid> */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <NumberFormatBase
                      format={format}
                      placeholder="MM/YY"
                      customInput={TextField}
                      label="Expiry date"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="card.exp_date"
                      removeFormatting={(inputValue: string) => {
                        return inputValue.replace(/[^0-9]/g, '');
                      }}
                      getCaretBoundary={() => [true, true, true, true, true, true]}
                      value={values.card.exp_date}
                    />
                    <ErrorMessage name={`card.exp_date`} />
                  </FormControl>
                </Grid>
              </Grid>

              <PrimaryButton
                disabled={isSubmitting}
                style={{ float: 'right', mt: 2 }}
                type={show ? 'submit' : 'button'}
                onClick={() => {
                  if (!show) {
                    console.log('clicked');
                  }
                }}
              >
                {isSubmitting ? 'Adding...' : 'Add'}
              </PrimaryButton>
              {/* <button
                type="button"
                onClick={() => {
                  setShow(!show);
                }}
              >
                toggle
              </button> */}
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddCardModal;
