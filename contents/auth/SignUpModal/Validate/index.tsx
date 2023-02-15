import * as Yup from 'yup';

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const SignUpSchema = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('First name is required'),
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    lastName: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Last name is required'),
    password: Yup.string()
      .matches(
        passRegex,
        'The password must consist of 1 uppercase letter, 1 lowercase letter, and 1 number'
      )
      .min(8, 'Minimum 8 symbols')
      .max(20, 'Maximum 20 symbols')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Password confirmation is required')
      .when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          "Password and Confirm Password didn't match"
        ),
      }),
  });
export default SignUpSchema;
