import React from 'react';
import { PlusCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPopUps } from '../../Slices/popUpForms';
import AddorUpdateCategory from './AddorUpdateCategory';

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

function MenuSideBar({ onItemClick }) {
  const [menuCategeries, setMenuCategeries] = useState(menuDetails);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const { availableMenus } = useSelector((state) => state.menus);
  const { isPopup, popedForm } = useSelector((state) => state.popUpForms);
  const dispatch = useDispatch(); 
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
      if (isLoggedIn) {
        if(user != null && user.roles[0] === "ADMIN"){
          setIsAdmin(true);
        }if(availableMenus){
          setMenuCategeries(availableMenus);
        }
      }
  }, [isLoggedIn, availableMenus, user]);

  const addCategoryForm = () => {
    dispatch(setPopUps({isPopup: true, popedForm: "addMenuCategory"}));
  };

  const updateCategoryForm = (category) => {
    dispatch(setPopUps({isPopup: true, popedForm: "updateMenuCategory"}));
    setSelectedCategory(category);
  };

  return (<>
    <div className="sideBar w-64 flex flex-col border-r-2 border-gray-900/10">
      <div className="flex p-4" style={{justifyContent: "space-between"}}>
        <h1 className="text-xl font-bold">Menu</h1>
        {isAdmin && <PlusCircleIcon onClick={addCategoryForm} className="inline-flex plusIcon hover:cursor-pointer" aria-hidden="true"/>}
      </div>
      <nav className="nav-scroll-bar flex-grow">
        <ul className="space-y-0">
          {menuCategeries.map((menus) => (
            <li key={(menus.category_name.replace(/[^\w-]/g, "") + "_" + menus.id)} onClick={() => onItemClick((menus.category_name.replace(/[^\w-]/g, "") + "_" + menus.id))} className="flex p-4 border-b-2 hover:bg-gray-200 border-gray-900/10 hover-style" style={{justifyContent: "space-between"}}>
              {menus.category_name}
              {isAdmin && (
                <button className="inline-flex sidebar-button">
                  <PencilIcon onClick={() => updateCategoryForm(menus)} className="sidebar-icon" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
    { isPopup 
    && ((popedForm === "addMenuCategory" 
    && <AddorUpdateCategory/>) ||
    (popedForm === "updateMenuCategory" 
    && <AddorUpdateCategory selectedCategory={selectedCategory}/>))
    }
  </>
  )
}

export default MenuSideBar;