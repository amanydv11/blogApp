import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import{errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASS,
    }
})



export const signup = async(req,res,next)=>{
const {username, email, password}= req.body;

if(!username
     || !email 
     || !password
      || username === ''
       || email === '' 
       || password === '')
       {
        next(errorHandler(400, 'All fields are required'));
}

const hashedPassword =await bcryptjs.hash(password,10);
 const newUser = new User({
    username,
    email,
    password:hashedPassword,
 })

 try {
    await newUser.save();
res.json({message:'user created'})
 } catch (error) {
    next(error);
}
 };

 export const signin = async(req,res,next)=>{
    const {email,password}= req.body;
    if(!email || !password || email ==='' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }
try {
    const validUser = await User.findOne({email});
    if(!validUser){
        next(errorHandler(400, 'Wrong Credentails'));
    }
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
        next(errorHandler(404, 'Wrong Credentails'));
    }
const token = jwt.sign(
    {id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET
);

res.status(200).cookie('access_token',token,{
    httpOnly:true,
}).json(validUser)

} catch (error) {
    next(error)
}
 }

 export  const google =async (req,res,next)=>{
    const{email,name,googlePhotoURL}= req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token =jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET);
            const{password, ...rest} = user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest)
        }else{
            const generatedPassword = 
            Math.random().toString(36).slice(-8)+
            Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoURL,
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT_SECRET);
            const{password, ...rest} = user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest)
        }
    } catch (error) {
        next(error)
    }
 }
 export const forgotpassword = async(req,res,next)=>{
    const {email}= req.body;

    try {
        const validUser = await User.findOne({email});
    if(!validUser){
        next(errorHandler(400, 'Wrong Credentails'));
    }
    const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET,{
        expiresIn:"300s"
    })
    const setusertoken = await User.findByIdAndUpdate(validUser._id,{verifytoken:token},{new:true});
    if(setusertoken){
        const mailOptions = {
            from: process.env.EMAIL,
            to:email,
            subject:"Email for password Reset",
            text:`This link valid for 2 MINUTES http://localhost:5173/reset/${validUser._id}/${token} `
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                next(error)
            }else{
                res.status(200).json({status:200,message:'Email sent Successfully'})
            }
        })
    }
    } catch (error) {
        next(error)
    }
    
 }
