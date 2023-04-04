import Button from '@/components/share/Button';
import { ErrorMessage } from '@/components/share/ErrorMessage';
import PrimaryButton from '@/components/share/PrimaryButton';
import { displayCenter, styleModal } from '@/declares/modal';
import { IModal } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import KeyIcon from '@mui/icons-material/Key';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, InputAdornment, Modal, TextField } from '@mui/material';
import CustomeTextField from '@/components/share/CustomTextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import * as Yup from 'yup';
import MailIcon from '../../../../public/icons/login/mail.svg';

const SendEmail = ({ isOpen, CloseModal }: IModal) => {
  const { t } = useTranslation('common');

  const SendEmailSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t('not-email')}`)
      .required(`${t('r-email')}`),
  });

  const dispatch = useAppDispatch();
  const onSubmit = (values: any, action: any) => {
    action.setSubmitting(true);
    try {
      dispatch(authActions.forgotPass(values?.email?.toLowerCase()));
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
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            width: '550px',
            margin: '0 auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              mb: 6,
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
              <KeyIcon color="primary" />
            </Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: 'center', mb: 2, mt: 2, color: '#fff' }}
            >
              {t('forgot-password')}
            </Typography>

            <Typography
              variant="body1"
              component="span"
              color="primary.light"
              sx={{ textAlign: 'center' }}
            >
              {t('no-worries-instrucions')}
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
                          as={CustomeTextField}
                          id="email"
                          name="email"
                          label="Email*"
                          fullWidth
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
                                <Image src={MailIcon} alt="icon" height={20} width={20} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <ErrorMessage name="email" />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <PrimaryButton type={isSubmitting ? `button` : `submit`} fullWidth>
                    {isSubmitting ? `${t('send-email')}...` : `${t('send-email')}`}
                  </PrimaryButton>
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
      </Box>
    </Modal>
  );
};

export default SendEmail;
