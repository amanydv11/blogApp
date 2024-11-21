import React from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import { ToastContainer, toast } from 'react-toastify';
import Footer from './components/Footers'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import AllPosts from './pages/AllPosts'
import ScrollToTop from './components/ScrollToTop'
import Search from './components/Search'
import ForgotPass from './pages/ForgotPass'
import Reset from './pages/Reset'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop/>
    <ToastContainer/>
    <Header/>
      <Routes>
        <Route path='/about' element={<About/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/post/:postSlug' element={<AllPosts/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/reset' element={<Reset/>} />
        

        <Route path='/forgot_pass' element={<ForgotPass/>} />
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path='/create-post' element={<CreatePost/>} />
        <Route path='/update-post/:postId' element={<UpdatePost/>} />
        
        </Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
