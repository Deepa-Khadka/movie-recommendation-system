import React from 'react'
import Sidebar from './Sidebar';
import Table2 from '../../../Component/Table2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteUserAction, getAllUsersAction } from '../../../Redux/Actions/userActions';
import Loader from '../../../Component/Notification/Loader';
import { Empty } from '../../../Component/Notification/Empty';
import { toast } from 'react-hot-toast';


function Users() {
  const dispatch = useDispatch();

  const { isLoading,isError, users} =  useSelector
  (state => state. adminGetAllUsers
    );
    //delete
    const { 
      isError:deleteError, 
      isSuccess 
    } =  useSelector ((state) => state.adminDeleteUser );

//delete user handler 
const deleteMoviesHandler = (id) => {
 if(window.confirm("Are you sure you want to delete this user?")){
  dispatch(deleteUserAction(id));
 }
}

    //useEffect 
    useEffect(() => {
      dispatch(getAllUsersAction());
      if (isError || deleteError) {
        toast.error(isError || deleteError);

        dispatch({type:isError ? "GET_ALL_USERS_RESET " : "DELETE_USER_RESET"});
      }

    }, [dispatch,isError,deleteError,isSuccess]);
  return (
    <Sidebar>
        <div className='flex flex-col gap-6'>
           
               <h2 className='text-xl font-bold'> Users</h2>
               {
              isLoading ?( 
                <Loader/> 
              ):users?.length > 0 ? (
                 <Table2 data={users} users={true} onDeleteFunction={deleteMoviesHandler} /> 
              ):(
               <Empty message="You dont have any user"/>
           ) }
               
            </div>
        
    </Sidebar>
  )
}

export default Users;

