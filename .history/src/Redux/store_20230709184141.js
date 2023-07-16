import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import * as User from "./Reducers/userReducers";
import * as categories from "./Reducers/CategoriesReducer";
import * as movies from "./Reducers/MoviesReducer";


const rootReducer = combineReducers({
    //USER REDUCER
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userUpdateProfile: User.userUpdateProfileReducer,
    userDeleteProfile:User.userDeleteProfileReducer,
    userchangepassword:User.userChangePasswordReducer,
    userGetFavoriteMovies:User.userGetFavoriteMoviesReducer,
    userDeleteFavoriteMovies:User.userDeleteFavoriteMoviesReducer,
    adminGetAllUsers:User.adminGetAllUsersReducer,
    adminDeleteUser:User.adminDeleteUserReducer,
    userLikeMovie:User.userLikeMovieReducer,


    //Category reducer
    categoryGetAll:categories.getAllCategoriesReducer,
    categoryCreate:categories.createCategoryReducer,
    categoryDelete:categories.deleteCategoryReducer,


    //Movies reducer
    getAllMovies:movies.moviesListReducer,
    getRandomMovies: movies.moviesRandomReducer,
    getMovieById: movies.movieDetailReducer,
    getTopRatedMovies:movies.movieTopRatedReducer,
    createReview:movies.createReviewReducer,
    deleteMovie:movies.deleteMovieReducer,
    createMovie: movies.createMovieReducer,
    casts:movies.CastsReducer,
    updateMovie:movies.updateMovieReducer,
 
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