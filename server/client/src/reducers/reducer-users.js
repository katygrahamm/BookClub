import { ADD_USER } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_USER :
      console.log('reducer-user', action.payload)
      return action.payload
    default:
      return state;
  }
}