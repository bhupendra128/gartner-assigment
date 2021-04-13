import filterReducer from "./filter-reducer";
import searchReducer from "./search-reducer";
import { combineReducers } from "redux";

export default combineReducers({
  filter: filterReducer,
  search: searchReducer,
});
