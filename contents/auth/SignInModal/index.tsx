import LoginWithSocial from '@/components/layouts/LoginWithSocial';
import Button from '@/components/share/Button';
import { ErrorMessage } from '@/components/share/ErrorMessage';
import { displayCenter, styleModal } from '@/declares/modal';
import { IModal } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { setAuth } from '@/utils/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useState } from 'react';
import * as Yup from 'yup';
import MailIcon from '../../../public/icons/login/mail.png';
import LockIcon from '../../../public/icons/login/lock.png';
import EyeCloseIcon from '../../../public/icons/login/eye-close.png';
import EyeOpenIcon from '../../../public/icons/login/eye-open.png';
import { styled } from '@mui/material/styles';
import { InputLabel, OutlinedInput, TextField, useTheme, withStyles } from '@mui/material';

interface ILogin {
  email: string;
  password: string;
}

const SignInModal = ({ isOpen, CloseModal }: IModal) => {
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t('not-email')}`)
      .min(3, `${t('r-min-3')}`)
      .max(50, `${t('r-max-50')}`)
      .required(`${t('r-email')}`),
    password: Yup.string().required(`${t('r-password')}`),
  });

  const onSubmit = async (values: ILogin, action: any) => {
    action.setSubmitting(true);
    try {
      const _values = {
        ...values,
        email: values?.email?.toLowerCase(),
      };
      dispatch(authActions.login(_values));
      action.setSubmitting(false);
    } catch (error) {
      setAuth(undefined);
      action.setSubmitting(false);
    }
  };

  const initialValues: ILogin = {
    email: '',
    password: '',
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
              '&: hover': {
                backgroundColor: '#fff',
              },
            }}
          >
            {t('log-in')}
          </Button>
          <Button
            sx={{
              ...tabStyle,
              color: '#6C7275',
              backgroundColor: '#232627',
              borderColor: '#6C7275',
            }}
            onClick={() => dispatch(authActions.openSignUpModal())}
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
            mt: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 6, textAlign: 'center', color: '#fff' }}
          >
            {t('log-in')}
          </Typography>
          <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            validationSchema={SignInSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ isSubmitting, dirty }) => (
              <Form>
                <FormControl sx={{ mb: 3, mt: 3 }} fullWidth>
                  <Field
                    as={CustomeTextField}
                    id="email"
                    name="email"
                    label="Email*"
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
                          <Image src={MailIcon} alt="icon" height={24} width={24} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage name={`email`} />
                </FormControl>

                <FormControl sx={{ mb: 2 }} fullWidth>
                  <Field
                    as={CustomeTextField}
                    id="password"
                    name="password"
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
                            color="warning"
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
                  <ErrorMessage name={`password`} />
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'end', mb: 3 }}>
                  <Button
                    variant="text"
                    size="small"
                    color="inherit"
                    onClick={() => dispatch(authActions.openModalSendEmail())}
                    sx={{ py: 0 }}
                  >
                    {t('forgot-password')}
                  </Button>
                </Box>

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
                    mt: 1,
                    transition: 'all .4s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 4px 15px 0 rgba(236, 116, 149, 0.75)',
                    },
                  }}
                >
                  {isSubmitting ? `${t('log-in')}...` : `${t('log-in')}`}
                </Button>

                {/* <Box>
                <LoginWithSocial />
              </Box>
              
              </Box> */}
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignInModal;
