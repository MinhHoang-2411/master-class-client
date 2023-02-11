import Button from '@/components/share/Button';
import { displayCenter, styleModal } from '@/declares/modal';
import { IModal, VerifyCodeModel } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Modal } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import OtpInput from './OtpInput';

const VerifyCode = ({ isOpen, CloseModal }: IModal) => {
  const token_forgot_pass = useAppSelector((state) => state?.auth?.tokenForgotPass);
  const dispatch = useAppDispatch();
  const [codeOTP, setCodeOTP] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {
    setIsSubmitting(true);
    try {
      const params = {
        code: codeOTP,
        token: token_forgot_pass,
      };
      dispatch(authActions.verifyCode(params as VerifyCodeModel));
      setIsSubmitting(false);
    } catch (e) {
      console.log(e);
      setIsSubmitting(false);
    }
  };

  const onChange = (value: string) => {
    setCodeOTP(value);
  };

  useEffect(() => {
    if (!isOpen) {
      setCodeOTP('');
    }
  }, [isOpen]);
  return (
    <Modal open={isOpen} onClose={CloseModal}>
      <Box sx={styleModal}>
        <Box sx={{ ...displayCenter, flexDirection: 'column', mb: 4 }}>
          <Box
            sx={{
              ...displayCenter,
              bgcolor: '#f1f1f1',
              width: 50,
              height: 50,
              borderRadius: '50%',
            }}
          >
            <EmailIcon color="secondary" />
          </Box>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2, mt: 2 }}>
            Check your email
          </Typography>

          <Typography
            variant="body1"
            component="span"
            color="primary.light"
            sx={{ textAlign: 'center' }}
          >
            Enter the confirmation code from your email to reset your password.
          </Typography>
        </Box>
        <Grid sx={{ mb: 2 }}>
          <Formik initialValues={{ arrayCode: '' }} validateOnBlur={false} onSubmit={onSubmit}>
            {({}) => (
              <Form className={`h-100`}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12}>
                    <FormControl sx={{ mb: 5, mt: 1 }} fullWidth>
                      <OtpInput
                        value={codeOTP}
                        valueLength={6}
                        onChange={onChange}
                        onSubmit={onSubmit}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type={isSubmitting ? `button` : `submit`}
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={onSubmit}
                >
                  {isSubmitting ? 'Verify...' : 'Verify'}
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
                    {`Back to log in`}
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

export default VerifyCode;
