import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/foodorder/api/orders/";

const saveOrderDetails = (orderedItems) => {
  return axios.post(API_URL + "saveOrderedItems", orderedItems, {
    headers: authHeader()
  })
  .then((response) => {
      return response.data;
  });
};

const getOrderDetails = async() => {
  try {
    const response = await axios.get(API_URL + "orderDetails", {
      headers: authHeader()
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const orderedMenuItems = {
    saveOrderDetails,
    getOrderDetails
}

export default orderedMenuItems;