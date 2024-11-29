import React, { useState } from 'react'
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { Label, Textarea, TextInput } from "flowbite-react";
const Contatct = () => {
  const [result, setResult] =useState('');
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!currentUser) {
        navigate('/signin');
        return;
      }
      
      setResult("Sending....");
      const formData = new FormData(event.target);
      const apiKey = import.meta.env.VITE_FORM_API_KEY;
      formData.append("access_key", apiKey);
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    
  }
  return (
    <div className='' >
      <h1 className=' flex text-3xl font-serif uppercase m-3  items-center justify-center'>fill the form to contact us !</h1>
      <div className="flex items-center justify-center">
      <form className='w-[60%] border mb-5 rounded-md ' onSubmit={onSubmit}>
        <div className='m-10'>
            <Label className='text-xl' value="Name" />
            <TextInput name='name' type="text" placeholder="pinku" required />
          </div>
        <div className='m-10'>
            <Label className='text-xl' value="Email" />
            <TextInput name='email' type="email" placeholder="user@gmail.com" required />
          </div>
          <div className='m-10'>
            <Label className='text-xl' value="Phone" />
            <TextInput name='Contact No.' type="number" placeholder="0000000000" required />
          </div>
          <div className='m-10'>
            <Label className='text-xl' value="Message" />
            <Textarea name='message' placeholder='Example: I want to know about your projects.. ' required />
          </div>
      <div className=' flex items-center justify-center m-5 ' >
       <button className='text-black dark:text-white text-center w-[60%] border  border-black text-xl rounded-md py-2  bg-orange-500'  type="submit">Send</button>
        </div>
        <div className="text-sm text-gray-400 m-1 float-right">* Our team will contact to you in 24hr *</div>

      </form>
      </div>
       
      <span>{result}</span>
    </div>
  )
}

export default Contatct
