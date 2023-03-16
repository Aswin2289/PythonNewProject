import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
const REGISTER_URL = 'club/userReg/';
const LOGIN_URL = '/login/';
const RESET_PASSWORD_URL = '/passwordReset';

export const register = ({ name, email, password }) => {
  let data = { username: name, email, password };
  return axios.post(REGISTER_URL, data);
};

export const login = ({ email, password }) => {
  let data = { email, password };
  return axios.post(LOGIN_URL, data);
};

export const resetPassword = ({ oldPassword, newPassword }) => {
  let data = { oldPassword, newPassword };
  return axios.post(RESET_PASSWORD_URL, data);
};
