import Button from '@/components/share/Button';
import { ErrorMessage } from '@/components/share/ErrorMessage';
import { displayCenter, styleModal } from '@/declares/modal';
import { IModal, ResetPasswordModel } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Modal, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';

const ResetPassword = ({ isOpen, CloseModal }: IModal) => {
  const { t } = useTranslation('common');

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, `${t('r-min-8')}`)
      .max(15, `${t('r-max-15')}`)
      .required(`${t('r-password')}`),
    confirmPassword: Yup.string()
      .required(`${t('r-confirm-password')}`)
      .when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref('password')], `${t('r-did-match')}`),
      }),
  });

  const { loadingResetPass: loading, tokenForgotPass } = useAppSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = (values: any, action: any) => {
    action.setSubmitting(true);
    try {
      const params = {
        token: tokenForgotPass,
        password: values.password,
      };
      dispatch(authActions.resetPassword(params as ResetPasswordModel));
      action.setSubmitting(false);
    } catch (e) {
      action.setSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={CloseModal}>
      <Box sx={styleModal}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            mb: 4,
          }}
        >
          <Box
            sx={{
              bgcolor: '#f1f1f1',
              width: 50,
              height: 50,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <KeyIcon color="secondary" />
          </Box>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2, mt: 2 }}>
            {t('set-new-password')}
          </Typography>
        </Box>
        <Grid sx={{ mb: 2 }}>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validateOnBlur={false}
            validationSchema={ResetPasswordSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={`h-100`}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
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
                              >
                                {!showPassword ? <Visibility /> : <VisibilityOff />}
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage name="password" />
                    </FormControl>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={TextField}
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        label={`${t('confirm-password')}*`}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                color="secondary"
                              >
                                {!showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
                  sx={{ mt: 4 }}
                  type={isSubmitting ? `button` : `submit`}
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  {isSubmitting ? `${t('reset-password')}...` : `${t('reset-password')}`}
                </Button>
                <Box sx={{ ...displayCenter, mt: 3 }}>
                  <Button
                    variant="text"
                    size="small"
                    color="inherit"
                    onClick={() => dispatch(authActions.backToLogInModal())}
                  >
                    <KeyboardBackspaceIcon
                      sx={{ mr: 0.8 }}
                      fontSize="inherit"
                    ></KeyboardBackspaceIcon>
                    {t('back-to-log-in')}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ResetPassword;
