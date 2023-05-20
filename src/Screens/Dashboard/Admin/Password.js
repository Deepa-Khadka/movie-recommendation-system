import Sidebar from "./Sidebar";
import { Input } from '../../../Component/UsedInputs'


function Password() {
    return <Sidebar>
    <div className='flex flex-col gap-6'>
      <h2 className='text-xl font-bold'>Change Password </h2>
      
      <Input
      label="Previous Password"
      placeholder='*******'
      type='password'
      bg={true}/>
       <Input
      label="New Password"
      placeholder='******'
      type='password'
      bg={true}/>
         <Input
      label="Confirm Password"
      placeholder='******'
      type='password'
      bg={true}/>

      <div className='flex justify-end items-center my-4'>
       
        <button className='hover:bg-subMain bg-main border border-submain flex-rows gap-4 text-white py-3 px-6 rounded w-full sm:w-auto  '>
        Change Password
        </button>

      </div>
    </div>
  </Sidebar>
  
}
export default Password;