import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Login() {
  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('http://localhost:8080/login', values);

      if (response.status === 200) {
        // Redirect user to home page if login is successful
        window.location.href = '/';
        alert("Logged n")
      } else {
        setFieldError('email', 'Invalid email or password');
      }
    } catch (error) {
      setFieldError('email', 'Something went wrong. Please try again later.');
    }

    setSubmitting(false);
  };

  return (
    <div className="login">
      <h1>LOGIN</h1>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email').required('Please enter your email'),
          password: Yup.string()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
              'Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
            )
            .required('Please enter your password'),
        })}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />

            <br></br><br></br>

            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />

            <br></br><br></br>
            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;




























