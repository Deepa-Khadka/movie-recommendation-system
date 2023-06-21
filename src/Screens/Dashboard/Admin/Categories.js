import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import {  HiPlusCircle } from 'react-icons/hi';
import Table2 from '../../../Component/Table2';
import { useState } from 'react';
import CategoryModals from '../../../Component/Modals/CategoryModals';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryAction, getAllCategoriesAction } from '../../../Redux/Actions/CategoriesAction';
import Loader from '../../../Component/Notification/Loader';
import { Empty } from '../../../Component/Notification/Empty';
import { toast } from 'react-hot-toast';


function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch()

//all categories
const {categories,isLoading} = useSelector(
(state)=>state.categoryGetAll);

//delete category
const {isSuccess,isError} = useSelector(
  (state)=>state.categoryDelete);
  const adminDeletecategory = (id) =>{
    if(window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(id));

    }
  };


useEffect(() => {
  //get all categories
  dispatch(getAllCategoriesAction());
  if (isError) {
    toast.error(isError)
    dispatch({ type:"DELETE_CATEGORY_RESET",})
  }
  if (isSuccess) {
    dispatch({ type:"DELETE_CATEGORY_RESET",})
  }
  if (modalOpen === false) {
    setCategory();
  }
}, [modalOpen,dispatch,isSuccess,isError]);

  return (
    <Sidebar>
      <CategoryModals 
      modalOpen={modalOpen} 
      setModalOpen={setModalOpen}
       category={category}/>
        <div className='flex flex-col gap-6'>
            <div className='flex-btn gap-2'>
               <h2 className='text-xl font-bold'> Categories</h2>
               <button 
               onClick={() => setModalOpen(true)}
               className='bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-3 px-4 rounded'>
              <HiPlusCircle/> Create 
               </button>
            </div>
            {
              isLoading ?( 
                <Loader/> 
              ):categories.length > 0 ? (
                <Table2 data={categories} 
                users={false}
                onDeleteFunction={adminDeletecategory}
                
                />
                ):(
               <Empty message="You have no Categories"/>
           ) }
        </div>
    </Sidebar>
  )
}

export default Categories;

