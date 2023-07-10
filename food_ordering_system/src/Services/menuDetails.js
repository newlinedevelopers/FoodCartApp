import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/foodmenu/api/menus/";

const getMenuDetails = async() => {
  try {
    const response = await axios.get(API_URL + "getMenus", {
      headers: authHeader()
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const addNewCategory = (category_name) => {
  return axios.post(API_URL + "createCategory", {
    category_name
  }, {
    headers: authHeader()
  })
  .then((response) => {
    return response.data;
  });
};

const updateCategory = (id, category_name) => {
  return axios.put(API_URL + "updateCategory", {
    id,
    category_name
  }, {
    headers: authHeader()
  })
  .then((response) => {
      return response.data;
  });
};

const menuDetails = {
    getMenuDetails,
    addNewCategory,
    updateCategory
}

export default menuDetails;