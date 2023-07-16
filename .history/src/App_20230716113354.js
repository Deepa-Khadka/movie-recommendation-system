import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/Dashboard/HomeScreen";
import AboutUs from "./Screens/Dashboard/AboutUs";
import ContactUs from "./Screens/Dashboard/ContactUs";
import SingleMovie from "./Screens/Dashboard/SingleMovie";
import MoviesPage from "./Screens/Dashboard/Movies";
import WatchPage from "./Screens/Dashboard/WatchPage";
import Login from "./Screens/Dashboard/Login";
import Profile from "./Screens/Dashboard/Admin/Profile";
import Sidebar from "./Screens/Dashboard/Admin/Sidebar";
import AOS from "aos";
import "aos/dist/aos.css";
import FavouritesMovies from "./Screens/Dashboard/Admin/FavouritesMovies";
import Register from "./Screens/Dashboard/Register";
import ToastContainer from "./Component/Notification/ToastContainer";
import Password from "./Screens/Dashboard/Admin/Password";
import MoviesList from "./Screens/Dashboard/Admin/MovieList";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import Categories from "./Screens/Dashboard/Admin/Categories";
import Users from "./Screens/Dashboard/Admin/Users";
import AddMovie from "./Screens/Dashboard/Admin/AddMovie";
import ScrollOnTop from "./ScrollOnTop";
import DrawerContext from "./Context/DrawerContext";
import { AdminProtectedRouter, ProtectedRouter } from "./ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategoriesAction } from "./Redux/Actions/CategoriesAction";
import { getAllMoviesAction } from "./Redux/Actions/MoviesAction";
import { getFavoriteMoviesAction } from "./Redux/Actions/userActions";
import { toast } from "react-hot-toast";
import EditMovie from "./Screens/Dashboard/Admin/EditMovie";


function App() {
  AOS.init();
  const dispatch =useDispatch();
  const {userInfo} = useSelector((state) => state.userLogin);
  const {isError, isSuccess} = useSelector((state) => state.userGetFavoriteMovies);
  const {isError:catError} = useSelector((state) => state.categoryGetAll);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllMoviesAction({}));
    if(userInfo) {
      dispatch(getFavoriteMoviesAction())
    }
   
  }, [userInfo]); 

  return (
    <>
      <ToastContainer />
      <DrawerContext>
      <ScrollOnTop>
        <Routes>
          {/*     PuBlic Routes      */}
          
          <Route path="/side-bar" element={<Sidebar />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:search" element={<MoviesPage />} />
           <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
                    {/*     Private Public  Routes      */}
           <Route element={<ProtectedRouter/>}  >     
          {/* <Route path="/MoviesInfo" element={<MoviesInfo />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<Password />} />
          <Route path="/favorites" element={<FavouritesMovies />} />
          
                    {/*     Admin Routers    */}
          <Route element={<AdminProtectedRouter/>}>        
          <Route path="/movieslist" element={<MoviesList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/users" element={<Users />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie/>} />

</Route>
</Route>
        </Routes>
      </ScrollOnTop>

      </DrawerContext>
      
    </>
  );
}
export default App;
