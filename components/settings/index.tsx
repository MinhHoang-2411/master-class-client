import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAuth } from '@/utils/auth';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Modal,
  Popover,
  Stack,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Typography from '../share/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import { useEffect, useState } from 'react';
import FlagEn from '../../public/icons/flag-en.png';
import FlagVi from '../../public/icons/flag-vi.png';
import Image from 'next/image';
import Cookies from 'js-cookie';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardImage from '../payment/CardImage';
import { cardImagePayment } from '@/constants/payment';
import cardDefault from '@/public/images/card-default.svg';
import { paymentMethod as paymentMethodConstant } from '@/constants/payment';
import { paymentActions } from '@/store/payment/paymentSlice';
import PrimaryButton from '../share/PrimaryButton';
import { convertTimeStamp, convertTimeStampToString } from '@/utils/convert/date';
import { styleModalSetting } from '@/declares/modal';
import logo from '../../public/logo.png';

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: FlagEn,
  },
  {
    value: 'vi',
    label: 'Vietnamese',
    icon: FlagVi,
  },
];

interface Props {}

const SettingComponent = ({}: Props) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dispatch = useAppDispatch();
  const user = getAuth()?.user;
  const router = useRouter();

  //payment
  const listCard = useAppSelector((state) => state.payment.listCard);
  const isPayment = useAppSelector((state) => state.payment.isPayment);

  //subscription
  const listSubscriptionRaw = useAppSelector((state) => state.payment.listSubscription);
  const { loadingDeleteCard, loadingDeleteSubscription } = useAppSelector((state) => state.payment);
  const listSubscription = listSubscriptionRaw.filter((subs) => subs.status === 'active');
  const [isOpenModalConfirmSubscription, setIsOpenModalConfirmSubscription] = useState(false);
  const [isOpenModalConfirmCard, setIsOpenModalConfirmCard] = useState(false);
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState('');
  const [cardId, setCardId] = useState('');
  const handleCloseConfirmSubscriptionModal = () => {
    setIsOpenModalConfirmSubscription(false);
  };
  const handleCloseConfirmCardModal = () => {
    setIsOpenModalConfirmCard(false);
  };

  const [language, setLanguage] = useState(locale);

  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLanguage = (lang: string) => {
    router.push('/settings', undefined, { locale: lang });
    handleClose();
    Cookies.set('appLocale', lang);
    localStorage.setItem('appLocale', lang);
    setLanguage(lang);
  };

  useEffect(() => {
    //remove layout disable watch video...
  }, [isPayment]);

  return (
    <Grid container spacing={2}>
      {/* Account */}
      <Grid item container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Stack spacing={3}>
            <Card sx={{ py: 2, px: 3.5 }}>
              <Typography variant="h6" component={'h2'}>
                {t('account')}
              </Typography>
              <Box sx={{ py: 2, my: 1 }}>
                <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" component={'h3'}>
                    {t('email')}
                  </Typography>
                </Box>
                <div className="">{user?.email}</div>
              </Box>
              <Divider sx={{ border: '.5px solid #D4D5D9' }} />
              <Box sx={{ py: 2, my: 1 }}>
                <Box
                  sx={{
                    my: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1" component={'h3'}>
                    {t('password')}
                  </Typography>
                  {!user?.socialAccount ? (
                    <IconButton onClick={() => dispatch(authActions.openChangePassModal())}>
                      <EditIcon />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </Box>
                <div className="">••••••••</div>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      {/* End Account  */}

      {/* Payment  */}
      <Grid item container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Stack spacing={3}>
            <Card sx={{ py: 2, px: 3.5 }}>
              <Stack spacing={3}>
                <Typography variant="h6" component={'h2'}>
                  Payment
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" component={'h3'}>
                    Payment Methods
                  </Typography>
                  <Button
                    size="large"
                    sx={{ color: 'rgba(0, 0, 0, 0.54)', textTransform: 'capitalize' }}
                    endIcon={<AddCircleOutlineIcon />}
                    onClick={() => {
                      dispatch(paymentActions.openModalAddCard());
                    }}
                  >
                    <b style={{ display: 'block', transform: 'translateX(5px)' }}>Add</b>
                  </Button>
                </Stack>
                {listCard?.length > 0 ? (
                  <Stack spacing={1}>
                    {listCard?.map((card) => (
                      <Stack key={card?.id} direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            padding: '16px',
                            background: '#fff',
                            borderRadius: '4px',
                            color: 'black',
                            width: '300px',
                            border: '1px solid #ccc',
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" alignItems="center">
                              <CardImage
                                src={card.brand ? cardImagePayment[card?.brand] : cardDefault}
                                alt="card"
                              />
                              <b>{card.brand ? paymentMethodConstant[card?.brand] : ''}</b>
                            </Stack>
                            <b>**** {card?.last4}</b>
                          </Stack>
                        </Box>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ height: '40px', textTransform: 'capitalize' }}
                          onClick={() => {
                            setIsOpenModalConfirmCard(true);
                            setCardId(card.id as string);
                          }}
                        >
                          <b>Delete</b>
                        </Button>
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="subtitle2">No card stored</Typography>
                )}
              </Stack>
            </Card>
          </Stack>
        </Grid>

        {/* Delete Card Modal  */}
        <Modal open={isOpenModalConfirmCard} onClose={handleCloseConfirmCardModal}>
          <Box sx={{ ...styleModalSetting }}>
            <Stack alignItems="center" spacing={2}>
              <Typography sx={{ textTransform: 'none' }} variant="h6" component="h3">
                Are you sure to delete this card?
              </Typography>

              <Stack direction="row" spacing={1} justifyContent="center">
                <Button variant="outlined" onClick={handleCloseConfirmCardModal}>
                  Close
                </Button>
                <Button
                  disabled={loadingDeleteCard}
                  variant="contained"
                  onClick={() => {
                    dispatch(
                      paymentActions.deleteCard({
                        id: cardId,
                        closeDeleteCardModal: handleCloseConfirmCardModal,
                      })
                    );
                  }}
                >
                  {loadingDeleteCard ? 'Deleting...' : 'Confirm'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </Grid>
      {/* End Payment  */}

      {/* Subscriptions */}
      <Grid item container spacing={3}>
        <>
          <Grid item xs={12} lg={12}>
            <Stack
              spacing={3}
              onClick={() => {
                console.log({ listSubscription });
              }}
            >
              <Card sx={{ py: 2, px: 3.5 }}>
                <Stack spacing={3}>
                  <Typography variant="h6" component={'h2'}>
                    Subscriptions
                  </Typography>
                  {listSubscription.length > 0 ? (
                    listSubscription.map((subs) => (
                      <Stack
                        sx={{
                          width: 'fit-content',
                          border: '1px solid #ccc',
                          borderRadius: '12px',
                          p: 2,
                        }}
                        key={subs.id}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <Box sx={{ borderRadius: '8px', background: '#000', height: '50px' }}>
                          <Image
                            style={{ objectFit: 'cover' }}
                            width={50}
                            height={50}
                            src={logo}
                            alt="course"
                          />
                        </Box>
                        <Stack spacing="2px">
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="h6">{subs.productPayment?.name}</Typography>

                            {/* <Typography variant="h6">{`$${subs.productPayment?.amount
                              .toString()
                              .substring(
                                0,
                                subs.productPayment?.amount.toString().length - 2
                              )}.${subs.productPayment?.amount.toString().slice(-2)}`}</Typography> */}

                            <Box
                              sx={{
                                background: '#e1fed2',
                                color: '#015a00',
                                borderRadius: '4px',
                                padding: '4px 10px',
                                fontSize: '15px',
                              }}
                            >
                              <b>Active</b>
                            </Box>

                            {/* amount */}
                            {subs.cancelAtPeriodEnd ? (
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{
                                  background: '#eaeaea',
                                  color: '#000',
                                  borderRadius: '4px',
                                  padding: '4px 10px',
                                  fontSize: '15px',
                                }}
                              >
                                <AccessTimeFilledIcon />{' '}
                                <span>{`Cancels ${convertTimeStampToString(subs.cancelAt)}`}</span>
                              </Stack>
                            ) : (
                              <PrimaryButton
                                onClick={() => {
                                  setIsOpenModalConfirmSubscription(true);
                                  setStripeSubscriptionId(subs.subscriptionId);
                                }}
                                style={{
                                  textTransform: 'capitalize',
                                  fontSize: '16px',
                                  padding: '0 16px',
                                }}
                              >
                                <b>Cancel</b>
                              </PrimaryButton>
                            )}
                          </Stack>

                          <Stack>
                            {subs.cancelAtPeriodEnd ? (
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '14px' }}
                              >
                                <span>Start: {convertTimeStamp(subs.currentPeriodStart)}</span>
                                <Divider
                                  orientation="vertical"
                                  flexItem
                                  sx={{
                                    alignSelf: 'center',
                                    height: '13px',
                                    borderColor: 'rgba(0, 0, 0, 0.6)',
                                  }}
                                />
                                <span>End: {convertTimeStamp(subs.currentPeriodEnd)}</span>
                              </Stack>
                            ) : (
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '14px' }}
                              >
                                <span>Billing daily</span>
                                <Divider
                                  orientation="vertical"
                                  flexItem
                                  sx={{
                                    alignSelf: 'center',
                                    height: '13px',
                                    borderColor: 'rgba(0, 0, 0, 0.6)',
                                  }}
                                />
                                <span>
                                  Next invoice on {convertTimeStamp(subs.currentPeriodEnd)}{' '}
                                </span>
                              </Stack>
                            )}
                          </Stack>
                        </Stack>
                      </Stack>
                    ))
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Typography variant="subtitle2">No Subscription stored</Typography>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ textTransform: 'capitalize' }}
                        onClick={() => {
                          dispatch(paymentActions.openModalChoosePayment());
                        }}
                      >
                        <b>create</b>
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Grid>
          <Modal
            open={isOpenModalConfirmSubscription}
            onClose={handleCloseConfirmSubscriptionModal}
          >
            <Box sx={{ ...styleModalSetting }}>
              <Stack alignItems="center" spacing={2}>
                <Typography sx={{ textTransform: 'none' }} variant="h6" component="h3">
                  Are you sure to cancel this subscription?
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button variant="outlined" onClick={handleCloseConfirmSubscriptionModal}>
                    Close
                  </Button>
                  <Button
                    disabled={loadingDeleteSubscription}
                    variant="contained"
                    onClick={() => {
                      dispatch(
                        paymentActions.deleteSubscription({
                          stripeSubscriptionId,
                          closeModal: handleCloseConfirmSubscriptionModal,
                        })
                      );
                    }}
                  >
                    {loadingDeleteSubscription ? 'Canceling...' : 'Confirm'}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Modal>
        </>
      </Grid>
      {/* End Subscriptions */}

      {/* Language  */}
      <Grid item container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Stack spacing={3}>
            <Card sx={{ py: 2, px: 3.5 }}>
              <Typography variant="h6" component={'h2'}>
                {t('app-language')}
              </Typography>
              <Box sx={{ py: 2, my: 1 }}>
                <Box
                  sx={{
                    my: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1" component={'h3'}>
                    {t('change-default-language')}
                  </Typography>

                  <IconButton
                    onClick={handleOpen}
                    sx={{
                      padding: 0,
                      width: 44,
                      height: 44,
                    }}
                  >
                    <LanguageIcon />
                  </IconButton>

                  <Popover
                    open={Boolean(open)}
                    anchorEl={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                      sx: {
                        p: 1,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                          px: 1,
                          typography: 'body2',
                          borderRadius: 0.75,
                        },
                      },
                    }}
                  >
                    <Stack spacing={0.75}>
                      {LANGS.map((option) => (
                        <MenuItem
                          key={option.value}
                          selected={option.value === language}
                          onClick={() => handleChangeLanguage(option.value)}
                        >
                          <Image
                            src={option.icon}
                            alt="flag"
                            height={44}
                            width={44}
                            style={{ marginRight: '8px' }}
                          />
                          {option.label}
                        </MenuItem>
                      ))}
                    </Stack>
                  </Popover>
                </Box>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      {/* End Language  */}
    </Grid>
  );
};

export default SettingComponent;
