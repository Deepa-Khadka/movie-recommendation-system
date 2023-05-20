import React from 'react'
import Sidebar from './Sidebar'
import Uploader from '../../../Component/Uploader'
import { Input } from '../../../Component/UsedInputs'

function Profile() {
  return (
    <>
    <Sidebar>
      <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold'>Update Profile </h2>
        <Uploader/>
        <Input
        label="Full-name"
        placeholder=''
        type='text'
        bg={true}/>
         <Input
        label="Email"
        placeholder=''
        type='Email'
        bg={true}/>
  <Input
  label="Password" 
placeholder=''
 type="Password"
  bg={true}/>
        <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
          <button className='bg-subMain hover:bg-main border border-submain flex-rows gap-4 text-white py-3 px-6 rounded w-full sm:w-auto  '>
            Delete Account
          </button>
          <button className='hover:bg-subMain bg-main border border-submain flex-rows gap-4 text-white py-3 px-6 rounded w-full sm:w-auto  '>
            Update Profile
          </button>

        </div>
      </div>
    </Sidebar>
    </>

  )
}

export default Profile
