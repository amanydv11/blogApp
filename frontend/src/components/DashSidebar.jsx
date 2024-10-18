import { Sidebar } from 'flowbite-react'
import React,{ useEffect,useState } from 'react'
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import { FaUsers } from "react-icons/fa6";
import { AiFillPieChart } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { BsFileEarmarkPost } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
const DashSidebar = () => {
    const location = useLocation()
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
   if(tabFromUrl){
    setTab(tabFromUrl)
   }
  },[location.search]);
  const dispatch = useDispatch();
  const {currentUser}= useSelector(state=>state.user);
  const handleSignout =async ()=>{
    try {
      const res= await fetch('/api/user/signout',{
        method:'POST',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message)
      }
      else{
dispatch(signoutSuccess());
      }
    } catch (error) {
      
    }
    
  }
  return (
    
     <Sidebar className='w-full md:w-56'>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
        <Sidebar.Item icon={AiFillPieChart} className='cursor-pointer' >
                  Dashboard
                </Sidebar.Item>

            <Link to='/dashboard?tab=profile'>
                <Sidebar.Item
                 active={tab==='profile'}
                 icon={HiUser}
              label={currentUser.isAdmin ? 'Admin':'User'}
                 labelColor='dark'
                 as='div'
                 >
                    Profile
                </Sidebar.Item>
                </Link>

                {currentUser.isAdmin && (
                  <Link to='/dashboard?tab=posts'>
                <Sidebar.Item 
                 active={tab==='posts'}
                icon={BsFileEarmarkPost}
                labelColor='dark'
                 as='div'
                >
                  Posts
                </Sidebar.Item>
                </Link>

                )}
                
                

                <Sidebar.Item icon={FaUsers} className='cursor-pointer' >
                  Users
                </Sidebar.Item>

                <Sidebar.Item icon={BiSolidCommentDetail} className='cursor-pointer' >
                  Comments
                </Sidebar.Item>

                <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer'onClick={handleSignout} >
                    Sign Out
                </Sidebar.Item>
        </Sidebar.ItemGroup>
        </Sidebar> 
  )
}

export default DashSidebar
