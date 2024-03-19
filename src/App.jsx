import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ItemPage from './pages/itemPage/ItemPage.jsx'
import ItemsPage from './pages/itemsPage/ItemsPage.jsx'
import OrdersPage from './pages/ordersPage/OrdersPage.jsx'
import CartPage from './pages/cartPage/CartPage.jsx'
import Navbar from './common/navbar/Navbar.jsx'
import Footer from './common/footer/Footer.jsx'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <BrowserRouter>
        <div className='routers'>
          <Routes>
            <Route path='/' element={<ItemsPage />}></Route>
            <Route path='/items/:itemId' element={<ItemPage />}></Route>
            <Route path='/items/' element={<ItemsPage />}></Route>
            <Route path='/cart' element={<CartPage />}></Route>
            <Route path='/orders' element={<OrdersPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}

export default App
