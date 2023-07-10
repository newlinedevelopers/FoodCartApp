/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CompanyTitle from './HomeContent/CompanyTitle';
import { useSelector, useDispatch } from 'react-redux';

import { register } from "../Slices/auth";
import { clearMessage } from "../Slices/message";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setColor, setStyle } from '../Slices/companyStyle';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords are not matching')
    .required('Confirm Password is required'),
});

const CreateAccount = () => {
    const initialValues = {
      email: '',
      password: '',
      confirmPassword: '',
    };
    const {message} = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const [isLoding, setLoding] = useState(false);

    useEffect(() => {
      dispatch(clearMessage());
      dispatch(setColor("dark"));
      dispatch(setStyle({justifyContent: "center", paddingTop:"30px"}));
  }, [dispatch]);

    const navigate = useNavigate();
    const handleSubmission = (e) => {
        const username = e.email;
        const password = e.password;
        setLoding(true);
        dispatch(register({ username, password }))
        .unwrap()
        .then(() => {
          setLoding(false);
          navigate("/login");
        })
        .catch((error) => {
          setLoding(false);
        });
    };
    return (
        <>
          <div className="flex min-h-full flex-1 flex-col px-6 py-5 lg:px-8">
          <CompanyTitle />
            <div className="card-box" style={{margin: "0 35%"}}>
                
                <div className="border-b border-gray-900/10 pb-2 sm:mx-auto sm:w-full sm:max-w-sm">
                  <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create Your Account
                  </h2>
                  {message && (
                    <div className="bg-red-100 border mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">Error: </strong>
                      <span className="block sm:inline">{message}.</span>
                    </div>
                  )}
                </div>
               
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmission}
                  >
                    <Form className="bg-white rounded mb-4">
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Email<span className="required-indicator"> *</span>
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Password<span className="required-indicator"> *</span>
                        </label>
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="confirmPassword"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Confirm Password<span className="required-indicator"> *</span>
                        </label>
                        <Field
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 h-12 text-sm font-semibold leading-6 text-size text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          disabled={isLoding}
                        >{isLoding ? (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                      ) : null}
                          Create Account
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                Have a account?{' '}
                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </>
    )
}
export default CreateAccount;