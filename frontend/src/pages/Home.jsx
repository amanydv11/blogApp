import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Action from '../components/Action'
import PostCard from '../components/PostCard'
import Spline from '@splinetool/react-spline';
const Home = () => {
  const[posts,setPosts]= useState([]);
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res =await fetch('/api/post/getPosts')
      const data= await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
  },[]);
  return (
    <div>
      <div className=" flex flex-col gap-6 p- px-3 max-w-6xl mx-auto ">
        <div className="">
        <Spline
        scene="https://prod.spline.design/hi7l0exaD4vqlrNn/scene.splinecode" 
      />
        </div>
      <p className='font-serif m-2  text-xl sm:text-sm'>Here you'll find a variety of articles and tutorials on topics such as web development,
        software engineering, places,food etc.. <span><Link
          to={'/search'}
          className='text-blue-500 hover:underline text-center'
        >
          Click here
        </Link></span>
      </p>
     
      </div>

<div className="max-w-6xl mx-auto flex flex-col gap-8 py-7">
     {posts && posts.length > 0 && (
      <div className='flex flex-col gap-6'>
        <h1 className='text-4xl font-serif font-semibold text-center'>Recent Posts</h1>
        <div className='justify-center flex flex-wrap gap-6'>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <Link
          to={'/search'}
          className='text-lg text-teal-500 hover:underline text-center'
        >
          View all posts
        </Link>
        </div>
    )
  }
 
</div>
    </div>
  )
}

export default Home
