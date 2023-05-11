import React from 'react'


function Login() {
  return (
    <div className='container mx-auto px-2 my-24 flex-col'>
        <div className='w-full 2xl:w-2/5 p-1 md:w-3/5 flex-col bg-dry rounded-lg border-border'>
        <img src="http://localhost:3000/favicon.png" alt="http://localhost:3000/favicon.png" className='w-full h-12 object-contain '/>
<input label="Email" 
placeholder='Enter your email'
 type="email"
  bg={true}/>
  <input label="Password" 
placeholder=''
 type="Password"
  bg={true}/>
        </div>
    </div>
  
  )
}

export default Login
