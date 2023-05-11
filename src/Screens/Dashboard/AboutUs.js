import React from 'react'
import Layout from '../../Layout/Layout'
import Head from '../../Component/Head'

function AboutUs() {
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
        <Head title="About Us"/>
        <div className='xl:py-20 py-10 px-4'>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div >
              <h3 className='text-xl lg:text-3xl mb-4 font-semibold '>
              Welcome to ScreenPlay!
              </h3>
              <div className='mt-3 text-sm leading-8 text-text'>
              <p>Our platform is designed to help you discover new and exciting movies based on your unique interests and preferences. With a vast collection of movies spanning
                 various genres and languages, we are confident that you'll find something that you'll love.Whether you're in the mood for an action-packed adventure, a heartwarming romance, a thrilling horror movie, or a thought-provoking drama, we've got you covered. 
                 You can browse our extensive collection of movies by genre, release date, ratings, and more.</p>
            </div>
            <div className='grid md:grid-cols-2 gap-6 mt-8'>
              <div className='p-8 bg-dry rounded-lg'>
                <span className='text-3xl block font-extrabold mt-4'>
                  5k
                </span>
                <h4 className='text-lg font-bold mb-1'>
                  Listed Movies
                </h4>
                <p className='mb-0 text-text leading-7 text-sm'>
                  ehhehhheh
                </p>
              </div>
              <div className='p-8 bg-dry rounded-lg'>
                <span className='text-3xl block font-extrabold mt-4'>
                  2k
                </span>
                <h4 className='text-lg font-bold mb-1'>
                            Lovely                 </h4>
                <p className='mb-0 text-text leading-7 text-sm'>
                  ehhehhheh
                </p>
              </div>
            </div>
           
            </div>
            <div className='mt-8 lg:mt-0 '>
              <img src="/images/movies/about2.jpg" alt="aboutus" className=' h-auto max-w-1/2 w-full xl:block hidden  rounded-lg object-cover' />
            </div>
          
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs
