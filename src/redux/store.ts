import {combineReducers, createStore} from "redux";
import productsReducer from "./products-reducer";


let reducers = combineReducers({
    products: productsReducer,
    companies: productsReducer,
    categories: productsReducer,
});
const initialState = {};
let store = createStore(reducers, initialState);

export type RootState = ReturnType<typeof reducers>;

export default store;