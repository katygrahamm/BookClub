import { combineReducers } from "redux";
import UserReducer from "./reducer-users";
import GroupsReducer from "./reducer-groups"

const rootReducer = combineReducers({
    user: UserReducer,
    userGroups: GroupsReducer
});

export default rootReducer;