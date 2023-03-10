import * as Yup from 'yup';

const SignUpSchema = (t: any) =>
  Yup.object().shape({
    firstName: Yup.string()
      .max(50, `${t('r-max-50')}`)
      .required(`${t('r-first-name')}`),
    email: Yup.string()
      .email(`${t('not-email')}`)
      .min(3, `${t('r-min-3')}`)
      .max(50, `${t('r-max-50')}`)
      .required(`${t('r-email')}`),
    lastName: Yup.string()
      .max(50, `${t('r-max-50')}`)
      .required(`${t('r-last-name')}`),
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
export default SignUpSchema;
