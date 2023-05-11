import React from 'react'
import Sidebar from './Sidebar'
import Uploader from '../../../Component/Uploader'

function Profile() {
  return (
    <>
    <Sidebar>
      <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold'>Update Profile </h2>
        <Uploader/>
      </div>
    </Sidebar>
    </>

  )
}

export default Profile
