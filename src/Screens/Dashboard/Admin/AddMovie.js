import Sidebar from "./Sidebar";
import { Input, Message, Select } from '../../../Component/UsedInputs'
import Uploader from "../../../Component/Uploader";
import { CategoriesData} from '../../../Data/CategoriesData';
import {User} from '../../../Data/UsersData';
import {MdDelete} from 'react-icons/md';
import {  FaEdit } from 'react-icons/fa';
import {  ImUpload } from 'react-icons/im';
import CastsModal from "../../../Component/Modals/CastsModal";
import { useState } from "react";
import { useEffect } from "react";


function AddMovie() {
    const [modalOpen, setModalOpen] = useState(false);
    const [cast,setCast] = useState(null);
    useEffect(() => {
        if(modalOpen === false){
        setCast();

        }
    }, [modalOpen]);
    return(
         <Sidebar>
     <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast}/>
        
    <div className='flex flex-col gap-6'>
      <h2 className='text-xl font-bold'>Add Movie </h2>
      <div className="w-full grid md:grid-cols-2 gap-6">
      <Input
      label="Movie Title"
      placeholder=''
      type='text'
      bg={true}/>

       <Input
      label="Hours"
      placeholder=''
      type='text'
      bg={true}/>
      </div>
      
      <div className="w-full grid md:grid-cols-2 gap-6">
      <Input
      label="Language"
      placeholder=''
      type='text'
      bg={true}/>

       <Input
      label=" Release Year"
      placeholder=''
      type='number'
      bg={true}/>
      </div>
      {/*  images  */}
      <div className="w-full grid md:grid-cols-2 gap-6">
        {/* img without title */}
        <div className="flex flex-col gap-6">
            <p className="text-white font-semibold text-sm">
                Image without title
            </p>
            <Uploader/>
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
<img src="/images/movies/a.jpg" alt="" className="w-full h-full object-cover rounded"/>
 </div>
        </div>
    {/* img withtitle */}
    <div className="flex flex-col gap-6">
            <p className="font-semibold text-sm text-white">
                Image with title
            </p>
            <Uploader/>
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
<img src="/images/movies/c.jpg" alt="" className="w-full h-full object-cover rounded"/>
 </div>
        </div>

      </div>
        {/*  DESCRIPTION */}

        <Message className="text-white" label ="Description" placeholder=""/>
        {/*  CATEGORY*/}
        <div className="text-sm w-full">
            <Select label="Movie Category" option={CategoriesData}/>
        </div>
        {/*  Movie Video*/}
        <div className="flex flex-col gap-6 w-full ">
            <p className="text-white font-semibold text-sm">
               Movie Video
            </p>
            <Uploader/>

        </div>


        {/*  CAST*/}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
            <button onClick={() =>
             setModalOpen(true)}
            className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded">
                Add Cast
            </button>
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-1 gap-4">
                { User.map((user,i) => (
                    <div key={i} className="p-2 italic text-xs text-text rounded flex-col bg-main border border-border">
                        <img
    src={`${window.location.origin}/images/movies/` + user.image}
    alt={user.fullName}
                        className="w-full h-24 object-cover rounded mb-2"/>
                            <p>{user.fullName}</p>
                      <div className="flex-rows mt-2 w-full gap-2 ">
                      <button 
                      onClick={() => {
                        setCast(user);
                        setModalOpen(true)
                      }}
             
                      className='w-6 h-6 bg-dry border flex items-center justify-center border-border text-subMain rounded'>
  <span className="flex items-center justify-center">
    <MdDelete />
  </span>
</button>

<button onClick={() => {
    setCast(user);
    setModalOpen(true);
}}
 className='w-6 h-6 bg-dry border flex items-center justify-center border-border text-green-600 rounded'>                     
   <FaEdit/>
       
        </button>
                        </div>
                        </div>
                )) }
            </div>
        </div>

<button 
className='bg-subMain  w-full flex-rows gap-6 font-medium transition hover:bg-dry border border-subMain text-white py-4  rounded '>                     
<ImUpload/>Publish Movie
        </button>




      
    </div>
  </Sidebar>
    )
  
}
export default AddMovie;