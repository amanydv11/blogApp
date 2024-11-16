import { errorHandler } from "../utils/error.js"
import Comment from '../models/commentModel.js'
export const createComment = async (req, res, next) => {
    try {
      const { content, postId, userId } = req.body;
  
      if (userId !== req.user.id) {
        return next(
          errorHandler(403, 'You are not allowed to create this comment')
        );
      }
  
      const newComment = new Comment({
        content,
        postId,
        userId,
      });
      await newComment.save();
  
      res.status(200).json(newComment);
    } catch (error) {
      next(error);
    }
  };
  export const getPostComments=async(req,res,next)=>{
    try {
      const comments= await Comment.find({postId:req.params.postId}).sort({
        createdAt:-1,
      });
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }
  export const likeComment = async(req,res,next)=>{
    
    try {
      const comment = await Comment.findById(req.params.commentId);
      if(!comment){
        return next(errorHandler(404,'Comment not found'))
      }
const userIndex = comment.likes.indexOf(req.user.id);
//userindex will be -1 if it is not available in the likes section of comment
if(userIndex === -1){
  comment.numberOfLikes += 1;
comment.likes.push(req.user.id);

}else{
  comment.numberOfLikes -= 1;
  comment.likes.splice(userIndex,1);
}
await comment.save();
res.status(200).json(comment)
    } catch (error) {
      next(error)
    }
  }
  export const editComment = async(req,res,next)=>{
    try {
      const comment = await Comment.findById(req.params.commentId)
      if(!comment){
        return next(errorHandler(400,'Comment not found'))
      }
      if(comment.userId !== req.params.id && !req.user.isAdmin){
        return next(errorHandler(401,'You are not authorized to edit the comment'))
      }
const editedComment = await Comment.findByIdAndUpdate(
req.params.commentId,
    {content: req.body.content,
    },
  {new: true}
)
res.status(200).json(editedComment)
    } 
    
    catch (error) {
      next(error)
    }
  }