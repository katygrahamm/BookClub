import { GET_CAROUSELBOOKS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_CAROUSELBOOKS :
      console.log('reducer-books', action.payload)
      return action.payload
    default:
      return state;
  }
}