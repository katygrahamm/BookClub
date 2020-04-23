import { combineReducers } from "redux";
import UserReducer from "./reducer-users";

const rootReducer = combineReducers({
    user: UserReducer
});

export default rootReducer;