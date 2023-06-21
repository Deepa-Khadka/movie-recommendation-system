import React, { useState } from 'react';
import MainModel from './MainModals';
import { Input } from '../../Component/UsedInputs'
import Uploader from '../Uploader';




function CastsModal({ modalOpen, setModalOpen, cast }) {
    return (
      <MainModel modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
          <h2 className='text-3xl font-bold'>
            {cast ? "Update Casts" : "Create Casts"}
          </h2>
  
          <form className='flex flex-col gap-6 text-left mt-6'>
          <Input
        label="Cast Name"
        placeholder={cast ? cast.fullName : "John Doe"}
        type="text"
        bg={false}/>
        <div className="flex flex-col gap-6">
            <p className="font-semibold text-sm text-white">
             Cast Image
            </p>
            <Uploader/>
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
         <img src={`/images/${cast ? cast.image : "ScreenPlay.png"}`}
          alt={cast?.fullName} className="w-full h-full object-cover rounded"/>
 </div>
        </div>
        <button
        onclick={() => setModalOpen(false)}
         className='w-full flex-col py-4 hover:bg-transparent border-2   border-subMain rounded bg-subMain text-white'>
     {cast ? "Update" : "Add"}
        </button>          </form>
        </div>
      </MainModel>
    );
  }
  
 
  




export default CastsModal;
