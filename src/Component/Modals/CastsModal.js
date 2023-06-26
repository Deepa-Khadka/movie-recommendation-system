import React, { useEffect, useState } from 'react';
import MainModel from './MainModals';
import { Input } from '../../Component/UsedInputs'
import Uploader from '../Uploader';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { addCastAction, updateCastAction } from '../../Redux/Actions/MoviesAction';
import { InlineError } from '../Notification/Error';
import { Imagepreview } from '../Imagepreview';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';




function CastsModal({ modalOpen, setModalOpen, cast }) {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState("");
  const generateId = Math.floor(Math.random() * 100000000);
  const image = castImage ? castImage: cast?.image

    //validate cast
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(
        yup.object().shape({
          name:yup.string().required("Cast name is required"),
        })
      ),
    });
  
    //on submit
    const onSubmit = (data) => {
      if (cast) {
        dispatch(
          updateCastAction({
            ...data,
            image:image,
           id:cast.id,
          })
        );
        toast.success("cast updated successfully")
      }else{
        dispatch(
      addCastAction({
            ...data,
            image:image,
            id:generateId,
          })
        );
        toast.success("cast created successfully")


      }
      reset();
      setCastImage("");
      setModalOpen(false)
    
    
    
    };
    useEffect(() => {
      if(cast) {
        setValue("name" , cast?.name)
      }
},[cast,setValue])

 
    return (
      <MainModel modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
          <h2 className='text-3xl font-bold'>
            {cast ? "Update Casts" : "Create Casts"}
          </h2>
  
          <form onSubmit={
            handleSubmit(onSubmit)
          } className='flex flex-col gap-6 text-left mt-6'>
           <div className="w-full">
            <Input
            label="Cast Name"
             placeholder=""
              type="text" 
              name="name"
              register={register("name")}
              bg={true}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          
       
        <div className="flex flex-col gap-6">
            <p className="font-semibold text-sm text-white">
             Cast Image
            </p>
            <Uploader setImageUrl={setCastImage}/>
<Imagepreview image={
image ? image : "/images/ScreenPlay.png"
} name="castImage"/>
        </div>
        <button type="submit"
        onClick={() => setModalOpen(false)}
         className='w-full flex-col py-4 hover:bg-transparent border-2   border-subMain rounded bg-subMain text-white'>
     {cast ? "Update" : "Add"}
        </button>          </form>
        </div>
      </MainModel>
    );
  }
  
 
  




export default CastsModal;
