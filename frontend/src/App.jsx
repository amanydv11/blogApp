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
const App = () => {
  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
      <Routes>
        <Route path='/about' element={<About/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
