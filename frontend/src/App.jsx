import React, { useState } from 'react'
import Navbar from './components/navbar/navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import PlaceOrder from './pages/placeorder/placeorder'
import Cart from './pages/cart/cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import Verify from './pages/Verify/Verify'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>  
           <Route path='/' element={<Home/>} />
           <Route path='/order' element={<PlaceOrder/>} />
           <Route path='/cart' element={<Cart/>} />
           <Route path='/myorders' element={<MyOrders/>} />
           <Route path='/verify' element={<Verify/>} />
        </Routes>
      </div> 
    </>
  )
}

export default App