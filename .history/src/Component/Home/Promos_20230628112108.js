import React from 'react'
import { FiUser } from 'react-icons/fi'

function Promos() {
  return (
   
      <div className='my-20 py-10 md:px-20 px-8 bg-dry'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-10 items-center'>
          <div className='flex lg:gap-10 gap-6 flex-col'>
            <h1 className='xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed '>
            Enjoy Movies Anywhere, Anytime <br/> Enjoy on Your Mobile
            </h1>
            <p className='text-text text-sm xl:text-base leading-6 xl:leading-8'>
            Offline viewing offers individuals a highly convenient and remarkably flexible approach to savoring their most beloved films
            . With the ability to enjoy movies without an internet connection, 
            offline viewing grants users the freedom to watch their favorites anytime and anywhere, regardless of access to the online realm

            </p>
            <div className='flex gap-4 md:test-lg text-sm'>
              <div className='flex-colo bg-black text-subMain px-6 py-3 rounded-md font-bold'>
                HD 4k
              </div>
              <div className='flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded-md font-bold'>
              <FiUser/>1k
              </div>

            </div>
          </div>
          <div>
          <img src="/images/movies/mobile.png" alt="Mobile app" className='w-full'/>

          </div>
        </div>
      </div>
     
    
  )
}

export default Promos
