import Button from '@/components/share/Button';
import { ErrorMessage } from '@/components/share/ErrorMessage';
import { displayCenter, styleModal } from '@/declares/modal';
import { IModal } from '@/declares/models';
import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import KeyIcon from '@mui/icons-material/Key';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Modal, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';

const SendEmail = ({ isOpen, CloseModal }: IModal) => {
  const { t } = useTranslation('common');

const SendEmailSchema = Yup.object().shape({
  email: Yup.string().email(`${t('not-email')}`).required(`${t('r-email')}`),
});

  const dispatch = useAppDispatch();
  const onSubmit = (values: any, action: any) => {
    action.setSubmitting(true);
    try {
      dispatch(authActions.forgotPass(values.email));
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
            {t('forgot-your-password')}
          </Typography>

          <Typography variant="body1" component="span" color="primary.light" sx={{ textAlign: 'center'}}>
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
                  {isSubmitting ? `${t('send-email')}...` : `${t('send-email')}`}
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

export default SendEmail;
