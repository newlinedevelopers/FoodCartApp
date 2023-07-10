import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createNewItem, updateItem } from "../../Slices/menus";
import * as Yup from 'yup';
import { setPopUps } from '../../Slices/popUpForms';

const validationSchema = Yup.object().shape({
  menuCategory: Yup.number().required('Category name is required'),
  item_name: Yup.string().required('Item name is required'),
  prize: Yup.number().required('Item prize is required'),
  description: Yup.string()
});

const initialValue = {
    id: 0,
    item_name: '', 
    prize: 0, 
    description: '', 
    menuCategory: ''
};

const menuDetails = [{
    "id": 0,
    "category_name": "",
    "menuItem": [
        {
            "id": 0,
            "item_name": "",
            "prize": 0,
            "description": ""
        }
    ]
}]; 

function AddorUpdateItems({selectedItem}) {
    const [menuCategeries, setMenuCategeries] = useState(menuDetails);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [isLoading, setLoading] = useState(false);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const { availableMenus } = useSelector((state) => state.menus);
    const initialValues = selectedItem ? selectedItem : initialValue;

    useEffect(() => {
        if (isLoggedIn) {
          setMenuCategeries(availableMenus);
        }
    }, [isLoggedIn, availableMenus]);

    const handleSubmission = (event) => {
        const id = selectedItem ? selectedItem.id : 0; 
        const item_name = event.item_name;
        const prize = event.prize;
        const description = event.description;
        const menuCategory = event.menuCategory;
        setLoading(true);
        dispatch(
            selectedItem ? updateItem({ id, item_name, prize, description, menuCategory }) : createNewItem({ item_name, prize, description, menuCategory })
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

    const clearItemFrom = () => {
        dispatch(setPopUps({isPopup: false, popedForm: ""}));
    };
    
    return (
        <div id="staticModal" className="fixed inset-0 flex items-center justify-center" style={{zIndex:"500"}}>
            <div className="bg-white menu-card-box rounded-lg shadow-lg w-full max-w-2xl mx-auto">
                <div className="p-4 border-b rounded-t border-gray-300">
                    <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-gray-900 text-dark">
                            {!selectedItem ? "Create New Item" : "Update Item"}
                        </h3>
                        <button onClick={clearItemFrom} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
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
                                    htmlFor="menuCategory"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Category Name<span className="required-indicator"> *</span>
                                </label>
                                <Field 
                                as="select" 
                                id="menuCategory" 
                                name="menuCategory"
                                className="blockuserInput userInput w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="">Select a category</option>
                                    {menuCategeries.map((categoryList)=>(
                                        <option key={categoryList.id} value={categoryList.id}>{categoryList.category_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="menuCategory"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div className="mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="item_name" className="block text-sm font-bold leading-6 text-gray-700">
                                        Item Name<span className="required-indicator"> *</span>
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            type="text"
                                            id="item_name"
                                            name="item_name"
                                            className="blockuserInput userInput w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage
                                            name="item_name"
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="prize" className="block text-sm font-bold leading-6 text-gray-700">
                                        Prize<span className="required-indicator"> *</span>
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            type="text"
                                            id="prize"
                                            name="prize"
                                            className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage
                                            name="prize"
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Description
                                </label>
                                <Field
                                    as="textarea"
                                    rows="4"
                                    cols="50"
                                    id="description"
                                    name="description"
                                    className="block userInput w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div className="mt-10">
                                <div className="flex justify-end">
                                    <button type="button" onClick={clearItemFrom} className="menu-button btnPrimary inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white mr-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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

export default AddorUpdateItems;