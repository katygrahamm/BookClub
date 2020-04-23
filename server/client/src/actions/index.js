import axios from "axios";
import { ADD_USER } from './types';

export const addUser = (username, password) => dispatch => {
  
    axios.post(`http://localhost:5000/login?username=${username}&password=${password}`
  
    ).then(function (response) {
      console.log('response from addUser', response)
      dispatch({ type: ADD_USER , payload: 'success'});
    })
    .catch(function (error) {
      console.log(error);
    });
};