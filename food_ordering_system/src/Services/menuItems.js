import axios from 'axios';
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/foodmenu/api/menus/";

const addNewItem = (item_name, prize, description, menuCategory) => {
  return axios.post(API_URL + "createMenuItem", {
    item_name,
    prize,
    description,
    menuCategory
  }, {
    headers: authHeader()
  })
  .then((response) => {
      return response.data;
  });
};

const updateItem = (id, item_name, prize, description, menuCategory) => {
  return axios.put(API_URL + "updateMenuItem", {
    id,
    item_name,
    prize,
    description,
    menuCategory
  }, {
    headers: authHeader()
  })
  .then((response) => {
      return response.data;
  });
};

const deleteItem = (id) => {
  return axios.delete(API_URL + "deleteItem",{
    headers: authHeader(),
    data: { id }
  })
  .then((response) => {
      return response.data;
  });
};

const menuItems = {
    addNewItem,
    updateItem,
    deleteItem
}

export default menuItems;