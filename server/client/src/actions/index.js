import axios from "axios";
import { ADD_USER } from './types';

export const logIn = (username, password) => dispatch => {
  
    axios.post(`http://localhost:5000/login?username=${username}&password=${password}`)
    .then(function (response) {
      console.log('response from addUser', response.data[0])
      dispatch({ type: ADD_USER , payload: response.data[0]});
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const signUp = (newUsername, newPassword) => dispatch => {
  const body = {
    "newUsername": newUsername,
    "newPassword": newPassword
  }

  console.log(body)

  axios.post(`http://localhost:5000/signup`, body)
  .then(function (response) {
    console.log('response from addUser', response)
    dispatch({ type: ADD_USER , payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });

}