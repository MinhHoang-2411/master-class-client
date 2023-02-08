import * as Yup from 'yup';

export const signUpSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().required('Bắt buộc'),
    lastName: Yup.string().required('Bắt buộc'),
    email: Yup.string().email('Sai định dạng').required('Bắt buộc'),
    password: Yup.string().required('Bắt buộc'),
    confirmPassword: Yup.string().required('Bắt buộc'),
  });
