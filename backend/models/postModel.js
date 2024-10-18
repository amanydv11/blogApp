import mongoose from 'mongoose'
const postSchema = new mongoose.Schema(
    {
       userId:{
        type:String,
        required :true,
       } ,
       content:{
        type:String,
        required:true,
       },
       title:{
        type:String,
        required:true,
        unique:true,
       },
       image:{
        type:String,
        required:true,
        default:'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
       },
       category:{
        type:String,
        default:'uncategorized'
       },
       slug:{
        type:String,
        required:true,
        unique:true,
       },
    },{timestamps:true}
);
const Post = mongoose.model('Post',postSchema)
export default Post;