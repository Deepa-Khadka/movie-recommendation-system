import Sidebar from "./Sidebar";
import { Input } from '../../../Component/UsedInputs'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordValidation } from "../../../Component/Validation/UserValidation";
import { InlineError } from "../../../Component/Notification/Error";
import { changePasswordAction } from "../../../Redux/Actions/userActions";
import { toast } from "react-hot-toast";
import { useEffect } from "react";


function Password() {
  const dispatch = useDispatch();
  const { isLoading, isError,message, isSuccess} = useSelector(
    (state) => state.userchangepassword
    );
      //validate user
  const {
    register,
    handleSubmit,
   
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordValidation),
  });
  //on submit
  const onSubmit = (data) => {
   dispatch(changePasswordAction(data));
  };
  //userEffect
  useEffect(() => {
 
    if(isSuccess){
      

      dispatch({type:"USER_CHANGE_PASSWORD_RESET"});
    }
    if(isError ){
      toast.error(isError  );
      dispatch({type: "USER_CHANGE_PASSWORD_RESET"});

    }
    if(message) {
      toast.success(message.message.toString());

     
      reset();
    }

  }, [ isSuccess,isError, message, reset,dispatch]);




    return<Sidebar>
    <form onSubmit={ 
      handleSubmit(onSubmit)
    }
    className='flex flex-col gap-6'>
      <h2 className='text-xl font-bold'>Change Password </h2>
      
      <div className="w-full">
            <Input
              label="Previous Password"
              placeholder='*******'
              type='password'
              bg={true}
              name="oldPassword"
             
              register={register("oldPassword")}
            />
            {errors.oldPassword&& <InlineError text={errors.oldPassword.message} />}
          </div>
          <div className="w-full">
            <Input
              label="New Password"
              placeholder='******'
              type='password'
              bg={true}
              name="newPassword"
             
              register={register("newPassword")}
            />
            {errors.newPassword&& <InlineError text={errors.newPassword.message} />}
          </div>
          <div className="w-full">
            <Input
           label="Confirm Password"
           placeholder='******'
           type='password'
              bg={true}
              name="confirmPassword"
             
              register={register("confirmPassword")}
            />
            {errors.confirmPassword&& <InlineError text={errors.confirmPassword.message} />}
          </div>
    
      
      
    

      <div className='flex justify-end items-center my-4'>
       
        <button 
        disabled={isLoading}
        type="submit"
        className='hover:bg-subMain bg-main border border-submain flex-rows gap-4 text-white py-3 px-6 rounded w-full sm:w-auto  '>
        {
          isLoading ? "Changing..." :"Change Password"
        }
        </button>

      </div>
    </form>
  </Sidebar>
  
}
export default Password;