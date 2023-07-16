import React from 'react'
import Layout from '../../Layout/Layout'
import Banner from '../../Component/Home/Banner'
import RecommendationMovies from '../../Component/Home/Recommendation'
import PopularMovies from '../../Component/Home/PopularMovies'
import TopRated from '../../Component/Home/TopRated'
import Promos from '../../Component/Home/Promos'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllMoviesAction, getRandomMoviesAction,  getTopRatedMoviesAction,getRecommendationMoviesAction } from '../../Redux/Actions/MoviesAction'
import { toast } from 'react-hot-toast'

function HomeScreen() {
  const dispatch = useDispatch();
  //useSelectors
  const { 
    isLoading:randomLoading,
     isError:randomError, 
      movies:randomMovies} = useSelector((state) => state.getRandomMovies);
    const { 
      isLoading:topLoading, 
      isError:topError,  
      movies:topMovies} = useSelector((state) => state.getTopRatedMovies);

    const {isLoading, isError, movies} =useSelector(
      (state) => state.getAllMovies
    );
    // get logined user
    const user = localStorage.getItem('userInfo')
    console.log("=======",user._id)
    //useEffect
    useEffect(() => {
      dispatch(getRecommendationMoviesAction());
      //get random movies
      dispatch(getRandomMoviesAction());
      //get all movies
       dispatch(getAllMoviesAction({}));
      //get top rated movies
      dispatch(getTopRatedMoviesAction());
      //errors
      if (isError || randomError || topError){
        toast.error("Something went Wrong!");
      }
    },[dispatch, isError, randomError,topError]);
  return (
    <Layout>
      <div className='container mx-auto min-h-screen px-2 mb-6'>
       <Banner movies={movies} isLoading={isLoading}/>
       <RecommendationMovies/>
       <PopularMovies movies={randomMovies} isLoading={randomLoading}/>
       <Promos/>
       <TopRated movies={topMovies} isLoading={topLoading}/>
       
      </div>
        

    </Layout>
   
  )
}

export default HomeScreen;
