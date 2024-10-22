import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {useSelector} from 'react-redux'
import { FaThumbsUp } from "react-icons/fa";
const Comment = ({comment,onLike}) => {
    const[user,setUser]= useState({});
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
        <p className='hover:text-red-600' >Edit</p>
        <p className='hover:text-red-600' >Delete</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Comment
