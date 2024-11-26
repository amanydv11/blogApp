import React,{useState} from 'react'
import { TextInput,Button } from 'flowbite-react'
import { useNavigate, useParams } from "react-router-dom";
const Reset = () => {
  const [password, setPassword] = useState("");

  const[errorMessage,setErrorMessage] =useState(null)
  const[loading,setLoading] = useState(false)
  const { token } = useParams();
  const navigate = useNavigate()

  const handleSubmit=async(e)=>{
   e.preventDefault();

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
}
   try {
    setLoading(true);
    setErrorMessage(null);
    const res = await fetch(`/api/auth/reset-password/${token}`,{
    method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({password})
   });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update password");
  }
            if (data.success) {
              setLoading(false)
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
          <TextInput className='w-[350px]' type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
            
          <Button type='submit'  className='bg-orange-500 border border-black rounded-md w-[300px] h-10' disabled={loading} >
          {loading ? "Updating..." : "Update Password"}
        </Button>
        {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
  </div>
        
      </form>
    </div>
  )
}

export default Reset
