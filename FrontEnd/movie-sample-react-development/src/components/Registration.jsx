import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Registration = () => {
  //password must be 8 - 24 char long,must include small letter ,capital letter and one special char
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(20, 'name must be 20 charecters')
      .min(3, 'name must be > 3 charecters')
      .required('name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('email is required'),
    password: Yup.string()
      .required('password is required')
      .matches(PWD_REGEX, 'Please choose a strong password'),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'password does not match'),

    //   .when('password', {
    //     is: (val) => (val && val.length > 0 ? true : false),
    //     then: Yup.string().oneOf(
    //       [Yup.ref('password')],
    //       'Password does not match'
    //     ),
    //   }),
  });

  const onSubmit = (values) => {
    console.log(values);
    register(values)
      .then((res) => {
        console.log(res);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // navigate('/login');
      });
  };

  //formik logic.
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    // validate form data.(Yup form validation)
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <div className="items-center flex justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white flex rounded-lg max-w-3xl font-mono "
      >
        <div className="flex-1 text-gray-700  p-20 ">
          <h1 className="text-3xl pb-2 font-latoBold">Let's get started 👋</h1>
          <p className="text-lg  text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            aliquid ut vitae?
          </p>
          <div className="mt-6 max-w-lg">
            {/* Name input field */}
            <div className="pb-4">
              <label
                htmlFor="name"
                className={`block font-latoBold text-sm pb-2 ${
                  formik.touched.name && formik.errors.name
                    ? 'text-red-400'
                    : ''
                }`}
              >
                {formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : 'User Name'}
              </label>
              {/* <p className="text-sm font-latoBold text-red-400 "></p> */}
              <input
                className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500 "
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* Email input field */}
            <div className="pb-4">
              <label
                htmlFor="email"
                className={`block font-latoBold text-sm pb-2 ${
                  formik.touched.email && formik.errors.email
                    ? 'text-red-400'
                    : ''
                }`}
              >
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : 'Email'}
              </label>
              <p></p>
              <input
                className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email address"
              />
            </div>
            {/* password input field */}
            <div className="pb-4">
              <label
                htmlFor="password"
                className={`block font-latoBold text-sm pb-2 ${
                  formik.touched.password && formik.errors.password
                    ? 'text-red-400'
                    : ''
                }`}
              >
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : 'Password'}
              </label>
              <input
                className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
              />
            </div>
            {/* confirmPassword input field */}
            <div className="pb-4">
              <label
                htmlFor="conformPassword"
                className={`block font-latoBold text-sm pb-2 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? 'text-red-400'
                    : ''
                }`}
              >
                {formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : 'Confirm Password'}
              </label>
              <input
                className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Re enter your password"
              />
            </div>

            <button
              type="submit"
              className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
            >
              Sign-in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
