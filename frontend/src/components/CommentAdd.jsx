import { Alert, Button, Textarea, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import {Link } from 'react-router-dom'
const CommentAdd = ({postId}) => {
    const {currentUser}= useSelector(state=>state.user)
    const[comment,setComment]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {
            const res = await fetch('/api/comment/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({content:comment,postId,userId:currentUser._id})
            
            });
            const data = await res.json();
            if(res.ok){
                setComment('');
                
            }
                
        } catch (error) {
            console.log(error) 
        }
    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3 ' >
     {currentUser ? (
        <div className="flex items-start gap-1 my-5 text-gray-500 text-sm">
            <p>Signed In as:</p>
            <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
            <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
            @{currentUser.username}
            </Link>
        </div>
     ):(
        <div className="text-sm flex gap-1 text-teal-500 my-5">
            you must be signed in to add comments
            <Link className='text-blue-500 hover:underline' to={'/signin'}>
            Sign In</Link>
        </div>
     )}
     {currentUser && (
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3 '>
            <Textarea placeholder='Add a comment...'
            rows={3}
            maxLength={200} 
            onChange={(e)=>setComment(e.target.value)}
            value={comment}
            />
            <div className="flex justify-between items-center mt-5 ">
                <p className='text-gray-500 text-sm'>{200 - comment.length } characters remaining</p>
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Submit
                </Button>
            </div>
            
        </form>
        
     )}

    </div>
  )
}

export default CommentAdd
