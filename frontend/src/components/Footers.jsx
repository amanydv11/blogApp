import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import newlogo from '../assets/newlogo.png'
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
const Footers = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500' >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
          <Link to="/" className='self-center whitespace-nowrap text-lg 
        sm:text-xl font-semibold dark:text-white ' >
             <img className='w-60' src={newlogo} alt="" />
        </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
            <Footer.Title title='About'/>
            <Footer.LinkGroup col>
              <Footer.Link 
              href='/contact'
              target=''
              rel='noopener noreferrer'>
                Contact
              </Footer.Link>
              <Footer.Link 
              href='/about'
              target=''
              rel='noopener noreferrer'>
                About us
              </Footer.Link>  
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Follow us'/>
            <Footer.LinkGroup col>
              <Footer.Link 
              href='http://www.github.com/amanydv11'
              target='_blank'
              rel='noopener noreferrer'>
                Github
              </Footer.Link>
              <Footer.Link 
              href='https://www.linkedin.com/in/aman-singh-890580205/'
              target='_blank'
              rel='noopener noreferrer'>
                Linkdin
              </Footer.Link>  
            </Footer.LinkGroup>
            </div>

            <div>
            <Footer.Title title='Legal'/>
            <Footer.LinkGroup col>
              <Footer.Link 
              href='privacy'
             >
                Privacy Policy 
              </Footer.Link>
              <Footer.Link 
              href='/terms'
             >
                Terms &amp; Conditions
              </Footer.Link>  
            </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by="Aman's blog" year={new Date().getFullYear()}/>
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://www.facebook.com/share/14FPpNvVj9/?mibextid=LQQJ4d' target='_blank' icon={FaFacebook}/>
            <Footer.Icon href='https://www.instagram.com/i.m.aman24/profilecard/?igsh=MWxlZGhqNHJpOHZ3MQ==' target='_blank'  icon={FaInstagram}/>
            <Footer.Icon href='https://x.com/amanyad4215613?s=21' target='_blank'  icon={FaTwitter}/>
            <Footer.Icon href='http://www.github.com/amanydv11' target='_blank'  icon={FaGithub}/>
            
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default Footers
