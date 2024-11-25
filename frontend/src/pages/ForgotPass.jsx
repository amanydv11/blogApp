import React,{useState} from 'react'
import {TextInput,Button,Alert } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
const ForgotPass = () => {
    const navigate= useNavigate()
    const [email, setEmail] = useState("");
const[errorMessage,setErrorMessage] =useState(null)
    const[loading,setLoading] = useState(false)
    const [message, setMessage] = useState("");
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(!email){
         return setErrorMessage('Please fill all fields')
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            const res= await fetch('/api/auth/forgot-password',{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({email}) 
            });
            const data = await res.json();
            if (!res.ok) {
              setMessage(data.message)
          }
            if (data.success) {
              setMessage("Reset email sent successfully!");
              }
        } catch (error) {
            setErrorMessage(error.message)
        }finally {
          setLoading(false);
      }

   }
  return (
    <div
    style={{
        maxWidth: "400px",
        margin: "106px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
        textAlign: "center",
      }}
    >
        <h1 className='text-2xl font-serif'>Enter your registered email....</h1>
<form onSubmit={handleSubmit}>
        
        <div className=" flex flex-col items-center m-3 gap-4 box-border ">
          <TextInput className='w-[350px]' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email..'/>
          <button type='submit'  className='bg-orange-500 border border-black rounded-md w-[300px] h-10'>
          {loading ? "Sending..." : "Send"}
        </button>
  </div>  
      </form>
      {errorMessage && <Alert color="failure" className="mt-3">{errorMessage}</Alert>}
      {message && <Alert color="success" className="mt-3">{message}</Alert>}
    </div>
    
  )
}

export default ForgotPass
