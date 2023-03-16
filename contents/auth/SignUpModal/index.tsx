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
      dispatch(authActions.register(values));
      action.setSubmitting(false);
    } catch (error) {
      action.setSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={CloseModal}>
      <Box sx={styleModal}>
        <Typography variant="h4" component="h2" sx={{ mb: 4, mt: 2, textAlign: 'center' }}>
          {t('sign-up')}
        </Typography>
        <Box sx={{ position: 'absolute', top: '12px', right: '12px' }}>
          <IconButton onClick={() => dispatch(authActions.closeSignUpModal())}>
            <CloseIcon fontSize="medium" sx={{ color: '#6c757d' }} />
          </IconButton>
        </Box>
        <Grid sx={{ mb: 2 }}>
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
                        as={TextField}
                        id="firstName"
                        name="firstName"
                        label={`${t('first-name')}*`}
                        variant="outlined"
                      />
                      <ErrorMessage name="firstName" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={TextField}
                        id="lastName"
                        name="lastName"
                        label={`${t('last-name')}*`}
                        variant="outlined"
                      />
                      <ErrorMessage name="lastName" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={TextField}
                        id="email"
                        name="email"
                        label="Email*"
                        variant="outlined"
                      />
                      <ErrorMessage name="email" />
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
                                size="small"
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
                                size="small"
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
                <Grid>
                  <Box sx={{ ...displayCenter }}>
                    <Typography variant="body2" component="span">
                      {t('already-have-an-account')}
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      color="inherit"
                      onClick={() => dispatch(authActions.openSignInModal())}
                      sx={{ color: '#ff3366' }}
                    >
                      {t('log-in')}
                    </Button>
                  </Box>
                </Grid>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 4,
                    px: 2,
                  }}
                >
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
                  {isSubmitting ? `${t('sign-up')}...` : `${t('sign-up')}`}
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Box>
    </Modal>
  );
};

export default SignUpModal;
