import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';

import {
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Modal,
  TextField,
  Radio,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PatternFormat } from 'react-number-format';
import { NumberFormatBase } from 'react-number-format';

import { paymentActions } from '@/store/payment/paymentSlice';
import { Form, Formik } from 'formik';
import { ErrorMessage } from '@/components/share/ErrorMessage';
import * as Yup from 'yup';

import { Stack } from '@mui/system';
import CardImage from '@/components/payment/CardImage';
import cardDefault from '@/public/images/card-default.svg';
import cardAmex from '@/public/images/card-amex.svg';
import cardDiscover from '@/public/images/card-discover.svg';
import cardMastercard from '@/public/images/card-mastercard.svg';
import cardVisa from '@/public/images/card-visa.svg';
import PrimaryButton from '@/components/share/PrimaryButton';
import { paymentMethod as paymentMethodConstant } from '@/constants/payment';
import { cardImagePayment } from '@/constants/payment';

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
  width: '800px',
  bgcolor: '#fff',
  boxShadow: 24,
  padding: 3,
  paddingTop: 6,
  borderRadius: 1,
  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
  overflow: 'auto',
  maxHeight: '80vh',
};

const AddCardAndPayModal = ({ isOpen, closeModal }: Props) => {
  const { t } = useTranslation('common');
  const product = useAppSelector((state) => state.payment.detailProduct);
  const { listCard, loadingGetListCard } = useAppSelector((state) => state.payment);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  //test area
  const [show, setShow] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isActive, setIsActive] = useState<number | string>('');
  const [type, setType] = useState('submit');
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

  useEffect(() => {
    if (listCard.length > 0) {
      setType('button');
      setShow(false);
    }
  }, [listCard]);

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
            const month = values.card.exp_date.substring(0, 2);
            const year = values.card.exp_date.substring(3, 5);
            // const formData = new URLSearchParams();
            // formData.append('card[number]', values.card.number as string);
            // formData.append('card[cvc]', values.card.cvc as string);
            // formData.append('card[exp_month]', month as string);
            // formData.append('card[exp_year]', year as string);
            const formData = {
              card: {
                number: values.card.number,
                cvc: values.card.cvc,
                exp_month: month,
                exp_year: year,
              },
            };
            const params = {
              formData,
              stripeCustomerId: currentUser?.stripeCustomerId,
              priceId: product?.priceId,
              setSubmitting,
            };
            dispatch(paymentActions.addCardToCustomer(params));
          }}
        >
          {({ isSubmitting, handleChange, values, handleSubmit, resetForm }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  {loadingGetListCard ? (
                    <p>loading...</p>
                  ) : listCard.length > 0 ? (
                    <Box sx={{ p: '0 12px 12px 12px', borderRadius: '4px', background: '#f7f9fa' }}>
                      <Stack direction="row" alignItems="center">
                        <Radio
                          checked={type === 'button'}
                          onChange={() => {
                            setShow(false);
                            setIsActive('');
                            setType('button');
                            setPaymentMethod('');
                          }}
                        />
                        <h3
                          onClick={() => {
                            setShow(false);
                            setIsActive('');
                            setType('button');
                            setPaymentMethod('');
                          }}
                          style={{ margin: '8px 0' }}
                        >
                          Choose Your Credit/Debit Card
                        </h3>
                      </Stack>

                      {!show && (
                        <Stack spacing={1}>
                          <Divider sx={{ my: 2 }} />
                          {listCard.map((card, index) => (
                            <button
                              type="reset"
                              onClick={(e) => {
                                resetForm();
                                if (isActive === index) {
                                  setPaymentMethod('');
                                  setIsActive('');
                                  // setShow(true);
                                  // setType('submit');
                                } else {
                                  setPaymentMethod(card?.cardId as string);
                                  setIsActive(index);
                                  setShow(false);
                                  setType('button');
                                }
                              }}
                              style={{
                                padding: '16px',
                                background: isActive === index ? '#e32652' : '#fff',
                                borderRadius: '4px',
                                color: isActive === index ? '#fff' : 'black',
                                width: '300px',
                                cursor: 'pointer',
                                border: '1px solid #ccc',
                              }}
                              key={card?._id}
                            >
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <CardImage
                                    src={card.brand ? cardImagePayment[card?.brand] : cardDefault}
                                    alt="card"
                                  />
                                  <b>{card.brand ? paymentMethodConstant[card?.brand] : ''}</b>
                                </Stack>
                                <b>**** {card?.last4}</b>
                              </Stack>
                            </button>
                          ))}
                        </Stack>
                      )}
                    </Box>
                  ) : (
                    <></>
                  )}
                  <Box sx={{ p: '0 12px 12px 12px', borderRadius: '4px', background: '#f7f9fa' }}>
                    <Stack direction="row">
                      <Radio
                        checked={type === 'submit'}
                        onChange={() => {
                          setShow(true);
                          setIsActive('');
                          setType('submit');
                          setPaymentMethod('');
                        }}
                      />
                      <h3
                        onClick={() => {
                          setShow(true);
                          setIsActive('');
                          setType('submit');
                          setPaymentMethod('');
                        }}
                        style={{ margin: '8px 0' }}
                      >
                        Add your payment method
                      </h3>
                    </Stack>

                    {show ? (
                      <>
                        <Divider sx={{ my: 2 }} />

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
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Stack sx={{ bgcolor: '#f7f9fa', p: '0 12px 12px 12px', borderRadius: '4px' }}>
                    <h3 style={{ margin: '8px 0' }}>Summary</h3>
                    <Stack direction="row" justifyContent="space-between">
                      <h4>Original Price:</h4>
                      <h4>
                        {product.amount
                          ? `$${product?.amount
                              .toString()
                              .substring(
                                0,
                                product?.amount.toString().length - 2
                              )}.${product?.amount.toString().slice(-2)}`
                          : ''}
                      </h4>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <h4>Total:</h4>
                      <h4>
                        {product.amount
                          ? `$${product?.amount
                              .toString()
                              .substring(
                                0,
                                product?.amount.toString().length - 2
                              )}.${product?.amount.toString().slice(-2)}`
                          : ''}
                      </h4>
                    </Stack>
                    <PrimaryButton
                      disabled={type === 'submit' ? isSubmitting : !paymentMethod}
                      style={{ float: 'right', mt: 2 }}
                      type={type}
                      onClick={() => {
                        if (!show) {
                          console.log('clicked');
                          dispatch(
                            paymentActions.createSubscription({
                              priceId: product?.priceId,
                              paymentMethod,
                              stripeCustomerId: currentUser?.stripeCustomerId,
                            })
                          );
                        }
                      }}
                    >
                      {isSubmitting ? 'Loading...' : 'Complete Checkout'}
                    </PrimaryButton>
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddCardAndPayModal;
