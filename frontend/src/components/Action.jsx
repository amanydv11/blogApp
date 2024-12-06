import React from "react";
import { Button } from "flowbite-react";
const Action = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border-teal-500 border justify-center items-center rounded-tl-3xl rounded-br-3xl text-center" >
      <div className="flex-1 justify-center flex flex-col" >
        <h2 className="text-2xl">Want to learn more about technology?</h2>

        <p className="text-gray-500 my-2">Checkout these resources with 100+ posts and documentation !</p>
        <Button
          className="rounded-tl-xl rounded-bl-none "
          gradientDuoTone="purpleToPink"
        >
          <a href="#" target="_blank" rel="noopener noreferrer">
            Join us
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1 ">
        <img className=""
          src="https://cdn.pixabay.com/photo/2016/11/14/03/16/book-1822474_1280.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Action;
