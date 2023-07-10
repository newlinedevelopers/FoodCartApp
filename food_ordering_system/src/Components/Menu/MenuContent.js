import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setPopUps } from '../../Slices/popUpForms';
import AddorUpdateItems from './AddorUpdateItems';
import DeleteItem from './DeleteItem';
import { handleFoodOrdering } from '../../Slices/menus';

const menuDet = [{
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

const MenuContent = React.forwardRef((props, ref) => {
    const [menuDetails, setMenuDetails] = useState(menuDet);
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const { availableMenus } = useSelector((state) => state.menus);
    const dispatch = useDispatch();
    const { isPopup, popedForm } = useSelector((state) => state.popUpForms);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOrdering = async (orderDetails, orderedItem, addOrRemove) => {
        await dispatch(
          handleFoodOrdering(availableMenus, orderDetails, orderedItem, addOrRemove)
        );
    };

    useEffect(() => {
        if (isLoggedIn) {
            if(user != null && user.roles[0] === "ADMIN"){
                setIsAdmin(true);
            }
            if(availableMenus){
                setMenuDetails(availableMenus);
            }
        }
    }, [isLoggedIn, availableMenus, user]);

    const addNewItemForm = () => {
        dispatch(setPopUps({isPopup: true, popedForm: "addMenuItem"}));
    };

    const updateItemForm = (category, item) => {
        dispatch(setPopUps({isPopup: true, popedForm: "updateMenuItem"}));
        const id = item.id;
        const item_name = item.item_name;
        const prize = item.prize;
        const description = item.description || '';
        const menuCategory = category.id;
        setSelectedItem({id: id, item_name: item_name, prize: prize, description: description, menuCategory: menuCategory});
    };

    const deleteItem = (item) => {
        dispatch(setPopUps({isPopup: true, popedForm: "deleteMenuItem"}));
        const { id } = item;
        setSelectedItem({id: id});
    }

    return (
        <>
        <div className="flex-grow p-4 space-y-0" ref={ref}>
            {menuDetails.map((menu_details) => (
                <div key={(menu_details.category_name.replace(/[^\w-]/g, "") + "_" + menu_details.id)} id={(menu_details.category_name.replace(/[^\w-]/g, "") + "_" + menu_details.id)} style={{margin: "3% 7% 3% 0"}}> 
                    <div key={menu_details.id} className="flex" style={{justifyContent: "space-between"}}>
                        <h3 className="text-xl font-bold pt-2">{menu_details.category_name}</h3>
                        {isAdmin && 
                        <button
                        onClick={addNewItemForm}
                        className="flex justify-center rounded-md bg-indigo-600 px-3 py-2 h-12 text-sm font-semibold leading-6 text-size text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add New Item
                        </button>}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-5">
                        {menu_details.menuItem.map((menu_items)=>(
                            <div key={menu_items.id} className="menu-card-box">
                                <div className="pb-2">
                                    <div className="inline-flex gap-4 menu-align">
                                        <div>
                                            <p><b>{menu_items.item_name}</b></p>
                                            <p><span>₹</span>{menu_items.prize}</p>
                                        </div>
                                        <div className="flex items-center" style={{textAlign:"right"}}>
                                            
                                            {!isAdmin ?
                                                (!menu_items.quantity ? (<button
                                                onClick={() => handleOrdering( menu_details, menu_items, 1)}
                                                className="menu-button inline-flex m-1 p-5 justify-center rounded-md bg-teal-400 py-2 h-12 text-sm font-semibold leading-6 text-size text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                                                >
                                                    Add
                                                </button>) : 
                                                (

                                                    <div className="custom-number-input menu-button" style={{margin: "0.2rem"}}>
                                                        <div className="flex flex-row w-full rounded-sm" style={{height: "47px"}}>
                                                            <button onClick={() => handleOrdering( menu_details, menu_items, -1)} data-action="decrement" className="h-full w-20 rounded-l  bg-teal-400 text-white hover:text-white hover:bg-teal-300 focus:text-white cursor-pointer outline-none">
                                                                <span className="m-auto text-2xl font-thin">−</span>
                                                            </button>
                                                            <input type="number" className="outlineNone bg-teal-400 text-white hover:text-white hover:bg-teal-300 focus:text-white focus:outline-none text-center w-full font-semibold text-md md:text-basecursor-default flex items-center" readOnly name="custom-input-number" value={menu_items.quantity}></input>
                                                            <button onClick={() => handleOrdering( menu_details, menu_items, 1)} data-action="increment" className="h-full w-20 rounded-r cursor-pointer  bg-teal-400 text-white hover:text-white hover:bg-teal-300 focus:text-white">
                                                                <span className="m-auto text-2xl font-thin">+</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                )) : 
                                                (<><button
                                                onClick={()=>updateItemForm(menu_details, menu_items)}
                                                className="menu-button inline-flex m-1 p-5 justify-center rounded-md bg-orange-400 py-2 h-12 text-sm font-semibold leading-6 text-size text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                onClick={()=>deleteItem(menu_items)}
                                                className="menu-button inline-flex m-1 p-5 justify-center rounded-md bg-red-500 py-2 h-12 text-sm font-semibold leading-6 text-size text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                                >
                                                    Delete
                                                </button></>)}
                                           
                                        </div>
                                    </div>
                                    <p>{menu_items.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        { isPopup 
        && (((popedForm === "addMenuItem" 
        && <AddorUpdateItems/>) ||
        (popedForm === "updateMenuItem" 
        && <AddorUpdateItems selectedItem={selectedItem}/>)) ||
        (popedForm === "deleteMenuItem" 
        && <DeleteItem selectedItem={selectedItem}/>)
        )
        }
        </>
    );
});

export default MenuContent;