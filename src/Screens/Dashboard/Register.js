import React from 'react'
import Layout from '../../Layout/Layout'
import { Input } from '../../Component/UsedInputs'
import {FiLogIn} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import { registerAction } from '../../Redux/Actions/userActions'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterValidation } from '../../Component/Validation/UserValidation'
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { InlineError } from '../../Component/Notification/Error'

function Register () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const { isLoading, isError,  userInfo, isSuccess} = useSelector(
  (state) => state.userRegister
  );
  //validate user
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm({
   resolver: yupResolver(RegisterValidation),
  })

//on submit 
const onSubmit = (data) => {
 
  dispatch(registerAction(data));
};
//useEffect
useEffect(() => {
  if (userInfo?.isAdmin){
    navigate("/dashboard");
    
  }
  else if (userInfo) {
    navigate("/profile");
  }

  if(isSuccess) {
    toast.success(`Welcome back ${userInfo?.fullName}`);
        dispatch({type:"USER_REGISTER_RESET"});

  }
  if (isError){
    toast.error(isError);
    dispatch({type:"USER_REGISTER_RESET"});
    
  }
}, [userInfo, isSuccess, isError, navigate, dispatch]);



return (
  <Layout>
    <div className='container mx-auto px-2 my-24 flex-col'>
      <form 
      onSubmit={handleSubmit(onSubmit)} 
      className='w-full p-8 md:w-2/5 gap-8 flex-col bg-dry rounded-lg border border-border mx-auto'>
        <img src="http://localhost:3000/favicon.png" alt='logo' className='w-full h-12 object-contain' />

        <div className='w-full'>
        <Input label="Fullname"
         placeholder='' 
         type="text" 
         name="fullName"
         bg={true}
          register={register("fullName")} 
          />
        {errors.fullName && 
        <InlineError text={errors.fullName.message} />}
</div><br/>
<div className='w-full'>
    <Input 
     label="Email"
     placeholder='' 
     type="email"
     name="email"
     register={register("email")}
      bg={true}/>
      {
            errors.email && <InlineError text={errors.email.message}/>

      }
    </div><br/>

        <div className='w-full'>
          <Input label="Password" 
          placeholder='' 
          type="password" 
          bg={true} 
          register={register("password")} />
          {errors.password && 
          <InlineError text={errors.password.message} />}
        </div><br />

        <button 
        type="submit"
        disabled = {isLoading}
        className="bg-subMain transition hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full">
         {
        //if loading show loading
        isLoading ? (
          "Loading..."

        ):(
          <>

          <FiLogIn/> Sign Up

          </>
        )
      }
        </button><br />

        <p className='text-center text-border'>
          Already have an account?{" "}
          <Link to='/login' className='text-dryGray font-semibold ml-2'>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  </Layout>
);

}

export default Register;
