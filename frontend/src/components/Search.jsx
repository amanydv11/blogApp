import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { useLocation,useNavigate } from 'react-router-dom';
import { AiFillWechat } from 'react-icons/ai';
const Search = () => {
  const[sidebarData,setSidebarData] =useState({
    searchTerm:'',
    sort:'desc',
    category:'uncategorized',
  });
  const loaction = useLocation();
  const navigate = useNavigate();
  const[posts,setPosts]= useState([])
  const[loading,setLoading]= useState(false)
  const[showMore,setShowMore]= useState(false);
  useEffect(()=>{
const urlParams = new URLSearchParams(loaction.search);
const searchTermFromUrl = urlParams.get('searchTerm');
const sortFromUrl = urlParams.get('sort');
const categoryFromUrl = urlParams.get('category');
if(searchTermFromUrl || sortFromUrl || categoryFromUrl ){
  setSidebarData({
    ...sidebarData,
    searchTerm : searchTermFromUrl,
    sort:sortFromUrl,
    category:categoryFromUrl,

  })
}
const fetchPosts = async()=>{
setLoading(true);
const searchQuery = urlParams.toString()
const res = await fetch(`/api/post/getPosts?${searchQuery}`);
if(!res.ok){
  setLoading(false);
  return
}
if(res.ok){
  const data = await res.json();
  setPosts(data.posts);
  setLoading(false);
  if(data.posts.length===9){
    setShowMore(true);
  }
  else{
    setShowMore(false);
  }
}
}
fetchPosts();
  },[loaction.search])
  const handleChange = (e)=>{
if(e.target.id === 'searchTerm'){
  setSidebarData({...sidebarData,searchTerm:e.target.value})
}
if(e.target.value ==='sort'){
  const order = e.target.value || 'desc';
  setSidebarData({...sidebarData,sort:order});
}
if(e.target.value === 'category'){
  const category = e.target.value || 'uncategorized';
  setSidebarData({...sidebarData,category});
}
  }
const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(loaction.search);
    urlParams.set('searchTerm',sidebarData.searchTerm);
    urlParams.set('sort',sidebarData.sort);
    urlParams.set('category',sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }
  const handleShowMore =async ()=>{
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(loaction.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery = urlParams.toString();
    const res= await fetch(`/api/post/getposts?${searchQuery}`);
    if(!res.ok){
      return
    }
    if(res.ok){
      const data = await res.json();
setPosts([...posts,...data.posts]);
if(data.posts.length === 2){
  setShowMore(true);

}else{
  setShowMore(false);
}
    }
  }
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className='whitespace-nowrap font-semibold'>Search Term :</label>
            <TextInput placeholder='Search..'
            id='searchTerm' type='text'
            value={sidebarData.searchTerm}
            onChange={handleChange}
            />
            </div>
<div className="flex items-center gap-2">
  <label className='font-semibold'>Sort :</label>
  <Select onChange={handleChange} defaultValue={sidebarData.sort}
  id='sort'>
    <option value="desc">Latest</option>
    <option value="asc">Oldest</option>
  </Select>
</div>
<div className="flex items-center gap-2">
  <label className='font-semibold'>Category :</label>
  <Select onChange={handleChange} defaultValue={sidebarData.category}
  id='category'>
    <option value="uncategorized">uncategorized</option>
    <option value="reactjs">React.js</option>
    <option value="nextjs">Next.js</option>
    <option value="javascript">JavaScript</option>
  </Select>
</div>
<Button type='submit' outline gradientDuoTone='purpleToBlue'>Apply Filters</Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className='text-2xl font-bold p-3 mt-5 sm:border-b border-gray-600 font-serif'>Posts Results :</h1>
        <div className="p-7 flex flex-wrap gap-4 ">
          {
            !loading && posts.length === 0 && (
              <p className='text-xl text-gray-400'>No posts found</p>
            )
          }
          {
            loading && <p className='text-xl text-gray-400'>Loading...</p>
          }
          {
            !loading && posts && posts.map((post)=>
              <PostCard key={post._id} post={post} />
            )}
            {
              showMore && <button onClick={handleShowMore} className=' w-full text-teal-500 p-7 text-lg hover:underline items-center'>Show More</button>
            }
        </div>
      </div>
    </div>
  )
}

export default Search