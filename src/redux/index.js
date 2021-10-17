import { combineReducers } from "redux";
import userReducer from './user';
import News from "./news";


export default combineReducers({ userReducer, News });

