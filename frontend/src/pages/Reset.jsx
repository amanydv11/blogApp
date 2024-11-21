import React,{useState} from 'react'
import { TextInput,Button } from 'flowbite-react'
const Reset = () => {
    const[formData,setFormData] = useState({})
const[errorMessage,setErrorMessage] =useState(null)
    const[loading,setLoading] = useState(false)
    const handleSubmit=async(e)=>{
e.preventDefault();
try {
    setLoading(true);
            setErrorMessage(null);
const res = await fetch(`/api/auth/resetpassword`,{
    method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(formData)
});
const data = await res.json();
            if (data.success) {
                navigate('/signin')
              }

} catch (error) {
    setErrorMessage(error.message)
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
        <h1 className='text-2xl font-serif'>New Password</h1>
<form onSubmit={handleSubmit}>
        
        <div className=" flex flex-col items-center m-3 gap-4 box-border ">
          <TextInput className='w-[350px]' type="password" placeholder='Password'/>
          <TextInput className='w-[350px]' type="password" placeholder='Confirm password'/>
          <Button type='submit'  className='bg-orange-500 border border-black rounded-md w-[300px] h-10'>
          Send
        </Button>
  </div>
        
      </form>
    </div>
  )
}

export default Reset
