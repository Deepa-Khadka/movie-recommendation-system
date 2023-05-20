import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import * as User from "./Reducers/userReducers";
const rootReducer = combineReducers({
    //USER REDUCER
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
});

//get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
?JSON.parse(localStorage.getItem("userInfo"))
:null;
//initalState
const initialState = {
    userLogin: {userInfo:userInfoFromStorage},

};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState:initialState,

})