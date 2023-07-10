import React, {useState, useRef} from 'react';
import MenuSideBar from './MenuSideBar';
import MenuContent from './MenuContent';
import menuDetails from '../../Services/menuDetails';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setMenu } from '../../Slices/menus';

const MenuCard = () => {
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const [isLoaded, setLoaded] = useState(false);
  const {isLoggedIn} = useSelector((state) => state.auth);
  const { isPopup } = useSelector((state) => state.popUpForms);
  const { availableMenus } = useSelector((state) => state.menus);
  
  useEffect(() => {
    if (isLoggedIn) {
        if(!availableMenus){
          menuDetails.getMenuDetails()
          .then(response => {
              dispatch(setMenu(response));
              setLoaded(true);
          })
          .catch(error => {
              setLoaded(true);
          });
        }else{
          setLoaded(true);
        }
    }
  }, [isLoggedIn, dispatch, availableMenus]);

  const handleItemClick = (id) => {
    const element = contentRef.current.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div className="flex content">
      {
        isLoaded && (<>
        <MenuSideBar onItemClick={handleItemClick} />
        <div className="flex w-full sideBarContent">
          {isPopup && <div className="fixed inset-0 bg-black opacity-50"></div>}
          <MenuContent ref={contentRef}/>
        </div>
        </>)
      }
    </div>
  );
};

export default MenuCard;