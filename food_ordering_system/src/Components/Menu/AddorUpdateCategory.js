import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createCategory, updateCategory } from "../../Slices/menus";
import * as Yup from 'yup';
import { setPopUps } from '../../Slices/popUpForms';
import { clearMessage } from "../../Slices/message";

const validationSchema = Yup.object().shape({
  category_name: Yup.string().required('Category name is required')
});

const initialValue = {
    id: 0,
    category_name: ''
};

function AddorUpdateCategory({selectedCategory}) {
    const [isLoading, setLoading] = useState(false);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const initialValues = selectedCategory ? selectedCategory : initialValue;

    const handleSubmission = (event) => {
        const category_name = event.category_name;
        const id = selectedCategory ? selectedCategory.id : 0; 
        setLoading(true);
        dispatch(
            selectedCategory ? updateCategory({ id, category_name }) : createCategory({ category_name })
        )
        .unwrap()
        .then(() => {
          setLoading(false);
          window.location.reload();
        })
        .catch((error) => {
          setLoading(false);
        });
    };

    const clearCategoryFrom = () => {
        dispatch(setPopUps({isPopup: false, popedForm: ""}));
        dispatch(clearMessage());
    };
    
    return (
        <div id="staticModal" className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white menu-card-box rounded-lg shadow-lg w-full max-w-2xl mx-auto">
                <div className="p-4 border-b rounded-t border-gray-300">
                    <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-gray-900 text-dark">
                            {!selectedCategory ? "Create New Menu" : "Update Menu"}
                        </h3>
                        <button onClick={clearCategoryFrom} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {message && (
                        <div className="bg-red-100 border mt-2 w-full border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{message}.</span>
                        </div>
                    )}
                </div>
                <div className="p-3 space-y-6">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmission}
                        >
                        <Form className="bg-white rounded">
                            <div className="mb-4">
                            <label
                                htmlFor="category_name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Category Name<span className="required-indicator"> *</span>
                            </label>
                            <Field
                                type="text"
                                id="category_name"
                                name="category_name"
                                className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage
                                name="category_name"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                            </div>
                            <div className="mt-10">
                                <div className="flex justify-end">
                                    <button type="button" onClick={clearCategoryFrom} className="menu-button btnPrimary inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white mr-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Cancel
                                    </button>       
                                    <button
                                    type="submit"
                                    className="btnPrimary inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    disabled = {isLoading}
                                    >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-3 mt-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    Save
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddorUpdateCategory