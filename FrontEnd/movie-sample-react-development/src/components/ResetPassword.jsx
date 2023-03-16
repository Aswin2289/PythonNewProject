import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resetPassword } from '../services/authService';

const ResetPassword = () => {
  //password must be 8 - 24 char long,must include small letter ,capital letter and one special char
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const navigate = useNavigate;

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('old password is required'),
    newPassword: Yup.string()
      .required('password is required')
      .matches(PWD_REGEX, 'Please choose a strong password'),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('newPassword'), null], 'password does not match'),
  });

  const onSubmit = (values) => {
    console.log('🚀 ~ file: ResetPassword.jsx:22 ~ onSubmit ~ values:', values);
    resetPassword(values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(navigate('/home'));
  };
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit,
  });
  return (
    <>
      <div>
        <section>
          <div className="flex flex-col justify-center min- py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-3xl font-extrabold text-center text-neutral-600">
                Reset your account password
              </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="px-4 py-8 sm:px-10  text-gray-700">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                  <div>
                    <label
                      htmlFor="oldPassword"
                      className={`block font-medium text-sm pb-2 ${
                        formik.touched.oldPassword && formik.errors.oldPassword
                          ? 'text-red-400'
                          : ''
                      }`}
                    >
                      {formik.touched.oldPassword && formik.errors.oldPassword
                        ? formik.errors.oldPassword
                        : 'Old-Password'}
                    </label>
                    <div className="mt-1">
                      <input
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        placeholder="Enter your old password"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className={`block font-medium text-sm pb-2 ${
                        formik.touched.newPassword && formik.errors.newPassword
                          ? 'text-red-400'
                          : ''
                      }`}
                    >
                      {formik.touched.newPassword && formik.errors.newPassword
                        ? formik.errors.newPassword
                        : 'New-Password'}
                    </label>
                    <div className="mt-1">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Enter your new password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="conformPassword"
                      className={`block font-medium text-gray-700 text-sm pb-2 ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? 'text-red-400'
                          : ''
                      }`}
                    >
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : 'Confirm Password'}
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="confirm your new password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
