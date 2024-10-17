import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';

export const updateUser =async(req, res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allow to update'));
    }
    if(req.body.password){
        if(req.body.password.length <6){
            return next(errorHandler(400,'Use strong passsword'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    }
    if(req.body.username){
        if(req.body.username.length <7 || req.body.username.length >20){
            return next(errorHandler(400,'USername must be between 7-20 characters'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400,'Username cannot contain spaces'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400,'Username must be lower'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400,'Username only contain number and letters '));
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                    password:req.body.password
                },
            },{new:true});
            const {password,...rest}= updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error)
        }
    }
    }
