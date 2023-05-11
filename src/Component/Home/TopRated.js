import React, { useState } from 'react'
import Titles from './../Titles';
import {BsBookmarkStarFill} from 'react-icons/bs';
import {Swiper} from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { Movies } from '../../Data/MovieData';

function TopRated(){
  const [nextE1, setNextE1] = useState(null);
  const [prevE1, setPrevtE1] = useState(null);



  return (
    <div className='my-16'>
      <Titles title="Top Rated" Icon={BsBookmarkStarFill}/>
      <div className='mt-10'></div>
      <Swiper navigation= {{nextE1, prevE1}} 
      slidesPerview={2} 
      spaceBetween={40} 
      autoplay={true}
       speed={1000}
       loop={true}
       modules={[Navigation,Autoplay]}
       >
       

      </Swiper>
    </div>
  )
}


export default TopRated
