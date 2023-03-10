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
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';

const ChangePassword = ({ isOpen, CloseModal }: IModal) => {
  const { t } = useTranslation('common');
  const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required(`${t('r-current-password')}`),
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = (values: any, action: any) => {
    action.setSubmitting(true);
    try {
      const params = {
        currentPassword: values.currentPassword,
        password: values.password,
      };
      dispatch(authActions.changePassword(params));
      action.setSubmitting(false);
    } catch (e) {
      action.setSubmitting(false);
    }
  };

  const modalChangePassword = useAppSelector((state) => state.auth.modalChangePassword.isOpen);

  useEffect(() => {
    if (!modalChangePassword) {
      setShowCurrentPassword(false)
      setShowPassword(false)
      setShowConfirmPassword(false)
    }
  }, [modalChangePassword])


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
            {t('change-password')}
          </Typography>
        </Box>
        <Grid sx={{ mb: 2 }}>
          <Formik
            initialValues={{ password: '', confirmPassword: '', currentPassword: '' }}
            validateOnBlur={false}
            validationSchema={ChangePasswordSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={`h-100`}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={TextField}
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        label={`${t('current-password')}*`}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                color="secondary"
                              >
                                {!showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage name="currentPassword" />
                    </FormControl>
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
                    onClick={() => dispatch(authActions.closeChangePassModal())}
                  >
                    {t('cancel')}
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

export default ChangePassword;
