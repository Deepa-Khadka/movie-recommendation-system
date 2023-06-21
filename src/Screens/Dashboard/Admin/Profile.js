import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Uploader from "../../../Component/Uploader";
import { Input } from "../../../Component/UsedInputs";
import { useDispatch, useSelector } from "react-redux";


import { useForm } from "react-hook-form";
import { ProfileValidation } from "../../../Component/Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../../Component/Notification/Error";
import { Imagepreview } from "../../../Component/Imagepreview";
import { deleteProfileAction, updateProfileAction } from "../../../Redux/Actions/userActions";
import { toast } from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
const {isLoading, isError, isSuccess} = useSelector((state) => state.userUpdateProfile);
const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.userDeleteProfile);

  //validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  //update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({...data,image:imageUrl}));
  };
  //delete  profile
  const deleteProfile = () => {
    window.confirm("Are you sure want to delete your profile") &&
    dispatch(deleteProfileAction());

  }

  //userEffect
  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if(isSuccess){
      dispatch({type: "USER_UPDATE_PROFILE_RESET"});
    }
    if(isError || deleteError){
      toast.error(isError || deleteError );
      dispatch({type:"USER_DELETE_PROFILE_RESET"});

    }

  }, [userInfo, setValue, isSuccess,isError,dispatch, deleteError,]);

  return (
    <>
      <Sidebar>
        <form onSubmit=
        {handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Update Profile </h2>
          <div className="w-full grid lg:grid-cols-12 gap-6">
            <div className="col-span-10">
              <Uploader setImageUrl={setImageUrl} />
            </div>
            {/*  image preview    */}
            <div className="col-span-2">
              <Imagepreview
              
           image={imageUrl}
               name={ userInfo ? userInfo.fullName : "screenplay" } />
            </div>
          </div>

          <div className="w-full">
            <Input
              label="Fullname"
              placeholder=""
              type="text"
              name="fullName"
              bg={true}
              register={register("fullName")}
            />
            {errors.fullName && <InlineError text={errors.fullName.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Email"
              placeholder=""
              type="email"
              name="email"
              register={register("email")}
              bg={true}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>
          <br />

          <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
            <button
            onClick={deleteProfile}
            disabled ={deleteLoading || isLoading}
             className="bg-subMain font-medium hover:bg-main border border-submain flex-rows gap-4 text-white py-3 px-6 rounded w-full sm:w-auto  ">
             
              {
                isLoading ? "Deleting...":  " Delete Account"
              }
            </button>
            <button
              disabled ={deleteLoading || isLoading}

              type="submit"
              className="hover:bg-subMain font-medium bg-main border border-submain flex-rows gap-4 text-white py-3 px-6 rounded w-full sm:w-auto  "
            >
              {
                isLoading ? "Updating...":  "Update Profile"
              }
            </button>
          </div>
        </form>
      </Sidebar>
    </>
  );
}

export default Profile;