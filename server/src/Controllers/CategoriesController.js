import asyncHandler from "express-async-handler";
import Categories from "../models/CategoriesModal.js";

//*******PUBLIC CONTROLLERS****** */
//@DESC GET ALL categories
//@route Get/api/categories
//@acess Public

const getCategories = asyncHandler(async (req,res) => {
    try{
        //find all categories in databse
        const categories = await Categories.find({});
        //send all categories to the client
        res.json(categories);
    }catch (error){
        res.status(400).json({message:error.message});
    }
});

//******Admin Controllers********* */

//@desc create new category
//@roue Post /api/categories
//@acess Private/Admin

const createCategory =asyncHandler(async (req,res) => {
    try {
        //get title from request body
        const {title} = req.body;
        //create new category
        const category = new Categories ({
            title,
        });
        //save the category in database
        const createdCategory = await category.save();
        //send the new category to the client
        res.status(201).json(createdCategory);
    }catch (error){
        res.status(400).json({message:error.message});
    }
});

//@desc update category
//@route Put/api/categories/:id
//@acessPrivate/Admin

const updateCategory =asyncHandler(async (req, res) => {
    try{
        //get category id form request params
        const category = await Categories.findById(req.params.id);
        if (category){
            //update category title
            category.title = req.body.title || category.title;
            //save the updated category in database
            const updateCategory = await category.save();
            //send the updated category to the client
            res.json(updateCategory);

        }
        else{
            res.status(404).json({message:"Category not found"});
        }
    }catch (error){
        res.status(400).json({message:error.message});
    }
});

//@desc delete category
//@route Delete/api/categories/:id
//@acess Private/Admin

const deleteCategory = asyncHandler(async(req,res) => {
    try{
        //get category id form request params
        const category = await Categories.findById(req.params.id);
         if(category){
            //delete the category from database
            await category.remove();
            //send sucess message to the client
            res.json({message:"category removed"});
         }else{
            res.status(404).json({message:"Category not found"});
         }
    }catch (error){
        res.status(400).json({message:error.message});
    }
});

export{getCategories,
    createCategory,
    updateCategory ,
    deleteCategory

 }
