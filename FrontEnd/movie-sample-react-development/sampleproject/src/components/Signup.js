import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Signup() {
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log(values)
    try {
      const response = await axios.post('http://127.0.0.1:8000/signup', values);

      if (response.ok) {
        // Redirect user to home page if login is successful
        window.location.href = '/';
      } else {
        setErrors({ server: 'Invalid data' });
      }
    } catch (error) {
      setErrors({ server: 'Something went wrong. Please try again later.' });
    }

    setSubmitting(false);
  };

  return (
    <div className="login">
      <h1>Sign Up</h1>
      <Formik
        initialValues={{ email: '', password: '', address: '', name: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email').required('Please enter your email'),
          password: Yup.string()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
              'Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
            )
            .required('Please enter your password'),
          address: Yup.string().required('Please enter your address'),
          name: Yup.string().required('Please enter your name'),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name" /> 
            <ErrorMessage name="name" component="div" className="error" />

            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
            <br></br><br></br>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />

            <Field type="text" name="address" placeholder="Address" />
            <ErrorMessage name="address" component="div" className="error" />

            <ErrorMessage name="server" component="div" className="error" />
            <br></br><br></br>
            <button className='button' type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
