import * as yup from 'yup';
export const profileSchema = yup.object({
  firstname: yup
    .string()
    .matches(/^[a-zA-Z가-힣]{2,}$/, 'Invalid name')

    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name must be at most 50 characters long')
    .required('First name is required'),
  lastname: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name must be at most 50 characters long'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .max(50, 'Email must be at most 50 characters long'),
  password: yup
    .string()
    .nullable()
    .transform((value, originalValue) => {
      originalValue === '' ? null : value; //change it to null instead of empty string to avoid validation
    })
    .min(8, 'Password must be at least 8 characters long')
    .max(50, 'Password must be at most 50 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one upper',
    ),

  mobile: yup
    .string()
    .required('Mobile is required')
    .matches(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
  dob: yup.date().nullable(),
  // .transform((value, originalValue) => {
  //   originalValue === '' ? null : value;
  // })
  // .required('Date of birth is required')
  // .max(new Date(), 'Date of birth must be in the past'),
  confirmPwd: yup
    .string()
    .nullable()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup
    .string()
    .oneOf(['MALE', 'FEMALE', 'NOT_SPECIFIED'], 'Invalid gender')
    .required('Gender is required'),
});
