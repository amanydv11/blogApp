import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
        unique:true

    },
    profilePicture:{
        type:String,
        default:"https://tse2.mm.bing.net/th?id=OIP.eMLmzmhAqRMxUZad3zXE5QHaHa&pid=Api&P=0&h=180",
    }
}, {timestamps:true}
)
const User = mongoose.model('User',userSchema) 
export default User;