import axios from 'axios';
import store from '../redux/store';
import { LOGOUT } from '../redux/actions/types';

const api = axios.create({
  baseURL: 'https://api-musicchat.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * intercept any error response from the api
 * and check if the token is no longer valid
 * i.e Token has expired or user is no longer authenticated
 * logout the user if the token has expired
 */

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
