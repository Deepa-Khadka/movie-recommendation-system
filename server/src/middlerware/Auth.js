import jwt from 'jsonwebtoken';
import User from "../models/UserModels.js";
import asyncHandler from "express-async-handler";



//@desc Authenticated user & get token
const generateToken = (id) => {
    // return jwt.sign(id, 'secretOrPrivateKey', process.env.JWT_ACCESS_TOEKN_PRIVATE_KEY, {
    //     expiresIN: "1d",
    // });
    return  jwt.sign({
        data: {id: id}
      }, process.env.JWT_ACCESS_TOEKN_PRIVATE_KEY, { expiresIn:process.env.REFRESH_TOKEN_LIFE });


};

//protection middleware

const protect = asyncHandler ( async( req, res, next) => {
    let token;

    //check if token exists in headers
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")

    ) {
        //set token from Bearer token in header
        try{
            token = req.headers.authorization.split(" ")[1];
            //verify token and get user id
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOEKN_PRIVATE_KEY,);

            //get user id from  decoded token
            req.user = await User.findById(decoded.data.id).select("-password");
         next();
        } catch (error){
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token Failed");

        }
        
        }

        //if token doesn't exist in header send error
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    });

    //admin middleware
    const admin = (req, res, next) => {
        if (req.user && req.user.isAdmin) {
            next();
        } else{
            res.status(401);
            throw new Error("Not Authorized as an Admin");
        }

    }
export {generateToken, protect,admin};