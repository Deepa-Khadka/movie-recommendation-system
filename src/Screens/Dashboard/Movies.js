import React,{useState} from 'react'
import Layout from '../../Layout/Layout'
import Filter from '../../Component/Filter';
import Movie from '../../Component/Movie'
import {Movies} from '../../Data/MovieData'
import { CgSpinner } from 'react-icons/cg';

function MoviesPage() {
  const maxpage = 3;
  const [page,setpage] = useState(maxpage)

  const HandleloadingMore= ( )=> {
    setpage(page + maxpage)

  }
  return (
   <Layout>
    <div className='min-height-screen container mx-auto px-2 my-6'>
<Filter/>
<p className='text-lg font-medium my-6'>
  Total <span className='font-bold text-subMain'>{Movies?.length}</span>{' '} 
  Items Found
  </p>
    <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm-grid-cols-2 gap-6'>
      {
        Movies.slice(0,page)?.map((movie,index ) => (
          <Movie key={index} movie={movie}/>
        ))
      }
    </div>
    <div className='w-full flex-colo md:my-20 my-10'>
      <button onClick= {HandleloadingMore} className='flex -rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain'>
Loading More <CgSpinner className='animate-spin'></CgSpinner>
      </button>

    </div>
  

    </div>
   </Layout>
  )
}

export default MoviesPage;
