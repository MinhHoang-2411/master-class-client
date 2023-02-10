import { ErrorMessage } from '@/components/share/ErrorMessage';
import { styleModal } from '@/declares/modal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Modal, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IModal, VerifyCodeModel } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';

const VerifyCodeSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
});

const VerifyCode = ({ isOpen, CloseModal }: IModal) => {
  const token_forgot_pass = useAppSelector((state) => state?.auth?.tokenForgotPass);

  const onSubmit = (values: any) => {
    try {
      const params = {
        code: values.code,
        token: token_forgot_pass,
      };
      dispatch(authActions.verifyCode(params as VerifyCodeModel));
    } catch (e) {
      console.log(e);
    }
  };

  const dispatch = useAppDispatch();

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
            <EmailIcon color="secondary" />
          </Box>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2, mt: 2 }}>
            Check your email
          </Typography>

          <Typography variant="body1" component="span" color="primary.light">
            {`Verify code`}
          </Typography>
        </Box>
        <Grid sx={{ mb: 2 }}>
          <Formik
            initialValues={{ code: '' }}
            validateOnBlur={false}
            validationSchema={VerifyCodeSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={`h-100`}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <Field
                        as={TextField}
                        id="code"
                        name="code"
                        label="Verify code*"
                        variant="outlined"
                      />
                      <ErrorMessage name="code" />
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
                  {isSubmitting ? 'Verify...' : 'Verify'}
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

export default VerifyCode;
