import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {useSelector} from 'react-redux'
import {Textarea} from 'flowbite-react'
import {Button} from 'flowbite-react'
import { FaThumbsUp } from "react-icons/fa";
const Comment = ({comment,onLike,onEdit}) => {
    const[user,setUser]= useState({});
    const [isEditing,setIsEditing]= useState(false);
    const[ editedContent,setEditedContent] = useState(comment.content)
    const {currentUser}= useSelector(state=>state.user)
    useEffect(()=>{
const getUser = async()=>{
    try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json()
   if(res.ok){
setUser(data);
   }
   
    } catch (error) {
        console.log(error)
    }
}
getUser();
    },[comment])

const handleEdit = ()=>{
  setIsEditing(true);
setEditedContent(comment.content);
}
const handleSave = async()=>{
try {
  const res = await fetch(`/api/comment/editComment/${comment._id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      content :editedContent
    })
  });
  if(res.ok){
    setIsEditing(false)
    onEdit(comment,editedContent)
  }
} catch (error) {
  console.log(error.message)
}
}

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className="flex-shrink-0 mr-3">
        <img className='h-10 w-10 rounded-full bg-cover' src={user.profilePicture} alt={user.username} />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1 ">
            <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}`: 'anonymous user'}</span>
            <span className='text-gray-500 text-xs'>
                {moment(comment.createdAt).fromNow()}
            </span>
        </div>

        {isEditing ? (
          <>
          <Textarea 
          className='mb-2'
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className=" flex gap-2 justify-end text-xs">
          <Button size='sm' 
          onClick={handleSave}
          type="button" gradientDuoTone="purpleToBlue" >
              Save
            </Button>
            <Button size='sm'
            onClick={()=> setIsEditing(false)} 
            type="button" gradientDuoTone="purpleToBlue" outline>
          Cancel
            </Button>
          </div>
          
          </>
          
        ):(
          <>
          <p className='text-gray-500 mb-2'>{comment.content}</p>
      
      <div className="flex gap-2">
        <div className="flex gap-2 text-gray-400 text-xs">
        <button type='button' onClick={()=>onLike(comment._id)}
          className={`text-sm hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id)&& 'text-blue-500'}`}
          >
        <FaThumbsUp  />
        </button>
        <p>{
          comment.numberOfLikes >0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "Like" : "Likes")
          }</p>
{
  currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
    <button
      type='button'
      onClick={handleEdit}
      className='text-gray-400 hover:text-blue-500'
      >Edit
    </button>
  )
}
{
  currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
    <button
      type='button'
      
      className='text-gray-400 hover:text-blue-500'
      >Delete
    </button>
  )
}
        
        </div>
      </div>
          </>
        )}
        
    </div>
    </div>
  )
}

export default Comment
