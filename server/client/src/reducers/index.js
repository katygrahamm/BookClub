import { combineReducers } from "redux";
import UserReducer from "./reducer-users";
import BooksReducer from "./reducer-books";

const rootReducer = combineReducers({
    user: UserReducer,
    books: BooksReducer
});

export default rootReducer;