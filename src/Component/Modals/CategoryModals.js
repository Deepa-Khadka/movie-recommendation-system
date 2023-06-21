import React, { useState } from 'react';
import MainModel from './MainModals';
import { Input } from '../../Component/UsedInputs';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../Redux/Actions/CategoriesAction';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

function CategoryModals({ modalOpen, setModalOpen, category }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.categoryCreate
  );

  // create category handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      // if category is not empty then update category else create category
      if (category) {
        dispatch(createCategoryAction(category._id, { title: title }));
        setTitle("");
      } else {
        dispatch(createCategoryAction({ title: title }));
        setTitle("");
      }
    } else {
      toast.error("Please write a category name");
    }
  };

  // useEffect
  useEffect(() => {
    let toastId = null;
  
    if (isError) {
      toastId = toast.error(isError);
      dispatch({ type: "CREATE_CATEGORY_RESET" });
    }
  
    if (isSuccess && title) {
      toastId = toast.success("Category created successfully");
      dispatch({ type: "CREATE_CATEGORY_RESET" });
    }
  
    if (category) {
      setTitle(category.title);
    }
  
    if (!modalOpen) {
      setTitle("");
    }
  
    return () => {
      if (toastId !== null) {
        toast.dismiss(toastId);
      }
    };
  }, [isError, dispatch, isSuccess, category, modalOpen, title]);

  return (
    <MainModel modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
        <h2 className='text-3xl font-bold'>Create</h2>
        <form className='flex flex-col gap-6 text-left mt-6' onSubmit={submitHandler}>
          <Input
            label="Category Name"
            placeholder=""
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-4 text-white bg-subMain rounded hover:bg-transparent border-2 border-subMain"
          >
            {isLoading ? "Loading..." : category ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </MainModel>
  );
}

export default CategoryModals;
