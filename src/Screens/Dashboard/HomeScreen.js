import React from 'react'
import Layout from '../../Layout/Layout'
import Banner from '../../Component/Home/Banner'
import PopularMovies from '../../Component/Home/PopularMovies'
import TopRated from '../../Component/Home/TopRated'
import Promos from '../../Component/Home/Promos'
function HomeScreen() {
  return (
    <Layout>
      <div className='container mx-auto min-h-screen px-2 mb-6'>
       <Banner/>
       <PopularMovies/>
       <Promos/>
       <TopRated/>
       
      </div>
        

    </Layout>
   
  )
}

export default HomeScreen
