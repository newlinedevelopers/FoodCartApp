import axios from 'axios';
import authHeader from './auth-header';
import { logout } from "../Slices/auth";

const API_URL = "http://localhost:8080/foodcart/api/userDetails/";

const getProfile = async(userId) => {
  try {
    const response = await axios.get(API_URL + "userprofile/" + userId, {
      headers: authHeader()
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      logout();
    }
    console.log(error);
  }
};

const userProfile = {
    getProfile
}

export default userProfile;