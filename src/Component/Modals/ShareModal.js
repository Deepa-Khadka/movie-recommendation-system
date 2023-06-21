import React, { useState } from 'react';
import MainModel from './MainModals';
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton, TelegramShareButton, PinterestShareButton, EmailShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaTelegram, FaPinterest, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';


function ShareModal({modalOpen, setModalOpen, movie}) {
   const shareData = [
    {
        icon:FaFacebook,
        shareButton:FacebookShareButton
    },
    {
    icon:FaTwitter,
    shareButton:TwitterShareButton

    },
    {
    icon:FaTelegram,
    shareButton:TelegramShareButton
    },
    {
      icon:FaWhatsapp,
      shareButton:WhatsappShareButton,
  },
  {
  icon:FaPinterest,
  shareButton:PinterestShareButton,

  },
  {
  icon:MdEmail,
  shareButton:EmailShareButton
  },
    
      
   ];
   const url =`${window.location.protocol}//${window.location.host}/movie/${movie?._id}`;

  return (
    <MainModel modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white  rounded-2xl '>
        <h2 className='text-2xl font-bold'>Share <span className='text-xl font-bold'>"{movie?.name}"</span></h2>
      <form className='flex-rows flex-wrap gap-6 mt-6'>
       {
        shareData.map((data,index) => (
            <data.shareButton key={index}
             url={url} quote="ScreenPlay |free movie Site">
              <div className='w-12 transitions hover:bg-subMain flex items-center justify-center text-lg h-12 bg-dry rounded bg-opacity-300'>
  <data.icon />
</div>

            </data.shareButton>
        ))
       }
      
      </form>
      </div>

    </MainModel>
  );
}




export default ShareModal;
