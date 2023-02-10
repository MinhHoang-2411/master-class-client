import { useAppDispatch } from '@/store/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import SignUpSchema from './Validate';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authActions } from '@/store/auth/authSlice';
import { ErrorMessage } from '@/components/share/ErrorMessage';
import { styleModal } from '@/declares/modal';
import { IModal } from '@/declares/models';

interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpModal = ({ isOpen, CloseModal }: IModal) => {
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
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Sign up
        </Typography>
        <Grid sx={{ mb: 2 }}>
          <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            validationSchema={SignUpSchema}
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
                        label="First name*"
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
                        label="Last name*"
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
                        label="Password*"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                onClick={() => setShowPassword(!showPassword)}
                                color="secondary"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
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
                        label="Confirm Password*"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                color="secondary"
                              >
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Typography variant="body1" component="span">
                      Already have an account?
                    </Typography>
                    <Typography
                      variant="body1"
                      component="span"
                      color="warning.light"
                      onClick={() => dispatch(authActions.openSignInModal())}
                      sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      &nbsp;Log in.
                    </Typography>
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
                    By logging in, you agree to our Privacy Policy and Terms of Service
                  </Typography>
                </Box>

                <Button
                  type={isSubmitting ? `button` : `submit`}
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  {isSubmitting ? 'Sign up...' : 'Sign up'}
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
