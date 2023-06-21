import asyncHandler from "express-async-handler"
import User from "../models/UserModels.js"
import bcrypt from "bcryptjs";
import { generateToken} from "../middlerware/Auth.js"

//@desc Register  user
//@route POST /api/user/register
//@acess Public

const registerUser = asyncHandler(async (req,res) => {
const {fullName, email, password, image} = req.body
try {
  const userExists =await User.findOne({ email})
  //check if user exists
  if(userExists){
    res.status(400)
    throw new Error("User already exists")

  }
  //else create user
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password,salt);


//create user in db
const user = await User.create({
  fullName,
  email,
  password:hashedPassword,
  image,
});
//if user created sucessfully send user data and token to client
 if (user) {
  res.status(201).json({
    _is:user._id,
    fullName:user.fullName,
    email:user.email,
    image:user.image,
    isAdmin:user.isAdmin,
    token:generateToken(user._id),
  });
 }

 else {
  res.status(400);
  throw new Error ("Invalid user data");

 }


} catch (error) {
  res.status(400).json({message: error.message});
}
});

//@desc Login user
//@route Post/api/user/login
//@acess Public

const loginUser = asyncHandler(async (req,res) => {
  const { email,password} = req.body;
  try {
    //find user in Db
    const user = await User.findOne({email});
    //if user exists compare password with hashed password
if (user && (await bcrypt.compare(password, user.password))){
  res.json({
    _id:user._id,
    fullName:user.fullName,
    email:user.email,
    image:user.image,
    isAdmin:user.isAdmin,
    token: generateToken(user._id),
  });
}else {
  res.status(401);
  throw new Error("Invalid email 0r password");
}

   
          
    } catch (error) {
      res.status(400).json({ message: error.message})

    }
  });
  
  // ******** PRIVATE CONTROLLER    ********

  const updateUserProfile = asyncHandler(async (req,res) => {
    const { fullName, email, image } = req.body;
    try {
      //find user in DB
      const user = await User.findById(req.user._id);

      // if user exists update user data and save it in DB
      if(user) {
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.image = image || user.image;

      
      
        // user.fullName = fullName?.user.fullName;
        //user.email = email?.user.email;
        // user.image = image?.user.image;
        
        
        
        const updatedUser = await user.save();



        //Send updated user data and token to client
res.json({
  _id:updatedUser._id,
  fullName: updatedUser.fullName,
  email:updatedUser.email,
  image:updatedUser.image,
  isAdmin:updatedUser.isAdmin,
  token: generateToken(updatedUser.id),
});
    }
else{
  res.status(404);
  throw new Error("User not found");
}
  } catch (error) {
          res.status(400).json({message:error.message});
        }
      
    });

    //@desc  Delete user profile
    //@route Delete/api/user
    //@acess Private

    const deleteUserProfile = asyncHandler(async (req,res) => {
      try{
        //find user in DB
        const user = await User .findById(req.user._id);
        // if user exists delete user from DB
        if(user) {
          //if user is admin throw error message

          if(user.isAdmin){
            res.status(400);
            throw new Error("Can't delete admin user")
          }
       
          //elese delete user form DB
          await user.remove();
          res.json({message:"user deleted sucessfully"});
        }
        //else send error message
        else{
          res.status(404);
          throw new Error ("User not found");
        }
      } catch (error) {
        res.status(400).json({message:error.message});
      }

    })

    //@desc change user password
    //@route PUT /api/user/password
    //@acess Private

    const changeUserPassword = asyncHandler(async (req,res) => {
      const {oldPassword, newPassword} = req.body;
      try{
        //find user in DB
        const user = await User.findById(req.user._id);
        //if user exists comapre old password with hasded password then update user password
        if (user && (await bcrypt.compare(oldPassword, user.password))){
 //hash new password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(newPassword, salt);
 user.password = hashedPassword;
 await user.save();
 res.json({message:"password changed!!"});
        }
       
      
      //else send error message
      else{
        res.status(401);
        throw new Error("Invalid old password");
      }
      }catch (error){
        res.status(400).json({message:error.message});
      }

    });

    //@desc get all liked movies
    //@route GET /api/user/favorites
    //@acess Private

    const getLikedMovies = asyncHandler(async (req,res) => {
      try{
           //find user in db

      const user = await User.findById(req.user._id).populate("likedMovies");
      //if user existe send liked Movies to client
      if(user) {
        res.json(user.likedMovies);

      }
      //else send error messaage
      else {
        res.status(404);
        throw new Error("User not Found");
      }

      }
   
    catch (error){
      res.status(400).json({message:error.message});
    }
    
    });

    //@desc Add movie to liked movie
    //@route POST /api/user/favorites
    //@acess Private

    const addLikedMovie = asyncHandler(async (req,res) => {
      const {movieId} =req.body;
      try{
        //find user in db 
        const user = await User.findById(req.user._id);
        //if user exists add movie to liked movies and save in DB
        if (user) {
          //check if movie already liked
        
          //if movie already liked send error message
          if (user.likedMovies.includes(movieId)) {
            res.status(400);
            throw new Error("Movie already Liked");
          }
          //else add movie to liked movie and save it in db
          user.likedMovies.push(movieId);
          await user.save();
          res.json( user.likedMovies);
        }
        //else send error message
        else{
          res.status(404);
          throw new Error("Movie not found");
        } 

      }catch(error){
        res.status(400).json({message:error.message})
      }
        
      } )



      //@desc Delete all liked movie
      //@route DELETE / api/user/favorites
      //@acess Private

      const deleteLikedMovies = asyncHandler(async (req,res) => {
        
        try {
          //find user in db 
          const user = await User.findById(req.user._id);
          //if user exists delete all liked movies and save in db
          if(user) {
            user.likedMovies = [];
            await user.save();
            res.json({message:"Your favorite Movies deleted sucessfully"});
          }
          else{
            res.status(400);
            throw new Error("User not found")
          }
        }catch(error){
          res.status(400).json({message:error.message});
        }
      })



      //****************ADMIN CONTRollers********* */

      //@desc get all users
      //@route GET /api/user
      //@acess private/Admin

      const getUsers =asyncHandler (async (req,res) => {
        try{
          //find all user in DB
          const users = await User.find({});
          res.json(users);
    
        }catch (error){
          res.status(400).json({message:error.message})
        }
      });


      //@desc Delete user
      //@route DELETE /api/user/:id
      //@acess Private/Admin

      const deleteUser = asyncHandler(async (req, res) => {
try{
  //find user in db
  const user = await User.findById(req.params.id);
  //if user exists delete user from db
  if (user) {
    //if user is admin throw error message
if (user.isAdmin) {
  res.status(400);
  throw new Error("can't delete admin user");
}
//else delete user from db
await user.remove();
res.json({message:"User deleted sucessfully"});

  }
  //else send error message
  else{
    res.status(404);
    throw new Error("user not found");

  }
} catch(error) {
  res.status(400).json({message:error.message});
}
      });





      
    

export {registerUser, 
  loginUser, 
  updateUserProfile,
  deleteUserProfile,
   changeUserPassword ,
   getLikedMovies,
   addLikedMovie,
   deleteLikedMovies,
   getUsers,
   deleteUser, //after creating movie model
   };









































