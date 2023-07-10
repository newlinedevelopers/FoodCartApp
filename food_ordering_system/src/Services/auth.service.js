import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/foodcart/api/userDetails/";

const register = (username, password) => {
  return axios.post(API_URL + "createNewUser", {
    username,
    password
  });
};

const login = (username, password) => {
  return axios.post(API_URL + "login", {
      username,
      password
    })
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const profile = (formData) => {
  const headers = authHeader();  
  return axios.post(API_URL + "profile", formData, {headers})
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
  profile
};

export default authService;