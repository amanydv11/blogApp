import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import newlogo from '../assets/newlogo.png'
import Spline from '@splinetool/react-spline';
const Signin = () => {
  const[formData,setFormData] = useState({})
  const {loading,error:errorMessage} =useSelector(state=> state.user);
  const dispatch= useDispatch()
  const navigate= useNavigate();
  const handleChange =(e)=>{
      setFormData({...formData,[e.target.id]: e.target.value.trim() })
  }
const handleSubmit= async (e)=>{
  e.preventDefault()
  if(!formData.email || !formData.password){
   return dispatch(signInFailure('Please fill all the fields'))
  }
  try {
      dispatch(signInStart());
      const res= await fetch('/api/auth/signin',{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(formData) 
      });
      const data = await res.json();
      if(data.success===false){
          dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data))
          navigate('/')
      }
  } catch (error) {
      dispatch(signInFailure(error.message))
  }
  
}
return (
  <div className="min-h-screen mt-20">
    <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      {/**left side */}
      <div className="flex-1">
        <Link
          to="/"
          className=" 
      font-bold dark:text-white text-4xl "
        >
          
          <img className='w-60' src={newlogo} alt="" /> 
        </Link>
        
      </div>
      {/**right side */}
      <div className="flex-1">
        <form className="flex flex-col gap-2"onSubmit={handleSubmit} >
          <div>
            <Label value="Email" />
            <TextInput type="email" placeholder="user@gmail.com" id="email" onChange={handleChange} />
          </div>
          <div>
            <Label value="Password" />
            <TextInput type="password" placeholder="**********" id="password" onChange={handleChange} />
          </div>
          <button className="bg-orange-500 text-lg text-white py-2 rounded-md" type="submit" disabled={loading} >
              {
                  loading ? (
                      <>
                      <Spinner size="sm"/>
                      <span className="pl-3" >Loading</span>
                      </>
                  ): 'Sign In'
              }
          </button>
          <OAuth/>
        </form>
        <div className="flex justify-between">
        <div className="flex gap-2 text-sm mt-2">
        <span>Don't Have an account?</span>
        <Link to='/signup' className="text-blue-500">
        Sign Up</Link>
        </div>
        <div className="flex gap-2 text-sm mt-2">
        <Link to='/forgot_pass' className="text-blue-500">
        Forgot Password</Link>
        </div>
        </div>
        
        {
          errorMessage && (
              <Alert className="mt-5"color="failure" >{errorMessage}</Alert>
          )
        }
      </div>
    </div>
  </div>
);
}

export default Signin
