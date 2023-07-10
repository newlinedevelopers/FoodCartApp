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
import React, { useEffect, useState} from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate, Link } from 'react-router-dom';
import CompanyTitle from './HomeContent/CompanyTitle';
import { profile } from "../Slices/auth";
import { clearMessage } from "../Slices/message";
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import { setColor, setStyle } from '../Slices/companyStyle';
import userProfile from '../Services/userProfile';

const initialValues = {
    userId: 0,
    // photo: '',
    // username: '',
    firstname: '',
    lastname: '',
    primary_mobile_number: '',
    secondary_mobile_number: '',
    country: '',
    region: '',
    street: '',
    city: '',
    postal_code: ''
};

const validationSchema = Yup.object({
    userId: 0,
    photo: Yup.string(),
    username: Yup.string(),
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string(),
    primary_mobile_number: Yup.string().required('Primary mobile number is required'),
    secondary_mobile_number: Yup.string(),
    country: Yup.string(),
    region: Yup.string(),
    street: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    postal_code: Yup.string().required('ZIP / Postal code is required')
});

export default function ProfileInfo() {
    const [profileData, setProfileData] = useState(initialValues);
    const [isLoding, setLoading] = useState(false);
    const {isLoggedIn, user: {username, userId, isProfile}} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            if (isProfile) {
                setLoading(true); // Set loading state to true before making the request
                userProfile.getProfile(userId)
                .then(response => {
                    setProfileData(response); // Update profileData state with the received response
                    setLoading(false); // Set loading state to false after receiving the response
                })
                .catch(error => {
                    setLoading(false); // Set loading state to false if an error occurs
                });
            }
        }
    }, [userId, isLoggedIn, isProfile]);
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(setColor("dark"));
        dispatch(setStyle({justifyContent: "center", paddingTop:"30px"}));
    }, [dispatch]);

    const navigate = useNavigate();
    const handleSubmission = (formData) => {
        setLoading(true);
        formData = {...formData, userId: userId};
        dispatch(profile(formData))
        .unwrap()
        .then(() => {
            setLoading(false);
            navigate("/");
        })
        .catch((error) => {
            setLoading(false);
        });
};
    
    return (
    <>
        <CompanyTitle />
        <div className="bg-white">
            <div className="mx-auto card max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto card-box">
                    <div className="border-b border-gray-900/10 pb-12">
                        <span className='self-center text-3xl font-semibold whitespace-nowrap dark:text-dark'>Profile</span>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Please provide a valid information to make your food ordering process smoothly.
                        </p>
                    </div>
                    <Formik
                        initialValues={profileData}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmission}
                        enableReinitialize
                    >
                        <Form className="bg-white rounded mb-4">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Photo
                                            </label>
                                            <div className="mt-2 flex gap-x-3">
                                                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" style={{height:"2.8rem"}}/>
                                                <Field
                                                    type="file"
                                                    id="photo"
                                                    name="photo"
                                                    className="blockuserInput w-full userInput rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    style={{height: "2.9rem"}}
                                                />
                                                <ErrorMessage
                                                    name="photo"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                Username
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="email"
                                                    id="username"
                                                    name="username"
                                                    value={username}
                                                    className="block disabled userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    readOnly = {true}
                                                />
                                                <ErrorMessage
                                                    name="username"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive orders.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                                                First name<span className="required-indicator"> *</span>
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    id="firstname"
                                                    name="firstname"
                                                    className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="firstname"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    id="lastname"
                                                    name="lastname"
                                                    className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="lastname"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="primary_mobile_number" className="block text-sm font-medium leading-6 text-gray-900">
                                                Primary Mobile Number<span className="required-indicator"> *</span>
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    id="primary_mobile_number"
                                                    name="primary_mobile_number"
                                                    className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="primary_mobile_number"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="secondary_mobile_number" className="block text-sm font-medium leading-6 text-gray-900">
                                                Secondary Mobile Number
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    id="secondary_mobile_number"
                                                    name="secondary_mobile_number"
                                                    className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="secondary_mobile_number"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    id="country"
                                                    name="country"
                                                    className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="country"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    id="region"
                                                    name="region"
                                                    className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="region"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address<span className="required-indicator"> *</span>
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    id="street"
                                                    name="street"
                                                    className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="street"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City<span className="required-indicator"> *</span>
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage
                                                    name="city"
                                                    component="div"
                                                    className="text-red-500 text-xs mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                        <label htmlFor="postal_code" className="block text-sm font-medium leading-6 text-gray-900">
                                            ZIP / Postal code<span className="required-indicator"> *</span>
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                type="text"
                                                id="postal_code"
                                                name="postal_code"
                                                className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <ErrorMessage
                                                name="postal_code"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <div className="flex justify-end">
                                        <Link to="/" className="btnPrimary inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white mr-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Cancel
                                        </Link>       
                                        <button
                                        type="submit"
                                        className="btnPrimary inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        disabled = {isLoding}
                                        >
                                        {isLoding ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : null}
                                        Save Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    </>
  )
}
