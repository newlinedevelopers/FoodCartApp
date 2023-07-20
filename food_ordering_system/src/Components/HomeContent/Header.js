import React, { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import CompanyTitle from './CompanyTitle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../Slices/auth";
import { resetState } from "../../Slices/companyStyle";
import Ordering from '../Menu/Ordering';
import ViewOrdering from '../Menu/ViewOrdering';
import { setPopUps } from '../../Slices/popUpForms';
import OrderDetails from '../../Services/orderItems';
import { setOrderDetails } from '../../Slices/menus';
//import ProfileImg from "../../Image/profileImgFC.jpg";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const {isLoggedIn, user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPopup, popedForm } = useSelector((state) => state.popUpForms);
  const { totalItem } = useSelector((state) => state.menus);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const location = useLocation();

  const navigation = [
    { name: 'Home', to: '/', current: location.pathname === '/' },
    { name: 'Menu', to: '/menu', current: location.pathname === '/menu' },
    { name: 'About Us', to: '/aboutUs', current: location.pathname === '/aboutUs' }
  ];

  useEffect(() => {
    dispatch(resetState());
    if (isLoggedIn) {
      if(user != null && user.roles[0] === "ADMIN"){
          setIsAdmin(true);
      }
  }
  }, [dispatch, isLoggedIn, user]);


  const handleActions = (event, actionType) => {
    if(isLoggedIn){
      if(actionType === 'profile'){
        navigate("/profile");
      }
      else{
        dispatch(logout());
        navigate("/login");
      }
    }
  };

  const showOrders = async () => {
    if(isAdmin){
      if (isLoggedIn) {
        setLoading(true);
        await OrderDetails.getOrderDetails()
        .then(response => {
            dispatch(setOrderDetails(response));
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        });
      }
      dispatch(setPopUps({isPopup: true, popedForm: "viewOrderDetails"}));
    }else{
      if(isPopup){
        dispatch(setPopUps({isPopup: false, popedForm: ""}));
      }else{
        dispatch(setPopUps({isPopup: true, popedForm: "orderDetails"}));
      }
    }
  }
  
  return (
    <>
      <header className="relative bg-white header">
          <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Get 10% offer on orders over ₹1000
          </p>
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="px-2" style={{marginLeft: "5rem",marginRight: "5rem"}}>
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <CompanyTitle/>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <div className="hidden sm:ml-6 sm:block">
                          <div className="flex space-x-4 px-4">
                              {navigation.map((item) => (
                              <Link
                                  to={item.to}
                                  key={item.name}
                                  className={classNames(
                                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'rounded-md px-3 py-2 text-sm font-medium'
                                  )}
                                  aria-current={item.current ? 'page' : undefined}
                              >
                                  {item.name}
                              </Link>
                              ))}
                          </div>
                      </div>
                      <div className="flex items-center">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            { !isLoggedIn ? (
                                  <>
                                  <Link to="/login" className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                  Sign In
                                  </Link>
                                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                  <Link to="/createAccount" className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                  Create Account
                                  </Link>
                                  </>)

                              :

                              (<>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                <button onClick={showOrders} className="relative inline-flex items-center p-1 rounded-full bg-gray-800 text-white hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800" disabled={isLoading}>
                                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                  <span className="sr-only">Notifications</span>
                                  {isAdmin ? 
                                  (<div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-1 -right-1 dark:border-gray-900"><CheckCircleIcon className="block h-6 w-6" aria-hidden="true" /></div>) : 
                                  (<div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -right-1 dark:border-gray-900">{totalItem}</div>)}
                                  
                                </button>

                                <Menu as="div" className="relative">
                                  <div>
                                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800">
                                      <span className="sr-only">Open user menu</span>
                                      <UserCircleIcon className="block h-8 w-8 text-white" aria-hidden="true" />
                                      {/* <img
                                        className="h-8 w-8 rounded-full"
                                        src={ProfileImg}
                                        alt=""
                                        style={{height:"31px", width:"35px"}}
                                      /> */}
                                    </Menu.Button>
                                  </div>
                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{zIndex: "1000"}}>
                                      <div className="px-1 py-1 ">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={event => (handleActions(event,"profile"))}
                                              className={`${
                                                active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                              Profile
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </div>
                                      <div className="px-1 py-1 ">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={event => (handleActions())}
                                              className={`${
                                                active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                              Sign out
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </>)
                            }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
      </header>
      {
        isPopup && ((popedForm === "orderDetails" && <Ordering/>) || 
        (popedForm === "viewOrderDetails" && <ViewOrdering/>))
      }
      
    </>
  )
}


