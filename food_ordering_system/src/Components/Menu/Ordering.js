import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { setPopUps } from '../../Slices/popUpForms'
import { Link } from 'react-router-dom'
import { handleFoodOrdering } from '../../Slices/menus';
import {saveOrderDetails} from '../../Slices/orders';

const orders = [{
    "id": 0,
    "category_name": "",
    "menuItem": [
        {
            "id": 0,
            "item_name": "",
            "prize": 0,
            "description": "",
            "quantity": 0,
        }
    ]
}];

export default function Ordering() {
    const [orderDetails, setOrderDetails] = useState(orders);
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const {availableMenus} = useSelector((state) => state.menus);
    const {isLoggedIn} = useSelector((state) => state.auth);
    const [subtotal, setSubTotal] = useState(0);
    const [filteredOrdersDetails, setFilteredOrdersDetails] = useState(orders);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        if (isLoggedIn && availableMenus) {  
            const filteredOrders = availableMenus.flatMap(order => ({
                id: order.id,
                category_name: order.category_name,
                menuItem: order.menuItem.filter(item => Number(item.quantity) > 0)
            })).filter(category => category.menuItem.length > 0);
            setOrderDetails(availableMenus);
            setFilteredOrdersDetails(filteredOrders);
            const overallTotal = filteredOrders.reduce((total, category) => {
                const categoryTotal = category.menuItem.reduce((subtotal, item) => subtotal + (item.quantity * item.prize), 0);
                return total + categoryTotal;
            }, 0);
            setSubTotal(overallTotal);
        }
    }, [isLoggedIn, availableMenus]);

    const handleOrdering = async (orderDetails, orderedItem, addOrRemove) => {
        await dispatch(
          handleFoodOrdering(availableMenus, orderDetails, orderedItem, addOrRemove)
        );
    };

    const checkOutOrder = () => {
        if(subtotal > 0){
            setLoading(true);
            dispatch(
                filteredOrdersDetails ? saveOrderDetails(filteredOrdersDetails) : null
            )
            .unwrap()
            .then(() => {
                setLoading(false);
                window.location.reload();
            })
            .catch((error) => {
                setLoading(false);
            });
        }
    }

    const clearItemFrom = () => {
        dispatch(setPopUps({isPopup: false, popedForm: ""}));
        setOpen(false);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" id="staticModal" className="fixed content inset-0 mt-24" style={{zIndex: 100}} onClose={setOpen}>
            <div className="absolute h-10 inset-0 overflow-hidden">
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    >
                    <Dialog.Overlay
                        className="fixed inset-0" onClick={clearItemFrom}
                    />
                </Transition.Child>
                <div className="static inset-0 flex-grow p-4 space-y-0">
                    <div className="pointer-events-none fixed z-500 inset-y-0 right-0 flex max-w-full pl-10" style={{marginTop: "6.5rem"}}>
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <Dialog.Title className="text-lg font-medium text-gray-900">Food Cart</Dialog.Title>
                                        <div className="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                            onClick={clearItemFrom}
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="flow-root">
                                            <ul className="my-3">
                                                {orderDetails.map((orderedCategory) => (
                                                    filteredOrdersDetails && filteredOrdersDetails.some((filteredItem) => filteredItem.id === orderedCategory.id) &&
  
                                                    (<li key={orderedCategory.id} className="py-3">
                                                        {orderedCategory.menuItem.map((orderedItems) => 
                                                            orderedItems.quantity && (orderedItems.quantity > 0) ? (
                                                            <div key={orderedItems.id} className="flex border-t border-gray-900/10 py-3 flex-1 flex-col">
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        {orderedItems.item_name}
                                                                    </h3>
                                                                    <p className="ml-4"><span>₹</span>{orderedItems.prize}</p>
                                                                </div>
                                                            
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <div className="flex flex-row rounded-sm" style={{width: "15%"}}>
                                                                        <button onClick={() => handleOrdering( orderedCategory, orderedItems, -1)} data-action="decrement" className="h-full w-20 rounded-l  bg-indigo-600 text-white hover:text-white hover:bg-indigo-300 focus:text-white cursor-pointer outline-none">
                                                                            <span className="m-auto text-2xl font-thin">−</span>
                                                                        </button>
                                                                        <input type="number" className="outlineNone bg-indigo-600 text-white hover:text-white hover:bg-indigo-300 focus:text-white focus:outline-none text-center w-full font-semibold text-md md:text-basecursor-default flex items-center" readOnly name="custom-input-number" value={orderedItems.quantity}></input>
                                                                        <button onClick={() => handleOrdering( orderedCategory, orderedItems, 1)} data-action="increment" className="h-full w-20 rounded-r cursor-pointer  bg-indigo-600 text-white hover:text-white hover:bg-indigo-300 focus:text-white">
                                                                            <span className="m-auto text-2xl font-thin">+</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="flex" style={{alignSelf:"center"}}>
                                                                        <p className="text-indigo-900">Qty {orderedItems.quantity}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            )  : null
                                                        )}
                                                    </li>)
                                                    
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p><span>₹</span>{subtotal}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <button
                                        onClick={checkOutOrder}
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                        disabled={isLoading}
                                        >{isLoading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : null}
                                        Checkout
                                        </button>
                                    </div>
                                    <div className="flex p-2 justify-center text-center text-sm text-gray-500">
                                        <p>
                                        or 
                                        <Link
                                            to="/menu"
                                            className="font-medium w-full text-indigo-600 pl-2 hover:text-indigo-500"
                                            onClick={clearItemFrom}
                                        > Continue Ordering
                                            <span aria-hidden="true"> &rarr;</span>
                                        </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}
