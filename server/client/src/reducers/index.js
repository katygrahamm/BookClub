import { combineReducers } from "redux";
import UserReducer from "./reducer-users";
import GroupsReducer from "./reducer-groups"
import BooksReducer from "./reducer-books";

const rootReducer = combineReducers({
    user: UserReducer,
    userGroups: GroupsReducer,
    books: BooksReducer
})

export default rootReducer;