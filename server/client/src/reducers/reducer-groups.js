import { ADD_GROUP } from "../actions/types"


export default function(state = [], action) {
    switch (action.type) {
      case ADD_GROUP :
        console.log('reducer-groups', action.payload)
        return action.payload
      default:
        return state;
    }
  }