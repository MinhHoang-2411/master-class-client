import * as Yup from 'yup';
import { ErrorMessage } from '@/components/share/ErrorMessage';
import { useAppDispatch } from '@/store/hooks';
import { Box, Modal, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { styleModal } from '@/declares/modal';
import { IModal } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';

const SendEmailSchema = Yup.object().shape({
  email: Yup.string().email('Wrong email format').required('Email is required'),
});

const SendEmail = ({ isOpen, CloseModal }: IModal) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values: any) => {
    try {
      dispatch(authActions.forgotPass(values.email));
    } catch (e) {
      console.log(e);
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
            Forgot password?
          </Typography>

          <Typography variant="body1" component="span" color="primary.light">
            {`No worries, we'll send you reset instrucions`}
          </Typography>
        </Box>
        <Grid sx={{ mb: 2 }}>
          <Formik
            initialValues={{ email: '' }}
            validateOnBlur={false}
            validationSchema={SendEmailSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={`h-100`}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12}>
                    <FormControl sx={{ mb: 4, mt: 1 }} fullWidth>
                      <Field
                        as={TextField}
                        id="email"
                        name="email"
                        label="Email*"
                        variant="outlined"
                      />
                      <ErrorMessage name="email" />
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type={isSubmitting ? `button` : `submit`}
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  {isSubmitting ? 'Reset password...' : 'Reset password'}
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, cursor: 'pointer' }}>
                  <KeyboardBackspaceIcon sx={{ mr: 1 }}></KeyboardBackspaceIcon>
                  <Typography
                    variant="body1"
                    component="span"
                    color=""
                    sx={{ textDecoration: 'underline' }}
                    onClick={() => dispatch(authActions.backToLogInModal())}
                  >
                    {`Back to log in`}
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Box>
    </Modal>
  );
};

export default SendEmail;
