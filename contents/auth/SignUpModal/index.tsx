import { ErrorMessage } from '@/components/share/ErrorMessage';
import { displayCenter, styleModal } from '@/declares/modal';
import { IModal } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import SignUpSchema from './Validate';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@/components/share/Button';
import { useTranslation } from 'next-i18next';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import MailIcon from '../../../public/icons/login/mail.svg';
import UserIcon from '../../../public/icons/login/user.svg';
import LockIcon from '../../../public/icons/login/lock.svg';
import EyeCloseIcon from '../../../public/icons/login/eye-close.svg';
import EyeOpenIcon from '../../../public/icons/login/eye-open.svg';

interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpModal = ({ isOpen, CloseModal }: IModal) => {
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const initialValues: ISignUp = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values: ISignUp, action: any) => {
    action.setSubmitting(true);
    try {
      const _values = {
        ...values,
        email: values?.email?.toLowerCase(),
      };
      dispatch(authActions.register(_values));
      action.setSubmitting(false);
    } catch (error) {
      action.setSubmitting(false);
    }
  };

  const CustomeTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
  }));

  const tabStyle = {
    border: '1px solid #fff',
    p: '10px 24px',
    borderRadius: '20px',
    backgroundColor: '#fff',
    color: '#262626',
    cursor: 'pointer',
  };

  return (
    <Modal open={isOpen} onClose={CloseModal}>
      <Box sx={styleModal}>
        <Box sx={{ position: 'absolute', top: '32px', right: '32px', display: 'flex' }}>
          <Button
            sx={{
              ...tabStyle,
              mr: 1.5,
              color: '#6C7275',
              backgroundColor: '#232627',
              borderColor: '#6C7275',
            }}
            onClick={() => dispatch(authActions.openSignInModal())}
          >
            {t('log-in')}
          </Button>
          <Button
            sx={{
              ...tabStyle,
              '&:hover': {
                backgroundColor: '#fff',
              },
            }}
          >
            {t('Register')}
          </Button>
        </Box>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '550px',
            m: '0 auto',
            mt: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 6, textAlign: 'center', color: '#fff' }}
          >
            {t('Create An Account')}
          </Typography>
          <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            validationSchema={SignUpSchema(t)}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, dirty }) => (
              <Form className={`h-100`}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={CustomeTextField}
                        id="firstName"
                        name="firstName"
                        fullWidth
                        label={`${t('first-name')}*`}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: '#fff' },
                        }}
                        sx={{
                          input: {
                            color: '#fff',
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Image src={UserIcon} alt="icon" height={20} width={20} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage name="firstName" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={CustomeTextField}
                        id="lastName"
                        name="lastName"
                        label={`${t('last-name')}*`}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                          style: { color: '#fff' },
                        }}
                        sx={{
                          input: {
                            color: '#fff',
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Image src={UserIcon} alt="icon" height={20} width={20} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage name="lastName" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={CustomeTextField}
                        id="email"
                        name="email"
                        label="Email*"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                          style: { color: '#fff' },
                        }}
                        sx={{
                          input: {
                            color: '#fff',
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Image src={MailIcon} alt="icon" height={20} width={20} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage name="email" />
                    </FormControl>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={CustomeTextField}
                        id="password"
                        name="password"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label={`${t('password')}*`}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: '#fff' },
                        }}
                        sx={{
                          input: {
                            color: '#fff',
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Image src={LockIcon} alt="icon" height={20} width={20} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                onClick={() => setShowPassword(!showPassword)}
                                color="secondary"
                                size="small"
                              >
                                {!showPassword ? (
                                  <Image src={EyeCloseIcon} alt="icon" height={24} width={24} />
                                ) : (
                                  <Image src={EyeOpenIcon} alt="icon" height={24} width={24} />
                                )}
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage name="password" />
                    </FormControl>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={CustomeTextField}
                        id="confirmPassword"
                        name="confirmPassword"
                        fullWidth
                        type={showConfirmPassword ? 'text' : 'password'}
                        label={`${t('confirm-password')}*`}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: '#fff' },
                        }}
                        sx={{
                          input: {
                            color: '#fff',
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Image src={LockIcon} alt="icon" height={20} width={20} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                color="secondary"
                                size="small"
                              >
                                {!showConfirmPassword ? (
                                  <Image src={EyeCloseIcon} alt="icon" height={24} width={24} />
                                ) : (
                                  <Image src={EyeOpenIcon} alt="icon" height={24} width={24} />
                                )}
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage name="confirmPassword" />
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type={isSubmitting ? `button` : `submit`}
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    color: '#262626',
                    background: 'linear-gradient(94.87deg, #FFB7E4 20.12%, #34DBEB 87.72%)',
                    textTransform: 'uppercase',
                    borderRadius: '100px',
                    mt: 2,
                    transition: 'all .4s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 4px 15px 0 rgba(236, 116, 149, 0.75)',
                    },
                  }}
                >
                  {isSubmitting ? `${t('Continue')}...` : `${t('Continue')}`}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignUpModal;
