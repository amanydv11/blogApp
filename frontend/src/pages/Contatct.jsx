import React, { useState } from 'react'
import { Label, Textarea, TextInput } from "flowbite-react";
const Contatct = () => {
  const [result, setResult] =useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
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
  }
  return (
    <div>
       <form className='w- flex-row  m-5' onSubmit={onSubmit}>
        <div>
            <Label value="Name" />
            <TextInput name='name' type="text" placeholder="pinku" required />
          </div>
        <div>
            <Label value="Email" />
            <TextInput name='email' type="email" placeholder="user@gmail.com" id="email" required />
          </div>
          <div>
            <Label value="Contact no" />
            <TextInput name='Contact No.' type="number" placeholder="0000000000" required />
          </div>
          <div>
            <Label value="Write about your Querry.." />
            <Textarea name='message' placeholder='Example: I want to know about your projects.. ' required />
          </div>
      <div className=' flex items-center justify-center ' >
       <button className='text-black text-center w-[60%] border mt-5 border-black text-xl rounded-md py-2  hover:bg-orange-500'  type="submit">Send</button>
        </div>
        

      </form>
      <span>{result}</span>
    </div>
  )
}

export default Contatct
