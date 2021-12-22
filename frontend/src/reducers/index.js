import purposeReducer from "./purpose";
import searchReducer from "./search";
import bodyReducer from "./body";
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['search','purpose','body']
}

const allReducers = combineReducers({
    search: searchReducer,
    purpose: purposeReducer,
    body:bodyReducer
})

export default persistReducer(persistConfig, allReducers);