import React from "react";
import { Route, Routes } from 'react-router-dom'
import axios from "axios";
import HomeScreen from "./Screens/Dashboard/HomeScreen";
import AboutUs from "./Screens/Dashboard/AboutUs";
import NotFound from "./Screens/Dashboard/NotFound";
import ContactUs from "./Screens/Dashboard/ContactUs";
import SingleMovie from "./Screens/Dashboard/SingleMovie";
import MoviesPage from "./Screens/Dashboard/Movies"
import MoviesInfo from "./Component/Single/MoviesInfo";
import WatchPage from "./Screens/Dashboard/WatchPage";
import Login from "./Screens/Dashboard/Login";
import Profile from "./Screens/Dashboard/Admin/Profile";
import Sidebar from './Screens/Dashboard/Admin/Sidebar';
import  AOS  from "aos";
import 'aos/dist/aos.css';
import FavouritesMovies from "./Screens/Dashboard/Admin/FavouritesMovies";
import Register from "./Screens/Dashboard/Register";
import ToastContainer from "./Component/Notification/ToastContainer";
import Password from "./Screens/Dashboard/Admin/Password";
import MoviesList from "./Screens/Dashboard/Admin/MovieList";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";




function App() {
AOS.init();

  return(
    <>
       <ToastContainer/>
    <Routes>

      <Route path="/side-bar" element={<Sidebar/>} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about-us" element={<AboutUs/>} />
      <Route path="/contact-us" element={<ContactUs/>} />
      <Route path="/movies" element={<MoviesPage/>} />
      <Route path="/movie/:id" element={<SingleMovie/>} />
      <Route path="/watch/:id" element={<WatchPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/MoviesInfo" element={<MoviesInfo/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/password" element={<Password/>} />
      <Route path="/favorites" element={<FavouritesMovies/>} />
      <Route path="/movieslist" element={<MoviesList/>} />
      <Route path="/dashboard" element={<Dashboard/>} />


      <Route path="*" element={<NotFound/>} />

      
</Routes>
    </>

 
  
  );
}
export default App;