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
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';

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
      dispatch(authActions.login(values));
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
  return (
    <Modal open={isOpen} onClose={CloseModal}>
      <Box sx={styleModal}>
        <Typography variant="h4" component="h2" sx={{ mb: 4, mt: 2, textAlign: 'center' }}>
          {t('log-in')}
        </Typography>
        <Box sx={{ position: 'absolute', top: '12px', right: '12px' }}>
          <IconButton onClick={() => dispatch(authActions.closeSignInModal())}>
            <CloseIcon fontSize="medium" sx={{ color: '#6c757d' }} />
          </IconButton>
        </Box>
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
                <Field as={TextField} id="email" name="email" label="Email*" variant="outlined" />
                <ErrorMessage name={`email`} />
              </FormControl>
              <FormControl sx={{ mb: 3 }} fullWidth>
                <Field
                  as={TextField}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label={`${t('password')}*`}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() => setShowPassword(!showPassword)}
                          color="secondary"
                          size="small"
                        >
                          {!showPassword ? <Visibility /> : <VisibilityOff />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage name={`password`} />
              </FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, mt: 1, px: 2 }}>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ textAlign: 'center' }}
                  color="primary.light"
                >
                  {t('by-logging-in')}
                </Typography>
              </Box>
              <Button
                type={isSubmitting ? `button` : `submit`}
                color="secondary"
                variant="contained"
                size="large"
                fullWidth
              >
                {/* {isSubmitting ? 'Log in...' : 'Log in'} */}
                {isSubmitting ? `${t('log-in')}...` : `${t('log-in')}`}
              </Button>
              <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
                <Box sx={displayCenter}>
                  <Field as={Checkbox} name="remember" />
                  <Typography variant="caption"> {t('remember-me')} </Typography>
                </Box>
                <Button
                  variant="text"
                  size="small"
                  color="inherit"
                  onClick={() => dispatch(authActions.openModalSendEmail())}
                >
                  {t('forgot-your-password')}
                </Button>
              </Grid>
              <Grid>
                <Box sx={displayCenter}>
                  <Typography variant="body1" component="span">
                    {t('need-an-account')}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    color="inherit"
                    onClick={() => dispatch(authActions.openSignUpModal())}
                  >
                    {t('sign-up-now')}
                  </Button>
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default SignInModal;
