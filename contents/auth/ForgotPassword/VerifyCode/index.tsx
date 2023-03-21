import Button from '@/components/share/Button';
import { ErrorMessage } from '@/components/share/ErrorMessage';
import { TOKEN_FORGOT_PASS } from '@/constants/auth';
import { displayCenter, styleModal } from '@/declares/modal';
import { IModal, VerifyCodeModel } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSessionStorage } from '@/utils/auth';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Modal } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import CountdownTimer from '../../Countdown';
import InputCodeComponent from './InputCodeComponent';

const VerifyCode = ({ isOpen, CloseModal }: IModal) => {
  const { t } = useTranslation('common');
  const dataTokenForgotPass = getSessionStorage(TOKEN_FORGOT_PASS);
  const token_forgot_pass = useAppSelector((state) => state?.auth?.tokenForgotPass);
  const dispatch = useAppDispatch();
  const [codeOTP, setCodeOTP] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {
    setIsSubmitting(true);
    try {
      if (codeOTP.length >= 6) {
        const params = {
          code: codeOTP,
          token: token_forgot_pass,
        };
        dispatch(authActions.verifyCode(params as VerifyCodeModel));
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    } catch (e) {
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

  const VerifySchema = Yup.object().shape({
    arrayCode: Yup.string()
      .required(`${t('Please enter enough confirmation code')}`)
      .min(6, `${t('Please enter enough confirmation code')}`),
  });

  return (
    <Modal open={isOpen} onClose={CloseModal}>
      <Box sx={styleModal}>
        <Box sx={{ ...displayCenter, flexDirection: 'column' }}>
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
            {t('check-your-email')}
          </Typography>

          <Typography
            variant="body1"
            component="span"
            color="primary.light"
            sx={{ textAlign: 'center' }}
          >
            {t('enter-the-confirmation-code')}
          </Typography>
          <div>
            <CountdownTimer
              targetDate={dataTokenForgotPass?.expiresAt}
              session={TOKEN_FORGOT_PASS}
            />
          </div>
        </Box>
        <Grid sx={{ mb: 2 }}>
          <Formik
            initialValues={{ arrayCode: '' }}
            validateOnBlur={false}
            validationSchema={VerifySchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue }) => (
              <Form className={`h-100`}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <InputCodeComponent
                    onChange={onChange}
                    setFieldValue={setFieldValue}
                    codeOTP={codeOTP}
                  />
                </Grid>
                <Button
                  type={isSubmitting ? `button` : `submit`}
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={onSubmit}
                  sx={{ mt: 5 }}
                >
                  {isSubmitting ? `${t('verify')}...` : `${t('verify')}`}
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

export default VerifyCode;
