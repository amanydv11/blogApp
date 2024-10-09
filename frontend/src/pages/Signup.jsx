import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
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
            <span
              className="px-2 py-1 bg-gradient-to-r
             from-indigo-500 via-purple-500 to-pink-500
              rounded-lg text-white "
            >
              Aman's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is the blog website where u can write your blog. you can sign
            up with your email and password or with google
          </p>
        </div>
        {/**write side */}
        <div className="flex-1">
          <form className="flex flex-col gap-2">
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="user123" id="username" />
            </div>
            <div>
              <Label value="Email" />
              <TextInput type="text" placeholder="user@gmail.com" id="email" />
            </div>
            <div>
              <Label value="Password" />
              <TextInput type="text" placeholder="**********" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
                Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-2">
          <span>Have an account?</span>
          <Link to='/signin' className="text-blue-500">
          Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
