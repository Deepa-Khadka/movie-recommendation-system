import React from 'react'
import FlexMovieItems from '../Home/FlexMovieItems'
import {  FaShareAlt } from 'react-icons/fa'
import {  FaPlay } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import Rating from '../Stars'


function MoviesInfo({movie, setModalOpen}) {

  return (
   <>
   <div className='w-full xl:h-screen relative text-white'>

    <img src={movie?.image ? movie?.image : "/images/user.png"}

    alt={movie?.name} 
    className='w-full  xl:inline-block h-full object-cover'/>
   <div className='xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0'>
    <div className='container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-col py-10 lg:py-20 gap-8'>
      <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden'>
      <img src={movie?.titleImage ? movie?.titleImage : "/images/user.png"}
    alt={movie.name}  className='w-full h-full object-cover'/>

      </div>
      <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
        <div className='col-span-3 flex flex-col gap-10'>
           <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>
            {movie?.name}
           </h1>
           <div className='flex items-center gap-4 font-medium text-dryGray'>
            <div className='flex-col bg-subMain text-xs px-2 py-1'>
              HD 4K

            </div>
       <FlexMovieItems movie={movie && movie}/>      
     </div>
     <p className='text-text text-sm leading-7'>{movie?.desc}</p>
     <div className='grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg '>
      {/* share */}
      <div className='col-span-1 flex-col border-r content-center justify-center border-border'>
      <button
        onClick={() => setModalOpen(true)}
        className='w-10 h-10 flex justify-center rounded-lg bg-white items-center bg-opacity-20'
      >
        <FaShareAlt />
        </button>

      </div>

      {/* language */}
      <div className='col-span-2   justify-center font-medium text-sm'>
        <p >Language :{''}
        <span className='ml-2 truncate'>{movie?.language}</span>
        </p>
      </div>
     
      {/* watch button */}
      <div className='sm:col-span-2 col-span-3 flex justify-end font-medium text-sm '>
  {movie && (
    <Link
      to={`/watch/${movie._id}`}
      className='bg-dry hover:bg-subMain transition border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3'
    >
      <FaPlay className='w-3 h-3' /> Watch
    </Link>
  )}
</div>


      <div className='col-span-2 md:mt-0 mt-2 flex justify-end'>
        
      </div>
      
     </div>
           {/* rating*/}
           <div className='flex mb-6 text-lg gap-6 text-star'>
        <Rating value={movie?.rate}/>
      </div>
        </div>
      </div>
    </div>
   </div>


   </div>
   </>
  )
}

export default MoviesInfo
