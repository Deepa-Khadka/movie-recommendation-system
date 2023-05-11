import React from "react";
import { Route, Routes } from 'react-router-dom'
import HomeScreen from "./Screens/Dashboard/HomeScreen";
import AboutUs from "./Screens/Dashboard/AboutUs";
import NotFound from "./Screens/Dashboard/NotFound";
import Signin from "./Component/Signin";
import Signup from "./Component/Signup";
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

function App() {
AOS.init()

  return(
    <Routes>
      <Route path="/sign-in" element={<Signin/>} />
      <Route path="/log-in" element={<Login/>} />
      <Route path="/side-bar" element={<Sidebar/>} />
      <Route path="/sign-up" element={<Signup />} /> 
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about-us" element={<AboutUs/>} />
      <Route path="/contact-us" element={<ContactUs/>} />

      <Route path="/movies" element={<MoviesPage/>} />
      <Route path="/movie/:id" element={<SingleMovie/>} />
      <Route path="/watch/:id" element={<WatchPage/>} />

      <Route path="/MoviesInfo" element={<MoviesInfo/>} />
      <Route path="/profile" element={<Profile/>} />


      <Route path="*" element={<NotFound/>} />

      
</Routes>
  
  );
}
export default App;