import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import newlogo from '../assets/newlogo.png'
const Signup = () => {
    const[formData,setFormData] = useState({})
    const[errorMessage,setErrorMessage] =useState(null)
    const[loading,setLoading] = useState(false)
    const navigate= useNavigate();
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.id]: e.target.value.trim() })
    }
const handleSubmit= async (e)=>{
    e.preventDefault()
    if(!formData.username || !formData.email || !formData.password){
     return setErrorMessage('Please fill all fields')
    }
    try {
        setLoading(true);
        setErrorMessage(null);
        const res= await fetch('/api/auth/signup',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formData) 
        });
        const data = await res.json();
        if(data.success===false){
            return setErrorMessage(data.message);
        }
        setLoading(false);
        if(res.ok){
            navigate('/signin')
        }
    } catch (error) {
        setErrorMessage(error.message)
        setLoading(false);
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
              <Label value="Username" />
              <TextInput type="text" placeholder="user123" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="Email" />
              <TextInput type="email" placeholder="user@gmail.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Password" />
              <TextInput type="password" placeholder="**********" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit"disabled={loading} >
                {
                    loading ? (
                        <>
                        <Spinner size="sm"/>
                        <span className="pl-3" >Loading</span>
                        </>
                    ): 'Sign Up'
                }
            </Button>
            <OAuth/>
          </form>
          <div className="flex justify-between">
          <div className="flex gap-2 text-sm mt-2">
          <span>Have an account?</span>
          <Link to='/signin' className="text-blue-500">
          Sign In</Link>
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
};

export default Signup;
